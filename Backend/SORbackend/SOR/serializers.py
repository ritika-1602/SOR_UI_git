# from rest_framework import serializers
# from .models import (
#     Client, ClientInfo, ProductInfo, RetentionInfo,
#     PremiumInfo, DiscountInfo
# )

# class ClientInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ClientInfo
#         fields = '__all__'
#         read_only_fields = ['client']

# class ProductInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductInfo
#         fields = '__all__'
#         read_only_fields = ['client', 'productID']

# class RetentionInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RetentionInfo
#         fields = '__all__'
#         read_only_fields = ['client']

# class PremiumInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PremiumInfo
#         fields = '__all__'
#         read_only_fields = ['client']

# class DiscountInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DiscountInfo
#         fields = '__all__'
#         read_only_fields = ['client']

# class ClientSerializer(serializers.ModelSerializer):
#     client_info = ClientInfoSerializer(required=False)
#     product_info = ProductInfoSerializer(required=False)
#     retention_info = RetentionInfoSerializer(required=False)
#     premium_info = PremiumInfoSerializer(required=False)
#     discount_info = DiscountInfoSerializer(required=False)

#     class Meta:
#         model = Client
#         fields = [
#             'id', 'clientCode', 'createdAt',
#             'client_info', 'product_info', 'retention_info',
#             'premium_info', 'discount_info'
#         ]

#     def create(self, validated_data):
#         client_info_data = validated_data.pop('client_info', None)
#         product_info_data = validated_data.pop('product_info', None)
#         retention_info_data = validated_data.pop('retention_info', None)
#         premium_info_data = validated_data.pop('premium_info', None)
#         discount_info_data = validated_data.pop('discount_info', None)

#         client = Client.objects.create(**validated_data)

#         if client_info_data:
#             ClientInfo.objects.create(client=client, **client_info_data)
#         if product_info_data:
#             ProductInfo.objects.create(client=client, **product_info_data)
#         if retention_info_data:
#             RetentionInfo.objects.create(client=client, **retention_info_data)
#         if premium_info_data:
#             PremiumInfo.objects.create(client=client, **premium_info_data)
#         if discount_info_data:
#             DiscountInfo.objects.create(client=client, **discount_info_data)

#         return client

#     def update(self, instance, validated_data):
#         # Update base client fields
#         instance.clientCode = validated_data.get('clientCode', instance.clientCode)
#         instance.save()

#         # Update related models
#         related_models = [
#             ('client_info', ClientInfo),
#             ('product_info', ProductInfo),
#             ('retention_info', RetentionInfo),
#             ('premium_info', PremiumInfo),
#             ('discount_info', DiscountInfo)
#         ]

#         for field, model_class in related_models:
#             data = validated_data.pop(field, None)
#             if data:
#                 related_instance = getattr(instance, field, None)
#                 if related_instance:
#                     for attr, value in data.items():
#                         setattr(related_instance, attr, value)
#                     related_instance.save()
#                 else:
#                     model_class.objects.create(client=instance, **data)

#         return instance


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
        read_only_fields = ['client', 'productID']

class ClientInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientInfo
        fields = '__all__'
        read_only_fields = ['client']

class RetentionInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RetentionInfo
        fields = '__all__'
        read_only_fields = ['client']

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
