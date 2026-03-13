import { Link } from 'react-router-dom';
import './BookCard.css';

/**
 * BookCard – Zeigt eine Buchvorschau als Karte an.
 * Wird auf der Startseite im Bücher-Grid verwendet.
 * 
 * @param {Object} book - Buchdaten vom Backend
 * @param {number} index - Index für gestaffelte Animation
 */
function BookCard({ book, index = 0 }) {
  // Theme-Farben für verschiedene Bücher
  const themeColors = [
    { bg: '#FFE0E0', accent: '#FF6B6B' },
    { bg: '#D4F5F2', accent: '#4ECDC4' },
    { bg: '#EDE4FF', accent: '#A78BFA' },
    { bg: '#FFF3CC', accent: '#FF9F43' },
    { bg: '#E0F0FF', accent: '#5B9BD5' },
    { bg: '#FFE8D6', accent: '#FF8C42' },
  ];

  const theme = themeColors[index % themeColors.length];

  // Sprachkürzel für Anzeige
  const languageLabels = { de: '🇩🇪 DE', en: '🇬🇧 EN' };

  return (
    <Link 
      to={`/book/${book.id}`} 
      className="book-card card animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Cover-Bereich */}
      <div className="book-card-cover" style={{ background: theme.bg }}>
        <span className="book-card-emoji">{book.cover}</span>
        <div className="book-card-age">
          <span>{book.ageRange} Jahre</span>
        </div>
      </div>

      {/* Info-Bereich */}
      <div className="book-card-info">
        <h3 className="book-card-title">
          {book.title.de}
        </h3>
        <p className="book-card-desc">
          {book.description.de.replace(/{childName}/g, 'Ihr Kind')}
        </p>
        
        {/* Tags */}
        <div className="book-card-tags">
          {book.availableLanguages.map(lang => (
            <span key={lang} className="tag tag-secondary">
              {languageLabels[lang] || lang}
            </span>
          ))}
        </div>

        {/* Preis und CTA */}
        <div className="book-card-footer">
          <span className="price price-small">
            {book.price.toFixed(2)} €
          </span>
          <span className="btn btn-sm btn-primary">
            Entdecken →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
