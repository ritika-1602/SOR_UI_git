import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, message } from 'antd';
import axios from 'axios';

import CreateClientSection from './CreateClientSection';
import CreateProductSection from './CreateProductSection';
import CreateRetentionSection from './CreateRetentionSection';

const MultiTabForm = ({ initialData = {}, clientId = null }) => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState(initialData || {});
  const [productData, setProductData] = useState([]);
  const [retentions, setRetentions] = useState([]);
  const [step, setStep] = useState('client'); // 'client' or 'productInfo'
  const [activeTab, setActiveTab] = useState('products');

  const handleClientContinue = (data) => {
    setClientData(data);
    setStep('productInfo');
    message.success('Client Info Saved');
  };

  const handleAddProduct = (product) => {
    setProductData(prev => [...prev, product]);
    message.success('Product Added');
  };

  const handleAddRetention = (ret) => {
    setRetentions(prev => [...prev, ret]);
    message.success('Retention Added');
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

  const retentionsArray = [
  {
    retentionCode: "RET001",
    clientCode: "TEST03",
    effectiveFrom: "2024-01-01",
    effectiveTo: "2025-01-01",
    retentionPercent: 12.5,
  },
  {
    retentionCode: "RET002",
    clientCode: "TEST03",
    effectiveFrom: "2025-02-01",
    effectiveTo: null,
    retentionPercent: 10.0,
  }
];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Product Info - {clientData?.clientName}</h2>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Products" key="products">
            <CreateProductSection
              productList={productData}
              onAdd={handleAddProduct}
              clientData={clientData}
              onExit={() => navigate('/dashboard')}
              onSelect={(prod) => console.log('Product selected:', prod)}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Retentions" key="retentions">
            <CreateRetentionSection
              clientData={{ clientName: 'TEST P', clientCode: 'TEST03' }}
              retentionList={retentionsArray} // Sample retentions
              onSave={(newRetentionData) => console.log(newRetentionData)}
              onBack={() => console.log("Go to previous step")}
              onCancel={() => console.log("Cancel and exit")}
            />

          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default MultiTabForm;
