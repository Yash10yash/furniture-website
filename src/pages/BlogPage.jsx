import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, Tag, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

/* ── Fallback blog posts ── */
const FALLBACK_POSTS = [
    { _id: 'b1', slug: 'how-to-style-a-minimalist-living-room', title: 'How to Style a Minimalist Living Room', excerpt: 'Less is more — learn how to create a calm, clutter-free living space that feels both functional and beautiful.', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&auto=format&fit=crop&q=85', category: 'Living Room', author: 'Furni Editorial', createdAt: '2024-01-15', readTime: '5 min' },
    { _id: 'b2', slug: 'top-furniture-trends-2024', title: 'Top Furniture Trends for 2024', excerpt: 'From organic shapes to earthy palettes — discover the design movements shaping interiors this year.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&auto=format&fit=crop&q=85', category: 'Trends', author: 'Furni Editorial', createdAt: '2024-02-03', readTime: '7 min' },
    { _id: 'b3', slug: 'the-art-of-mixing-textures', title: 'The Art of Mixing Textures at Home', excerpt: 'Velvet, linen, rattan, and marble — mastering texture mixing is the secret to a layered, luxurious interior.', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=700&auto=format&fit=crop&q=85', category: 'Styling', author: 'Furni Editorial', createdAt: '2024-02-21', readTime: '6 min' },
    { _id: 'b4', slug: 'small-space-big-ideas', title: 'Small Space, Big Ideas', excerpt: 'Transform even the tiniest apartment into a stylish sanctuary with these smart furniture placement strategies.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&auto=format&fit=crop&q=85', category: 'Small Spaces', author: 'Furni Editorial', createdAt: '2024-03-05', readTime: '4 min' },
    { _id: 'b5', slug: 'sustainable-furniture-guide', title: 'A Guide to Sustainable Furniture', excerpt: 'Making eco-conscious choices doesn\'t mean sacrificing style. Here\'s how to shop smarter for the planet.', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=700&auto=format&fit=crop&q=85', category: 'Sustainability', author: 'Furni Editorial', createdAt: '2024-03-18', readTime: '8 min' },
    { _id: 'b6', slug: 'bedroom-sanctuary-design', title: 'Design Your Bedroom Sanctuary', excerpt: 'Your bedroom should be your most peaceful retreat. Follow these design principles to achieve hotel-level luxury.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&auto=format&fit=crop&q=85', category: 'Bedroom', author: 'Furni Editorial', createdAt: '2024-04-01', readTime: '5 min' },
];

const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Trends', 'Styling', 'Small Spaces', 'Sustainability'];

/* ── Blog Card ── */
const BlogCard = ({ post, index }) => {
    const navigate = useNavigate();
    const date = new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            onClick={() => navigate(`/blog/${post.slug}`)}
            style={{ backgroundColor: '#fff', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s, transform 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 40px rgba(59,93,80,0.13)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
        >
            {/* Image */}
            <div style={{ position: 'relative', height: '210px', overflow: 'hidden', backgroundColor: '#F8F9FA' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#3B5D50', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.06em' }}>{post.category}</span>
            </div>

            {/* Body */}
            <div style={{ padding: '1.4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flexGrow: 1 }}>
                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#9CA3AF' }}>
                        <Calendar size={12} /> {date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#9CA3AF' }}>
                        <Clock size={12} /> {post.readTime || '5 min'}
                    </span>
                </div>

                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ fontSize: '0.82rem', color: '#6C757D', lineHeight: 1.7, flexGrow: 1 }}>{post.excerpt}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3B5D50', fontSize: '0.82rem', fontWeight: 700, marginTop: '0.5rem' }}>
                    Read More <ArrowRight size={14} />
                </div>
            </div>
        </motion.article>
    );
};

/* ── Sidebar ── */
const Sidebar = ({ posts, activeCategory, setActiveCategory, search, setSearch }) => (
    <aside style={{ width: '280px', flexShrink: 0 }}>
        <div style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Search */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #f0f0f0' }}>
                <h4 style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2F2F2F', marginBottom: '0.875rem', fontFamily: 'Poppins, sans-serif' }}>Search</h4>
                <div style={{ position: 'relative' }}>
                    <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search articles…"
                        style={{ width: '100%', padding: '0.6rem 0.75rem 0.6rem 2.25rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.85rem', fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                    />
                </div>
            </div>

            {/* Categories */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #f0f0f0' }}>
                <h4 style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2F2F2F', marginBottom: '0.875rem', fontFamily: 'Poppins, sans-serif' }}>Categories</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {CATEGORIES.map(c => (
                        <button key={c} onClick={() => setActiveCategory(c)}
                            style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif', fontWeight: activeCategory === c ? 700 : 400, color: activeCategory === c ? '#fff' : '#6C757D', backgroundColor: activeCategory === c ? '#3B5D50' : 'transparent', transition: 'all 0.2s' }}
                        >
                            <Tag size={11} style={{ marginRight: '6px', verticalAlign: 'middle' }} />{c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent posts */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #f0f0f0' }}>
                <h4 style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2F2F2F', marginBottom: '0.875rem', fontFamily: 'Poppins, sans-serif' }}>Recent Posts</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {posts.slice(0, 4).map(p => (
                        <RecentPost key={p._id} post={p} />
                    ))}
                </div>
            </div>
        </div>
    </aside>
);

const RecentPost = ({ post }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/blog/${post.slug}`)}
            style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
            <img src={post.image} alt={post.title} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
            <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2F2F2F', lineHeight: 1.35, fontFamily: 'Poppins, sans-serif' }}>{post.title}</p>
                <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '2px' }}>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
        </div>
    );
};

/* ── Blog Page ── */
const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('/api/blog').then(res => {
            const data = res.data?.data || [];
            setPosts(data.length > 0 ? data : FALLBACK_POSTS);
        }).catch(() => setPosts(FALLBACK_POSTS)).finally(() => setLoading(false));
    }, []);

    const filtered = posts
        .filter(p => activeCategory === 'All' || p.category === activeCategory)
        .filter(p => search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '70px', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #3B5D50 0%, #2e4a3e 100%)', padding: '4rem 2rem', textAlign: 'center' }}>
                    <p style={{ color: '#F9BF29', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>— The Furni Journal</p>
                    <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '0.875rem' }}>Design Insights & Inspiration</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.75 }}>
                        Curated stories on interior design, furniture trends, and styling tips — crafted to help you build a home you love.
                    </p>
                </div>

                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
                    {/* Sidebar — desktop */}
                    <div className="hidden md:block">
                        <Sidebar posts={posts} activeCategory={activeCategory} setActiveCategory={setActiveCategory} search={search} setSearch={setSearch} />
                    </div>

                    {/* Main */}
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                        {loading ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {[...Array(6)].map((_, i) => <div key={i} style={{ backgroundColor: '#e9ecef', borderRadius: '14px', height: '340px' }} />)}
                            </div>
                        ) : filtered.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📰</div>
                                <p style={{ color: '#6C757D', fontSize: '1.1rem' }}>No posts found for "<strong>{search || activeCategory}</strong>".</p>
                                <button onClick={() => { setSearch(''); setActiveCategory('All'); }} style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', borderRadius: '8px', backgroundColor: '#3B5D50', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>Clear Filters</button>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {filtered.map((post, i) => <BlogCard key={post._id} post={post} index={i} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;
