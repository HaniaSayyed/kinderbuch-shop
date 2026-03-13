/**
 * Cart Router
 * 
 * GET    /api/cart       - Warenkorb abrufen
 * POST   /api/cart       - Artikel zum Warenkorb hinzufügen
 * DELETE /api/cart/:itemId - Artikel aus dem Warenkorb entfernen
 * PUT    /api/cart/:itemId - Artikelmenge aktualisieren
 */
const express = require('express');
const router = express.Router();

// In-Memory Warenkorb (keine Persistierung nötig laut Aufgabenstellung)
const cartItems = [];
let cartItemCounter = 1;

/**
 * GET /api/cart
 * Gibt alle Artikel im Warenkorb zurück, inklusive Gesamtpreis.
 */
router.get('/', (req, res) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  res.json({
    items: cartItems,
    totalItems: cartItems.length,
    totalPrice: Math.round(total * 100) / 100
  });
});

/**
 * POST /api/cart
 * Fügt einen personalisierten Artikel zum Warenkorb hinzu.
 * 
 * Request Body:
 * {
 *   previewId: string,
 *   bookId: number,
 *   title: string,
 *   childName: string,
 *   language: string,
 *   price: number,
 *   cover: string,
 *   quantity: number (optional, default: 1)
 * }
 */
router.post('/', (req, res) => {
  const { previewId, bookId, title, childName, language, price, cover, quantity } = req.body;

  // Validierung
  if (!bookId || !title || !childName || !price) {
    return res.status(400).json({ 
      error: 'bookId, title, childName und price sind erforderlich' 
    });
  }

  const cartItem = {
    id: `cart_${cartItemCounter++}`,
    previewId: previewId || null,
    bookId,
    title,
    childName,
    language: language || 'de',
    price,
    cover: cover || '📖',
    quantity: quantity || 1,
    addedAt: new Date().toISOString()
  };

  cartItems.push(cartItem);

  res.status(201).json(cartItem);
});

/**
 * PUT /api/cart/:itemId
 * Aktualisiert die Menge eines Warenkorb-Artikels.
 */
router.put('/:itemId', (req, res) => {
  const { quantity } = req.body;
  const itemIndex = cartItems.findIndex(item => item.id === req.params.itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Artikel nicht im Warenkorb gefunden' });
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: 'Ungültige Menge' });
  }

  cartItems[itemIndex].quantity = quantity;
  res.json(cartItems[itemIndex]);
});

/**
 * DELETE /api/cart/:itemId
 * Entfernt einen Artikel aus dem Warenkorb.
 */
router.delete('/:itemId', (req, res) => {
  const itemIndex = cartItems.findIndex(item => item.id === req.params.itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Artikel nicht im Warenkorb gefunden' });
  }

  const removed = cartItems.splice(itemIndex, 1)[0];
  res.json({ message: 'Artikel entfernt', item: removed });
});

module.exports = router;
