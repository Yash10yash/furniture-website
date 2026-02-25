import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const bullets = [
    'High quality materials and craftsmanship',
    'Sustainable and eco-friendly production',
    'Custom sizes and colors available on request',
    'Expert interior design consultation included',
];

const InteriorDesign = () => {
    return (
        <section style={{ backgroundColor: '#F8F9FA', padding: '6rem 0' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

                    {/* Left - 3 Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', height: '420px' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&auto=format&fit=crop&q=85"
                            alt="Interior 1"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', gridRow: 'span 2' }}
                        />
                        <img
                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=85"
                            alt="Interior 2"
                            style={{ width: '100%', height: '196px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                        />
                        <img
                            src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&auto=format&fit=crop&q=85"
                            alt="Interior 3"
                            style={{ width: '100%', height: '196px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                        />
                    </motion.div>

                    {/* Right - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <p style={{ color: '#F9BF29', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            — Interior Design
                        </p>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 800, color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3, marginBottom: '1.25rem' }}>
                            We Help You Make Modern{' '}
                            <span style={{ color: '#3B5D50' }}>Interior Design</span>
                        </h2>
                        <p style={{ color: '#6C757D', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit.
                            Aliquam vulputate velit imperdiet dolor tempor tristique.
                        </p>

                        <ul style={{ listStyle: 'none', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {bullets.map((point, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                                >
                                    <CheckCircle2 size={18} style={{ color: '#3B5D50', flexShrink: 0, marginTop: '2px' }} />
                                    <span style={{ color: '#6C757D', fontSize: '0.875rem', lineHeight: 1.6 }}>{point}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                                backgroundColor: '#3B5D50', color: '#fff',
                                border: 'none', cursor: 'pointer',
                                padding: '0.875rem 2.5rem', borderRadius: '6px',
                                fontWeight: 600, fontSize: '0.9rem',
                                fontFamily: 'Poppins, sans-serif',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                boxShadow: '0 8px 20px rgba(59,93,80,0.25)',
                            }}
                        >
                            Explore <ArrowRight size={16} />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InteriorDesign;
