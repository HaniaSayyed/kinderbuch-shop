import './Contact.css';

/**
 * Contact – Kontaktseite (Statisch)
 * Zeigt Kontaktmöglichkeiten und ein dekoratives Kontaktformular.
 * Keine Backend-Kommunikation (statische Seite).
 */
function Contact() {
  /** Formular-Submit (Demo – sendet nichts) */
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Danke für deine Nachricht! (Dies ist ein Demo-Projekt – Nachrichten werden nicht versendet.)');
  };

  return (
    <div className="page contact-page">
      <div className="container">
        <div className="page-header">
          <h1>Kontakt</h1>
          <p>Wir freuen uns, von dir zu hören!</p>
        </div>

        <div className="contact-grid">
          {/* Kontaktinformationen */}
          <div className="contact-info animate-fadeInUp">
            <div className="contact-card">
              <span className="contact-icon">📧</span>
              <h3>E-Mail</h3>
              <p>hallo@storyworld.de</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">📍</span>
              <h3>Adresse</h3>
              <p>Musterstraße 42<br />12345 Berlin, Deutschland</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">🕐</span>
              <h3>Erreichbarkeit</h3>
              <p>Mo–Fr: 9:00 – 17:00 Uhr<br />Sa–So: Geschlossen</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">💬</span>
              <h3>Social Media</h3>
              <p>@storyworld auf Instagram, Facebook und Twitter</p>
            </div>
          </div>

          {/* Kontaktformular */}
          <form onSubmit={handleSubmit} className="contact-form card animate-fadeInUp stagger-2">
            <div className="contact-form-inner">
              <h3>Schreib uns eine Nachricht</h3>
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input type="text" id="contact-name" placeholder="Dein Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">E-Mail</label>
                <input type="email" id="contact-email" placeholder="deine@email.de" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject">Betreff</label>
                <select id="contact-subject">
                  <option value="general">Allgemeine Frage</option>
                  <option value="order">Frage zur Bestellung</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Kooperation</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Nachricht</label>
                <textarea id="contact-message" placeholder="Deine Nachricht..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg submit-btn">
                ✉️ Nachricht senden
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
