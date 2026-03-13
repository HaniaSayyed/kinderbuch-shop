import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

/**
 * Cart – Warenkorb-Seite
 * Zeigt alle Artikel im Warenkorb mit Möglichkeit zum Entfernen und Mengenänderung.
 * Kommuniziert mit: GET /api/cart, DELETE /api/cart/:id, PUT /api/cart/:id
 */
function Cart() {
  const { cartItems, totalPrice, loading, fetchCart, removeFromCart, updateQuantity } = useCart();
  const [removingId, setRemovingId] = useState(null);

  // Warenkorb beim Laden der Seite aktualisieren
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  /** Artikel entfernen */
  const handleRemove = async (itemId) => {
    setRemovingId(itemId);
    await removeFromCart(itemId);
    setRemovingId(null);
  };

  /** Menge ändern */
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(itemId, newQuantity);
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loader"><div className="loader-spinner"></div></div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <div className="container">
        <div className="page-header">
          <h1>🛒 Warenkorb</h1>
          <p>
            {cartItems.length === 0
              ? 'Dein Warenkorb ist leer'
              : `${cartItems.length} ${cartItems.length === 1 ? 'Artikel' : 'Artikel'} im Warenkorb`
            }
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart animate-fadeInUp">
            <span className="empty-cart-icon">🛒</span>
            <h2>Noch keine Bücher im Warenkorb</h2>
            <p>Entdecke unsere Sammlung und erstelle ein personalisiertes Buch!</p>
            <Link to="/" className="btn btn-primary btn-lg">
              📚 Bücher entdecken
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Artikelliste */}
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`cart-item card animate-fadeInUp ${removingId === item.id ? 'removing' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="cart-item-cover">
                    <span>{item.cover}</span>
                  </div>
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p className="cart-item-meta">
                      Für <strong>{item.childName}</strong> · {item.language === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}
                    </p>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-price">
                    <span className="price price-small">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemove(item.id)}
                    title="Artikel entfernen"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Zusammenfassung */}
            <div className="cart-summary card animate-fadeInUp stagger-3">
              <h3>Zusammenfassung</h3>
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Artikel ({cartItems.length})</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="summary-row">
                  <span>Versand</span>
                  <span className="shipping-note">ab 3,99 €</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Gesamt</span>
                  <span className="price">{totalPrice.toFixed(2)} €</span>
                </div>
              </div>
              <Link to="/checkout" className="btn btn-primary btn-lg checkout-btn">
                Zur Kasse →
              </Link>
              <Link to="/" className="btn btn-outline continue-btn">
                Weiter einkaufen
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
