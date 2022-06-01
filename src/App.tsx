import React, { useEffect } from 'react';
import Login from "./page/Login"
import Dashboard from "./page/Dashboard"
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { CheckAuthentication } from './hooks/CheckAuthentication'

const theme = createTheme();

function App() {
  useEffect(() => {
    CheckAuthentication();
  }, []);

  console.log('load');
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patient" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
