import React, { useState } from "react";

export function AddItems({ itemsList, setItemsList }) {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: ""
  });

  const handleAdd = () => {
    if (!newItem.name || !newItem.price) return;
    setItemsList([...itemsList, { ...newItem, price: parseFloat(newItem.price) }]);
    setNewItem({ name: "", description: "", price: "" });
  };

  return (
    <div className="flex justify-center mt-40 h-auto ">
    <div className="p-4 border rounded-lg bg-gray-200 w-96">
      <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
      <div className="flex flex-col gap-2 w-80">
        <input
          type="text"
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>
    </div>
  </div>
  );
}
