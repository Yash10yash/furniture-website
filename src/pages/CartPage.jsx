import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

/* ── Empty State ── */
const EmptyCart = () => {
    const navigate = useNavigate();
    return (
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.25rem' }}>🛒</div>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', marginBottom: '0.75rem' }}>Your cart is empty</h2>
            <p style={{ color: '#6C757D', fontSize: '0.95rem', marginBottom: '2rem' }}>Looks like you haven't added anything yet. Let's change that!</p>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/shop')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#3B5D50', color: '#fff', border: 'none', cursor: 'pointer', padding: '0.9rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif' }}>
                <ShoppingBag size={16} /> Start Shopping
            </motion.button>
        </div>
    );
};

/* ── Cart Item Row ── */
const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const subtotal = (item.price * item.quantity).toFixed(2);

    return (
        <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}
            style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', padding: '1.25rem', backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #f0f0f0' }}
        >
            {/* Image */}
            <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0, backgroundColor: '#F8F9FA' }} />

            {/* Info */}
            <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '6px' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3 }}>{item.name}</h3>
                    <button onClick={() => removeFromCart(item._id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '4px', flexShrink: 0, display: 'flex', borderRadius: '6px', transition: 'color 0.2s, background 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.backgroundColor = '#fef2f2'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                        <Trash2 size={15} />
                    </button>
                </div>

                {item.category && (
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#3B5D50', backgroundColor: '#EBF2EF', padding: '2px 8px', borderRadius: '20px', marginBottom: '10px', display: 'inline-block' }}>
                        {item.category}
                    </span>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {/* Qty */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            style={{ width: '34px', height: '34px', background: '#F8F9FA', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F8F9FA'}><Minus size={13} /></button>
                        <div style={{ width: '44px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' }}>{item.quantity}</div>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            style={{ width: '34px', height: '34px', background: '#F8F9FA', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F8F9FA'}><Plus size={13} /></button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>${item.price.toFixed(2)} each</p>
                        <p style={{ fontWeight: 800, fontSize: '1rem', color: '#3B5D50', fontFamily: 'Poppins, sans-serif' }}>${subtotal}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ── Order Summary Card ── */
const OrderSummary = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();
    const shipping = cartTotal >= 50 ? 0 : 9.99;
    const tax = (cartTotal * 0.08).toFixed(2);
    const grand = (cartTotal + shipping + parseFloat(tax)).toFixed(2);

    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #f0f0f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0' }}>Order Summary</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.25rem' }}>
                {[
                    { label: `Subtotal (${cartItems.reduce((s, i) => s + i.quantity, 0)} items)`, value: `$${cartTotal.toFixed(2)}` },
                    { label: 'Shipping', value: shipping === 0 ? <span style={{ color: '#22c55e', fontWeight: 700 }}>Free</span> : `$${shipping.toFixed(2)}` },
                    { label: 'Tax (8%)', value: `$${tax}` },
                ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.875rem', color: '#6C757D' }}>{row.label}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2F2F2F' }}>{row.value}</span>
                    </div>
                ))}
            </div>

            {shipping > 0 && (
                <div style={{ backgroundColor: '#FFF9E6', borderRadius: '8px', padding: '0.625rem 0.875rem', marginBottom: '1.25rem', fontSize: '0.78rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={13} /> Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderTop: '2px solid #f0f0f0', marginBottom: '1.25rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif' }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: '1.4rem', color: '#3B5D50', fontFamily: 'Poppins, sans-serif' }}>${grand}</span>
            </div>

            <motion.button whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(249,191,41,0.35)' }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/shop')}
                style={{ width: '100%', padding: '0.9rem', borderRadius: '10px', border: 'none', cursor: 'pointer', backgroundColor: '#F9BF29', color: '#2F2F2F', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                Proceed to Checkout <ArrowRight size={16} />
            </motion.button>

            <button onClick={() => navigate('/shop')}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '2px solid #e5e7eb', cursor: 'pointer', backgroundColor: 'transparent', color: '#6C757D', fontWeight: 600, fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#3B5D50'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}>
                ← Continue Shopping
            </button>

            {cartItems.length > 0 && (
                <button onClick={clearCart}
                    style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: '#ef4444', fontWeight: 600, fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    🗑 Clear Cart
                </button>
            )}
        </div>
    );
};

/* ── Cart Page ── */
const CartPage = () => {
    const { cartItems } = useCart();

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '70px', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #3B5D50 0%, #2e4a3e 100%)', padding: '3rem 2rem' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <p style={{ color: '#F9BF29', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>— Your Selection</p>
                        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                            Shopping Cart {cartItems.length > 0 && <span style={{ fontSize: '1rem', fontWeight: 500, opacity: 0.7 }}>({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>}
                        </h1>
                    </div>
                </div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
                    {cartItems.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', alignItems: 'flex-start' }}>
                            {/* Cart Items */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <AnimatePresence mode="popLayout">
                                    {cartItems.map(item => <CartItem key={item._id} item={item} />)}
                                </AnimatePresence>
                            </div>

                            {/* Summary */}
                            <OrderSummary />
                        </div>
                    )}
                </div>
            </div>
            <Footer />

            <style>{`
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </>
    );
};

export default CartPage;
