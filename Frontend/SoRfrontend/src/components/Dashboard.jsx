import React, { useState } from 'react';
import { Layout, Table, Button, Input, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import logo from '../assets/logo-further-2.svg';

const { Header, Content } = Layout;
const { Title } = Typography;

const dummyClients = [
  {
    id: 1,
    clientCode: 'CL001',
    clientName: 'Alpha Corp',
    reinsurer: 'Reinsure A',
    category: 'Asia',
    clientCountry: 'India',
    channel: 'Online',
    monthlyReport: true,
  },
  // Add more dummy data...
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredClients = dummyClients.filter(client =>
    client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.clientCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');
    XLSX.writeFile(workbook, filename);
  };

  const columns = [
    { title: 'Code', dataIndex: 'clientCode' },
    { title: 'Name', dataIndex: 'clientName' },
    { title: 'Reinsurer', dataIndex: 'reinsurer' },
    { title: 'Region', dataIndex: 'category' },
    { title: 'Country', dataIndex: 'clientCountry' },
    { title: 'Channel', dataIndex: 'channel' },
    {
      title: 'Status',
      dataIndex: 'monthlyReport',
      render: val => val ? 'Active' : 'Inactive',
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(`/clients/update/${record.id}`)}>Update</Button>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="bg-blue-100 flex justify-between items-center px-6 shadow">
        <img src={logo} alt="logo" className="h-10" />
        <Button icon={<LogoutOutlined />} onClick={() => {
          localStorage.removeItem("isAuthenticated");
          navigate('/');
        }}>
          Logout
        </Button>
      </Header>

      <Content className="p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <Title level={3}>Administration Dashboard</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/create-client')}>
            Create Client
          </Button>
        </div>

        <div className="flex justify-between flex-wrap gap-2 mb-4">
          <Input.Search
            placeholder="Search by name or code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: 400 }}
            allowClear
          />
          <Space>
            <Button icon={<DownloadOutlined />} onClick={() => exportToExcel(filteredClients, 'CurrentClients.xlsx')}>
              Download Current Page
            </Button>
            <Button icon={<DownloadOutlined />} onClick={() => exportToExcel(dummyClients, 'AllClients.xlsx')}>
              Download All
            </Button>
          </Space>
        </div>

        <Table
          dataSource={filteredClients}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Content>
    </Layout>
  );
};

export default Dashboard;
      