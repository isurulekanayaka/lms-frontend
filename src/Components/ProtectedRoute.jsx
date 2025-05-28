import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  // Get user info from localStorage (or context/state)
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user is logged in and role is allowed
  if (!user || !allowedRoles.includes(user.role)) {
    // If not authorized, redirect to login or any other page
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return children;
}

export default ProtectedRoute;
