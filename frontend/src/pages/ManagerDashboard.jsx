import React, { useEffect, useState } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function ManagerDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get('/orders');
    setOrders(res.data);
  };

  const markAsServed = async (orderId) => {
    await api.put('/orders/status', { order_id: orderId, status: 'served' });
    fetchOrders();
    socket.emit('orderStatusChanged', { orderId, status: 'served' });
  };

  useEffect(() => {
    fetchOrders();
    socket.on('orderStatusChanged', fetchOrders);
    socket.on('orderUpdate', fetchOrders);
    return () => {
      socket.off('orderStatusChanged');
      socket.off('orderUpdate');
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manager Dashboard</h2>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded shadow bg-white">
          <p><strong>Order #{order.id}</strong> — {order.customer_name}</p>
          <p>Table: {order.table_number}</p>
          <p>Status: <span className="uppercase font-medium">{order.status}</span></p>

          <div className="mt-2">
            {order.status === 'completed' && (
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => markAsServed(order.id)}
              >
                Mark as Served
              </button>
            )}
            {order.status === 'served' && (
              <p className="text-green-600 font-semibold">✅ Served</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManagerDashboard;
