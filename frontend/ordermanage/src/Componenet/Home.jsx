import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';


function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders'); // Update base URL
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8080/orders', newOrder); // Update base URL
      setOrders([...orders, response.data]);
      setNewOrder({});
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  return (
    <>
    
    <NavBar/>
    <div className="min-h-screen bg-gradient-to-br bg-cover bg-center" style={{backgroundImage: 'url("../images/bg.jpg")'}}>
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 text-center text-yellow-400 shadow-text-shadow">Order Management</h1>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
              <h2 className="text-xl font-semibold mb-2 text-yellow-400 shadow-text-shadow">Create New Order</h2>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full lg:w-1/2 px-2 mb-2">
                  <input type="text" name="orderName" placeholder="Order Name" value={newOrder.orderName || ''} onChange={handleInputChange} className="px-2 py-1 drop-shadow-md rounded-md input" />
                </div>
                <div className="w-full lg:w-1/2 px-2 mb-2">
                  <input type="text" name="customerName" placeholder="Customer Name" value={newOrder.customerName || ''} onChange={handleInputChange} className="px-2 py-1 rounded-md input" />
                </div>
                <div className="w-full lg:w-1/2 px-2 mb-2">
                  <input type="text" name="status" placeholder="Status" value={newOrder.status || ''} onChange={handleInputChange} className="px-2 py-1 rounded-md input" />
                </div>
                <div className="w-full lg:w-1/2 px-2 mb-2">
                  <input type="text" name="tableNumber" placeholder="Table Number" value={newOrder.tableNumber || ''} onChange={handleInputChange} className="px-2 py-1 rounded-md input" />
                </div>
                <div className="w-full lg:w-1/2 px-2 mb-2">
                  <input type="text" name="price" placeholder="Price" value={newOrder.price || ''} onChange={handleInputChange} className="px-2 py-1 rounded-md input" />
                </div>
                <div className="w-full px-2 mb-2">
                  <button onClick={createOrder} className="btn drop-shadow-lg px-2 py-1 rounded-xl shadow-text-shadow btn-shadow text-white shadow-xl bg-blue-900 hover:bg-pink-600 transition duration-300 ease-in-out">Add Order</button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default OrderManagement;

