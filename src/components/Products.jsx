import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { getProducts } from '../api/products';

const fallbackProducts = [
    { _id: '1', name: 'Nordic Lounge Chair', price: 129.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop', description: 'Elegant Scandinavian-inspired lounge chair with soft fabric.' },
    { _id: '2', name: 'Luxe Sofa Set', price: 449.99, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&auto=format&fit=crop', description: 'Premium 3-seater sofa with deep cushions.' },
    { _id: '3', name: 'Minimalist Coffee Table', price: 89.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop', description: 'Sleek rectangular coffee table with walnut finish.' },
];

const ProductCard = ({ product, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: hovered ? '0 20px 50px rgba(59,93,80,0.15)' : '0 4px 24px rgba(0,0,0,0.06)',
                transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
            }}
        >
            {/* Image */}
            <div style={{ backgroundColor: '#F8F9FA', position: 'relative', overflow: 'hidden' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
                />
                <button
                    style={{
                        position: 'absolute', bottom: '1rem', right: '1rem',
                        backgroundColor: '#3B5D50', color: '#fff',
                        width: '40px', height: '40px', borderRadius: '50%',
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(59,93,80,0.4)',
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Plus size={18} />
                </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.4rem 1.5rem 1.6rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif' }}>
                    {product.name}
                </h3>
                <p style={{ color: '#6C757D', fontSize: '0.83rem', marginBottom: '1.1rem', lineHeight: 1.6 }}>
                    {product.description?.slice(0, 60)}...
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#3B5D50', fontFamily: 'Poppins, sans-serif' }}>
                        ${product.price.toFixed(2)}
                    </span>
                    <button style={{
                        backgroundColor: '#F9BF29', color: '#2F2F2F',
                        border: 'none', cursor: 'pointer',
                        padding: '0.4rem 1rem', borderRadius: '20px',
                        fontSize: '0.78rem', fontWeight: 700,
                        fontFamily: 'Poppins, sans-serif',
                        transition: 'opacity 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts();
                const data = res.data?.data || [];
                setProducts(data.slice(0, 3));
            } catch {
                setProducts(fallbackProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section style={{ backgroundColor: '#F8F9FA', padding: '6rem 0' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                >
                    <p style={{ color: '#F9BF29', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                        — Our Products
                    </p>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', marginBottom: '1rem' }}>
                        Crafted with excellent material
                    </h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: '#3B5D50', borderRadius: '2px', margin: '0 auto' }} />
                </motion.div>

                {/* Cards Grid */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ backgroundColor: '#e9ecef', borderRadius: '16px', height: '320px', animation: 'pulse 1.5s infinite' }} />
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {products.map((product, i) => (
                            <ProductCard key={product._id} product={product} index={i} />
                        ))}
                    </div>
                )}

                {/* View All */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginTop: '3rem' }}
                >
                    <button
                        style={{
                            backgroundColor: 'transparent', color: '#3B5D50',
                            border: '2px solid #3B5D50', borderRadius: '6px',
                            padding: '0.75rem 2.5rem', cursor: 'pointer',
                            fontWeight: 600, fontSize: '0.9rem',
                            fontFamily: 'Poppins, sans-serif',
                            transition: 'all 0.25s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#3B5D50'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#3B5D50'; }}
                    >
                        View All Products
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Products;
