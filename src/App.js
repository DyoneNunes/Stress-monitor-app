import React from 'react';
import { AuthProvider } from './contexts/AuthProvider';
import Routes from './Routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
