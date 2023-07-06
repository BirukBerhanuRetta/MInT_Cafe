import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [stock_id, setStock_id] = useState('');
  const [amount, setAmount] = useState('');
  const [inventory, setInventory] = useState([]);



  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(' http://localhost:3001/inventor');
      console.log(response.data);
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleProductChange = (event) => {
    setStock_id(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!stock_id || !amount) return;
    const date = new Date()
    try {
      await axios.post(' http://localhost:3001/inventor', {
        stock_id: stock_id,
        amount: amount,
        date
      });
      setStock_id('');
      setAmount('');
      fetchInventory();
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  return (
      <div className="container">
        <h2>Inventory Control App</h2>

        {/* Inventory Input Form */}
        <div className="inventory-form">
          <h3>Take Inventory</h3>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="product-name">Product Name</label>
            <input
                type="text"
                id="product-name"
                name="product-name"
                value={stock_id}
                onChange={handleProductChange}
                required
            />

            <label htmlFor="amount">Quantity</label>
            <input
                type="text"
                id="amount"
                name="amount"
                value={amount}
                onChange={handleQuantityChange}
                required
            />

            <button type="submit">Submit</button>
          </form>
        </div>

        {/* View Inventory */}
        <div className="view-inventory">
          <h3>View Inventory</h3>
          <table>
            <thead>
            <tr>
              <th>Stock ID</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {inventory.map((item, index) => (
                <tr key={index}>
                  <td>{item.stock_id}</td>
                  <td>{item.amount}</td>
                  <td>{item.date}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default App;

