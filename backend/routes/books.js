/**
 * Books Router
 * 
 * GET /api/books          - Alle Bücher abrufen (mit optionalem Sprachfilter)
 * GET /api/books/:id      - Ein einzelnes Buch abrufen
 */
const express = require('express');
const router = express.Router();
const books = require('../data/books.json');

/**
 * GET /api/books
 * Gibt alle Bücher zurück. Optional kann nach Sprache gefiltert werden.
 * Query-Parameter: lang (z.B. "de" oder "en"), ageRange, theme
 */
router.get('/', (req, res) => {
  const { lang, ageRange, theme } = req.query;
  let result = [...books];

  // Nach Sprache filtern
  if (lang) {
    result = result.filter(book => book.availableLanguages.includes(lang));
  }

  // Nach Altersgruppe filtern
  if (ageRange) {
    result = result.filter(book => book.ageRange === ageRange);
  }

  // Nach Thema filtern
  if (theme) {
    result = result.filter(book => book.themes.includes(theme));
  }

  // Nur Übersichtsdaten senden (keine vollständigen Seiteninhalt)
  const overview = result.map(({ pages, ...bookData }) => ({
    ...bookData,
    hasPreview: true
  }));

  res.json(overview);
});

/**
 * GET /api/books/:id
 * Gibt ein einzelnes Buch mit allen Details zurück.
 */
router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Buch nicht gefunden' });
  }

  res.json(book);
});

  module.exports = router;
  