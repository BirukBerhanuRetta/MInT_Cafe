import React, { useState, useEffect } from 'react';
import './Inventory.css';
import axios from 'axios';
// Fetch data from the backend

function Orders() {

    //const [stock_id, setStock_id] = useState('');
    //const [amount, setAmount] = useState('');
    const [orders, setOrders] = useState([]);
    //const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(' http://localhost:3001/orders');
            console.log(response.data);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching Orders:', error);
        }
    };
    return (
    <div className="view-inventory">
        <h3>View Orders of the day</h3>
        <table>
            <thead>
            <tr>
                <th>Order number</th>
                <th>User ID</th>
                <th>Food ID</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((item, index) => (
                <tr key={index}>
                    <td>{item.order_no}</td>
                    <td>{item.user_id}</td>
                    <td>{item.food_id}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>

);
}
export default Orders;
