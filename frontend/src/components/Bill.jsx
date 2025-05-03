import React from "react";

export function Bill({
    selectedItems,
    decreaseQuantity,
    setSelectedItems,
    setBills,
    setActiveView
 }) {
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleProceedToPay = () => {
      if (selectedItems.length === 0) return;
  
      setBills(prev => [...prev, { items: selectedItems, total }]);
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
 
  
    return (
      <div className="absolute right-28 w-96 h-96 bg-teal-300 border border-gray-300 rounded-lg shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">🧾 Bill Summary</h2>
        
        <ul className="space-y-2 text-sm">
          {selectedItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 bg-gray-200 rounded"
                  onClick={() => decreaseQuantity(index)}
                >−</button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 bg-gray-200 rounded"
                  onClick={() => increaseQuantity(index)}
                >+</button>
                <span>₹{item.price * item.quantity}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromBill(index)}
                >❌</button>
              </div>
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
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Proceed to Pay
        </button>
      </div>
    );
  }
  
  