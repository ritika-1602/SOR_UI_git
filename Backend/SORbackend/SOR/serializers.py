
from rest_framework import serializers
from .models import (
    Client, ClientInfo, ProductInfo, RetentionInfo,
    PremiumRate, Discount
)

# Nested Serializers for ProductInfo
class PremiumRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PremiumRate
        fields = '__all__'

class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'

class ProductInfoSerializer(serializers.ModelSerializer):
    premium_rates = PremiumRateSerializer(many=True, required=False)
    discounts = DiscountSerializer(many=True, required=False)

    class Meta:
        model = ProductInfo
        fields = '__all__'
        read_only_fields = ['productID']

class ClientInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientInfo
        fields = '__all__'
        read_only_fields = ['client']

class RetentionInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RetentionInfo
        fields = '__all__'
        # read_only_fields = ['client']

class ClientSerializer(serializers.ModelSerializer):
    client_info = ClientInfoSerializer(required=False)
    product_info = ProductInfoSerializer(many=True, required=False)
    retention_info = RetentionInfoSerializer(required=False)

    class Meta:
        model = Client
        fields = [
            'id', 'clientCode', 'createdAt',
            'client_info', 'product_info', 'retention_info'
        ]

    def create(self, validated_data):
        client_info_data = validated_data.pop('client_info', None)
        product_info_data = validated_data.pop('product_info', [])
        retention_info_data = validated_data.pop('retention_info', None)

        client = Client.objects.create(**validated_data)

        if client_info_data:
            ClientInfo.objects.create(client=client, **client_info_data)
        if retention_info_data:
            RetentionInfo.objects.create(client=client, **retention_info_data)

        for product_data in product_info_data:
            premiums = product_data.pop('premium_rates', [])
            discounts = product_data.pop('discounts', [])
            product = ProductInfo.objects.create(client=client, **product_data)

            for premium in premiums:
                PremiumRate.objects.create(product=product, **premium)
            for discount in discounts:
                Discount.objects.create(product=product, **discount)

        return client

    def update(self, instance, validated_data):
        instance.clientCode = validated_data.get('clientCode', instance.clientCode)
        instance.save()

        related_models = [
            ('client_info', ClientInfo),
            ('retention_info', RetentionInfo),
        ]
        for field, model_class in related_models:
            data = validated_data.pop(field, None)
            if data:
                related_instance = getattr(instance, field, None)
                if related_instance:
                    for attr, value in data.items():
                        setattr(related_instance, attr, value)
                    related_instance.save()
                else:
                    model_class.objects.create(client=instance, **data)

        return instance