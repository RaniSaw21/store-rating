import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleProtectedRoute from './routes/RoleProtectedRoute';
import SidebarLayout from './layouts/SidebarLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminStores from './pages/admin/Stores';
import UserDashboard from './pages/user/Dashboard';
import UserProfile from './pages/user/Profile';
import OwnerDashboard from './pages/owner/Dashboard';
import OwnerProfile from './pages/owner/Profile';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<SidebarLayout />}>
            <Route element={<RoleProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/stores" element={<AdminStores />} />
              <Route path="/admin/profile" element={<UserProfile />} />
            </Route>

            <Route element={<RoleProtectedRoute allowedRoles={['USER']} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/stores" element={<UserDashboard />} />
              <Route path="/user/profile" element={<UserProfile />} />
            </Route>

            <Route element={<RoleProtectedRoute allowedRoles={['STORE_OWNER']} />}>
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/profile" element={<OwnerProfile />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
