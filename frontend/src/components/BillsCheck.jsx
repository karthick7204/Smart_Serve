import React, { useState } from "react";

export function BillsCheck({ bills, setBills }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBillIndex, setEditingBillIndex] = useState(null);
  const [editedBill, setEditedBill] = useState(null);

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

  const removeItem = (itemIndex) => {
    const updatedItems = editedBill.items.filter((_, i) => i !== itemIndex);
    setEditedBill({ ...editedBill, items: updatedItems });
  };

  const saveChanges = () => {
    const updatedBills = [...bills];
    const total = editedBill.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (total === 0) {
      // Remove the bill if total becomes 0
      updatedBills.splice(editingBillIndex, 1);
    } else {
      // Update the bill with new total
      updatedBills[editingBillIndex] = { ...editedBill, total };
    }

    setBills(updatedBills);
    setIsEditing(false);
    setEditedBill(null);
    setEditingBillIndex(null);
  };

  const removebill = ()=>{
    const updatedBills = [...bills];
    updatedBills.splice(editingBillIndex, 1);
    setBills(updatedBills);
    setIsEditing(false);
    setEditedBill(null);
    setEditingBillIndex(null);

  }

  return (
    <div className="flex flex-wrap gap-6 p-6">
      {bills.map((bill, index) => (
        <div
          key={index}
          className="w-80 bg-white border border-gray-300 rounded-lg shadow-md p-4"
        >
          <h3 className="text-lg font-semibold mb-2">🧾 Bill #{index + 1}</h3>
          <ul className="space-y-1 text-sm">
            {bill.items.map((item, i) => (  
              <li key={i} className="flex justify-between">  
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <hr className="my-2" />
          <div className="text-right font-bold">Total: ₹{bill.total}</div>
          <div className="flex justify-between">
          <button
            onClick={() => openEditModal(index)}
            className="mt-2 text-blue-600 hover:underline"
          >
            ✏️ Edit
          </button>
          <button onclick={ removebill}className="mt-1">X</button>
          </div>
        </div>
      ))}

      {isEditing && editedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Edit Bill #{editingBillIndex + 1}
            </h2>
            <ul className="space-y-2 text-sm mb-4">
              {editedBill.items.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItemQuantity(
                          idx,
                          parseInt(e.target.value) || 0
                        )
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
                </li>
              ))}
            </ul>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedBill(null);
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
    </div>
  );
}
