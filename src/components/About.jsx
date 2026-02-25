import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const bullets = [
    'Over 10 years of crafting premium furniture',
    'Sustainably sourced materials, zero compromise',
    'Trusted by 15,000+ happy homeowners globally',
];

const About = () => {
    return (
        <section id="about" style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '4rem',
                        alignItems: 'center',
                    }}
                >
                    {/* Left — Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        {/* Label */}
                        <p
                            style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: '#6C757D',
                                marginBottom: '0.75rem',
                                fontFamily: 'Poppins, sans-serif',
                            }}
                        >
                            About Us
                        </p>

                        {/* Heading */}
                        <h2
                            style={{
                                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                                fontWeight: 700,
                                color: '#2F2F2F',
                                lineHeight: 1.25,
                                marginBottom: '1.25rem',
                                fontFamily: 'Poppins, sans-serif',
                            }}
                        >
                            Designing Spaces That{' '}
                            <span style={{ color: '#3B5D50' }}>Feel Like Home</span>
                        </h2>

                        {/* Paragraph */}
                        <p
                            style={{
                                fontSize: '0.95rem',
                                color: '#6C757D',
                                lineHeight: 1.85,
                                marginBottom: '2rem',
                            }}
                        >
                            At Furni, we believe every room tells a story. We design and craft
                            furniture that blends timeless aesthetics with everyday comfort —
                            built to last and made to inspire.
                        </p>

                        {/* Bullet Points */}
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}>
                            {bullets.map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12, duration: 0.5 }}
                                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                                >
                                    <CheckCircle
                                        size={18}
                                        style={{ color: '#3B5D50', flexShrink: 0, marginTop: '2px' }}
                                    />
                                    <span style={{ fontSize: '0.875rem', color: '#6C757D', lineHeight: 1.6 }}>
                                        {item}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>

                    </motion.div>

                    {/* Right — Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        style={{ position: 'relative' }}
                    >
                        {/* Accent block behind image */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '24px',
                                left: '24px',
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#3B5D50',
                                borderRadius: '12px',
                                opacity: 0.08,
                                zIndex: 0,
                            }}
                        />

                        <img
                            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&auto=format&fit=crop&q=85"
                            alt="About Furni — Interior Design Studio"
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                width: '100%',
                                height: 'clamp(300px, 45vw, 480px)',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                boxShadow: '0 16px 48px rgba(0,0,0,0.1)',
                            }}
                        />

                        {/* Floating stat card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            style={{
                                position: 'absolute',
                                bottom: '-20px',
                                right: '24px',
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                padding: '1rem 1.5rem',
                                boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                                zIndex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            <div
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    backgroundColor: '#F9BF29',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem',
                                    flexShrink: 0,
                                }}
                            >
                                🏆
                            </div>
                            <div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>
                                    10+ Years
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#6C757D', marginTop: '3px' }}>
                                    of Design Excellence
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
