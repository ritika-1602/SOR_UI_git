import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MultiSectionForm from './components/Multipages/MultiSectionForm'
import Layout from './components/Layout';
const App = () => {
  return (
    <BrowserRouter>
      <div className=" mx-auto p-2 text-center">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                { <Dashboard />}
              </ProtectedRoute>
            }
          />
          <Route
          path="/create-client"
          element={
            <ProtectedRoute>
             {<Layout><MultiSectionForm/></Layout> }
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
