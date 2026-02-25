import { motion } from 'framer-motion';
import { Truck, MousePointerClick, Headphones, RefreshCw } from 'lucide-react';

const features = [
    { icon: <Truck size={20} />, title: 'Fast & Free Shipping', desc: 'Free shipping on all orders over $50. Fast delivery guaranteed.' },
    { icon: <MousePointerClick size={20} />, title: 'Easy to Shop', desc: 'Simple browsing and a seamless checkout process every time.' },
    { icon: <Headphones size={20} />, title: '24/7 Support', desc: 'Our dedicated team is always here to help, round the clock.' },
    { icon: <RefreshCw size={20} />, title: 'Hassle Free Returns', desc: 'Not satisfied? Return within 30 days, no questions asked.' },
];

const WhyChooseUs = () => {
    return (
        <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <p style={{ color: '#F9BF29', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            — Why Choose Us
                        </p>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', marginBottom: '1rem', lineHeight: 1.3 }}>
                            We Know What You Need in Your Home
                        </h2>
                        <p style={{ color: '#6C757D', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit.
                            Aliquam vulputate velit imperdiet dolor tempor tristique.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        backgroundColor: '#F8F9FA', borderRadius: '12px',
                                        padding: '1.25rem', display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
                                        transition: 'box-shadow 0.3s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,93,80,0.1)'}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                                >
                                    <div style={{
                                        flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%',
                                        backgroundColor: '#3B5D50', color: '#fff',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2F2F2F', marginBottom: '0.35rem', fontFamily: 'Poppins, sans-serif' }}>
                                            {f.title}
                                        </h4>
                                        <p style={{ fontSize: '0.78rem', color: '#6C757D', lineHeight: 1.6 }}>{f.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Image with dotted bg */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{ position: 'relative' }}
                    >
                        {/* Dotted decoration */}
                        <div style={{
                            position: 'absolute', top: '-24px', right: '-24px',
                            width: '220px', height: '220px', borderRadius: '12px', zIndex: 0,
                            backgroundImage: 'radial-gradient(circle, #F9BF29 1.5px, transparent 1.5px)',
                            backgroundSize: '18px 18px',
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <img
                                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=700&auto=format&fit=crop&q=85"
                                alt="Interior Room"
                                style={{ width: '100%', height: '460px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
                            />
                            {/* Badge */}
                            <div style={{
                                position: 'absolute', bottom: '-24px', left: '-24px',
                                backgroundColor: '#fff', borderRadius: '16px',
                                padding: '1.25rem 1.5rem', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', zIndex: 2,
                            }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#3B5D50', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>15K+</div>
                                <div style={{ fontSize: '0.75rem', color: '#6C757D', marginTop: '4px' }}>Happy Customers</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
};

export default WhyChooseUs;
