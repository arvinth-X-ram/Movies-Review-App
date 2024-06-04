import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import MovieList from './Movies';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // Replace with your authentication state check

  if (!isLoggedIn) {
    return <Navigate to="/MovieList" replace />; // Redirect to login if not logged in
  }

  return children; // Render the protected content if logged in
};

export default PrivateRoute;