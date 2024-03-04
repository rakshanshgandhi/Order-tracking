import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter, createRoutesFromElements,Route } from 'react-router-dom';
import OrdersPage from './Components/OrdersPage';
import OrderManagement from './Components/Home';

const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path='/'>
      <Route path="" exact element={<OrderManagement/>} />
        <Route path="orders" element={<OrdersPage/>} />
    </Route>
    
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);