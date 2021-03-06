import React, { useEffect } from 'react';
import Login from "./page/Login"
import Dashboard from "./page/Dashboard"
import RoomList from "./page/Room/List"
import RoomEdit from "./page/Room/Edit"
import LogList from "./page/Log/List"
import NewRoom from './page/Room/New';
import MedicineList from "./page/Medicine/List"
import MedicineEdit from "./page/Medicine/Edit"
import NewMedicine from './page/Medicine/New';
import PatientList from "./page/Patient/List"
import PatientEdit from "./page/Patient/Edit"
import NewPatient from './page/Patient/New';
import MedicationList from "./page/Medication/List"
import MedicationEdit from "./page/Medication/Edit"
import NewMedication from './page/Medication/New';
import UserList from "./page/User/List"
import UserEdit from "./page/User/Edit"
import NewUser from './page/User/New';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { CheckAuthentication } from './hooks/checkAuthentication'
import { PrivateRoute } from './utils/PrivateRoute';
import Layout from './components/Layout';
import MyAccount from './page/Account/MyAccount';

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
            <Route path="/account" element={<PrivateRoute roles={[1, 2, 3]} component={MyAccount} />} />
            <Route path="/room" element={<PrivateRoute roles={[1]} component={RoomList} />} />
            <Route path="/room/*" element={<PrivateRoute roles={[1]} component={RoomEdit} />} />
            <Route path="/room/new" element={<PrivateRoute roles={[1]} component={NewRoom} />} />
            <Route path="/medicine" element={<PrivateRoute roles={[1, 2]} component={MedicineList} />} />
            <Route path="/medicine/*" element={<PrivateRoute roles={[1, 2]} component={MedicineEdit} />} />
            <Route path="/medicine/new" element={<PrivateRoute roles={[1, 2]} component={NewMedicine} />} />
            <Route path="/user" element={<PrivateRoute roles={[1]} component={UserList} />} />
            <Route path="/user/*" element={<PrivateRoute roles={[1]} component={UserEdit} />} />
            <Route path="/user/new" element={<PrivateRoute roles={[1]} component={NewUser} />} />
            <Route path="/patient" element={<PrivateRoute roles={[1, 2]} component={PatientList} />} />
            <Route path="/patient/*" element={<PrivateRoute roles={[1, 2]} component={PatientEdit} />} />
            <Route path="/patient/new" element={<PrivateRoute roles={[1, 2]} component={NewPatient} />} />
            <Route path="/medication" element={<PrivateRoute roles={[1, 2]} component={MedicationList} />} />
            <Route path="/medication/*" element={<PrivateRoute roles={[1, 2]} component={MedicationEdit} />} />
            <Route path="/medication/new" element={<PrivateRoute roles={[1, 2]} component={NewMedication} />} />
            <Route path="/logs" element={<PrivateRoute roles={[1]} component={LogList} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
