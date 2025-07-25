import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
        // If not authenticated, redirect to login page
        return <Navigate to="/" replace />;
    }

    // If authenticated, allow access to the child components (Dashboard)
    return children;
};

export default ProtectedRoute;
