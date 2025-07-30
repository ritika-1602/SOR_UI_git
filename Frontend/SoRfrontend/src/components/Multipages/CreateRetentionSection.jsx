import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, DatePicker, Typography, Space } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

const CreateRetentionSection = ({ clientData, retentionList = [], onSave, onBack, onCancel }) => {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const [retentions, setRetentions] = useState(retentionList);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      const formatted = {
        ...values,
        effectiveFrom: values.effectiveFrom.format('YYYY-MM-DD'),
        effectiveTo: values.effectiveTo ? values.effectiveTo.format('YYYY-MM-DD') : null,
        retentionPercent: parseFloat(values.retentionPercent),
      };
      onSave(formatted);
      setRetentions([...retentions, {
        ...formatted,
        retentionCode: `RET${retentions.length + 1}`.padStart(6, '0'),
        clientCode: clientData.clientCode
      }]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    editForm.setFieldsValue({
      ...record,
      effectiveFrom: dayjs(record.effectiveFrom),
      effectiveTo: record.effectiveTo ? dayjs(record.effectiveTo) : null,
    });
    setIsEditModalVisible(true);
  };

  const handleEditSave = () => {
    editForm.validateFields().then(values => {
      const updatedRetention = {
        ...editingRecord,
        ...values,
        effectiveFrom: values.effectiveFrom.format('YYYY-MM-DD'),
        effectiveTo: values.effectiveTo ? values.effectiveTo.format('YYYY-MM-DD') : null,
        retentionPercent: parseFloat(values.retentionPercent),
      };

      const updatedList = retentions.map(item =>
        item.retentionCode === editingRecord.retentionCode ? updatedRetention : item
      );

      setRetentions(updatedList);
      setIsEditModalVisible(false);
      setEditingRecord(null);
    });
  };

  const columns = [
    { title: 'Retention Code', dataIndex: 'retentionCode' },
    { title: 'Effective From', dataIndex: 'effectiveFrom' },
    { title: 'Effective To', dataIndex: 'effectiveTo' },
    { title: 'Retention %', dataIndex: 'retentionPercent' },
    {
      title: 'Action',
      render: (_, record) => (
        <Button onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={4}>Retention Info - {clientData?.clientName}</Title>
      
      <Table
        dataSource={retentions}
        columns={columns}
        rowKey="retentionCode"
        pagination={false}
        className="mb-4"
      />

      <Space>
        <Button type="primary" onClick={showModal}>
          + Add Retention
        </Button>
        <Button onClick={onBack}>Back</Button>
        <Button danger onClick={onCancel}>Cancel</Button>
      </Space>

      {/* Add Retention Modal */}
      <Modal
        title="Add Retention"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save & Exit"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Effective From" name="effectiveFrom" rules={[{ required: true }]}>
            <DatePicker format="YYYY-MM-DD" className="w-full" />
          </Form.Item>
          <Form.Item label="Effective To" name="effectiveTo">
            <DatePicker format="YYYY-MM-DD" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Retention %"
            name="retentionPercent"
            rules={[{ required: true, message: 'Enter retention percent' }]}
          >
            <InputNumber className="w-full" min={0} max={100} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Retention Modal */}
      <Modal
        title="Edit Retention"
        visible={isEditModalVisible}
        onOk={handleEditSave}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Update"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item label="Effective From" name="effectiveFrom" rules={[{ required: true }]}>
            <DatePicker format="YYYY-MM-DD" className="w-full" />
          </Form.Item>
          <Form.Item label="Effective To" name="effectiveTo">
            <DatePicker format="YYYY-MM-DD" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Retention %"
            name="retentionPercent"
            rules={[{ required: true, message: 'Enter retention percent' }]}
          >
            <InputNumber className="w-full" min={0} max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateRetentionSection;
