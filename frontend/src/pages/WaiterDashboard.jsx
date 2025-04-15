import React, { useEffect, useState } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function WaiterDashboard() {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [items, setItems] = useState([{ menu_id: 1, quantity: 1 }]);

  const fetchOrders = async () => {
    const res = await api.get('/orders');
    setOrders(res.data);
  };

  const handlePlaceOrder = async () => {
    await api.post('/orders/place', {
      customer_name: customerName,
      table_number: tableNumber,
      items,
    });
    setCustomerName('');
    setTableNumber('');
    fetchOrders();
    socket.emit('orderUpdate', { msg: 'new order placed' });
  };

  useEffect(() => {
    fetchOrders();
    socket.on('orderStatusChanged', fetchOrders);
    return () => socket.off('orderStatusChanged');
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Waiter Dashboard</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Place Order</h3>
        <input type="text" placeholder="Customer Name" value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="border p-2 mr-2" />
        <input type="text" placeholder="Table #" value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="border p-2 mr-2" />
        <button onClick={handlePlaceOrder}
          className="bg-green-500 text-white px-4 py-2 rounded">Place</button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Orders</h3>
        {orders.map(order => (
          <div key={order.id} className="border p-3 mb-2 rounded shadow">
            <p><strong>Order #{order.id}</strong> - {order.customer_name}</p>
            <p>Table: {order.table_number}</p>
            <p>Status: <span className="uppercase">{order.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WaiterDashboard;
