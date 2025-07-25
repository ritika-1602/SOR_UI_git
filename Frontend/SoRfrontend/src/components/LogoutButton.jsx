import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove authentication status from localStorage to logout the user
        localStorage.removeItem('isAuthenticated');
        
        // Replace the history state with the login page to prevent going back to the dashboard
        // when the user logs out, they won't be able to click the back button and return to the protected page
        // window.history.replaceState(null, '', '/'); --- not needed
        
        // Redirect to the login page
        // { replace: true } -- current entry in the browser history is replaced with the new location
        // navigate('/', { replace: true }); --- not needed
        navigate('/');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
