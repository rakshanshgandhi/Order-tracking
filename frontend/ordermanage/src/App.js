import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId)); // Update the orders state after deletion
      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-cover bg-center" style={{backgroundImage: 'url("../images/bg.jpg")'}}>
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-yellow-400 drop-shadow-2xl">Order Management</h1>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
              <h2 className="text-xl font-semibold mb-2 text-yellow-400">Create New Order</h2>
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
                  <button onClick={createOrder} className="btn drop-shadow-lg px-2 py-1 rounded-xl text-white shadow-xl bg-blue-900 hover:bg-pink-600 transition duration-300 ease-in-out">Add Order</button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-2">
              <div className=' text-right '>
              <h2 className="text-xl font-semibold mb-2 text-yellow-400">Orders</h2>
              <ul>
                {orders.map(order => (                 
                  <li key={order.id} className="mb-4 p-4 text-right bg-opacity-50 bg-orange-200 rounded-lg hover:bg-yellow-200 transition duration-300 ease-in-out">
                    <div className="font-semibold mb-2">Order Name: {order.orderName}</div>
                    <div>Customer Name: {order.customerName}</div>
                    <div>Status: {order.status}</div>
                    <div>Table Number: {order.tableNumber}</div>
                    <div>Price: {order.price}</div>
                    <button onClick={() => deleteOrder(order.id)} className="btn  drop-shadow-lg px-2 py-1 rounded-xl shadow-md text-white bg-blue-900 hover:bg-pink-600 transition duration-300 ease-in-out">Delete</button>
                  </li>
                ))}
              </ul>
              </div>   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;

