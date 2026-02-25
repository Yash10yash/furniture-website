import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navLinks = [
        { label: 'Home', route: '/', id: null },
        { label: 'About us', route: '/about', id: null },
        { label: 'Shop', route: '/shop', id: null },
        { label: 'Blog', route: null, id: 'blog' },
        { label: 'Contact us', route: null, id: 'contact' },
    ];

    // Derive active label from current URL path
    const active = navLinks.find(l => l.route && l.route !== '/' && location.pathname.startsWith(l.route))?.label
        || (location.pathname === '/' ? 'Home' : '');

    const handleNavClick = (link) => {
        if (link.route) {
            navigate(link.route);
        } else if (link.id) {
            const el = document.getElementById(link.id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                backgroundColor: '#ffffff',
                boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.3s ease',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#3B5D50', fontFamily: 'Poppins, sans-serif' }}>
                            Furni.
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2.5rem' }}>
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => handleNavClick(link)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    fontFamily: 'Poppins, sans-serif',
                                    color: active === link.label ? '#3B5D50' : '#6C757D',
                                    borderBottom: active === link.label ? '2px solid #3B5D50' : '2px solid transparent',
                                    paddingBottom: '3px',
                                    transition: 'color 0.2s, border-color 0.2s',
                                }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Right side — always visible */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

                        {/* User icon — desktop only */}
                        <button className="hidden md:flex" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6C757D', alignItems: 'center' }}>
                            <User size={20} />
                        </button>

                        {/* Cart icon — ALWAYS visible */}
                        <button
                            onClick={() => navigate('/shop')}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                position: 'relative', color: '#6C757D',
                                display: 'flex', alignItems: 'center',
                                padding: '4px',
                            }}>
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute', top: '-4px', right: '-4px',
                                    backgroundColor: '#F9BF29', color: '#fff',
                                    fontSize: '0.6rem', fontWeight: 700,
                                    borderRadius: '50%', width: '18px', height: '18px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 2px 6px rgba(249,191,41,0.5)',
                                }}>{cartCount}</span>
                            )}
                        </button>

                        {/* Hamburger — mobile only */}
                        <button
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3B5D50', display: 'flex', alignItems: 'center', padding: '4px' }}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ backgroundColor: '#fff', borderTop: '1px solid #f0f0f0', overflow: 'hidden' }}
                    >
                        <div style={{ padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => { handleNavClick(link); setIsOpen(false); }}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                                        fontSize: '0.9rem', fontWeight: active === link.label ? 600 : 400,
                                        color: active === link.label ? '#3B5D50' : '#6C757D',
                                        fontFamily: 'Poppins, sans-serif',
                                        padding: '0.4rem 0',
                                    }}
                                >
                                    {link.label}
                                </button>
                            ))}
                            <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #f0f0f0' }}>
                                <User size={20} color="#6C757D" />
                                <ShoppingCart size={20} color="#6C757D" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
