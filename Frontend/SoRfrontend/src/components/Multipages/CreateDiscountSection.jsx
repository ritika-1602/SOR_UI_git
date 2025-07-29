import React, { useState } from 'react';
import { Table, Button, Input, Row, Col } from 'antd';

const initialDiscountRow = {
  productType: '',
  numberFrom: '',
  numberTo: '',
  discount: '',
};

const CreateDiscountSection = ({ discounts = [], onSaveExit }) => {
  const [dataSource, setDataSource] = useState(discounts);

  const handleAddRow = () => {
    setDataSource([...dataSource, { ...initialDiscountRow }]);
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

  const columns = [
    {
      title: 'Product Type',
      dataIndex: 'productType',
      render: (_, __, index) => (
        <Input
          value={dataSource[index].productType}
          onChange={(e) => handleChange(index, 'productType', e.target.value)}
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
      title: 'Discount (%)',
      dataIndex: 'discount',
      render: (_, __, index) => (
        <Input
          value={dataSource[index].discount}
          onChange={(e) => handleChange(index, 'discount', e.target.value)}
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
          <Button danger onClick={onSaveExit}>Save & Exit</Button>
        </Col>
      </Row>
    </div>
  );
};

export default CreateDiscountSection;
