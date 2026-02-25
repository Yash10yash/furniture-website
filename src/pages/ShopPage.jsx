import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, SlidersHorizontal, X, ShoppingCart, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import axios from 'axios';

/* ── Fallback product catalogue ── */
const FALLBACK = [
    { _id: 'f1', name: 'Nordic Lounge Chair', price: 129.99, rating: 4.5, category: 'Chairs', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop', description: 'Scandinavian-inspired lounge chair with soft fabric.' },
    { _id: 'f2', name: 'Luxe Sofa Set', price: 449.99, rating: 4.8, category: 'Sofas', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&auto=format&fit=crop', description: 'Premium 3-seater sofa with deep cushions.' },
    { _id: 'f3', name: 'Minimalist Coffee Table', price: 89.99, rating: 4.2, category: 'Tables', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop', description: 'Sleek rectangular coffee table with walnut finish.' },
    { _id: 'f4', name: 'Velvet Accent Chair', price: 199.99, rating: 4.6, category: 'Chairs', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop', description: 'Bold velvet accent chair for any living space.' },
    { _id: 'f5', name: 'Rattan Pendant Lamp', price: 74.99, rating: 4.3, category: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop', description: 'Handwoven rattan pendant for warm ambience.' },
    { _id: 'f6', name: 'Modern Bookshelf', price: 159.99, rating: 4.4, category: 'Storage', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop', description: 'Open-shelf bookcase in natural oak finish.' },
    { _id: 'f7', name: 'Marble Dining Table', price: 599.99, rating: 4.9, category: 'Tables', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop', description: 'Elegant marble-top dining table for 6.' },
    { _id: 'f8', name: 'Leather Office Chair', price: 249.99, rating: 4.7, category: 'Chairs', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&auto=format&fit=crop', description: 'Ergonomic leather office chair with lumbar support.' },
];

const CATEGORIES = ['All', 'Chairs', 'Sofas', 'Tables', 'Lighting', 'Storage'];
const SORT_OPTIONS = ['Default', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

/* ── Star Rating ── */
const Stars = ({ rating }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={13} fill={s <= Math.round(rating) ? '#F9BF29' : 'none'} color={s <= Math.round(rating) ? '#F9BF29' : '#ccc'} />
        ))}
        <span style={{ fontSize: '0.75rem', color: '#6C757D', marginLeft: '4px' }}>{rating.toFixed(1)}</span>
    </div>
);

/* ── Product Card ── */
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e) => {
        e.stopPropagation();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            onClick={() => navigate(`/product/${product._id}`)}
            style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s, transform 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(59,93,80,0.13)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
        >
            <div style={{ position: 'relative', overflow: 'hidden', height: '210px', backgroundColor: '#F8F9FA' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#3B5D50', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: '20px' }}>{product.category}</span>
            </div>

            <div style={{ padding: '1.1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3 }}>{product.name}</h3>
                <Stars rating={product.rating || 4.2} />
                <p style={{ fontWeight: 800, fontSize: '1.15rem', color: '#3B5D50', fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}>${product.price.toFixed(2)}</p>

                <button
                    onClick={handleAdd}
                    style={{ marginTop: 'auto', paddingTop: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', padding: '0.65rem', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: added ? '#3B5D50' : '#F9BF29', color: added ? '#fff' : '#2F2F2F', fontWeight: 700, fontSize: '0.82rem', fontFamily: 'Poppins, sans-serif', transition: 'background 0.3s, transform 0.2s' }}
                    onMouseEnter={e => !added && (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                    <ShoppingCart size={14} />
                    {added ? 'Added!' : 'Add to Cart'}
                </button>
            </div>
        </motion.div>
    );
};

/* ── Sidebar ── */
const Sidebar = ({ category, setCategory, priceMax, setPriceMax, sort, setSort }) => (
    <aside style={{ width: '240px', flexShrink: 0 }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #f0f0f0', position: 'sticky', top: '90px' }}>
            {/* Categories */}
            <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2F2F2F', marginBottom: '0.875rem', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {CATEGORIES.map((c) => (
                        <button key={c} onClick={() => setCategory(c)}
                            style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif', fontWeight: category === c ? 700 : 400, color: category === c ? '#fff' : '#6C757D', backgroundColor: category === c ? '#3B5D50' : 'transparent', transition: 'all 0.2s' }}
                        >{c}</button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2F2F2F', marginBottom: '0.875rem', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Max Price</h4>
                <input type="range" min={50} max={700} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#3B5D50' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6C757D', marginTop: '4px' }}>
                    <span>$50</span><span style={{ fontWeight: 700, color: '#3B5D50' }}>${priceMax}</span>
                </div>
            </div>

            {/* Sort */}
            <div>
                <h4 style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2F2F2F', marginBottom: '0.875rem', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sort By</h4>
                <div style={{ position: 'relative' }}>
                    <select value={sort} onChange={e => setSort(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.875rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '0.85rem', fontFamily: 'Poppins, sans-serif', color: '#2F2F2F', appearance: 'none', cursor: 'pointer', backgroundColor: '#F8F9FA' }}>
                        {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6C757D' }} />
                </div>
            </div>
        </div>
    </aside>
);

/* ── Shop Page ── */
const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [priceMax, setPriceMax] = useState(700);
    const [sort, setSort] = useState('Default');
    const [mobileFilter, setMobileFilter] = useState(false);

    useEffect(() => {
        axios.get('/api/products').then(res => {
            const data = res.data?.data || [];
            setProducts(data.length > 0 ? data.map(p => ({ ...p, rating: p.rating || 4.2, category: p.category || 'Furniture' })) : FALLBACK);
        }).catch(() => setProducts(FALLBACK)).finally(() => setLoading(false));
    }, []);

    const filtered = products
        .filter(p => (category === 'All' || p.category === category) && p.price <= priceMax)
        .sort((a, b) => {
            if (sort === 'Price: Low to High') return a.price - b.price;
            if (sort === 'Price: High to Low') return b.price - a.price;
            if (sort === 'Top Rated') return (b.rating || 0) - (a.rating || 0);
            return 0;
        });

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '70px', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
                {/* Page Header */}
                <div style={{ background: 'linear-gradient(135deg, #3B5D50 0%, #2e4a3e 100%)', padding: '3.5rem 2rem', textAlign: 'center' }}>
                    <p style={{ color: '#F9BF29', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>— Our Collection</p>
                    <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>Shop Our Collection</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.75rem', fontSize: '0.95rem' }}>
                        {filtered.length} products available
                    </p>
                </div>

                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    {/* Sidebar — desktop */}
                    <div className="hidden md:block">
                        <Sidebar category={category} setCategory={setCategory} priceMax={priceMax} setPriceMax={setPriceMax} sort={sort} setSort={setSort} />
                    </div>

                    {/* Main Area */}
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                        {/* Mobile filter bar */}
                        <div className="md:hidden" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            <button onClick={() => setMobileFilter(true)}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #e0e0e0', backgroundColor: '#fff', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                                <SlidersHorizontal size={16} /> Filters
                            </button>
                        </div>

                        {/* Mobile Filter Drawer */}
                        {mobileFilter && (
                            <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={() => setMobileFilter(false)}>
                                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '280px', backgroundColor: '#fff', padding: '2rem 1.5rem', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h3 style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>Filters</h3>
                                        <button onClick={() => setMobileFilter(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                                    </div>
                                    <Sidebar category={category} setCategory={(c) => { setCategory(c); setMobileFilter(false); }} priceMax={priceMax} setPriceMax={setPriceMax} sort={sort} setSort={setSort} />
                                </div>
                            </div>
                        )}

                        {loading ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} style={{ backgroundColor: '#e9ecef', borderRadius: '12px', height: '300px', animation: 'pulse 1.5s infinite' }} />
                                ))}
                            </div>
                        ) : filtered.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛋️</div>
                                <p style={{ color: '#6C757D', fontSize: '1.1rem' }}>No products match your filters.</p>
                                <button onClick={() => { setCategory('All'); setPriceMax(700); }} style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', borderRadius: '8px', backgroundColor: '#3B5D50', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Reset Filters</button>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                {filtered.map((p, i) => <ProductCard key={p._id} product={p} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShopPage;
