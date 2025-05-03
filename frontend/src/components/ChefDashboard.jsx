import React from "react";

export function ChefDashboard() {
  const orders = [
    { id: 1, table: 'A1', items: ['Burger', 'Fries'], status: 'in-progress' },
    { id: 2, table: 'B2', items: ['Pizza'], status: 'pending' },
    { id: 3, table: 'C3', items: ['Salad'], status: 'pending' },
  ];

  const currentOrder = orders.find(order => order.status === 'in-progress');
  const nextOrder = orders.find(order => order.status === 'pending');

  return (
    <div className="flex justify-center items-start min-h-screen p-6"  style={{ backgroundColor: '#4a659a' }}>
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Chef Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-6">

          <div className="flex-1  p-6 rounded-lg shadow  hover:shadow-2xl"  style={{ backgroundColor: '#bda893' }}>
            <h2 className="text-xl font-semibold text-green-600 mb-2">🍽️ Current Order</h2>
            {currentOrder ? (
              <div>
                <p><strong>Table:</strong> {currentOrder.table}</p>
                <p><strong>Items:</strong> {currentOrder.items.join(', ')}</p>
              </div>
            ) : (
              <p>No current order in progress.</p>
            )}
          </div>

          <div className="flex-1 p-6 rounded-lg shadow hover:shadow-2xl" style={{ backgroundColor: '#bda893' }}>
            <h2 className="text-xl font-semibold text-yellow-600 mb-2">🔜 Next Order</h2>
            {nextOrder ? (
              <div>
                <p><strong>Table:</strong> {nextOrder.table}</p>
                <p><strong>Items:</strong> {nextOrder.items.join(', ')}</p>
              </div>
            ) : (
              <p>No upcoming orders.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
