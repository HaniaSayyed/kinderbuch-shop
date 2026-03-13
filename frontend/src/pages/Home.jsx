import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import './Home.css';

/**
 * Home – Startseite mit Bücherkatalog
 * Lädt alle Bücher vom Backend und bietet Filtermöglichkeiten.
 * Kommuniziert mit: GET /api/books
 */
function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ lang: '', ageRange: '' });

  // Bücher vom Backend laden
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filter.lang) params.append('lang', filter.lang);
        if (filter.ageRange) params.append('ageRange', filter.ageRange);

        const res = await fetch(`/api/books?${params}`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Fehler beim Laden der Bücher:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filter]);

  return (
    <div className="page home-page">
      {/* Hero-Bereich */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fadeInUp">
            <span className="hero-badge">✨ Personalisierte Kinderbücher</span>
            <h1>Jedes Kind verdient <br />seine eigene <span className="highlight">Geschichte</span></h1>
            <p>
              Erstelle einzigartige Bücher mit dem Namen und Aussehen deines Kindes – 
              in Deutsch und Englisch. Magie zum Anfassen!
            </p>
            <div className="hero-features">
              <div className="hero-feature">
                <span>🎨</span>
                <span>Personalisierbar</span>
              </div>
              <div className="hero-feature">
                <span>🌍</span>
                <span>Mehrsprachig</span>
              </div>
              <div className="hero-feature">
                <span>💝</span>
                <span>Einzigartig</span>
              </div>
            </div>
          </div>
          <div className="hero-visual animate-fadeInUp stagger-2">
            <div className="floating-books">
              <span className="float-book fb-1">📖</span>
              <span className="float-book fb-2">📚</span>
              <span className="float-book fb-3">🌟</span>
              <span className="float-book fb-4">🦄</span>
              <span className="float-book fb-5">🐉</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter-Bereich */}
      <section className="catalog-section container">
        <div className="catalog-header">
          <h2>Unsere Bücher entdecken</h2>
          <div className="catalog-filters">
            <select 
              value={filter.lang} 
              onChange={(e) => setFilter(prev => ({ ...prev, lang: e.target.value }))}
              className="filter-select"
            >
              <option value="">Alle Sprachen</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="en">🇬🇧 English</option>
            </select>
            <select 
              value={filter.ageRange} 
              onChange={(e) => setFilter(prev => ({ ...prev, ageRange: e.target.value }))}
              className="filter-select"
            >
              <option value="">Alle Altersgruppen</option>
              <option value="2-4">2–4 Jahre</option>
              <option value="2-5">2–5 Jahre</option>
              <option value="3-5">3–5 Jahre</option>
              <option value="3-6">3–6 Jahre</option>
              <option value="4-7">4–7 Jahre</option>
            </select>
          </div>
        </div>

        {/* Bücher-Grid */}
        {loading ? (
          <div className="loader">
            <div className="loader-spinner"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>Keine Bücher gefunden. Versuche einen anderen Filter!</p>
          </div>
        ) : (
          <div className="grid-3">
            {books.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* So funktioniert's */}
      <section className="how-it-works container">
        <h2>So funktioniert's</h2>
        <div className="steps-grid">
          <div className="step-card animate-fadeInUp stagger-1">
            <div className="step-number">1</div>
            <span className="step-icon">📖</span>
            <h3>Buch wählen</h3>
            <p>Wähle aus unserer Sammlung die perfekte Geschichte für dein Kind.</p>
          </div>
          <div className="step-card animate-fadeInUp stagger-2">
            <div className="step-number">2</div>
            <span className="step-icon">✏️</span>
            <h3>Personalisieren</h3>
            <p>Gib den Namen ein, wähle das Aussehen und die Sprache des Buches.</p>
          </div>
          <div className="step-card animate-fadeInUp stagger-3">
            <div className="step-number">3</div>
            <span className="step-icon">👀</span>
            <h3>Vorschau</h3>
            <p>Sieh dir eine Vorschau des personalisierten Buches an.</p>
          </div>
          <div className="step-card animate-fadeInUp stagger-4">
            <div className="step-number">4</div>
            <span className="step-icon">🎁</span>
            <h3>Bestellen</h3>
            <p>Bestelle das Buch und überrasche dein Kind mit seiner eigenen Geschichte!</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
