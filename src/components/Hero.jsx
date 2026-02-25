import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section style={{ backgroundColor: '#3B5D50', minHeight: '100vh', paddingTop: '70px', display: 'flex', alignItems: 'center' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ color: '#fff' }}
                    >
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{ color: '#F9BF29', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}
                        >
                            — Welcome to Furni
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem', color: '#fff' }}
                        >
                            Modern Interior{' '}
                            <span style={{ color: '#F9BF29' }}>Design</span>{' '}
                            Studio
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '480px' }}
                        >
                            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                            velit. Aliquam vulputate velit imperdiet dolor tempor tristique
                            and perfect for modern homes.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
                        >
                            <button style={{
                                backgroundColor: '#F9BF29', color: '#2F2F2F',
                                padding: '0.875rem 2rem', borderRadius: '6px',
                                border: 'none', cursor: 'pointer',
                                fontWeight: 700, fontSize: '0.9rem',
                                fontFamily: 'Poppins, sans-serif',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(249,191,41,0.4)'; }}
                                onClick={() => navigate('/shop')}
                            >
                                Shop Now <ArrowRight size={16} />
                            </button>

                            <button
                                onClick={() => navigate('/shop')}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#3B5D50'; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#fff',
                                    padding: '0.875rem 2rem',
                                    borderRadius: '6px',
                                    border: '2px solid #fff',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    fontFamily: 'Poppins, sans-serif',
                                    transition: 'background 0.2s, color 0.2s',
                                }}
                            >
                                Explore
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right - Sofa Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <motion.img
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&auto=format&fit=crop&q=90"
                            alt="Modern Sofa"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ width: '100%', maxWidth: '520px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 30px 60px rgba(0,0,0,0.35)' }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Responsive mobile */}
            <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
        }
      `}</style>
        </section>
    );
};

export default Hero;
