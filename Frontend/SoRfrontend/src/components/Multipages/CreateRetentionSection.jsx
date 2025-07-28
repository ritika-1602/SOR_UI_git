import React, { useState } from "react";
import { Button, Input, Modal, Table, Typography, DatePicker } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

const CreateRetentionSection = ({ clientData, onContinue, onCancel, onExit }) => {
  const [retentionsArray, setRetentionsArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [newRetentionData, setNewRetentionData] = useState({
    effectiveFrom: null,
    effectiveTo: null,
    retention: ""
  });

  const handleAddRetention = () => {
    if (!newRetentionData.effectiveFrom || !newRetentionData.retention) return;

    const newEntry = {
      id: Date.now(),
      codeRetention: `RET-${retentionsArray.length + 1}`,
      clientCode: clientData?.clientCode || "N/A",
      clientName: clientData?.clientName || "N/A",
      effectiveFrom: newRetentionData.effectiveFrom,
      effectiveTo: newRetentionData.effectiveTo,
      retention: newRetentionData.retention
    };

    setRetentionsArray([...retentionsArray, newEntry]);
    setNewRetentionData({ effectiveFrom: null, effectiveTo: null, retention: "" });
    setModalVisible(false);
  };

  const columns = [
    { title: "Code Retention", dataIndex: "codeRetention", key: "codeRetention" },
    { title: "Client Code", dataIndex: "clientCode", key: "clientCode" },
    { title: "Client Name", dataIndex: "clientName", key: "clientName" },
    { title: "Effective Date", dataIndex: "effectiveFrom", key: "effectiveFrom", render: (text) => text ? dayjs(text).format("YYYY-MM-DD") : "-" },
    { title: "Effective To", dataIndex: "effectiveTo", key: "effectiveTo", render: (text) => text ? dayjs(text).format("YYYY-MM-DD") : "-" },
    { title: "Retention (%)", dataIndex: "retention", key: "retention" },
  ];

  return (
    <div className="p-6 bg-white shadow rounded">
      <Title level={4} className="text-center mb-4">Create Retention</Title>
      
      <div className="mb-4">
        <p><strong>Client:</strong> {clientData?.clientName || "N/A"}</p>
        <p><strong>Client Code:</strong> {clientData?.clientCode || "N/A"}</p>
      </div>

      <Button type="primary" onClick={() => setModalVisible(true)}>Update Rates</Button>

      <Table
        dataSource={retentionsArray}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="mt-4"
      />

      <div className="mt-6 flex justify-center gap-4">
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onExit}>Save & Exit</Button>
        <Button type="primary" onClick={onContinue}>Next</Button>
      </div>

      <Modal
        title="Add Retention Rate"
        open={modalVisible}
        onOk={handleAddRetention}
        onCancel={() => setModalVisible(false)}
        okText="Add"
      >
        <div className="flex flex-col gap-4">
          <div>
            <label>Effective Date*</label>
            <DatePicker
              className="w-full"
              value={newRetentionData.effectiveFrom}
              onChange={(date) => setNewRetentionData({ ...newRetentionData, effectiveFrom: date })}
            />
          </div>
          <div>
            <label>Effective To</label>
            <DatePicker
              className="w-full"
              value={newRetentionData.effectiveTo}
              onChange={(date) => setNewRetentionData({ ...newRetentionData, effectiveTo: date })}
            />
          </div>
          <div>
            <label>Retention (%)*</label>
            <Input
              type="number"
              value={newRetentionData.retention}
              onChange={(e) => setNewRetentionData({ ...newRetentionData, retention: e.target.value })}
              placeholder="Retention Percentage"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateRetentionSection;
