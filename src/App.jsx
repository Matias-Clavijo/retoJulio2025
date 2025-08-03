import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from '@mui/material';

// Context
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Category from './pages/Category';
import Brands from './pages/Brands';
import Products from './pages/Products';
import StockMovements from './pages/StockMovements';
import Deposits from './pages/Deposits';
import Sales from './pages/Sales';
import ErrorPage404 from './components/common/errorPage';
import Proveedor from './pages/Proveedor';

export default function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#f8f9fa', margin: 0 } }} />
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          
          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/category" element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          } />
          
          <Route path="/brands" element={
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          } />
          
          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />
          
          <Route path="/movements" element={
            <ProtectedRoute>
              <StockMovements />
            </ProtectedRoute>
          } />
          
          <Route path="/warehouses" element={
            <ProtectedRoute>
              <Deposits />
            </ProtectedRoute>
          } />
          
          <Route path="/sales" element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          } />
          
          <Route path="/providers" element={
            <ProtectedRoute>
              <Proveedor />
            </ProtectedRoute>
          } />
          
          {/* Ruta 404 */}
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
