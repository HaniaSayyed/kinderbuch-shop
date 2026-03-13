import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BookDetail.css';

/**
 * BookDetail – Detailansicht eines einzelnen Buches
 * Zeigt alle Informationen zu einem Buch und ermöglicht die Navigation zum Konfigurator.
 * Kommuniziert mit: GET /api/books/:id
 */
function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState('de');

  // Buch vom Backend laden
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error('Buch nicht gefunden');
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error('Fehler:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="loader"><div className="loader-spinner"></div></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="page container">
        <div className="empty-state">
          <span className="empty-icon">😕</span>
          <h2>Buch nicht gefunden</h2>
          <Link to="/" className="btn btn-primary">Zurück zur Übersicht</Link>
        </div>
      </div>
    );
  }

  const themeLabels = {
    adventure: '🗺️ Abenteuer',
    friendship: '🤝 Freundschaft',
    courage: '💪 Mut',
    learning: '📚 Lernen',
    bedtime: '🌙 Gute-Nacht',
    numbers: '🔢 Zahlen',
    fantasy: '🦄 Fantasie',
    responsibility: '🌱 Verantwortung',
    love: '💝 Liebe',
    ocean: '🌊 Ozean',
    discovery: '🔍 Entdecken',
    nature: '🌿 Natur',
    space: '🚀 Weltraum',
    imagination: '💭 Fantasie',
    creativity: '🎨 Kreativität',
    animals: '🐾 Tiere',
    talents: '⭐ Talente',
    'self-confidence': '💎 Selbstvertrauen'
  };

  return (
    <div className="page book-detail-page">
      <div className="container">
        <Link to="/" className="back-link">← Zurück zur Übersicht</Link>

        <div className="book-detail-grid">
          {/* Linke Seite: Cover */}
          <div className="book-detail-cover animate-fadeInUp">
            <div className="cover-display">
              <span className="cover-emoji">{book.cover}</span>
            </div>
            
            {/* Sprach-Vorschau */}
            <div className="lang-switcher">
              <span className="lang-label">Vorschau-Sprache:</span>
              <div className="lang-buttons">
                {book.availableLanguages.map(lang => (
                  <button
                    key={lang}
                    className={`lang-btn ${selectedLang === lang ? 'active' : ''}`}
                    onClick={() => setSelectedLang(lang)}
                  >
                    {lang === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rechte Seite: Details */}
          <div className="book-detail-info animate-fadeInUp stagger-2">
            <div className="book-detail-age tag tag-accent">
              Alter: {book.ageRange} Jahre
            </div>

            <h1>{book.title[selectedLang]}</h1>

            <p className="book-detail-desc">
              {book.description[selectedLang].replace(/{childName}/g, 'Ihr Kind')}
            </p>

            {/* Themen */}
            <div className="book-detail-themes">
              <h4>Themen:</h4>
              <div className="theme-tags">
                {book.themes.map(theme => (
                  <span key={theme} className="tag tag-secondary">
                    {themeLabels[theme] || theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="book-detail-meta">
              <div className="meta-item">
                <span className="meta-icon">📄</span>
                <span>{book.pageCount} Seiten</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🌍</span>
                <span>{book.availableLanguages.length} Sprachen verfügbar</span>
              </div>
            </div>

            {/* Preis und CTA */}
            <div className="book-detail-action">
              <div className="price">{book.price.toFixed(2)} €</div>
              <Link to={`/configure/${book.id}`} className="btn btn-primary btn-lg">
                ✨ Jetzt personalisieren
              </Link>
            </div>

            {/* Beispiel-Seite */}
            <div className="book-detail-preview">
              <h4>Leseprobe:</h4>
              <div className="preview-page">
                <span className="preview-illustration">
                  {book.pages[selectedLang][0].illustration}
                </span>
                <p className="preview-text">
                  „{book.pages[selectedLang][0].text.replace(/{childName}/g, '[Name des Kindes]')}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
