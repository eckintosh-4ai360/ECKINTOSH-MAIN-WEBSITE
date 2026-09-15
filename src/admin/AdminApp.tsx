import React, { useEffect, useState } from 'react';
import { subscribeAdminAuth } from '../lib/adminAuth';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export const AdminApp: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((isLoggedIn) => {
      setLoggedIn(isLoggedIn);
      setChecking(false);
    });
    return unsubscribe;
  }, []);

  if (checking) {
    return <div className="min-h-screen bg-[#08111F]" />;
  }

  return loggedIn ? <AdminDashboard /> : <AdminLogin />;
};

export default AdminApp;
