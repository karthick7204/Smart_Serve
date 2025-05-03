import React, { useState } from 'react';
import { Bill } from './Bill';
import { BillsCheck } from './BillsCheck';
import { AddItems } from './AddItems';
import './App.css';

export function Manager() {
  const [bills, setBills] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("home");

  const addToBill = (item) => {
    const existingIndex = selectedItems.findIndex(i => i.name === item.name);
    if (existingIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingIndex].quantity += 1;
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
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

  const decreaseQuantity = (index) => {
    const updatedItems = [...selectedItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    } else {
      updatedItems.splice(index, 1);
    }
    setSelectedItems(updatedItems);
  };

  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderContent = () => {
    switch (activeView) {
      case "takeOrder":
        return (
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="relative flex items-center max-w-xs mb-5">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="absolute left-3 w-4 h-4 fill-gray-400 pointer-events-none"
                >
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 
                  4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 
                  5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 
                  11c0-4.135 3.365-7.5 7.5-7.5s7.5 
                  3.365 7.5 7.5-3.365 7.5-7.5 
                  7.5-7.5-3.365-7.5-7.5z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search..."
                  name="searchbar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 text-sm rounded-xl bg-gray-900 text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-600 shadow-md transition duration-200"
                />
              </div>

              <div className="flex">
                <div className="grid grid-cols-3 gap-5">
                  {itemsList
                    .filter((item) =>
                      item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item, idx) => (
                      <div key={idx} className="relative border border-gray-300 bg-gray-200 rounded-md px-2 shadow-lg h-36 w-52 space-y-2">
                        <button
                          onClick={() => addToBill(item)}
                          className="absolute top-2 right-2 text-xl text-gray-700 hover:text-blue-600"
                        >
                          ➕
                        </button>
                        <p>{item.name}</p>
                        <p className="font-light">{item.description}</p>
                        <p>{item.price}rs</p>
                      </div>
                    ))}
                </div>

                <Bill
                  selectedItems={selectedItems}
                  removeFromBill={removeFromBill}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  setSelectedItems={setSelectedItems}
                  setBills={setBills}
                  setActiveView={setActiveView}
                />
              </div>
            </div>
          </div>
        );

      case "viewItems":
        return <p className="text-xl">👀 View Items Page</p>;

      case "Bills":
        return <BillsCheck bills={bills} setBills={setBills} />;

      case "addItem":
        return <AddItems itemsList={itemsList} setItemsList={setItemsList} />;

      case "createUser":
        return <p className="text-xl">👤 Create User Page</p>;

      default:
        return <h1 className="text-5xl font-bold text-center text-gray-800">Smart Serve</h1>;
    }
  };

  return (
    <div className="container min-h-screen flex flex-col">
      <div className="relative flex items-center bg-gray-800 text-white px-4 py-3">
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="mr-4 focus:outline-none">
          <div className="space-y-1">
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </div>
        </button>
        <span className="text-2xl font-bold">Manager Dashboard</span>
      </div>

      <div className="flex flex-1 fixed top-0 left-0 h-screen">
        {isSidebarOpen && (
          <div className="w-64 bg-gray-200 p-4 space-y-4 shadow-md">
            <button onClick={() => setActiveView("home")} className="w-full text-left hover:text-blue-600">🏠 Home</button>
            <button onClick={() => setActiveView("takeOrder")} className="w-full text-left hover:text-blue-600">📋 Take Order</button>
            <button onClick={() => setActiveView("viewItems")} className="w-full text-left hover:text-blue-600">👀 View Items</button>
            <button onClick={() => setActiveView("Bills")} className="w-full text-left hover:text-blue-600">💵 Bills</button>
            <button onClick={() => setActiveView("addItem")} className="w-full text-left hover:text-blue-600">➕ Add Item</button>
            <button onClick={() => setActiveView("createUser")} className="w-full text-left hover:text-blue-600">👤 Create User</button>
            <button onClick={() => setSidebarOpen(false)} className="border border-black rounded-md w-10 bg-white">Back</button>
          </div>
        )}
      </div>

      <div className="ml-64 flex-1 p-6">{renderContent()}</div>
    </div>
  );
}
