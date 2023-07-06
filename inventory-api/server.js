const express = require('express');
const { Pool } = require('pg');

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
app.get('/inventor', async (req, res) => {
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
app.post('/inventor', async (req, res) => {
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

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
