import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, ArrowLeft, Zap, ShieldCheck, Truck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import axios from 'axios';

/* ── Fallback data ── */
const FALLBACK = {
    f1: { _id: 'f1', name: 'Nordic Lounge Chair', price: 129.99, rating: 4.5, category: 'Chairs', description: 'Scandinavian-inspired lounge chair with premium soft fabric upholstery. Designed for ultimate comfort with a solid wood frame.', stock: 12, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'] },
    f2: { _id: 'f2', name: 'Luxe Sofa Set', price: 449.99, rating: 4.8, category: 'Sofas', description: 'Premium 3-seater sofa with deep cushions and durable fabric. A centerpiece for any modern living room.', stock: 5, images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop'] },
    f3: { _id: 'f3', name: 'Minimalist Coffee Table', price: 89.99, rating: 4.2, category: 'Tables', description: 'Sleek rectangular coffee table with walnut finish. Pairs perfectly with any sofa.', stock: 20, images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop'] },
    f4: { _id: 'f4', name: 'Velvet Accent Chair', price: 199.99, rating: 4.6, category: 'Chairs', description: 'Bold velvet accent chair for any living space. Available in multiple colors.', stock: 8, images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop'] },
    f5: { _id: 'f5', name: 'Rattan Pendant Lamp', price: 74.99, rating: 4.3, category: 'Lighting', description: 'Handwoven rattan pendant lamp for warm, bohemian ambience.', stock: 15, images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop'] },
    f6: { _id: 'f6', name: 'Modern Bookshelf', price: 159.99, rating: 4.4, category: 'Storage', description: 'Open-shelf bookcase in natural oak finish. 5 tiers of generous storage.', stock: 7, images: ['https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&auto=format&fit=crop'] },
    f7: { _id: 'f7', name: 'Marble Dining Table', price: 599.99, rating: 4.9, category: 'Tables', description: 'Elegant marble-top dining table for 6. Solid iron frame, easy to clean.', stock: 3, images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop'] },
    f8: { _id: 'f8', name: 'Leather Office Chair', price: 249.99, rating: 4.7, category: 'Chairs', description: 'Ergonomic leather office chair with lumbar support and adjustable height.', stock: 10, images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&auto=format&fit=crop'] },
};

const Stars = ({ rating }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill={s <= Math.round(rating) ? '#F9BF29' : 'none'} color={s <= Math.round(rating) ? '#F9BF29' : '#ccc'} />)}
        <span style={{ fontSize: '0.85rem', color: '#6C757D', marginLeft: '6px', fontWeight: 600 }}>{rating.toFixed(1)} / 5</span>
    </div>
);

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);
    const [addedMsg, setAddedMsg] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/products/${id}`)
            .then(res => {
                const p = res.data?.data;
                if (p) {
                    setProduct({ ...p, rating: p.rating || 4.5, images: p.images || [p.image], stock: p.stock || 10 });
                } else throw new Error('Not found');
            })
            .catch(() => {
                const fb = FALLBACK[id];
                if (fb) setProduct(fb);
                else navigate('/shop');
            })
            .finally(() => setLoading(false));
    }, [id]);

    // Carousel keyboard nav
    const images = product?.images || [];
    const prevImg = useCallback(() => setActiveImg(i => (i - 1 + images.length) % images.length), [images.length]);
    const nextImg = useCallback(() => setActiveImg(i => (i + 1) % images.length), [images.length]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowLeft') prevImg();
            if (e.key === 'ArrowRight') nextImg();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [prevImg, nextImg]);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity: qty });
        setAddedMsg('Added to cart!');
        setTimeout(() => setAddedMsg(''), 2000);
    };

    const handleBuyNow = () => {
        addToCart({ ...product, quantity: qty });
        navigate('/cart');
    };

    if (loading) return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '70px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', border: '4px solid #F8F9FA', borderTop: '4px solid #3B5D50', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
                    <p style={{ color: '#6C757D', fontFamily: 'Poppins, sans-serif' }}>Loading product...</p>
                </div>
            </div>
            <Footer />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
    );

    if (!product) return null;

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '70px', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem' }}>
                    {/* Breadcrumb */}
                    <button onClick={() => navigate('/shop')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#6C757D', fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif', marginBottom: '2rem', padding: 0 }}>
                        <ArrowLeft size={16} /> Back to Shop
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>

                        {/* ── LEFT — Image Carousel ── */}
                        <div>
                            {/* Main image */}
                            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', marginBottom: '1rem', height: '420px' }}>
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeImg}
                                        src={images[activeImg]}
                                        alt={product.name}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </AnimatePresence>

                                {/* Prev / Next */}
                                {images.length > 1 && (
                                    <>
                                        <button onClick={prevImg} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', zIndex: 2 }}>
                                            <ChevronLeft size={18} color="#2F2F2F" />
                                        </button>
                                        <button onClick={nextImg} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', zIndex: 2 }}>
                                            <ChevronRight size={18} color="#2F2F2F" />
                                        </button>
                                        {/* Dots */}
                                        <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '6px', zIndex: 2 }}>
                                            {images.map((_, i) => (
                                                <button key={i} onClick={() => setActiveImg(i)} style={{ width: i === activeImg ? '20px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === activeImg ? '#F9BF29' : 'rgba(255,255,255,0.7)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '4px' }}>
                                    {images.map((src, i) => (
                                        <button key={i} onClick={() => setActiveImg(i)} style={{ flexShrink: 0, width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', border: `2.5px solid ${i === activeImg ? '#3B5D50' : 'transparent'}`, cursor: 'pointer', padding: 0, transition: 'border-color 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                                            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── RIGHT — Product Info ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span style={{ backgroundColor: '#F0F7F4', color: '#3B5D50', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', fontFamily: 'Poppins, sans-serif' }}>
                                {product.category}
                            </span>

                            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', marginTop: '0.875rem', marginBottom: '0.875rem', lineHeight: 1.25 }}>
                                {product.name}
                            </h1>

                            <Stars rating={product.rating || 4.5} />

                            <div style={{ margin: '1.5rem 0', paddingBottom: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#3B5D50', fontFamily: 'Poppins, sans-serif' }}>
                                    ${product.price.toFixed(2)}
                                </span>
                                <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', color: '#6C757D', textDecoration: 'line-through' }}>
                                    ${(product.price * 1.2).toFixed(2)}
                                </span>
                                <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', fontWeight: 700, color: '#22c55e' }}>
                                    17% OFF
                                </span>
                            </div>

                            <p style={{ color: '#6C757D', fontSize: '0.93rem', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                                {product.description}
                            </p>

                            {/* Stock status */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: product.stock > 5 ? '#22c55e' : '#f97316', flexShrink: 0 }} />
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: product.stock > 5 ? '#22c55e' : '#f97316' }}>
                                    {product.stock > 5 ? `In Stock (${product.stock} available)` : `Low Stock — only ${product.stock} left!`}
                                </span>
                            </div>

                            {/* Quantity */}
                            <div style={{ marginBottom: '1.75rem' }}>
                                <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2F2F2F', marginBottom: '0.6rem', fontFamily: 'Poppins, sans-serif' }}>Quantity</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                                    <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: '40px', height: '40px', border: '1px solid #e0e0e0', borderRadius: '8px 0 0 8px', backgroundColor: '#F8F9FA', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={14} /></button>
                                    <div style={{ width: '56px', height: '40px', border: '1px solid #e0e0e0', borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', fontFamily: 'Poppins, sans-serif' }}>{qty}</div>
                                    <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ width: '40px', height: '40px', border: '1px solid #e0e0e0', borderRadius: '0 8px 8px 0', backgroundColor: '#F8F9FA', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={14} /></button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                <motion.button
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    onClick={handleAddToCart}
                                    style={{ flex: 1, minWidth: '160px', padding: '0.9rem 1.5rem', borderRadius: '10px', border: '2.5px solid #3B5D50', backgroundColor: addedMsg ? '#3B5D50' : '#fff', color: addedMsg ? '#fff' : '#3B5D50', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s' }}
                                >
                                    <ShoppingCart size={17} />
                                    {addedMsg || 'Add to Cart'}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    onClick={handleBuyNow}
                                    style={{ flex: 1, minWidth: '160px', padding: '0.9rem 1.5rem', borderRadius: '10px', border: 'none', backgroundColor: '#F9BF29', color: '#2F2F2F', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 6px 20px rgba(249,191,41,0.35)' }}
                                >
                                    <Zap size={17} /> Buy Now
                                </motion.button>
                            </div>

                            {/* Perks */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem', backgroundColor: '#F8F9FA', borderRadius: '12px' }}>
                                {[
                                    { icon: <Truck size={16} color="#3B5D50" />, text: 'Free delivery on orders over $50' },
                                    { icon: <ShieldCheck size={16} color="#3B5D50" />, text: '2-year manufacturer warranty' },
                                    { icon: <ShoppingCart size={16} color="#3B5D50" />, text: '30-day hassle-free returns' },
                                ].map((perk, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.83rem', color: '#6C757D' }}>
                                        {perk.icon} {perk.text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Responsive grid fix */}
            <style>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </>
    );
};

export default ProductDetailPage;
