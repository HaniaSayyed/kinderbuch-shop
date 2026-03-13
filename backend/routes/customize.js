/**
 * Customize Router
 * 
 * POST /api/customize/preview   - Personalisierte Vorschau erstellen
 * GET  /api/customize/:previewId - Vorschau-Daten abrufen
 */
const express = require('express');
const router = express.Router();
const books = require('../data/books.json');

// In-Memory Speicher für Vorschauen (keine Persistierung nötig)
const previews = new Map();
let previewCounter = 1;

/**
 * POST /api/customize/preview
 * Erstellt eine personalisierte Buchvorschau.
 * 
 * Request Body:
 * {
 *   bookId: number,
 *   childName: string,
 *   language: "de" | "en",
 *   hairColor: string,
 *   skinTone: string,
 *   gender: string
 * }
 */
router.post('/preview', (req, res) => {
  const { bookId, childName, language, hairColor, skinTone, gender } = req.body;

  // Validierung
  if (!bookId || !childName || !language) {
    return res.status(400).json({ 
      error: 'bookId, childName und language sind erforderlich' 
    });
  }

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'Buch nicht gefunden' });
  }

  if (!book.availableLanguages.includes(language)) {
    return res.status(400).json({ error: 'Sprache für dieses Buch nicht verfügbar' });
  }

  // Personalisierte Seiten generieren
  const personalizedPages = book.pages[language].map(page => ({
    ...page,
    text: page.text.replace(/{childName}/g, childName)
  }));

  // Personalisierten Titel generieren
  const personalizedTitle = book.title[language].replace(/{childName}/g, childName);

  const previewId = `preview_${previewCounter++}`;
  const preview = {
    id: previewId,
    bookId,
    title: personalizedTitle,
    childName,
    language,
    hairColor: hairColor || 'brown',
    skinTone: skinTone || 'medium',
    gender: gender || 'neutral',
    pages: personalizedPages,
    price: book.price,
    cover: book.cover,
    createdAt: new Date().toISOString()
  };

  previews.set(previewId, preview);

  res.status(201).json(preview);
});

/**
 * GET /api/customize/:previewId
 * Ruft eine erstellte Vorschau ab.
 */
router.get('/:previewId', (req, res) => {
  const preview = previews.get(req.params.previewId);

  if (!preview) {
    return res.status(404).json({ error: 'Vorschau nicht gefunden' });
  }

  res.json(preview);
});

module.exports = router;
