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
    setClientData(data);
    message.success('Client data saved!');
    handleSubmit(data); // Immediate submit after first section
  };

  const handleSubmit = async (data) => {
    try {
      const url = isEditMode
        ? `http://127.0.0.1:8000/api/auth/clients/${clientId}/`
        : `http://127.0.0.1:8000/api/auth/clients/`;

      const method = isEditMode ? axios.put : axios.post;
      await method(url, data);

      message.success(isEditMode ? 'Client updated successfully!' : 'Client created successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error submitting client:', err.response?.data || err.message);
      message.error('Failed to submit client data.');
    }
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
