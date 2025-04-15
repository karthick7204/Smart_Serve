import React, { useEffect, useState } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function ChefDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get('/orders');
    setOrders(res.data);
  };

  const updateOrderStatus = async (orderId, status) => {
    await api.put('/orders/status', { order_id: orderId, status });
    fetchOrders();
    socket.emit('orderStatusChanged', { orderId, status });
  };

  useEffect(() => {
    fetchOrders();
    socket.on('orderUpdate', fetchOrders);
    return () => socket.off('orderUpdate');
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Chef Dashboard</h2>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded shadow bg-white">
          <p><strong>Order #{order.id}</strong> — {order.customer_name}</p>
          <p>Table: {order.table_number}</p>
          <p>Status: <span className="uppercase">{order.status}</span></p>

          <div className="mt-2 flex gap-2">
            {order.status === 'placed' && (
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => updateOrderStatus(order.id, 'cooking')}
              >
                Start Cooking
              </button>
            )}
            {order.status === 'cooking' && (
              <button
                className="bg-orange-500 text-white px-3 py-1 rounded"
                onClick={() => updateOrderStatus(order.id, 'half_done')}
              >
                Half Done
              </button>
            )}
            {order.status === 'half_done' && (
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => updateOrderStatus(order.id, 'completed')}
              >
                Completed
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChefDashboard;
