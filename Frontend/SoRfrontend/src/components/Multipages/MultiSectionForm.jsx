import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, message } from 'antd';
import axios from 'axios';

import CreateClientSection from './CreateClientSection';

const MultiTabForm = ({ isEditMode = false, isCreateMode = false, initialData = {}, clientId = null }) => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('1');
  const [clientData, setClientData] = useState(initialData || {});

  const handleClientContinue = (data) => {
  const wrappedData = { client_info: data };  // Wrap client info correctly
  setClientData(wrappedData);
  message.success('Client data saved!');
};

  const tabs = [
    {
      key: '1',
      label: 'Client Info',
      children: (
        <CreateClientSection
          initialData={clientData}
          onContinue={handleClientContinue}
          onExit={() => navigate('/dashboard')}
          onCancel={() => navigate('/dashboard')}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <Tabs activeKey={activeKey} onChange={setActiveKey} items={tabs} />
    </div>
  );
};

export default MultiTabForm;
