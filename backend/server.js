/**
 * StoryWorld Backend - Express REST API Server
 * 
 * Stellt die REST-API für die StoryWorld SPA bereit.
 * Verwaltet Bücher, Personalisierung, Warenkorb und Bestellungen.
 */
const express = require('express');
const cors = require('cors');
const booksRouter = require('./routes/books');
const customizeRouter = require('./routes/customize');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request-Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API-Routen
app.use('/api/books', booksRouter);
app.use('/api/customize', customizeRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

// Health-Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'StoryWorld API' });
});

// 404 Handler für unbekannte Routen
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint nicht gefunden' });
});

// Fehlerbehandlung
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ error: 'Interner Serverfehler' });
});

app.listen(PORT, () => {
  console.log(`StoryWorld API läuft auf http://localhost:${PORT}`);
});
