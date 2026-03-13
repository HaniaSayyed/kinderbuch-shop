/**
 * Orders Router
 * 
 * POST /api/orders     - Neue Bestellung aufgeben
 * GET  /api/orders/:id - Bestellstatus abrufen
 */
const express = require('express');
const router = express.Router();

// In-Memory Bestellungen
const orders = new Map();
let orderCounter = 1;

/**
 * POST /api/orders
 * Erstellt eine neue Bestellung.
 * 
 * Request Body:
 * {
 *   items: Array von Warenkorb-Artikeln,
 *   customer: { name, email, address: { street, city, zip, country } },
 *   shippingMethod: "standard" | "express"
 * }
 */
router.post('/', (req, res) => {
  const { items, customer, shippingMethod } = req.body;

  // Validierung
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Mindestens ein Artikel ist erforderlich' });
  }

  if (!customer || !customer.name || !customer.email) {
    return res.status(400).json({ error: 'Kundenname und E-Mail sind erforderlich' });
  }

  // Versandkosten berechnen
  const shippingCost = shippingMethod === 'express' ? 7.99 : 3.99;
  const itemsTotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const totalPrice = Math.round((itemsTotal + shippingCost) * 100) / 100;

  const orderId = `ORD-${String(orderCounter++).padStart(5, '0')}`;
  const order = {
    id: orderId,
    items,
    customer,
    shippingMethod: shippingMethod || 'standard',
    shippingCost,
    itemsTotal: Math.round(itemsTotal * 100) / 100,
    totalPrice,
    status: 'confirmed',
    estimatedDelivery: shippingMethod === 'express' 
      ? '3-5 Werktage' 
      : '7-10 Werktage',
    createdAt: new Date().toISOString()
  };

  orders.set(orderId, order);

  res.status(201).json(order);
});

/**
 * GET /api/orders/:id
 * Gibt den Status einer Bestellung zurück.
 */
router.get('/:id', (req, res) => {
  const order = orders.get(req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Bestellung nicht gefunden' });
  }

  res.json(order);
});

module.exports = router;
