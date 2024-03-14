import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Navbar";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/orders/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again later.");
    }
  };

  const editOrder = (order) => {
    setEditingOrder({ ...order });
  };

  const handleTableSelect = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleTableStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditingOrder((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const saveEditedOrder = async () => {
    try {
      await axios.put(
        `http://localhost:8080/orders/${editingOrder.id}`,
        editingOrder
      );
      setOrders(
        orders.map((order) =>
          order.id === editingOrder.id ? editingOrder : order
        )
      );
      setEditingOrder(null);
      alert("Order updated successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order. Please try again later.");
    }
  };

  const tableNumbers = [...new Set(orders.map((order) => order.tableNumber))];
  const tableStatus = [...new Set(orders.map((order) => order.status))];

  const filteredOrders = orders.filter((order) => {
    if (selectedTable && selectedStatus) {
      return (
        order.tableNumber === parseInt(selectedTable) &&
        order.status === selectedStatus
      );
    } else if (selectedTable) {
      return order.tableNumber === parseInt(selectedTable);
    } else if (selectedStatus) {
      return order.status === selectedStatus;
    } else {
      return true;
    }
  });

  return (
    <>
      <NavBar />
      <div
        className="p-6 min-h-screen bg-gradient-to-br bg-cover bg-center"
        style={{
          backgroundImage: 'url("../images/bg.jpg")',
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="text-6xl font-bold mb-4 text-center text-yellow-400 shadow-text-shadow">
          Orders
        </h1>
        <div className="mb-4">
          <select
            value={selectedTable}
            onChange={handleTableSelect}
            className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Tables</option>
            {tableNumbers.map((tableNumber) => (
              <option key={tableNumber} value={tableNumber}>
                {tableNumber}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={handleTableStatus}
            className="px-2 py-1 rounded-md border ml-3 border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Status</option>
            {tableStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-96">
            <ul>
              {filteredOrders.map((order) => (
                <li
                  key={order.id}
                  className="mb-4 p-4 bg-orange-200 rounded-lg hover:bg-yellow-200 transition duration-300 ease-in-out"
                >
                  <div className="font-semibold mb-2">
                    Order Name:{" "}
                    {editingOrder && editingOrder.id === order.id ? (
                      <input
                        type="text"
                        value={editingOrder.orderName}
                        onChange={(e) => handleInputChange(e, "orderName")}
                        className="px-2 py-1 border m-1 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span>{order.orderName}</span>
                    )}
                  </div>
                  <div>
                    Customer Name:{" "}
                    {editingOrder && editingOrder.id === order.id ? (
                      <input
                        type="text"
                        value={editingOrder.customerName}
                        onChange={(e) => handleInputChange(e, "customerName")}
                        className="px-2 py-1 border m-1 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span>{order.customerName}</span>
                    )}
                  </div>
                  <div>
                    Status:{" "}
                    {editingOrder && editingOrder.id === order.id ? (
                      <input
                        type="text"
                        value={editingOrder.status}
                        onChange={(e) => handleInputChange(e, "status")}
                        className="px-2 py-1 border m-1 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span>{order.status}</span>
                    )}
                  </div>
                  <div>
                    Table Number:{" "}
                    {editingOrder && editingOrder.id === order.id ? (
                      <input
                        type="text"
                        value={editingOrder.tableNumber}
                        onChange={(e) => handleInputChange(e, "tableNumber")}
                        className="px-2 py-1 border m-1 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span>{order.tableNumber}</span>
                    )}
                  </div>
                  <div>
                    Price:{" "}
                    {editingOrder && editingOrder.id === order.id ? (
                      <input
                        type="text"
                        value={editingOrder.price}
                        onChange={(e) => handleInputChange(e, "price")}
                        className="px-2 py-1 border m-1 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span>{order.price}</span>
                    )}
                  </div>

                  <div>
                    Quantity:{" "}
                    {editingOrder && editingOrder.id === order.id ? (
                      <input
                        type="text"
                        value={editingOrder.quantity}
                        onChange={(e) => handleInputChange(e, "quantity")}
                        className="px-2 py-1 border m-1 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span>{order.quantity}</span>
                    )}
                  </div>
                  {editingOrder && editingOrder.id === order.id ? (
                    <>
                      <button
                        onClick={saveEditedOrder}
                        className="btn btn-shadow shadow-text-shadow drop-shadow-lg px-2 py-1 rounded-xl shadow-md text-white bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingOrder(null)}
                        className="btn btn-shadow shadow-text-shadow drop-shadow-lg px-2 py-1 rounded-xl shadow-md text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out mt-4 mr-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => editOrder(order)}
                      className="btn btn-shadow shadow-text-shadow drop-shadow-lg px-2 py-1 rounded-xl shadow-md text-white bg-blue-900 hover:bg-green-600 transition duration-300 ease-in-out mt-2 mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="btn btn-shadow shadow-text-shadow drop-shadow-lg px-2 py-1 rounded-xl shadow-md text-white bg-blue-900 hover:bg-pink-600 transition duration-300 ease-in-out mt-2"
                  >
                    Delete
                  </button>
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
