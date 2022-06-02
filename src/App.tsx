import React, { useEffect } from 'react';
import Login from "./page/Login"
import Dashboard from "./page/Dashboard"
import Room from "./page/Room"

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { CheckAuthentication } from './hooks/checkAuthentication'
import { PrivateRoute } from './utils/ProtectedRoute';
import Layout from './components/Layout';
const theme = createTheme();

function App() {
  useEffect(() => {
    CheckAuthentication();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="dashboard"
              element={<PrivateRoute roles={[1, 2, 3]} component={Dashboard} />}
            />
            <Route path="/room" element={<PrivateRoute roles={[1]} component={Room} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
