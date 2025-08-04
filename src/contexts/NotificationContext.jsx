import React, { useState, createContext } from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info', // 'error', 'warning', 'info', 'success'
    title: ''
  });

  const showNotification = (message, severity = 'info', title = '') => {
    setNotification({
      open: true,
      message,
      severity,
      title
    });
  };

  const showError = (message, title = 'Error') => {
    showNotification(message, 'error', title);
  };

  const showSuccess = (message, title = 'Éxito') => {
    showNotification(message, 'success', title);
  };

  const showWarning = (message, title = 'Advertencia') => {
    showNotification(message, 'warning', title);
  };

  const showInfo = (message, title = 'Información') => {
    showNotification(message, 'info', title);
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  const value = {
    showNotification,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    hideNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={hideNotification}
        anchorOrigin={{ 
          vertical: 'top', 
          horizontal: 'right' 
        }}
        sx={{ 
          mt: 8, // Margen superior para no tapar la navbar
          mr: 2  // Margen derecho
        }}
      >
        <Alert 
          onClose={hideNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{
            minWidth: '300px',
            boxShadow: 3,
            '& .MuiAlert-message': {
              width: '100%'
            }
          }}
        >
          {notification.title && (
            <AlertTitle sx={{ fontWeight: 'bold', mb: 1 }}>
              {notification.title}
            </AlertTitle>
          )}
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}; 