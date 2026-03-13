import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Configurator from './pages/Configurator';
import BookPreview from './pages/BookPreview';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

/**
 * Hauptkomponente der StoryWorld SPA.
 * Nutzt React Router für clientseitiges Routing und CartProvider für den globalen Warenkorb-State.
 */
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route path="/configure/:id" element={<Configurator />} />
              <Route path="/preview/:previewId" element={<BookPreview />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
