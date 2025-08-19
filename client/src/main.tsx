import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './api/components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        element: <PrivateRoute />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'products', element: <Products /> },
          { path: 'orders', element: <Orders /> },
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);