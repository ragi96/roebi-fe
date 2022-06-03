import React, { useEffect } from 'react';
import Login from "./page/Login"
import Dashboard from "./page/Dashboard"
import RoomList from "./page/Room/List"
import RoomEdit from "./page/Room/Edit"
import NewRoom from './page/Room/New';
import MedicineList from "./page/Medicine/List"
import MedicineEdit from "./page/Medicine/Edit"
import NewMedicine from './page/Medicine/New';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { CheckAuthentication } from './hooks/checkAuthentication'
import { PrivateRoute } from './utils/PrivateRoute';
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
            <Route path="/room" element={<PrivateRoute roles={[1]} component={RoomList} />} />
            <Route path="/room/*" element={<PrivateRoute roles={[1]} component={RoomEdit} />} />
            <Route path="/room/new" element={<PrivateRoute roles={[1]} component={NewRoom} />} />
            <Route path="/medicine" element={<PrivateRoute roles={[1, 2]} component={MedicineList} />} />
            <Route path="/medicine/*" element={<PrivateRoute roles={[1, 2]} component={MedicineEdit} />} />
            <Route path="/medicine/new" element={<PrivateRoute roles={[1, 2]} component={NewMedicine} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
