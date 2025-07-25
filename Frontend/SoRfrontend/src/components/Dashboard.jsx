import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import styles from './Dashboard.module.css';
import logo from '../assets/logo-further-2.svg';
import * as XLSX from 'xlsx';

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
  {
    id: 2,
    clientCode: 'CL002',
    clientName: 'Beta Ltd',
    reinsurer: 'Reinsure B',
    category: 'Europe',
    clientCountry: 'Germany',
    channel: 'Offline',
    monthlyReport: false,
  },
  {
    id: 3,
    clientCode: 'CL003',
    clientName: 'Gamma Inc',
    reinsurer: 'Reinsure C',
    category: 'North America',
    clientCountry: 'USA',
    channel: 'Hybrid',
    monthlyReport: true,
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState(dummyClients);
  const navigate = useNavigate();

  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');
    XLSX.writeFile(workbook, filename);
  };

  const handleDownloadAll = () => {
    exportToExcel(clients, 'All_Clients.xlsx');
  };

  const handleDownloadCurrent = () => {
    exportToExcel(filteredClients, 'Current_Page_Clients.xlsx');
  };

  const filteredClients = clients.filter(client =>
    client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.clientCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.dashboardContainer}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <img src={logo} alt="further logo" className={styles.logo} />
        <LogoutButton />
      </nav>

      {/* HEADER */}
      <div className={styles.headerSection}>
        <h1 className={styles.dashboardTitle}>Administration Dashboard</h1>
        <button onClick={() => navigate('/create-client')} className={styles.navigateButton}>
          Create New Client
        </button>
      </div>

      {/* SEARCH BOX */}
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search by client name or code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* DOWNLOAD BUTTONS */}
      <div className={styles.downloadSection}>
        <button onClick={handleDownloadCurrent} className={styles.exportButton}>
          Download Current Page
        </button>
        <button onClick={handleDownloadAll} className={styles.exportButton}>
          Download All Records
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.dataTableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Reinsurer</th>
              <th>Region</th>
              <th>Country</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td>{client.clientCode}</td>
                <td>{client.clientName}</td>
                <td>{client.reinsurer}</td>
                <td>{client.category || '-'}</td>
                <td>{client.clientCountry}</td>
                <td>{client.channel}</td>
                <td>{client.monthlyReport ? 'Active' : 'Inactive'}</td>
                <td>
                  <button
                    className={styles.navigateButton}
                    onClick={() => navigate(`/clients/update/${client.id}`)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No clients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
