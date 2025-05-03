import React, { useState, useEffect } from "react";

export function BillsCheck({ bills, setBills }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBillIndex, setEditingBillIndex] = useState(null);
  const [editedBill, setEditedBill] = useState(null);
  const [visibleBills, setVisibleBills] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: 0, quantity: 1, note: "" });

  const addItemToBill = () => {
    if (!newItem.name || newItem.price <= 0 || newItem.quantity <= 0) return;
    const updatedItems = [...editedBill.items, { ...newItem }];
    setEditedBill({ ...editedBill, items: updatedItems });
    setNewItem({ name: "", price: 0, quantity: 1, note: "" }); // reset
  };

  useEffect(() => {
    setVisibleBills((prev) => {
      const updated = [...prev];
      while (updated.length < bills.length) updated.push(true);
      return updated.slice(0, bills.length);
    });
  }, [bills]);

  const openEditModal = (index) => {
    setEditingBillIndex(index);
    setEditedBill({ ...bills[index], items: [...bills[index].items] });
    setIsEditing(true);
  };

  const updateItemQuantity = (itemIndex, newQuantity) => {
    const updatedItems = [...editedBill.items];
    updatedItems[itemIndex].quantity = newQuantity;
    setEditedBill({ ...editedBill, items: updatedItems });
  };

  const updateItemNote = (itemIndex, note) => {
    const updatedItems = [...editedBill.items];
    updatedItems[itemIndex].note = note;
    setEditedBill({ ...editedBill, items: updatedItems });
  };

  const removeItem = (itemIndex) => {
    const updatedItems = editedBill.items.filter((_, i) => i !== itemIndex);
    setEditedBill({ ...editedBill, items: updatedItems });
  };

  const saveChanges = () => {
    const updatedBills = [...bills];
    const cleanedItems = editedBill.items.filter((item) => item.quantity > 0);
    const total = cleanedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (cleanedItems.length > 0) {
      updatedBills[editingBillIndex] = { ...editedBill, items: cleanedItems, total };
      setBills(updatedBills);
    } else {
      removeBill(editingBillIndex);
      return;
    }

    setIsEditing(false);
    setEditedBill(null);
    setEditingBillIndex(null);
  };

  const removeBill = (index) => {
    const updatedBills = [...bills];
    updatedBills.splice(index, 1);
    setBills(updatedBills);

    const updatedVisibility = [...visibleBills];
    updatedVisibility.splice(index, 1);
    setVisibleBills(updatedVisibility);

    setIsEditing(false);
    setEditedBill(null);
    setEditingBillIndex(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-6 p-6">
        {bills.map((bill, index) =>
          visibleBills[index] ? (
            <div
              key={index}
              className="relative w-80 bg-gray-200 border border-gray-300 rounded-lg shadow-md p-4"
            >
              <h3 className="text-lg font-semibold mb-2">🧾 Bill #{index + 1}</h3>
              <ul className="space-y-1 text-sm">
                {bill.items.map((item, i) => (
                  <li key={i} className="text-sm">
                    <div className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                    {item.note && (
                      <p className="text-xs italic text-blue-700 mt-1">📝 {item.note}</p>
                    )}
                  </li>
                ))}
              </ul>
              <hr className="my-2" />
              <div className="text-right font-bold">
                Total: ₹{bill.total}
              </div>
              <button
                onClick={() => openEditModal(index)}
                className="mt-2 text-blue-600 hover:underline"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => removeBill(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          ) : null
        )}
      </div>

      {isEditing && editedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[600px] p-6 rounded shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Edit Bill #{editingBillIndex + 1}
              </h2>
             
            </div>
            <ul className="space-y-4 text-sm mb-4">
              {editedBill.items.map((item, idx) => (
                <li key={idx} className="border p-2 rounded">
                  <div className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        value={item.quantity}
                        onChange={(e) =>
                          updateItemQuantity(idx, parseInt(e.target.value) || 0)
                        }
                        className="w-12 border rounded px-1 text-center"
                      />
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Special note (optional)"
                    value={item.note || ""}
                    onChange={(e) => updateItemNote(idx, e.target.value)}
                    className="w-full mt-2 border px-2 py-1 rounded text-xs"
                  />
                </li>
              ))}
            </ul>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1">➕ Add Item</h4>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="flex-1 border px-2 py-1 rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })
                  }
                  className="w-20 border px-2 py-1 rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })
                  }
                  className="w-16 border px-2 py-1 rounded text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Special note"
                value={newItem.note}
                onChange={(e) => setNewItem({ ...newItem, note: e.target.value })}
                className="w-full border px-2 py-1 rounded text-xs mb-2"
              />
              <button
                onClick={addItemToBill}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                ➕ Add to Bill
              </button>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedBill(null);
                  setEditingBillIndex(null);
                }}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
