import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from "react-router-dom";

function Menu() {
    const [menu, setMenu] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const location = useLocation();

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

        const queryparams = new URLSearchParams(location.search);
        const user_id = queryparams.get('user_id');

        try {
            const orderData = {
                user_id: user_id,
                items: selectedItems,
                num_items: selectedItems.length
            }
            const result = await axios.post(' http://localhost:3001/order', orderData); // Replace with your API endpoint for submitting orders
            if (result.status == 201) {
                window.location.replace("http://localhost:3000/Login");
            }
            console.log(result);
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
