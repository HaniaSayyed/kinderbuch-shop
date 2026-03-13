import { useState } from 'react';
import './FAQ.css';

/**
 * FAQ – Häufig gestellte Fragen (Statisch)
 * Accordion-Komponente für FAQ-Einträge.
 * Keine Backend-Kommunikation.
 */

/** Einzelner FAQ-Eintrag */
function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={onClick}>
        <span>{question}</span>
        <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: 'Wie funktioniert die Personalisierung?',
      answer: 'Du wählst ein Buch aus unserer Sammlung, gibst den Namen deines Kindes ein, wählst Aussehen und Sprache – und wir erstellen ein einzigartiges Buch, in dem dein Kind die Hauptfigur ist!'
    },
    {
      question: 'In welchen Sprachen sind die Bücher verfügbar?',
      answer: 'Aktuell bieten wir alle Bücher auf Deutsch und Englisch an. Weitere Sprachen sind in Planung! Jedes Buch kann in einer Sprache bestellt werden – oder bestelle einfach beide Versionen.'
    },
    {
      question: 'Für welches Alter sind die Bücher geeignet?',
      answer: 'Unsere Bücher sind für Kinder von 2 bis 7 Jahren konzipiert. Jedes Buch hat eine empfohlene Altersangabe, die dir bei der Auswahl hilft.'
    },
    {
      question: 'Wie lange dauert die Lieferung?',
      answer: 'Der Standardversand dauert 7–10 Werktage, der Expressversand 3–5 Werktage. Jedes Buch wird nach der Bestellung individuell gedruckt und gebunden.'
    },
    {
      question: 'Kann ich das Buch vor der Bestellung sehen?',
      answer: 'Ja! Nachdem du das Buch personalisiert hast, erhältst du eine Vorschau mit allen Seiten. Erst wenn du zufrieden bist, legst du es in den Warenkorb.'
    },
    {
      question: 'Welche Zahlungsmethoden werden akzeptiert?',
      answer: 'Wir akzeptieren Kreditkarte, PayPal und Überweisung. Alle Zahlungen werden sicher über verschlüsselte Verbindungen abgewickelt. (Demo-Projekt: keine echte Zahlung)'
    },
    {
      question: 'Kann ich meine Bestellung stornieren?',
      answer: 'Da jedes Buch individuell gedruckt wird, ist eine Stornierung nur innerhalb von 2 Stunden nach Bestellung möglich. Kontaktiere uns in diesem Fall direkt.'
    },
    {
      question: 'Gibt es Rabatte bei mehreren Büchern?',
      answer: 'Ja! Ab einer Bestellung von 3 Büchern erhältst du 10% Rabatt auf den Gesamtpreis. Ideal als Geschenke für Geschwisterkinder oder Freunde!'
    }
  ];

  return (
    <div className="page faq-page">
      <div className="container">
        <div className="page-header">
          <h1>Häufige Fragen</h1>
          <p>Alles, was du über StoryWorld wissen musst</p>
        </div>

        <div className="faq-list animate-fadeInUp">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="faq-cta animate-fadeInUp stagger-2">
          <p>Noch Fragen? Wir helfen dir gerne!</p>
          <a href="/contact" className="btn btn-primary">
            ✉️ Kontakt aufnehmen
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
