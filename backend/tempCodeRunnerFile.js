require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise'); // Using mysql2/promise for async/await
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection with connection pooling
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'new_password',
    database: process.env.DB_NAME || 'dreamhome',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to MySQL Database");
        connection.release();
    } catch (err) {
        console.error("Database connection failed:", err.stack);
        process.exit(1); // Exit if we can't connect to DB
    }
}

// Initialize the server
async function initializeServer() {
    await testConnection();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Helper function for database queries
async function query(sql, params) {
    try {
        const [rows] = await pool.query(sql, params);
        return rows;
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
}

// ==================== ROUTES ====================

// Property Routes
app.get('/properties', async (req, res) => {
    try {
        const properties = await query(`
            SELECT p.*, o.Name AS OwnerName, b.BranchName 
            FROM Property p
            LEFT JOIN Owner o ON p.OwnerID = o.OwnerID
            LEFT JOIN Branch b ON p.BranchID = b.BranchID
        `);
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/properties', async (req, res) => {
    try {
        const { Address, Rent, OwnerID, BranchID } = req.body;
        const result = await query(
            'INSERT INTO Property (Address, Rent, OwnerID, BranchID) VALUES (?, ?, ?, ?)',
            [Address, Rent, OwnerID, BranchID]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/properties/:id', async (req, res) => {
    try {
        const property = await query('SELECT * FROM Property WHERE PropertyID = ?', [req.params.id]);
        if (property.length === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.json(property[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/properties/:id', async (req, res) => {
    try {
        const { Address, Rent, OwnerID, BranchID } = req.body;
        await query(
            'UPDATE Property SET Address = ?, Rent = ?, OwnerID = ?, BranchID = ? WHERE PropertyID = ?',
            [Address, Rent, OwnerID, BranchID, req.params.id]
        );
        res.json({ message: 'Property updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/properties/:id', async (req, res) => {
    try {
        await query('DELETE FROM Property WHERE PropertyID = ?', [req.params.id]);
        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Branch Routes
app.get('/branches', async (req, res) => {
    try {
        const branches = await query('SELECT * FROM Branch');
        res.json(branches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/branches', async (req, res) => {
    try {
        const { BranchName, Address, Phone } = req.body;
        const result = await query(
            'INSERT INTO Branch (BranchName, Address, Phone) VALUES (?, ?, ?)',
            [BranchName, Address, Phone]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/branches/:id', async (req, res) => {
    try {
        const branch = await query('SELECT * FROM Branch WHERE BranchID = ?', [req.params.id]);
        if (branch.length === 0) {
            return res.status(404).json({ error: 'Branch not found' });
        }
        res.json(branch[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Staff Routes
app.get('/staff', async (req, res) => {
    try {
        const staff = await query(`
            SELECT s.*, b.BranchName 
            FROM Staff s
            LEFT JOIN Branch b ON s.BranchID = b.BranchID
        `);
        res.json(staff);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/staff', async (req, res) => {
    try {
        const { Name, Position, Salary, BranchID } = req.body;
        const result = await query(
            'INSERT INTO Staff (Name, Position, Salary, BranchID) VALUES (?, ?, ?, ?)',
            [Name, Position, Salary, BranchID]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Owner Routes
app.get('/owners', async (req, res) => {
    try {
        const owners = await query('SELECT * FROM Owner');
        res.json(owners);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/owners', async (req, res) => {
    try {
        const { Name, ContactInfo } = req.body;
        const result = await query(
            'INSERT INTO Owner (Name, ContactInfo) VALUES (?, ?)',
            [Name, ContactInfo]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Client Routes
app.get('/clients', async (req, res) => {
    try {
        const clients = await query('SELECT * FROM Client');
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/clients', async (req, res) => {
    try {
        const { Name, ContactInfo, Preferences } = req.body;
        const result = await query(
            'INSERT INTO Client (Name, ContactInfo, Preferences) VALUES (?, ?, ?)',
            [Name, ContactInfo, Preferences]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Viewing Routes
app.get('/viewings', async (req, res) => {
    try {
        const viewings = await query(`
            SELECT v.*, c.Name AS ClientName, p.Address AS PropertyAddress 
            FROM Viewing v
            LEFT JOIN Client c ON v.ClientID = c.ClientID
            LEFT JOIN Property p ON v.PropertyID = p.PropertyID
        `);
        res.json(viewings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/viewings', async (req, res) => {
    try {
        const { ClientID, PropertyID, Date, Comments } = req.body;
        const result = await query(
            'INSERT INTO Viewing (ClientID, PropertyID, Date, Comments) VALUES (?, ?, ?, ?)',
            [ClientID, PropertyID, Date, Comments]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Lease Routes
app.get('/leases', async (req, res) => {
    try {
        const leases = await query(`
            SELECT l.*, 
                   c.Name AS ClientName, 
                   p.Address AS PropertyAddress,
                   p.Rent AS PropertyRent
            FROM Lease l
            LEFT JOIN Client c ON l.ClientID = c.ClientID
            LEFT JOIN Property p ON l.PropertyID = p.PropertyID
        `);
        res.json(leases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/leases', async (req, res) => {
    try {
        const { ClientID, PropertyID, StartDate, EndDate, MonthlyRent } = req.body;
        const result = await query(
            'INSERT INTO Lease (ClientID, PropertyID, StartDate, EndDate, MonthlyRent) VALUES (?, ?, ?, ?, ?)',
            [ClientID, PropertyID, StartDate, EndDate, MonthlyRent]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
initializeServer().catch(err => {
    console.error('Server initialization failed:', err);
    process.exit(1);
});

module.exports = app; // For testing purposes