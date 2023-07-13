const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3001;

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
    user: 'Biruk',
    host: 'localhost',
    database: 'postgres',
    password: 'biruk',
    port: 5432
});
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());

// GET /inventory endpoint to fetch all inventory items
app.get('/inventory', async (req, res) => {
    try {
        const client = await pool.connect();

        const result = await client.query('SELECT * FROM stock');
        const inventory = result.rows;
        client.release();
        res.json(inventory);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /inventory endpoint to add a new inventory item
app.post('/inventory', async (req, res) => {
    const { stock_id, amount, date } = req.body;
        console.log(stock_id, amount, date)
        console.log(req.body)
    if (!stock_id || !amount) {
        res.status(400).json({ error: 'Product name and quantity are required' });
        return;
    }

    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO stock (stock_id, amount, date) VALUES ($1, $2, $3) RETURNING *',
            [stock_id, amount, date]
        );
        const newItem = result.rows[0];
        client.release();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error adding inventory item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//POST specific user for authenthication
app.post('/users', async (req, res) => {
    try {
        const {user_id, hashedpswd} = req.body;
        console.log(user_id, hashedpswd);
        const client = await pool.connect();

        const result = await client.query('SELECT hashedpswd, user_type_id FROM Cafe_user  WHERE user_id = $1', [user_id]);
        const dbPassword = result.rows.map((row) => row.hashedpswd)[0];
        const userType = result.rows.map((row)=>row.user_type_id)[0];
        console.log(userType);
        console.log(dbPassword);
        client.release();
        const isMatch = await bcrypt.compare(hashedpswd,dbPassword);

        if (isMatch){
            res.status(200).json({userType: userType});

        }
        else {
            res.status(401).json({error: "Authenthication failed"});
        }
        //res.json(userdets);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/Menu', async (req, res) => {
    try {
        const client = await pool.connect();

        const result = await client.query('SELECT * FROM Menu ');
        const menu = result.rows;
        client.release();
        res.json(menu);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Submitting orders
app.post('/order', async (req, res) => {
    const { user_id, items, num_items } = req.body;
    console.log(user_id, items, num_items)
    var totalCost =0;
    //console.log(req.body)
    if (!user_id || !items || !num_items) {
        res.status(400).json({ error: 'user id or item missing' });
        return;
    }
    for (let i =0; i<items.length; i++) {
        const {food_id, price, date}= items[i];
        totalCost += price;
    }

    try {
        const client = await pool.connect();
        const result = await  client.query('SELECT credit_amount FROM Cafe_user  WHERE user_id = $1', [user_id])
        const clientCredit = result.rows.map((row) => row.credit_amount)[0];
        console.log(clientCredit);
        if (totalCost> clientCredit){
            res.status(400).json({error:'Insufficient funds'});
            return;
        }
        client.release();

    } catch (error) {
        console.error('Error getting user credit:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


    try {
        const client = await pool.connect();
        for (let i =0; i<items.length; i++) {
            const {food_id, price}= items[i];
            const date = new Date();
            const result = await client.query(
                'INSERT INTO orders (order_no,user_id, food_id, date, bill,qty, complete) VALUES (001, $1,  $2, $3, $4, 1, false) RETURNING *',
                [user_id, food_id, date, price]
            );
        }
        //const newItem = result.rows[0];
        client.release();
        res.status(201).json(totalCost);
    } catch (error) {
        console.error('Error adding inventory item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/orders', async (req, res) => {
    try {
        const date = new Date();
        const client = await pool.connect();

        const result = await client.query('SELECT order_no, user_id, food_id FROM orders WHERE date = $1',[date]);
        const inventory = result.rows;
        client.release();
        res.json(inventory);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
