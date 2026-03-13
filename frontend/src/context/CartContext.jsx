import { createContext, useContext, useState, useCallback } from 'react';

/**
 * CartContext – Globaler Warenkorb-State
 * 
 * Verwaltet den Warenkorb-Zustand und kommuniziert mit dem Backend.
 * Stellt Funktionen zum Hinzufügen, Entfernen und Laden des Warenkorbs bereit.
 */
const CartContext = createContext(null);

const API_BASE = '/api';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  /** Warenkorb vom Backend laden */
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/cart`);
      const data = await res.json();
      setCartItems(data.items);
      setTotalPrice(data.totalPrice);
    } catch (err) {
      console.error('Fehler beim Laden des Warenkorbs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /** Artikel zum Warenkorb hinzufügen (über Backend) */
  const addToCart = useCallback(async (item) => {
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        await fetchCart(); // Warenkorb neu laden
        return true;
      }
      return false;
    } catch (err) {
      console.error('Fehler beim Hinzufügen:', err);
      return false;
    }
  }, [fetchCart]);

  /** Artikel aus dem Warenkorb entfernen */
  const removeFromCart = useCallback(async (itemId) => {
    try {
      const res = await fetch(`${API_BASE}/cart/${itemId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchCart();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Fehler beim Entfernen:', err);
      return false;
    }
  }, [fetchCart]);

  /** Artikelmenge aktualisieren */
  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      const res = await fetch(`${API_BASE}/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      if (res.ok) {
        await fetchCart();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Fehler beim Aktualisieren:', err);
      return false;
    }
  }, [fetchCart]);

  /** Anzahl der Artikel im Warenkorb */
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const value = {
    cartItems,
    totalPrice,
    cartCount,
    loading,
    fetchCart,
    addToCart,
    removeFromCart,
    updateQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/** Hook zum Zugriff auf den Cart-Context */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart muss innerhalb eines CartProviders verwendet werden');
  }
  return context;
}
