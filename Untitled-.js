// Entry point: React Frontend POS for Marwa City Restaurant
// Features: Menu display, order creation, modifiers, order summary, backend integration (Node.js)

// 1. Frontend: React (App.js)
import React, { useState, useEffect } from "react";
import axios from "axios";

const menu = [
  { id: 1, name: "Grilled Chicken", price: 1200 },
  { id: 2, name: "Beef Stew", price: 1000 },
  { id: 3, name: "Chapati", price: 50 },
  { id: 4, name: "Fresh Juice", price: 200 }
];

const modifiers = ["Spicy", "Mild", "No Onions", "Extra Sauce"];

function App() {
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState("");

  const addToOrder = (item, modifier) => {
    const newItem = {
      ...item,
      modifier,
      id: `${item.id}-${Math.random()}`
    };
    setOrderItems([...orderItems, newItem]);
  };

  const removeItem = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const total = orderItems.reduce((acc, item) => acc + item.price, 0);

  const submitOrder = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/orders", {
        items: orderItems,
        total
      });
      setMessage("Order submitted successfully!");
      setOrderItems([]);
    } catch (err) {
      setMessage("Error submitting order.");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">Marwa City Restaurant POS</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {menu.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow-md bg-white">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>KES {item.price}</p>
            {modifiers.map((mod) => (
              <button
                key={mod}
                className="mt-2 mr-2 px-2 py-1 text-sm bg-blue-500 text-white rounded"
                onClick={() => addToOrder(item, mod)}
              >
                Add ({mod})
              </button>
            ))}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Current Order</h2>
      {orderItems.length === 0 ? (
        <p>No items in order.</p>
      ) : (
        <ul className="mb-4">
          {orderItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} ({item.modifier}) - KES {item.price}</span>
              <button
                className="text-red-500"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-lg font-bold mb-2">Total: KES {total}</h3>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={submitOrder}
        disabled={orderItems.length === 0}
      >
        Submit Order
      </button>

      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
}

export default App;

// 2. Backend: Node.js + Express (server.js)
// Save in a separate file: server.js

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/orders", (req, res) => {
  const { items, total } = req.body;
  console.log("Received Order:", items, "Total:", total);
  // Save to database or file here if needed
  return res.status(200).json({ message: "Order received" });
});

app.listen(5000, () => {
  console.log("POS Backend running on http://localhost:5000");
});
