import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, ChevronRight, Layers, Sun, Move,
    Proportions, Palette, Maximize2, ArrowRight
} from 'lucide-react';

/* ── Styling Tips Data ── */
const tips = [
    {
        icon: <Move size={18} />,
        title: 'Zone Your Space',
        desc: 'Use rugs, lighting, and furniture clusters to define distinct activity zones within an open-plan room.',
    },
    {
        icon: <Maximize2 size={18} />,
        title: 'Choose a Focal Point',
        desc: 'Every room needs an anchor — a fireplace, bold artwork, or a statement sofa. Arrange other pieces around it.',
    },
    {
        icon: <Proportions size={18} />,
        title: 'Balance Scale & Proportion',
        desc: 'Pair large furniture with smaller accents. Avoid clustering items of the same height to create visual rhythm.',
    },
    {
        icon: <Layers size={18} />,
        title: 'Mix Textures & Layers',
        desc: 'Combine linen, wood, metal, and velvet. Layered textures add depth and warmth without adding clutter.',
    },
    {
        icon: <Sun size={18} />,
        title: 'Let Natural Light In',
        desc: 'Swap heavy drapes for sheer panels. Place mirrors opposite windows to amplify daylight and open up the room.',
    },
    {
        icon: <Palette size={18} />,
        title: 'Follow a Colour Story',
        desc: 'Stick to a palette of 2–3 tones. Use 60% dominant, 30% secondary, and 10% accent colour for harmony.',
    },
];

/* ── Carousel Images ── */
const carouselImages = [
    { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=85', label: 'Scandinavian Living Room' },
    { src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&auto=format&fit=crop&q=85', label: 'Minimalist Bedroom' },
    { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=85', label: 'Cosy Reading Nook' },
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=85', label: 'Modern Kitchen Diner' },
    { src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop&q=85', label: 'Accent Wall Studio' },
];

/* ── Image Carousel ── */
const Carousel = () => {
    const [idx, setIdx] = useState(0);
    const [dir, setDir] = useState(1);

    const prev = useCallback(() => { setDir(-1); setIdx(i => (i - 1 + carouselImages.length) % carouselImages.length); }, []);
    const next = useCallback(() => { setDir(1); setIdx(i => (i + 1) % carouselImages.length); }, []);

    // Auto-slide every 4 s
    useEffect(() => {
        const t = setInterval(() => { setDir(1); setIdx(i => (i + 1) % carouselImages.length); }, 4000);
        return () => clearInterval(t);
    }, []);

    const variants = {
        enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d < 0 ? '100%' : '-100%', opacity: 0 }),
    };

    return (
        <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.13)', backgroundColor: '#111', height: '480px' }}>
            <AnimatePresence initial={false} custom={dir} mode="wait">
                <motion.div
                    key={idx}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    style={{ position: 'absolute', inset: 0 }}
                >
                    <img
                        src={carouselImages[idx].src}
                        alt={carouselImages[idx].label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
                    {/* Image label */}
                    <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.75rem', color: '#fff' }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F9BF29', marginBottom: '3px' }}>
                            Style Inspiration
                        </p>
                        <p style={{ fontSize: '1.05rem', fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>
                            {carouselImages[idx].label}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Prev / Next */}
            {[{ fn: prev, icon: <ChevronLeft size={18} />, side: '1rem' },
            { fn: next, icon: <ChevronRight size={18} />, side: null, right: '1rem' }]
                .map((btn, i) => (
                    <button
                        key={i}
                        onClick={i === 0 ? prev : next}
                        style={{
                            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                            [i === 0 ? 'left' : 'right']: '1rem',
                            width: '40px', height: '40px', borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.2s',
                            zIndex: 10,
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.35)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'}
                    >
                        {btn.icon}
                    </button>
                ))}

            {/* Dot indicators */}
            <div style={{ position: 'absolute', bottom: '1.25rem', right: '1.5rem', display: 'flex', gap: '6px', zIndex: 10 }}>
                {carouselImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                        style={{
                            width: i === idx ? '22px' : '8px', height: '8px',
                            borderRadius: '4px', border: 'none', cursor: 'pointer', padding: 0,
                            backgroundColor: i === idx ? '#F9BF29' : 'rgba(255,255,255,0.45)',
                            transition: 'all 0.3s',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

/* ── Main Section ── */
const InteriorTips = () => {
    const navigate = useNavigate();

    return (
        <section style={{ backgroundColor: '#fff', padding: '6rem 0' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

                    {/* ── LEFT — Tips ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Label */}
                        <p style={{ color: '#F9BF29', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            — Interior Guide
                        </p>

                        {/* Heading */}
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 800, color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', lineHeight: 1.25, marginBottom: '1rem' }}>
                            Expert Tips to Style Your{' '}
                            <span style={{ color: '#3B5D50' }}>Living Space</span>
                        </h2>

                        {/* Description */}
                        <p style={{ fontSize: '0.93rem', color: '#6C757D', lineHeight: 1.85, marginBottom: '2.25rem' }}>
                            Small changes can transform any room. Whether you're starting fresh or refreshing an existing setup, these design principles will help you create a space that feels balanced, comfortable, and uniquely yours.
                        </p>

                        {/* Tips List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                            {tips.map((tip, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.45 }}
                                    style={{
                                        display: 'flex', gap: '1rem', alignItems: 'flex-start',
                                        padding: '1rem 1.15rem', borderRadius: '12px',
                                        border: '1px solid #f0f0f0', backgroundColor: '#FAFAFA',
                                        transition: 'box-shadow 0.25s, transform 0.25s',
                                        cursor: 'default',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,93,80,0.1)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                                >
                                    <div style={{
                                        flexShrink: 0, width: '38px', height: '38px', borderRadius: '10px',
                                        backgroundColor: '#EBF2EF', color: '#3B5D50',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {tip.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2F2F2F', marginBottom: '3px', fontFamily: 'Poppins, sans-serif' }}>
                                            {tip.title}
                                        </h4>
                                        <p style={{ fontSize: '0.8rem', color: '#6C757D', lineHeight: 1.65 }}>
                                            {tip.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.button
                            whileHover={{ scale: 1.04, boxShadow: '0 10px 28px rgba(59,93,80,0.25)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/shop')}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                backgroundColor: '#3B5D50', color: '#fff',
                                border: 'none', cursor: 'pointer',
                                padding: '0.9rem 2.25rem', borderRadius: '8px',
                                fontWeight: 700, fontSize: '0.9rem',
                                fontFamily: 'Poppins, sans-serif',
                                transition: 'box-shadow 0.3s',
                            }}
                        >
                            Shop the Look <ArrowRight size={16} />
                        </motion.button>
                    </motion.div>

                    {/* ── RIGHT — Carousel ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <Carousel />

                        {/* Thumbnail strip */}
                        <div style={{ display: 'flex', gap: '0.625rem', marginTop: '0.875rem' }}>
                            {carouselImages.map((img, i) => (
                                <div
                                    key={i}
                                    style={{
                                        flex: 1, height: '56px', borderRadius: '8px', overflow: 'hidden',
                                        opacity: 1, cursor: 'pointer',
                                        border: '2px solid transparent',
                                        transition: 'border-color 0.2s, transform 0.2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B5D50'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'none'; }}
                                >
                                    <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Responsive */}
            <style>{`
        @media (max-width: 900px) {
          .tips-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
};

export default InteriorTips;
