import './About.css';

/**
 * About – Über uns Seite (Statisch)
 * Stellt das Unternehmen und die Mission vor.
 * Keine Backend-Kommunikation nötig.
 */
function About() {
  return (
    <div className="page about-page">
      <div className="container">
        <div className="page-header">
          <h1>Über StoryWorld</h1>
          <p>Die Magie personalisierter Kinderbücher</p>
        </div>

        <div className="about-content">
          {/* Mission */}
          <section className="about-section animate-fadeInUp">
            <div className="about-text">
              <h2>Unsere Mission 💫</h2>
              <p>
                Bei StoryWorld glauben wir, dass jedes Kind der Held seiner eigenen Geschichte sein sollte. 
                Unsere personalisierten Kinderbücher machen genau das möglich – mit dem Namen und 
                Aussehen deines Kindes als Hauptfigur.
              </p>
              <p>
                Was uns besonders macht? Jedes Buch ist in mehreren Sprachen verfügbar! 
                So können Kinder ihre Abenteuer auf Deutsch und Englisch erleben und spielerisch 
                Sprachkompetenz entwickeln.
              </p>
            </div>
            <div className="about-visual">
              <div className="about-emoji-grid">
                <span>📚</span>
                <span>🌍</span>
                <span>✨</span>
                <span>💝</span>
              </div>
            </div>
          </section>

          {/* Werte */}
          <section className="about-values animate-fadeInUp stagger-2">
            <h2>Unsere Werte</h2>
            <div className="values-grid">
              <div className="value-card">
                <span className="value-icon">🎨</span>
                <h3>Kreativität</h3>
                <p>Jedes Buch ist ein Unikat, liebevoll gestaltet und auf dein Kind zugeschnitten.</p>
              </div>
              <div className="value-card">
                <span className="value-icon">🌱</span>
                <h3>Bildung</h3>
                <p>Mehrsprachige Bücher fördern die Sprachentwicklung und öffnen Türen zu neuen Welten.</p>
              </div>
              <div className="value-card">
                <span className="value-icon">🤗</span>
                <h3>Inklusion</h3>
                <p>Verschiedene Hauttöne und Darstellungen – jedes Kind soll sich wiedererkennen.</p>
              </div>
              <div className="value-card">
                <span className="value-icon">🌿</span>
                <h3>Nachhaltigkeit</h3>
                <p>Gedruckt auf umweltfreundlichem Papier mit pflanzlichen Farben.</p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="about-team animate-fadeInUp stagger-3">
            <h2>Das Team</h2>
            <p className="team-intro">
              StoryWorld wurde von zwei leidenschaftlichen Studenten gegründet, 
              die Technologie und Bildung zusammenbringen wollen.
            </p>
            <div className="team-grid">
              <div className="team-member card">
                <div className="member-avatar">👩‍💻</div>
                <h3>Teammitglied 1</h3>
                <p>Frontend-Entwicklung &amp; Design</p>
              </div>
              <div className="team-member card">
                <div className="member-avatar">👨‍💻</div>
                <h3>Teammitglied 2</h3>
                <p>Backend-Entwicklung &amp; REST-API</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
