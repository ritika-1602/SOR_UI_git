import React, { useState } from 'react';
import { Table, Button, Input, Row, Col, message } from 'antd';

const initialDiscountRow = (productType) => ({
  productType,
  numberFrom: '',
  numberTo: '',
  discount: '',
});

const CreateDiscountSection = ({ discounts = [], onSaveExit, selectedProductType }) => {
  const [dataSource, setDataSource] = useState(
    discounts.length > 0 ? discounts : [initialDiscountRow(selectedProductType)]
  );

  const handleAddRow = () => {
    setDataSource([...dataSource, initialDiscountRow(selectedProductType)]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...dataSource];
    updated.splice(index, 1);
    setDataSource(updated);
  };

  const handleChange = (index, key, value) => {
    const updated = [...dataSource];
    updated[index][key] = value;
    setDataSource(updated);
  };

  const handleSaveExit = () => {
    // Validate discount fields
    const isValid = dataSource.every(row => row.discount.trim() !== '');

    if (!isValid) {
      message.error('Please fill all Discount (%) fields.');
      return;
    }

    onSaveExit(dataSource);
  };

  const columns = [
    {
      title: 'Product Type',
      dataIndex: 'productType',
      render: (_, __, index) => (
        <Input
          value={selectedProductType}
          disabled
        />
      ),
    },
    {
      title: 'Number From',
      dataIndex: 'numberFrom',
      render: (_, __, index) => (
        <Input
          value={dataSource[index].numberFrom}
          onChange={(e) => handleChange(index, 'numberFrom', e.target.value)}
        />
      ),
    },
    {
      title: 'Number To',
      dataIndex: 'numberTo',
      render: (_, __, index) => (
        <Input
          value={dataSource[index].numberTo}
          onChange={(e) => handleChange(index, 'numberTo', e.target.value)}
        />
      ),
    },
    {
      title: <span>Discount (%) <span style={{ color: 'red' }}>*</span></span>,
      dataIndex: 'discount',
      render: (_, __, index) => (
        <Input
          value={dataSource[index].discount}
          onChange={(e) => handleChange(index, 'discount', e.target.value)}
          status={!dataSource[index].discount ? 'error' : ''}
        />
      ),
    },
    {
      title: 'Action',
      render: (_, __, index) => (
        <Button danger onClick={() => handleRemoveRow(index)}>Remove</Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Discounts</h2>
      <Table
        dataSource={dataSource.map((item, index) => ({ ...item, key: index }))}
        columns={columns}
        pagination={false}
      />
      <Row gutter={16} className="mt-4">
        <Col>
          <Button type="primary" onClick={handleAddRow}>Add Row</Button>
        </Col>
        <Col>
          <Button danger onClick={handleSaveExit}>Save & Exit</Button>
        </Col>
      </Row>
    </div>
  );
};

export default CreateDiscountSection;
