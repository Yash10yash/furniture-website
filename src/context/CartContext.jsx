import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingCart, X } from 'lucide-react';

const CartContext = createContext();

/* ── Toast Component ── */
const Toast = ({ toasts, removeToast }) => (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        <AnimatePresence>
            {toasts.map(t => (
                <motion.div key={t.id}
                    initial={{ opacity: 0, x: 60, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 60, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#fff', borderRadius: '12px', padding: '0.875rem 1.125rem', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', border: '1px solid #f0f0f0', minWidth: '280px', maxWidth: '340px' }}
                >
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#EBF2EF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {t.type === 'cart' ? <ShoppingCart size={15} color="#3B5D50" /> : <CheckCircle size={15} color="#3B5D50" />}
                    </div>
                    <div style={{ flexGrow: 1 }}>
                        <p style={{ fontWeight: 700, fontSize: '0.82rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', lineHeight: 1.2 }}>{t.title}</p>
                        {t.desc && <p style={{ fontSize: '0.75rem', color: '#6C757D', marginTop: '2px' }}>{t.desc}</p>}
                    </div>
                    <button onClick={() => removeToast(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '2px', display: 'flex' }}>
                        <X size={14} />
                    </button>
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
);

/* ── Provider ── */
export const CartProvider = ({ children }) => {
    // Initialise from localStorage
    const [cartItems, setCartItems] = useState(() => {
        try { return JSON.parse(localStorage.getItem('furni_cart')) || []; }
        catch { return []; }
    });
    const [toasts, setToasts] = useState([]);

    // Sync to localStorage on every change
    useEffect(() => {
        localStorage.setItem('furni_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    /* ── Toast helpers ── */
    const addToast = useCallback((title, desc = '', type = 'cart') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, title, desc, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, []);
    const removeToast = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), []);

    /* ── Cart actions ── */
    const addToCart = useCallback((product) => {
        setCartItems(prev => {
            const exists = prev.find(i => i._id === product._id);
            if (exists) {
                addToast('Quantity updated', `${product.name} (×${exists.quantity + 1})`, 'cart');
                return prev.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            addToast('Added to cart!', product.name, 'cart');
            return [...prev, { ...product, quantity: product.quantity || 1 }];
        });
    }, [addToast]);

    const removeFromCart = useCallback((id) => {
        setCartItems(prev => {
            const item = prev.find(i => i._id === id);
            if (item) addToast('Removed', item.name, 'remove');
            return prev.filter(i => i._id !== id);
        });
    }, [addToast]);

    const updateQuantity = useCallback((id, qty) => {
        if (qty < 1) return removeFromCart(id);
        setCartItems(prev => prev.map(i => i._id === id ? { ...i, quantity: qty } : i));
    }, [removeFromCart]);

    const clearCart = useCallback(() => setCartItems([]), []);

    const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
    const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, addToast }}>
            {children}
            <Toast toasts={toasts} removeToast={removeToast} />
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
