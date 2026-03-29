# 📚 StoryWorld – Personalisierte Kinderbücher

Eine Single-Page-Application (SPA) für den Verkauf personalisierter Kinderbücher in mehreren Sprachen.

**Technologie-Stack:**
- **Frontend:** React 18 + React Router 6 + Vite
- **Backend:** Node.js + Express.js (REST-API)
- **Styling:** Vanilla CSS mit Custom Properties

## Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 18 oder höher)
- npm (wird mit Node.js installiert)

## Installation & Start

### 1. Repository klonen
```bash
git clone <repository-url>
cd kinderbuch-shop
```

### 2. Backend starten
```bash
cd backend
npm install
npm start
```
Der Server läuft auf `http://localhost:3001`.

### 3. Frontend starten (neues Terminal)
```bash
cd frontend
npm install
npm run dev
```
Die Anwendung ist unter `http://localhost:3000` erreichbar.

### Alternative: Beide gleichzeitig starten
```bash
# Terminal 1 – Backend
cd backend && npm install && npm start

# Terminal 2 – Frontend
cd frontend && npm install && npm run dev
```

## REST-API Endpunkte

| Methode | Pfad | Beschreibung |
|---------|------|------|
| `GET` | `/api/books` | Alle Bücher abrufen (Filter: `lang`, `ageRange`, `theme`) |
| `GET` | `/api/books/:id` | Einzelnes Buch mit Details |
| `POST` | `/api/customize/preview` | Personalisierte Vorschau erstellen |
| `GET` | `/api/customize/:previewId` | Vorschau-Daten abrufen |
| `GET` | `/api/cart` | Warenkorb anzeigen |
| `POST` | `/api/cart` | Artikel zum Warenkorb hinzufügen |
| `PUT` | `/api/cart/:itemId` | Artikelmenge aktualisieren |
| `DELETE` | `/api/cart/:itemId` | Artikel entfernen |
| `POST` | `/api/orders` | Bestellung aufgeben |
| `GET` | `/api/orders/:id` | Bestellstatus abrufen |

## Seitenstruktur (9 Unterseiten)

### Mit Backend-Kommunikation (6):
1. **Startseite** (`/`) – Bücherkatalog mit Filtern
2. **Buchdetails** (`/book/:id`) – Einzelbuchansicht
3. **Konfigurator** (`/configure/:id`) – Name, Aussehen, Sprache wählen
4. **Buchvorschau** (`/preview/:previewId`) – Personalisierte Seiten durchblättern
5. **Warenkorb** (`/cart`) – Artikel verwalten
6. **Kasse** (`/checkout`) – Bestellung aufgeben

### Statische Seiten (3):
7. **Über uns** (`/about`) – Mission und Team
8. **FAQ** (`/faq`) – Häufige Fragen (Accordion)
9. **Kontakt** (`/contact`) – Kontaktformular

## Projektstruktur

```
kinderbuch-shop/
├── backend/
│   ├── server.js              # Express-Server
│   ├── routes/
│   │   ├── books.js           # Bücher-Endpunkte
│   │   ├── customize.js       # Personalisierung
│   │   ├── cart.js             # Warenkorb
│   │   └── orders.js          # Bestellungen
│   └── data/
│       └── books.json          # Buchdaten (DE + EN)
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Routing
│   │   ├── context/
│   │   │   └── CartContext.jsx # Globaler Warenkorb-State
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation
│   │   │   ├── Footer.jsx     # Fußzeile
│   │   │   └── BookCard.jsx   # Buchkarte
│   │   └── pages/             # 9 Unterseiten
│   │       ├── Home.jsx
│   │       ├── BookDetail.jsx
│   │       ├── Configurator.jsx
│   │       ├── BookPreview.jsx
│   │       ├── Cart.jsx
│   │       ├── Checkout.jsx
│   │       ├── About.jsx
│   │       ├── FAQ.jsx
│   │       └── Contact.jsx
│   └── vite.config.js         # Vite-Konfiguration mit API-Proxy
└── README.md
```

## Autoren

- Hania Sayyed
- Canan Balikci 

Erstellt im Rahmen des Moduls Webprogrammierung, 2026.
