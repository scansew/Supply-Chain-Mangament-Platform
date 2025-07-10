import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from 'notistack';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FileProvider } from './contexts/FileContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import AllWorkOrders from './pages/AllWorkOrders';
import Users from './pages/Users';
import Login from './pages/Login';
import client from './lib/apollo';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If no specific roles required, allow access
  if (allowedRoles.length === 0) {
    return children;
  }
  
  // Check if user has required role
  if (allowedRoles.includes(currentUser.role)) {
    return children;
  }
  
  // User doesn't have required role, redirect to home
  return <Navigate to="/" replace />;
};

// App Content Component
const AppContent = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" replace />} />
      
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/work-orders"
        element={
          <ProtectedRoute allowedRoles={['emp', 'cAdmin', 'sAdmin']}>
            <MainLayout>
              <AllWorkOrders />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/companies"
        element={
          <ProtectedRoute allowedRoles={['sAdmin']}>
            <MainLayout>
              <Companies />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={['cAdmin', 'sAdmin']}>
            <MainLayout>
              <Users />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <FileProvider>
            <Router>
              <AppContent />
            </Router>
          </FileProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ApolloProvider>
  );
};

export default App;
