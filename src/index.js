import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AdminAuthProvider } from './utils/AdminAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminAuthProvider>
      <App />
    </AdminAuthProvider>
  </React.StrictMode>
);

