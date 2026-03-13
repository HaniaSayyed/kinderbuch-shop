import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './BookPreview.css';

/**
 * BookPreview – Zeigt die personalisierte Buchvorschau
 * Der Benutzer kann durch die Seiten blättern und das Buch zum Warenkorb hinzufügen.
 * Kommuniziert mit: GET /api/customize/:previewId
 */
function BookPreview() {
  const { previewId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [adding, setAdding] = useState(false);

  // Vorschau vom Backend laden
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await fetch(`/api/customize/${previewId}`);
        if (!res.ok) throw new Error('Vorschau nicht gefunden');
        const data = await res.json();
        setPreview(data);
      } catch (err) {
        console.error('Fehler:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [previewId]);

  /** Zum Warenkorb hinzufügen */
  const handleAddToCart = async () => {
    if (!preview) return;
    setAdding(true);

    const success = await addToCart({
      previewId: preview.id,
      bookId: preview.bookId,
      title: preview.title,
      childName: preview.childName,
      language: preview.language,
      price: preview.price,
      cover: preview.cover
    });

    if (success) {
      navigate('/cart');
    } else {
      alert('Fehler beim Hinzufügen zum Warenkorb');
    }
    setAdding(false);
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loader"><div className="loader-spinner"></div></div>
      </div>
    );
  }

  if (!preview) {
    return (
      <div className="page container">
        <div className="empty-state">
          <span className="empty-icon">😕</span>
          <h2>Vorschau nicht gefunden</h2>
          <Link to="/" className="btn btn-primary">Zurück zur Übersicht</Link>
        </div>
      </div>
    );
  }

  const page = preview.pages[currentPage];
  const totalPages = preview.pages.length;

  return (
    <div className="page preview-page">
      <div className="container">
        <div className="page-header">
          <h1>📖 {preview.title}</h1>
          <p>Personalisiert für <strong>{preview.childName}</strong></p>
        </div>

        {/* Buch-Viewer */}
        <div className="book-viewer animate-fadeInUp">
          <div className="book-spread">
            {/* Linke Seite: Illustration */}
            <div className="book-page page-left">
              <span className="page-illustration">{page.illustration}</span>
            </div>

            {/* Rechte Seite: Text */}
            <div className="book-page page-right">
              <p className="page-text">{page.text}</p>
              <span className="page-number">Seite {page.pageNumber}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="book-nav">
            <button
              className="nav-btn"
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
            >
              ← Zurück
            </button>

            <div className="page-dots">
              {preview.pages.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${currentPage === idx ? 'active' : ''}`}
                  onClick={() => setCurrentPage(idx)}
                  aria-label={`Seite ${idx + 1}`}
                />
              ))}
            </div>

            <button
              className="nav-btn"
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
            >
              Weiter →
            </button>
          </div>
        </div>

        {/* Aktionen */}
        <div className="preview-actions animate-fadeInUp stagger-2">
          <div className="preview-summary card">
            <div className="summary-info">
              <span className="summary-emoji">{preview.cover}</span>
              <div>
                <h3>{preview.title}</h3>
                <p>
                  Für {preview.childName} · {preview.language === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'} · {totalPages} Seiten
                </p>
              </div>
            </div>
            <div className="summary-actions">
              <span className="price">{preview.price.toFixed(2)} €</span>
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? '⏳ Wird hinzugefügt...' : '🛒 In den Warenkorb'}
              </button>
            </div>
          </div>

          <div className="preview-secondary-actions">
            <Link to={`/configure/${preview.bookId}`} className="btn btn-outline">
              ✏️ Nochmal anpassen
            </Link>
            <Link to="/" className="btn btn-outline">
              📚 Weitere Bücher
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPreview;
