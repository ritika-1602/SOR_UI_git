import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Typography,
  DatePicker,
  Select,
  message,
} from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const CreatePremiumSection = ({ premiums = [], onSave, onBack, onCancel }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currency, setCurrency] = useState('INR');

  const initialRow = {
    effectiveFrom: null,
    effectiveTo: null,
    ageFrom: '',
    ageTo: '',
    reinsPrem: '',
    riskPrem: '',
    furtherFees: '',
    comment: '',
    grossPrem: '',
    taxes: '',
    frontingFee: '',
    brokerage: '',
    tiedAgentFees: '',
    serviceFees: '',
  };

  const [formRows, setFormRows] = useState([initialRow]);

  const columns = [
    { title: 'Effective From', dataIndex: 'effectiveFrom', key: 'effectiveFrom' },
    { title: 'Effective To', dataIndex: 'effectiveTo', key: 'effectiveTo' },
    { title: 'Age From', dataIndex: 'ageFrom', key: 'ageFrom' },
    { title: 'Age To', dataIndex: 'ageTo', key: 'ageTo' },
    { title: 'Reinsurance Prem', dataIndex: 'reinsPrem', key: 'reinsPrem' },
    { title: 'Risk Prem', dataIndex: 'riskPrem', key: 'riskPrem' },
    { title: 'Further Fees', dataIndex: 'furtherFees', key: 'furtherFees' },
    { title: 'Comment', dataIndex: 'comment', key: 'comment' },
    { title: 'Gross Prem', dataIndex: 'grossPrem', key: 'grossPrem' },
    { title: 'Taxes', dataIndex: 'taxes', key: 'taxes' },
    { title: 'Fronting Fee', dataIndex: 'frontingFee', key: 'frontingFee' },
    { title: 'Brokerage', dataIndex: 'brokerage', key: 'brokerage' },
    { title: 'Tied Agent Fees', dataIndex: 'tiedAgentFees', key: 'tiedAgentFees' },
    { title: 'Service Fees', dataIndex: 'serviceFees', key: 'serviceFees' },
  ];

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleAddRow = () => {
    setFormRows([...formRows, { ...initialRow }]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...formRows];
    updated.splice(index, 1);
    setFormRows(updated);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...formRows];
    updated[index][field] = value;
    setFormRows(updated);
  };

  const handleDateChange = (index, field, date) => {
    const updated = [...formRows];
    updated[index][field] = date;
    setFormRows(updated);
  };

  const validateDates = () => {
    for (let row of formRows) {
      if (row.effectiveFrom && row.effectiveTo) {
        const from = dayjs(row.effectiveFrom);
        const to = dayjs(row.effectiveTo);
        if (from.isAfter(to)) {
          message.error('Effective To must be after Effective From');
          return false;
        }
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validateDates()) return;

    const finalData = formRows.map((row) => ({
      ...row,
      effectiveFrom: row.effectiveFrom ? row.effectiveFrom.format('YYYY-MM-DD') : '',
      effectiveTo: row.effectiveTo ? row.effectiveTo.format('YYYY-MM-DD') : '',
    }));

    onSave(finalData);
    setIsModalVisible(false);
  };

  return (
    <div className="p-6">
      <Title level={4} className="text-center">Premiums</Title>

      <div className="flex justify-between items-center mb-4">
        <Button type="primary" onClick={showModal}>
          Update Rates
        </Button>
        <Select
          value={currency}
          onChange={setCurrency}
          style={{ width: 150 }}
          size="middle"
        >
          {['INR', 'USD', 'EUR', 'GBP', 'JPY', 'CNY'].map((cur) => (
            <Option value={cur} key={cur}>{cur}</Option>
          ))}
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={premiums.map((row, idx) => ({
          ...row,
          effectiveFrom: row.effectiveFrom || '',
          effectiveTo: row.effectiveTo || '',
          key: idx,
        }))}
        scroll={{ x: 2000 }}
        pagination={false}
      />

      <div className="mt-6 flex justify-start space-x-4">
        <Button onClick={onBack}>Back</Button>
        <Button danger onClick={onCancel}>Cancel</Button>
      </div>

      <Modal
        title="Create New Premium"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Save & Continue"
        width={1200}
        className="premium-modal"
      >
        <Form layout="vertical">
          {formRows.map((row, index) => (
            <div key={index} className="border p-4 mb-4 rounded bg-gray-50">
              <div className="grid grid-cols-5 gap-4">
                <Form.Item label="Effective From">
                  <DatePicker
                    value={row.effectiveFrom}
                    onChange={(date) => handleDateChange(index, 'effectiveFrom', date)}
                    format="YYYY-MM-DD"
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item label="Effective To">
                  <DatePicker
                    value={row.effectiveTo}
                    onChange={(date) => handleDateChange(index, 'effectiveTo', date)}
                    format="YYYY-MM-DD"
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item label="Age From">
                  <Input
                    value={row.ageFrom}
                    onChange={(e) => handleInputChange(index, 'ageFrom', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Age To">
                  <Input
                    value={row.ageTo}
                    onChange={(e) => handleInputChange(index, 'ageTo', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Reinsurance Prem">
                  <Input
                    value={row.reinsPrem}
                    onChange={(e) => handleInputChange(index, 'reinsPrem', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Risk Prem">
                  <Input
                    value={row.riskPrem}
                    onChange={(e) => handleInputChange(index, 'riskPrem', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Further Fees">
                  <Input
                    value={row.furtherFees}
                    onChange={(e) => handleInputChange(index, 'furtherFees', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Comment">
                  <Input
                    value={row.comment}
                    onChange={(e) => handleInputChange(index, 'comment', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Gross Prem">
                  <Input
                    value={row.grossPrem}
                    onChange={(e) => handleInputChange(index, 'grossPrem', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Taxes">
                  <Input
                    value={row.taxes}
                    onChange={(e) => handleInputChange(index, 'taxes', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Fronting Fee">
                  <Input
                    value={row.frontingFee}
                    onChange={(e) => handleInputChange(index, 'frontingFee', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Brokerage">
                  <Input
                    value={row.brokerage}
                    onChange={(e) => handleInputChange(index, 'brokerage', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Tied Agent Fees">
                  <Input
                    value={row.tiedAgentFees}
                    onChange={(e) => handleInputChange(index, 'tiedAgentFees', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Service Fees">
                  <Input
                    value={row.serviceFees}
                    onChange={(e) => handleInputChange(index, 'serviceFees', e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="text-right mt-2">
                <Button danger onClick={() => handleRemoveRow(index)}>
                  Remove Row
                </Button>
              </div>
            </div>
          ))}
          <Button type="dashed" onClick={handleAddRow} className="mt-2">
            Add Row
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePremiumSection;
