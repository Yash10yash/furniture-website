import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const smallProducts = [
    { id: 1, name: 'Velvet Accent Chair', price: '$199.99', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&auto=format&fit=crop' },
    { id: 2, name: 'Modern Bookshelf', price: '$159.99', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&auto=format&fit=crop' },
    { id: 3, name: 'Rattan Pendant Lamp', price: '$74.99', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&auto=format&fit=crop' },
];

const ProductRow = () => {
    return (
        <section style={{ backgroundColor: '#fff', padding: '6rem 0' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <p style={{ color: '#F9BF29', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        — Featured
                    </p>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#2F2F2F', fontFamily: 'Poppins, sans-serif' }}>
                        Popular Picks
                    </h2>
                </motion.div>

                {/* Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {smallProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.5 }}
                            style={{
                                display: 'flex', gap: '1.25rem', alignItems: 'center',
                                padding: '1.25rem', borderRadius: '16px',
                                border: '1px solid #f0f0f0', backgroundColor: '#fff',
                                transition: 'box-shadow 0.3s, transform 0.3s',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(59,93,80,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                        >
                            <div style={{ flexShrink: 0, width: '90px', height: '90px', borderRadius: '12px', overflow: 'hidden' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ flexGrow: 1 }}>
                                <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2F2F2F', marginBottom: '0.3rem', fontFamily: 'Poppins, sans-serif' }}>
                                    {product.name}
                                </h4>
                                <p style={{ fontWeight: 800, fontSize: '1rem', color: '#3B5D50', marginBottom: '0.6rem', fontFamily: 'Poppins, sans-serif' }}>
                                    {product.price}
                                </p>
                                <button style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: '#3B5D50', fontSize: '0.8rem', fontWeight: 600,
                                    fontFamily: 'Poppins, sans-serif',
                                    display: 'flex', alignItems: 'center', gap: '4px', padding: 0,
                                }}>
                                    Read More <ArrowRight size={13} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductRow;
