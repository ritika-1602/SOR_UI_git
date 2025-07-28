// components/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo-further-2.svg';
import LogoutButton from './LogoutButton';

const Layout = ({ children }) => {
  const location = useLocation();
  const showLogout = location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-blue-100 shadow px-6 py-4 flex justify-between items-center">
        <img src={logo} alt="Logo" className="h-10" />
        {showLogout && <LogoutButton />}
      </nav>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
