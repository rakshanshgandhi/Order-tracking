import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedTable, setSelectedTable] = useState();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again later.');
    }
  };

  const handleTableSelect = (event) => {
    setSelectedTable(parseInt(event.target.value));
    
  };

  const tableNumbers = [...new Set(orders.map(order => order.tableNumber))];


  const filteredOrders = selectedTable ? orders.filter(order => order.tableNumber === selectedTable) : orders;

  console.log('Selected Table:', selectedTable);
console.log('Filtered Orders:', filteredOrders);

  return (
    <>
      <NavBar />
      <div className="p-6 min-h-screen bg-gradient-to-br bg-cover bg-center" style={{backgroundImage: 'url("../images/bg.jpg")'}}>
        <h1 className="text-6xl font-bold mb-4 text-center text-yellow-400 shadow-text-shadow">Orders</h1>

        {/* Dropdown menu for selecting table number */}
        <div className="mb-4">
          <select value={selectedTable} onChange={handleTableSelect} className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500">
            <option value="">All Tables</option>
            {/* Assume tableNumbers is an array containing all unique table numbers */}
            {tableNumbers.map(tableNumber => (
              <option key={tableNumber} value={tableNumber}>{tableNumber}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-96">
            <ul>
              {filteredOrders.map(order => (
                <li key={order.id} className="mb-4 p-4 bg-opacity-50 bg-orange-200 rounded-lg hover:bg-yellow-200 transition duration-300 ease-in-out">
                  <div className="font-semibold mb-2">Order Name: {order.orderName}</div>
                  <div>Customer Name: {order.customerName}</div>
                  <div>Status: {order.status}</div>
                  <div>Table Number: {order.tableNumber}</div>
                  <div>Price: {order.price}</div>
                  <button onClick={() => deleteOrder(order.id)} className="btn btn-shadow shadow-text-shadow drop-shadow-lg px-2 py-1 rounded-xl shadow-md text-white bg-blue-900 hover:bg-pink-600 transition duration-300 ease-in-out">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
