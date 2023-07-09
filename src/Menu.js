import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
    const [menu, setMenu] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await axios.get(' http://localhost:3001/Menu'); // Replace with your API endpoint for fetching the menu
            setMenu(response.data);
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    };

    const handleItemSelect = (item) => {
        setSelectedItems((prevItems) => [...prevItems, item]);
    };

    const handleOrderSubmit = async () => {
        try {
            await axios.post(' http://localhost:3001/order', selectedItems); // Replace with your API endpoint for submitting orders
            console.log('Order submitted successfully');
            setSelectedItems([]);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    return (
        <div className="menu">
            <h3>Menu</h3>
            <ul>
                {menu.map((item) => (
                    <li key={item.id}>
                        {item.food_id} - ${item.price}
                        <button onClick={() => handleItemSelect(item)}>Add to Order</button>
                    </li>
                ))}
            </ul>
            <h4>Selected Items:</h4>
            <ul>
                {selectedItems.map((item) => (
                    <li key={item.price}>{item.food_id}</li>
                ))}
            </ul>
            <button onClick={handleOrderSubmit} disabled={selectedItems.length === 0}>
                Submit Order
            </button>
        </div>
    );
}

export default Menu;
