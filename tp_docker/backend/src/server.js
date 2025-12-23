const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());

// Connexion simple à PostgreSQL (variables d'env fournies par compose)
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

// Route de santé
app.get('/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT 1 AS ok');
        res.json({ status: 'ok', db: result.rows[0].ok });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Route pour récupérer une blague aléatoire
app.get('/joke', async (req, res) => {
    try {
        const result = await pool.query('SELECT phrase FROM jokes ORDER BY RANDOM() LIMIT 1');
        res.json({ text: result.rows[0]?.phrase || 'Aucune blague en base' });
    } catch (err) {
        res.status(500).send('Erreur BDD');
    }
});

app.listen(port, () => console.log(`Backend listening on port ${port}`));