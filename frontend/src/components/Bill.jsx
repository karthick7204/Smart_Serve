import React, { useState } from "react";

export function Bill({
  selectedItems,
  decreaseQuantity,
  setSelectedItems,
  setBills,
  setActiveView,
}) {
  const [noteInputs, setNoteInputs] = useState({});

  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToPay = () => {
    if (selectedItems.length === 0) return;
    const clonedItems = selectedItems.map((item) => ({ ...item }));
    setBills((prev) => [...prev, { items: clonedItems, total }]);
    setSelectedItems([]);
  };

  const removeFromBill = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity += 1;
    setSelectedItems(updatedItems);
  };

  const toggleNoteInput = (index) => {
    setNoteInputs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNoteChange = (index, value) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].note = value;
    setSelectedItems(updatedItems);
  };

  return (
    <div className="absolute right-28 w-96 max-h-[90vh] bg-teal-300 border border-gray-300 rounded-lg shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">🧾 Bill Summary</h2>

      <ul className="space-y-4 text-sm">
        {selectedItems.map((item, index) => (
          <li key={index} className="flex flex-col gap-1 border-b pb-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.name}</span>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 bg-gray-200 rounded"
                  onClick={() => decreaseQuantity(index)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 bg-gray-200 rounded"
                  onClick={() => increaseQuantity(index)}
                >
                  +
                </button>
                <span>₹{item.price * item.quantity}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromBill(index)}
                >
                  ❌
                </button>
              </div>
            </div>

            {item.note && (
              <p className="italic text-xs text-blue-900">Note: {item.note}</p>
            )}

            <button
              className="text-xs text-blue-700 hover:underline mt-1 w-fit"
              onClick={() => toggleNoteInput(index)}
            >
              {noteInputs[index] ? "Close Note" : "Add Special Note"}
            </button>

            {noteInputs[index] && (
              <input
                type="text"
                placeholder="e.g., Less spicy"
                className="w-full p-1 text-sm border border-gray-400 rounded"
                value={item.note || ""}
                onChange={(e) => handleNoteChange(index, e.target.value)}
              />
            )}
          </li>
        ))}
      </ul>

      <hr className="my-3" />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button
        onClick={handleProceedToPay}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Proceed to Pay
      </button>
    </div>
  );
}
