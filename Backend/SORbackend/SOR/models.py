# # Base Client model (acts as parent)
from django.db import models
from django.contrib.auth.models import User

# class Client(models.Model):
#     clientCode = models.CharField(max_length=50, unique=True)
#     createdAt = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.clientCode

# # Section 1: ClientInfo
# class ClientInfo(models.Model):
#     client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='client_info')

#     clientCode = models.CharField(max_length=255)
#     clientName = models.CharField(max_length=255)
#     clientCountry = models.CharField(max_length=100)
#     launchDate = models.DateField()
#     reinsurer = models.CharField(max_length=100)
#     category = models.CharField(max_length=100, blank=True, null=True)
#     channel = models.CharField(max_length=100)
#     freqBordereau = models.CharField(max_length=100)
#     freqReport = models.CharField(max_length=100)
#     accountingPrinciple = models.CharField(max_length=100)
#     primaryCurrency = models.CharField(max_length=10)
#     secondaryCurrency = models.CharField(max_length=10, blank=True, null=True)
#     taxProduct = models.CharField(max_length=100, blank=True, null=True)
#     monthlyReport = models.BooleanField(default=False)

# # Section 2: ProductInfo
# class ProductInfo(models.Model):
#     productID = models.AutoField(primary_key=True)  # Auto-incrementing PK
#     client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='product_info')
#     # client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='product_info')

#     productName = models.CharField(max_length=255)
#     productCatalogueId = models.CharField(max_length=100)
#     comments = models.TextField(blank=True, null=True)
#     productType = models.CharField(max_length=50)
#     house = models.CharField(max_length=10)

# # Section 3: RetentionInfo
# class RetentionInfo(models.Model):
#     client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='retention_info')

#     effectiveDate = models.DateField()
#     effectiveTo = models.DateField(blank=True, null=True)
#     retention = models.DecimalField(max_digits=5, decimal_places=2)

# # Section 4: PremiumInfo
# class PremiumInfo(models.Model):
#     client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='premium_info')

#     premiumRates = models.JSONField(default=list, blank=True)
#     premiumCurrency = models.CharField(max_length=10, default='EUR')

# #  Section 5: DiscountInfo
# class DiscountInfo(models.Model):
#     client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='discount_info')

#     discounts = models.JSONField(default=list, blank=True)

class Client(models.Model):
    clientCode = models.CharField(max_length=50, unique=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.clientCode

class ClientInfo(models.Model):
    client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='client_info')
    clientCode = models.CharField(max_length=255)
    clientName = models.CharField(max_length=255)
    clientCountry = models.CharField(max_length=100)
    launchDate = models.DateField()
    reinsurer = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True, null=True)
    channel = models.CharField(max_length=100)
    freqBordereau = models.CharField(max_length=100)
    freqReport = models.CharField(max_length=100)
    accountingPrinciple = models.CharField(max_length=100)
    primaryCurrency = models.CharField(max_length=10)
    secondaryCurrency = models.CharField(max_length=10, blank=True, null=True)
    taxProduct = models.CharField(max_length=100, blank=True, null=True)
    monthlyReport = models.BooleanField(default=False)

class ProductInfo(models.Model):
    productID = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='product_info')
    productName = models.CharField(max_length=255)
    productCatalogueId = models.CharField(max_length=100)
    comments = models.TextField(blank=True, null=True)
    productType = models.CharField(max_length=50)
    house = models.CharField(max_length=10,blank=True)

class RetentionInfo(models.Model):
    client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='retention_info')
    effectiveDate = models.DateField()
    effectiveTo = models.DateField(blank=True, null=True)
    retention = models.DecimalField(max_digits=10, decimal_places=2)

# NEW — PremiumRate
class PremiumRate(models.Model):
    product = models.ForeignKey(ProductInfo, on_delete=models.CASCADE, related_name='premium_rates')
    effective_date = models.DateField()
    effective_to = models.DateField(null=True, blank=True)
    age_from = models.IntegerField()
    age_to = models.IntegerField()
    Reinsurance_Premium = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    Risk_Premium = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    BD_Fees = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    comment = models.CharField(max_length=250, blank=True, null=True)
    gross_premium = models.DecimalField(max_digits=13, decimal_places=5, null=True, blank=True)
    taxes = models.DecimalField(max_digits=13, decimal_places=5, null=True, blank=True)
    fronting_fee = models.DecimalField(max_digits=13, decimal_places=5, null=True, blank=True)
    brokerage = models.DecimalField(max_digits=13, decimal_places=5, null=True, blank=True)

# NEW — Discount
class Discount(models.Model):
    product = models.ForeignKey(ProductInfo, on_delete=models.CASCADE, related_name='discounts')
    number_from = models.IntegerField(null=True, blank=True)
    number_to = models.IntegerField(null=True, blank=True)
    discount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)