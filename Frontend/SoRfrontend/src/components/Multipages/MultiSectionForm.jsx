import React, { useEffect, useState } from 'react';
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
  const [retentions, setRetentions] = useState([]);
  const [premiumsMap, setPremiumsMap] = useState({});
  const [discountsMap, setDiscountsMap] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [step, setStep] = useState('client');
  const [activeTab, setActiveTab] = useState('products');

const handleClientContinue = (data) => {
  setClientData(data);
  setSelectedProduct(null);        // Show product and retention tabs
  setStep('productInfo');          // ✅ This is crucial: move away from client step
  setActiveTab('products');        // Move to Products tab
  message.success('Client Info Saved');
};

  useEffect(() => {
  const fetchProducts = async () => {
    if (clientData?.id) {
      try {
        const res = await axios.get(`/api/auth/product-info/?client=${clientData.id}`);
        setProductData(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
        message.error('Could not load products');
      }
    }
  };

  fetchProducts();
}, [clientData]);


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
      setPremiumsMap((prev) => ({
        ...prev,
        [selectedProduct.productCode]: data,
      }));
      message.success('Premiums saved');
      setActiveTab('discounts');
    }
  };

  const handleSaveDiscounts = (data) => {
    if (selectedProduct?.productCode) {
      setDiscountsMap((prev) => ({
        ...prev,
        [selectedProduct.productCode]: data,
      }));
      message.success('Discounts saved');
      setActiveTab('premiums'); // Back to premiums
    }
  };

  const handleSaveAndExit = (data) => {
    // Combine all data for final submission
    const submittedData = {
      client: clientData,
      products: productData,
      retentions: retentions,
      premiums: premiumsMap,
      discounts: discountsMap,
    };

    console.log('Final Submission:', submittedData);

    // Ideally you’d send this to backend here:
    // await axios.post('/api/submit-client', submittedData);

    message.success('All data submitted successfully!');
    navigate('/dashboard'); // Go to dashboard and display
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

  const showInitialTabs = !selectedProduct;
  const showPremiumDiscountTabs = !!selectedProduct;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded shadow p-6">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {showInitialTabs && (
            <>
              <Tabs.TabPane key="products" tab="Products">
                <CreateProductSection
                  productList={productData}
                  onAdd={handleAddProduct}
                  clientData={clientData}
                  onExit={() => navigate('/dashboard')}
                  onSelect={handleSelectProduct}
                />
              </Tabs.TabPane>

              <Tabs.TabPane key="retentions" tab="Retentions">
                <CreateRetentionSection
                  clientData={clientData}
                  retentionList={retentions}
                  onSave={setRetentions}
                  onBack={() => {setActiveTab('products')}}
                  onCancel={() => navigate('/dashboard')}
                />
              </Tabs.TabPane>
            </>
          )}

          {showPremiumDiscountTabs && (
            <>
              <Tabs.TabPane key="premiums" tab="Premiums">
                <CreatePremiumSection
                  selectedProduct={selectedProduct}
                  clientData={clientData}
                  premiums={premiumsMap[selectedProduct.productCode] || []}
                  setPremiums={(updated) =>
                    setPremiumsMap((prev) => ({
                      ...prev,
                      [selectedProduct.productCode]: updated,
                    }))
                  }
                  onSave={handleSavePremiums}
                  onBack={() => {
                    setSelectedProduct(null);
                    setActiveTab('products');
                  }}
                  onCancel={() => navigate('/dashboard')}
                />
              </Tabs.TabPane>

              <Tabs.TabPane key="discounts" tab="Discounts">
                <CreateDiscountSection
                  selectedProductType={selectedProduct.productName}
                  onSave={handleSaveDiscounts}
                  onBack={() => setActiveTab('premiums')}
                  onCancel={() => navigate('/dashboard')}
                  onSaveExit={handleSaveAndExit}
                />
              </Tabs.TabPane>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default MultiTabForm;