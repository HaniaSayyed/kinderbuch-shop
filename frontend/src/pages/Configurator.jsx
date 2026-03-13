import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Configurator.css';

/**
 * Configurator – Personalisierung eines Buches
 * Hier kann der Benutzer Name, Aussehen und Sprache wählen.
 * Kommuniziert mit: GET /api/books/:id, POST /api/customize/preview
 */
function Configurator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Formulardaten
  const [formData, setFormData] = useState({
    childName: '',
    gender: 'neutral',
    hairColor: 'brown',
    skinTone: 'medium',
    language: 'de'
  });

  // Buch laden
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
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

  /** Formular-Eingabe verarbeiten */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /** Vorschau erstellen und zur Preview-Seite navigieren */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.childName.trim()) {
      alert('Bitte gib den Namen des Kindes ein!');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/customize/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: parseInt(id),
          childName: formData.childName.trim(),
          language: formData.language,
          hairColor: formData.hairColor,
          skinTone: formData.skinTone,
          gender: formData.gender
        })
      });

      if (!res.ok) throw new Error('Fehler bei der Personalisierung');

      const preview = await res.json();
      navigate(`/preview/${preview.id}`);
    } catch (err) {
      console.error('Fehler:', err);
      alert('Etwas ist schiefgelaufen. Bitte versuche es erneut.');
    } finally {
      setSubmitting(false);
    }
  };

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
        </div>
      </div>
    );
  }

  // Optionen für Anpassung
  const hairColors = [
    { value: 'blonde', label: 'Blond', color: '#F4D03F' },
    { value: 'brown', label: 'Braun', color: '#8B6914' },
    { value: 'black', label: 'Schwarz', color: '#2C2C2C' },
    { value: 'red', label: 'Rot', color: '#C0392B' },
    { value: 'auburn', label: 'Kupfer', color: '#A0522D' },
  ];

  const skinTones = [
    { value: 'light', label: 'Hell', color: '#FDEBD0' },
    { value: 'medium-light', label: 'Mittel-Hell', color: '#F5CBA7' },
    { value: 'medium', label: 'Mittel', color: '#E0B88A' },
    { value: 'medium-dark', label: 'Mittel-Dunkel', color: '#C49A6C' },
    { value: 'dark', label: 'Dunkel', color: '#8D6E4C' },
  ];

  return (
    <div className="page configurator-page">
      <div className="container">
        <div className="page-header">
          <h1>✏️ Buch personalisieren</h1>
          <p>Gestalte „{book.title.de}" für dein Kind</p>
        </div>

        <div className="configurator-grid">
          {/* Formular */}
          <form onSubmit={handleSubmit} className="config-form card animate-fadeInUp">
            <div className="config-form-inner">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="childName">👶 Name des Kindes *</label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  placeholder="z.B. Emma, Leon, Sofia..."
                  maxLength={30}
                  required
                />
              </div>

              {/* Geschlecht */}
              <div className="form-group">
                <label>🎀 Darstellung</label>
                <div className="option-buttons">
                  {[
                    { value: 'girl', label: '👧 Mädchen' },
                    { value: 'boy', label: '👦 Junge' },
                    { value: 'neutral', label: '🧒 Neutral' }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      className={`option-btn ${formData.gender === option.value ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, gender: option.value }))}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Haarfarbe */}
              <div className="form-group">
                <label>💇 Haarfarbe</label>
                <div className="color-options">
                  {hairColors.map(hc => (
                    <button
                      key={hc.value}
                      type="button"
                      className={`color-btn ${formData.hairColor === hc.value ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, hairColor: hc.value }))}
                      title={hc.label}
                    >
                      <span className="color-swatch" style={{ background: hc.color }}></span>
                      <span className="color-label">{hc.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hautton */}
              <div className="form-group">
                <label>🎨 Hautton</label>
                <div className="color-options">
                  {skinTones.map(st => (
                    <button
                      key={st.value}
                      type="button"
                      className={`color-btn ${formData.skinTone === st.value ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, skinTone: st.value }))}
                      title={st.label}
                    >
                      <span className="color-swatch" style={{ background: st.color }}></span>
                      <span className="color-label">{st.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sprache */}
              <div className="form-group">
                <label htmlFor="language">🌍 Sprache des Buches *</label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  {book.availableLanguages.map(lang => (
                    <option key={lang} value={lang}>
                      {lang === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button 
                type="submit" 
                className="btn btn-primary btn-lg submit-btn"
                disabled={submitting || !formData.childName.trim()}
              >
                {submitting ? '⏳ Wird erstellt...' : '👀 Vorschau ansehen'}
              </button>
            </div>
          </form>

          {/* Live-Vorschau */}
          <div className="config-preview animate-fadeInUp stagger-2">
            <div className="preview-card card">
              <div className="preview-cover">
                <span className="preview-emoji">{book.cover}</span>
              </div>
              <div className="preview-info">
                <h3>
                  {book.title[formData.language].replace(
                    /{childName}/g, 
                    formData.childName || '...'
                  )}
                </h3>
                <p className="preview-sample">
                  {book.pages[formData.language][0].text.replace(
                    /{childName}/g,
                    formData.childName || '...'
                  )}
                </p>
                <div className="preview-details">
                  <span className="tag tag-primary">
                    {formData.language === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
                  </span>
                  <span className="price price-small">{book.price.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configurator;
