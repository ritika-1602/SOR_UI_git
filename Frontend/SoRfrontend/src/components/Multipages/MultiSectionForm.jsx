import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, message } from 'antd';

import CreateClientSection from './CreateClientSection';
import CreateProductSection from './CreateProductSection';
import CreateRetentionSection from './CreateRetentionSection';
import CreatePremiumSection from './CreatePremiumSection';
import CreateDiscountSection from './CreateDiscountSection';

const MultiTabForm = ({ initialData = {}, clientId = null }) => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState(initialData || {});
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [retentions, setRetentions] = useState([]);
  const [premiumsMap, setPremiumsMap] = useState({});
  const [discountsMap, setDiscountsMap] = useState({});
  const [step, setStep] = useState('client');
  const [activeTab, setActiveTab] = useState('products');

  const handleClientContinue = (data) => {
    setClientData(data);
    setStep('productInfo');
    message.success('Client Info Saved');
  };

  const handleAddProduct = (product) => {
    setProductData((prev) => [...prev, product]);
    message.success('Product Added');
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setActiveTab('premiums');
  };

  const handleSavePremiums = (data) => {
    if (selectedProduct?.productCode) {
      setPremiumsMap((prev) => ({ ...prev, [selectedProduct.productCode]: data }));
      message.success('Premiums saved');
      setActiveTab('discounts');
    }
  };

  const handleSaveDiscounts = (data) => {
    if (selectedProduct?.productCode) {
      setDiscountsMap((prev) => ({ ...prev, [selectedProduct.productCode]: data }));
      message.success('Discounts saved');
      setActiveTab('products');
    }
  };

  if (step === 'client') {
    return (
      <CreateClientSection
        initialData={clientData}
        onContinue={handleClientContinue}
        onExit={() => navigate('/dashboard')}
        onCancel={() => navigate('/dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded shadow p-6">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'products',
              label: 'Products',
              children: (
                <CreateProductSection
                  productList={productData}
                  onAdd={handleAddProduct}
                  clientData={clientData}
                  onExit={() => navigate('/dashboard')}
                  onSelect={handleSelectProduct}
                />
              ),
            },
            {
              key: 'retentions',
              label: 'Retentions',
              children: (
                <CreateRetentionSection
                  clientData={clientData}
                  retentionList={retentions}
                  onSave={(data) => setRetentions(data)}
                  onBack={() => console.log('Back')}
                  onCancel={() => navigate('/dashboard')}
                />
              ),
            },
            {
              key: 'premiums',
              label: 'Premiums',
              children: (
                <CreatePremiumSection
                  selectedProduct={selectedProduct}
                  clientData={clientData}
                  premiums={premiumsMap[selectedProduct?.productCode] || []}
                  setPremiums={(updatedPremiums) =>
                    setPremiumsMap((prev) => ({
                      ...prev,
                      [selectedProduct?.productCode]: updatedPremiums,
                    }))
                  }
                  onSave={handleSavePremiums}
                  onBack={() => setActiveTab('products')}
                  onCancel={() => navigate('/dashboard')}
                />
              ),
            },

            {
              key: 'discounts',
              label: 'Discounts',
              children: (
                <CreateDiscountSection
                  discounts={discountsMap[selectedProduct?.productCode] || []}
                  onSave={handleSaveDiscounts}
                  onBack={() => setActiveTab('premiums')}
                  onCancel={() => navigate('/dashboard')}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MultiTabForm;