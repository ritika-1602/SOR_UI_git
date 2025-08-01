import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Select, Typography, message } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

const CreateProductSection = ({
  productList = [],
  onAdd,
  onSelect,
  onExit,
  clientData
}) => {
  const [formData, setFormData] = useState({
    productName: '',
    productCatalogueId: '',
    comments: '',
    productType: 'Standard',
    house: 'Yes'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = async () => {
    const { productName, productCatalogueId, productType, house, comments } = formData;
    const clientId = clientData?.id;

    if (!productName.trim()) {
      Modal.warning({ title: 'Validation Error', content: 'Product Name is required.' });
      return;
    }

    if (!productCatalogueId.trim()) {
      Modal.warning({ title: 'Validation Error', content: 'Product Catalogue ID is required.' });
      return;
    }

    if (!productType) {
      Modal.warning({ title: 'Validation Error', content: 'Product Type is required.' });
      return;
    }

    if (productType === 'Standard' && !['Yes', 'No'].includes(house)) {
      Modal.warning({ title: 'Validation Error', content: 'House must be Yes or No.' });
      return;
    }

    if (!clientId) {
      Modal.error({ title: 'Missing Client', content: 'Client ID is missing.' });
      return;
    }

    const newProducts = [];

    if (productType === 'Standard') {
      newProducts.push({
        productName: 'Standard ' + productName,
        productCatalogueId,
        productType: 'Standard',
        comments,
        house
      });

      if (house === 'Yes') {
        newProducts.push({
          productName: 'House ' + productName,
          productCatalogueId,
          productType: 'House',
          comments,
          house
        });
      }
    } else if (productType === 'Group') {
      newProducts.push({
        productName,
        productCatalogueId,
        productType: 'Group',
        comments,
        house: ''
      });
    }

    try {
      const responses = await Promise.all(
        newProducts.map(p =>
          axios.post('http://127.0.0.1:8000/api/auth/product-info/', {
            ...p,
            client: clientId,
          })
        )
      );

      const createdProducts = responses.map(res => res.data);
      createdProducts.forEach(onAdd);
      message.success(`${createdProducts.length} product(s) added.`);

      // Reset form and close modal
      setFormData({
        productName: '',
        productCatalogueId: '',
        comments: '',
        productType: 'Standard',
        house: 'Yes'
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating product(s):', error);
      Modal.error({
        title: 'API Error',
        content: 'Failed to create product(s). Please check backend.',
      });
    }
  };

  const columns = [
    { title: 'Product ID', dataIndex: 'productID' },
    { title: 'Opportunity', dataIndex: 'productCatalogueId' },
    { title: 'Plan Name', dataIndex: 'productName' },
    { title: 'Client Code', render: () => clientData?.clientCode || 'N/A' },
    { title: 'Comments', dataIndex: 'comments' },
    { title: 'Product Type', dataIndex: 'productType' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <Title level={3}>Products Info</Title>
        <div className="text-right">
          <Text strong>Client: {clientData?.clientName || 'N/A'} </Text>
        </div>
      </div>

      <div className="bg-white shadow rounded-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <Title level={5}>Product List</Title>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>+ New Product</Button>
        </div>

        <Table
          columns={columns}
          dataSource={Array.isArray(productList) ? productList : []}
          rowKey="productID"
          onRow={(record) => ({
            onClick: () => onSelect && onSelect(record),
          })}
          pagination={false}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button onClick={onExit}>Exit</Button>
      </div>

      <Modal
        title="Create New Product"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddProduct}
        okText="Add Product"
      >
        <div className="space-y-4">
          <div>
            <label>Product Name <span style={{ color: 'red' }}>*</span></label>
            <Input
              value={formData.productName}
              onChange={(e) => handleChange('productName', e.target.value)}
            />
          </div>

          <div>
            <label>Product Catalogue ID <span style={{ color: 'red' }}>*</span></label>
            <Input
              value={formData.productCatalogueId}
              onChange={(e) => handleChange('productCatalogueId', e.target.value)}
            />
          </div>

          <div>
            <label>Comments</label>
            <Input
              value={formData.comments}
              onChange={(e) => handleChange('comments', e.target.value)}
            />
          </div>

          <div>
            <label>Product Type <span style={{ color: 'red' }}>*</span></label>
            <Select
              value={formData.productType}
              onChange={(value) => handleChange('productType', value)}
              className="w-full"
            >
              <Option value="Standard">Standard</Option>
              <Option value="Group">Group</Option>
            </Select>
          </div>

          {formData.productType === 'Standard' && (
            <div>
              <label>House <span style={{ color: 'red' }}>*</span></label>
              <Select
                value={formData.house}
                onChange={(value) => handleChange('house', value)}
                className="w-full"
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CreateProductSection;
