import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, DatePicker, Checkbox, Button, Row, Col } from 'antd';

const { Option } = Select;

const CreateClientSection = ({ initialData, onContinue, onExit, onCancel }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form]);

  const handleFinish = (values) => {
    onContinue(values); // Pass form data to parent
  };

  const handleSaveExit = () => {
    const data = form.getFieldsValue();
    onExit(data); // Pass current form data to exit handler
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white px-8 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Client</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          monthlyReport: false,
        }}
      >
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item name="clientCode" label="Client Code" rules={[{ required: true }]}>
              <Input placeholder="Enter client code" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="clientName" label="Client Name" rules={[{ required: true }]}>
              <Input placeholder="Enter client name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="clientCountry" label="Client Country" rules={[{ required: true }]}>
              <Select placeholder="Select country">
                <Option value="IN">India</Option>
                <Option value="US">USA</Option>
                <Option value="UK">UK</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="launchDate" label="Launch Date" rules={[{ required: true }]}>
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="reinsurer" label="Reinsurer" rules={[{ required: true }]}>
              <Select placeholder="Select reinsurer">
                <Option value="sirius">Sirius Re</Option>
                <Option value="arch">Arch</Option>
                <Option value="axis">Axis</Option>
                <Option value="norisk">No Risk</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="category" label="Category">
              <Select placeholder="Select category">
                <Option value="cat1">Cat1</Option>
                <Option value="cat2">Cat2</Option>
                <Option value="cat3">Cat3</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="channel" label="Channel" rules={[{ required: true }]}>
              <Select placeholder="Select channel">
                <Option value="wholesale">Wholesale</Option>
                <Option value="retail">Retail</Option>
                <Option value="employment_benefits">Employment Benefits</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="freqBordereau" label="Frequency Bordereau" rules={[{ required: true }]}>
              <Select placeholder="Select frequency">
                <Option value="monthly">Monthly</Option>
                <Option value="quarterly">Quarterly</Option>
                <Option value="semiannual">Semiannual</Option>
                <Option value="annual">Annual</Option>
                <Option value="daily">Daily</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="freqReport" label="Frequency Report" rules={[{ required: true }]}>
              <Select placeholder="Select frequency">
                <Option value="monthly">Monthly</Option>
                <Option value="quarterly">Quarterly</Option>
                <Option value="semiannual">Semiannual</Option>
                <Option value="annual">Annual</Option>
                <Option value="daily">Daily</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="accountingPrinciple" label="Accounting Principle" rules={[{ required: true }]}>
              <Select placeholder="Select principle">
                <Option value="charged">Premium Charged</Option>
                <Option value="earned">Premium Earned</Option>
                <Option value="accumulated">Premium Accumulated</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="primaryCurrency" label="Primary Currency" rules={[{ required: true }]}>
              <Select placeholder="Select currency">
                <Option value="eur">EUR</Option>
                <Option value="usd">USD</Option>
                <Option value="rub">RUB</Option>
                <Option value="ron">RON</Option>
                <Option value="gbp">GBP</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="secondaryCurrency" label="Secondary Currency">
              <Select placeholder="Select currency">
                <Option value="eur">EUR</Option>
                <Option value="usd">USD</Option>
                <Option value="rub">RUB</Option>
                <Option value="ron">RON</Option>
                <Option value="gbp">GBP</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="taxProduct" label="Tax Product">
              <Select placeholder="Select tax product">
                <Option value="services_vat">SERVICES VAT</Option>
                <Option value="other_services">OTHER SERVICES</Option>
                <Option value="no_vat_services">NO VAT SERVICES</Option>
                <Option value="serv_eb_no_iva_ext">SERV EB NO IVA EXT</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="monthlyReport" valuePropName="checked">
              <Checkbox>Monthly Report</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <div className="flex gap-4 mt-6">
          <Button type="primary" htmlType="submit">Save & Continue</Button>
          <Button type="default" onClick={handleSaveExit}>Save & Exit</Button>
          <Button danger onClick={handleCancel}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateClientSection;
