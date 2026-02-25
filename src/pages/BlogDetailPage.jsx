import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

/* ── Fallback detail data ── */
const FALLBACK_DETAIL = {
    'how-to-style-a-minimalist-living-room': {
        title: 'How to Style a Minimalist Living Room', slug: 'how-to-style-a-minimalist-living-room',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=85',
        category: 'Living Room', author: 'Furni Editorial', createdAt: '2024-01-15', readTime: '5 min',
        content: `Minimalism is more than a design trend — it's a lifestyle philosophy. A minimalist living room doesn't mean a cold, empty space. It means choosing quality over quantity and letting each piece breathe.

Start with a neutral foundation. Walls in warm whites, soft creams, or pale greys create a calm canvas for everything else. Choose one or two accent colours and repeat them throughout — consistency is key.

**Key Principles to Follow:**

- Select furniture with clean lines and simple forms
- Keep surfaces clear — resist the urge to fill every shelf
- Use one statement piece, like a textured rug or an artisan lamp, as the focal point
- Invest in quality over quantity; two to three premium pieces beat ten average ones
- Let light be your decor — sheer curtains and reflective surfaces amplify natural brightness

**The Power of Negative Space**

Interior designers often refer to what you leave out as "negative space." In a minimalist room, negative space allows the eye to rest and actually enhances the furniture you do have. Don't rush to fill a corner — an empty corner can be as intentional as a filled one.

> "Have nothing in your house that you do not know to be useful or believe to be beautiful." — William Morris

**Curating Your Colour Palette**

A minimalist palette typically uses three colours: a dominant neutral (60%), a secondary tone (30%), and a single accent (10%). For a Furni-inspired space, consider pairing warm white walls with natural oak furniture and a deep forest green accent in cushions and throws.

Final thought: minimalism is a practice, not a destination. Take it one piece at a time.`,
        relatedSlugs: ['the-art-of-mixing-textures', 'bedroom-sanctuary-design'],
    },
    'top-furniture-trends-2024': {
        title: 'Top Furniture Trends for 2024', slug: 'top-furniture-trends-2024',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop&q=85',
        category: 'Trends', author: 'Furni Editorial', createdAt: '2024-02-03', readTime: '7 min',
        content: `Each year brings a fresh wave of design language, and 2024 is no exception. This year, interiors are leaning into organic forms, sustainability, and a renewed love for craftsmanship.

**1. Organic & Curved Furniture**
Say goodbye to sharp corners. Curved sofas, rounded armchairs, and blob-like coffee tables are dominating interior magazines and showrooms alike. These forms feel warmer and more human — perfect for living spaces designed for comfort.

**2. Earthy, Warm Palettes**
Terracotta, clay, burnt sienna, and warm sage are replacing the cold greys of recent years. These colours bring the outdoors in and pair beautifully with natural wood tones.

**3. Sustainable Materials**
Consumers are asking harder questions about where their furniture comes from. Reclaimed wood, recycled metals, and FSC-certified timber are no longer niche — they're expected.

- Bamboo as a primary structural material
- Recycled ocean plastic in upholstery
- Natural, non-toxic dyes and finishes

**4. Multifunctional Furniture**
As urban living spaces shrink, furniture that earns its place is essential. Sofa beds, ottomans with storage, and extendable dining tables are seeing renewed demand.

> "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs

2024 is the year to invest intentionally — buy less, buy better, and buy with the full lifecycle of the product in mind.`,
        relatedSlugs: ['the-art-of-mixing-textures', 'sustainable-furniture-guide'],
    },
};

const FALLBACK_LIST = [
    { _id: 'b1', slug: 'how-to-style-a-minimalist-living-room', title: 'How to Style a Minimalist Living Room', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&auto=format&fit=crop&q=70', category: 'Living Room', createdAt: '2024-01-15' },
    { _id: 'b2', slug: 'top-furniture-trends-2024', title: 'Top Furniture Trends for 2024', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=70', category: 'Trends', createdAt: '2024-02-03' },
    { _id: 'b3', slug: 'the-art-of-mixing-textures', title: 'The Art of Mixing Textures', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&auto=format&fit=crop&q=70', category: 'Styling', createdAt: '2024-02-21' },
    { _id: 'b4', slug: 'bedroom-sanctuary-design', title: 'Design Your Bedroom Sanctuary', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=70', category: 'Bedroom', createdAt: '2024-04-01' },
];

/* ── Render content with basic markdown-like parsing ── */
const RenderContent = ({ text }) => {
    const lines = text.split('\n');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {lines.map((line, i) => {
                if (!line.trim()) return <div key={i} style={{ height: '0.25rem' }} />;
                if (line.startsWith('**') && line.endsWith('**')) {
                    return <h3 key={i} style={{ fontWeight: 800, fontSize: '1.1rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', marginTop: '0.5rem' }}>{line.replace(/\*\*/g, '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3B5D50', flexShrink: 0, marginTop: '8px' }} />
                        <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.8 }}>{line.slice(2)}</p>
                    </div>;
                }
                if (line.startsWith('> ')) {
                    return <blockquote key={i} style={{ borderLeft: '4px solid #F9BF29', paddingLeft: '1.25rem', margin: '0.5rem 0', fontStyle: 'italic', color: '#555', fontSize: '1rem', lineHeight: 1.7 }}>{line.slice(2)}</blockquote>;
                }
                return <p key={i} style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.9 }}>{line}</p>;
            })}
        </div>
    );
};

/* ── Blog Detail Page ── */
const BlogDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        axios.get(`/api/blog/${slug}`)
            .then(res => setPost(res.data?.data))
            .catch(() => {
                const fb = FALLBACK_DETAIL[slug];
                if (fb) {
                    setPost(fb);
                    if (fb.relatedSlugs) {
                        setRelated(FALLBACK_LIST.filter(p => fb.relatedSlugs.includes(p.slug)));
                    }
                } else {
                    navigate('/blog');
                }
            })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '70px' }}>
                <div style={{ width: '44px', height: '44px', border: '4px solid #F8F9FA', borderTop: '4px solid #3B5D50', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <Footer />
        </>
    );

    if (!post) return null;
    const date = new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '70px', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
                {/* Hero Image */}
                <div style={{ position: 'relative', height: 'clamp(280px, 45vw, 500px)', overflow: 'hidden' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)' }} />
                    <div style={{ position: 'absolute', bottom: '2.5rem', left: 0, right: 0, maxWidth: '860px', margin: '0 auto', padding: '0 2rem' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#F9BF29', color: '#2F2F2F', fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', marginBottom: '0.75rem' }}>{post.category}</span>
                        <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#fff', fontFamily: 'Poppins, sans-serif', lineHeight: 1.25 }}>{post.title}</h1>
                    </div>
                </div>

                {/* Article body */}
                <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 2rem' }}>
                    {/* Back + Meta */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <button onClick={() => navigate('/blog')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#3B5D50', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'Poppins, sans-serif', padding: 0 }}>
                            <ArrowLeft size={16} /> Back to Blog
                        </button>
                        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                            {[
                                { icon: <Calendar size={13} />, text: date },
                                { icon: <Clock size={13} />, text: post.readTime || '5 min read' },
                                { icon: <User size={13} />, text: post.author || 'Furni Editorial' },
                            ].map((m, i) => (
                                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#9CA3AF' }}>{m.icon} {m.text}</span>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                    >
                        <RenderContent text={post.content || post.excerpt || ''} />
                    </motion.div>

                    {/* Tag */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2rem' }}>
                        <Tag size={14} color="#3B5D50" />
                        <span style={{ fontSize: '0.82rem', backgroundColor: '#EBF2EF', color: '#3B5D50', padding: '3px 12px', borderRadius: '20px', fontWeight: 600 }}>{post.category}</span>
                    </div>
                </div>

                {/* Related Posts */}
                {related.length > 0 && (
                    <div style={{ maxWidth: '860px', margin: '0 auto 4rem', padding: '0 2rem' }}>
                        <h3 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', marginBottom: '1.25rem' }}>You Might Also Like</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
                            {related.map(r => (
                                <div key={r._id} onClick={() => navigate(`/blog/${r.slug}`)}
                                    style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #f0f0f0', transition: 'box-shadow 0.3s' }}
                                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,93,80,0.1)'}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                                >
                                    <img src={r.image} alt={r.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                                    <div style={{ padding: '1rem' }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#3B5D50', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r.category}</span>
                                        <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', marginTop: '0.25rem', lineHeight: 1.35 }}>{r.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default BlogDetailPage;
