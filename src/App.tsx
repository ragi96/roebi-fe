import React, { useEffect } from 'react';
import Login from "./page/Login"
import Dashboard from "./page/Dashboard"

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { CheckAuthentication } from './hooks/checkAuthentication'
import { PrivateRoute } from './utils/ProtectedRoute';
const theme = createTheme();

function App() {
  useEffect(() => {
    CheckAuthentication();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="dashboard"
            element={<PrivateRoute roles={[1, 2, 3]} component={Dashboard} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patient" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
