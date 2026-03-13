import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

/**
 * Checkout – Bestellvorgang
 * Sammelt Kundendaten und sendet die Bestellung an das Backend.
 * Kommuniziert mit: POST /api/orders
 */
function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, fetchCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);

  // Formulardaten
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    zip: '',
    country: 'Deutschland',
    shippingMethod: 'standard'
  });

  // Warenkorb laden
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  /** Formular-Eingabe verarbeiten */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /** Bestellung absenden */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customer: {
            name: formData.name,
            email: formData.email,
            address: {
              street: formData.street,
              city: formData.city,
              zip: formData.zip,
              country: formData.country
            }
          },
          shippingMethod: formData.shippingMethod
        })
      });

      if (!res.ok) throw new Error('Bestellfehler');

      const orderData = await res.json();
      setOrder(orderData);
    } catch (err) {
      console.error('Fehler:', err);
      alert('Es gab einen Fehler bei der Bestellung. Bitte versuche es erneut.');
    } finally {
      setSubmitting(false);
    }
  };

  // Bestellbestätigung anzeigen
  if (order) {
    return (
      <div className="page checkout-page">
        <div className="container">
          <div className="order-confirmation animate-bounceIn">
            <div className="confirmation-icon">🎉</div>
            <h1>Bestellung aufgegeben!</h1>
            <p className="confirmation-id">Bestellnummer: <strong>{order.id}</strong></p>
            <div className="confirmation-details card">
              <div className="confirmation-row">
                <span>Status</span>
                <span className="tag tag-secondary">Bestätigt ✓</span>
              </div>
              <div className="confirmation-row">
                <span>Artikel</span>
                <span>{order.items.length} Bücher</span>
              </div>
              <div className="confirmation-row">
                <span>Versand</span>
                <span>{order.estimatedDelivery}</span>
              </div>
              <div className="confirmation-row">
                <span>Versandkosten</span>
                <span>{order.shippingCost.toFixed(2)} €</span>
              </div>
              <div className="confirmation-row confirmation-total">
                <span>Gesamtbetrag</span>
                <span className="price">{order.totalPrice.toFixed(2)} €</span>
              </div>
            </div>
            <p className="confirmation-note">
              Eine Bestätigung wurde an <strong>{order.customer.email}</strong> gesendet.
            </p>
            <Link to="/" className="btn btn-primary btn-lg">
              📚 Weiter stöbern
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Warenkorb leer
  if (cartItems.length === 0) {
    return (
      <div className="page checkout-page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-icon">🛒</span>
            <h2>Dein Warenkorb ist leer</h2>
            <p>Füge zuerst Bücher hinzu, bevor du zur Kasse gehst.</p>
            <Link to="/" className="btn btn-primary">Bücher entdecken</Link>
          </div>
        </div>
      </div>
    );
  }

  const shippingCost = formData.shippingMethod === 'express' ? 7.99 : 3.99;
  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="page checkout-page">
      <div className="container">
        <div className="page-header">
          <h1>📦 Kasse</h1>
          <p>Fast geschafft! Gib deine Daten ein, um die Bestellung abzuschließen.</p>
        </div>

        <div className="checkout-grid">
          {/* Formular */}
          <form onSubmit={handleSubmit} className="checkout-form card animate-fadeInUp">
            <div className="checkout-form-inner">
              <h3>Lieferadresse</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Max Mustermann"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-Mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="max@beispiel.de"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="street">Straße und Hausnummer *</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Musterstraße 1"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zip">PLZ *</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="12345"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">Stadt *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Berlin"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Land</label>
                <select id="country" name="country" value={formData.country} onChange={handleChange}>
                  <option value="Deutschland">Deutschland</option>
                  <option value="Österreich">Österreich</option>
                  <option value="Schweiz">Schweiz</option>
                </select>
              </div>

              <h3 className="shipping-title">Versandart</h3>

              <div className="shipping-options">
                <label className={`shipping-option ${formData.shippingMethod === 'standard' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={handleChange}
                  />
                  <div className="shipping-info">
                    <span className="shipping-name">📦 Standardversand</span>
                    <span className="shipping-time">7–10 Werktage</span>
                  </div>
                  <span className="shipping-price">3,99 €</span>
                </label>

                <label className={`shipping-option ${formData.shippingMethod === 'express' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === 'express'}
                    onChange={handleChange}
                  />
                  <div className="shipping-info">
                    <span className="shipping-name">🚀 Expressversand</span>
                    <span className="shipping-time">3–5 Werktage</span>
                  </div>
                  <span className="shipping-price">7,99 €</span>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg submit-btn"
                disabled={submitting}
              >
                {submitting ? '⏳ Wird verarbeitet...' : `🛍️ Jetzt bestellen (${grandTotal.toFixed(2)} €)`}
              </button>
            </div>
          </form>

          {/* Bestellübersicht */}
          <div className="checkout-summary animate-fadeInUp stagger-2">
            <div className="card">
              <div className="checkout-summary-inner">
                <h3>Deine Bestellung</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-item">
                    <span className="checkout-item-cover">{item.cover}</span>
                    <div className="checkout-item-info">
                      <span className="checkout-item-title">{item.title}</span>
                      <span className="checkout-item-meta">
                        Für {item.childName} · {item.quantity}x
                      </span>
                    </div>
                    <span className="checkout-item-price">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
                <div className="checkout-totals">
                  <div className="checkout-total-row">
                    <span>Zwischensumme</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="checkout-total-row">
                    <span>Versand</span>
                    <span>{shippingCost.toFixed(2)} €</span>
                  </div>
                  <div className="checkout-total-row checkout-grand-total">
                    <span>Gesamt</span>
                    <span className="price">{grandTotal.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
