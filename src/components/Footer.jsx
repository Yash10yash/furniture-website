import { Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const linkStyle = {
        color: '#9CA3AF', fontSize: '0.875rem', textDecoration: 'none',
        display: 'block', marginBottom: '0.875rem',
        transition: 'color 0.2s',
        fontFamily: 'Poppins, sans-serif',
    };

    return (
        <footer style={{ backgroundColor: '#2F2F2F', color: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem 3rem' }}>

                {/* Main Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.3fr', gap: '3rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F9BF29', fontFamily: 'Poppins, sans-serif', marginBottom: '1rem' }}>
                            Furni.
                        </h3>
                        <p style={{ color: '#9CA3AF', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl
                            dapibus malesuada. Nullam ac aliquet velit.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <button key={i} style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    backgroundColor: '#3B5D50', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', transition: 'transform 0.2s, opacity 0.2s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Icon size={14} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '1.5rem' }}>
                            Company
                        </h4>
                        {['About Us', 'Services', 'Blog', 'Careers', 'Contact'].map(item => (
                            <a key={item} href="#" style={linkStyle}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
                            >{item}</a>
                        ))}
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '1.5rem' }}>
                            Support
                        </h4>
                        {['Help Center', 'FAQs', 'Returns', 'Order Status', 'Privacy Policy'].map(item => (
                            <a key={item} href="#" style={linkStyle}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
                            >{item}</a>
                        ))}
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '1.5rem' }}>
                            Newsletter
                        </h4>
                        <p style={{ color: '#9CA3AF', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                            Subscribe for updates on new arrivals and special offers.
                        </p>
                        <input
                            type="email"
                            placeholder="Your email address"
                            style={{
                                width: '100%', padding: '0.75rem 1rem', borderRadius: '6px',
                                backgroundColor: '#3a3a3a', border: '1px solid #4a4a4a',
                                color: '#fff', fontSize: '0.875rem', marginBottom: '0.75rem',
                                outline: 'none', fontFamily: 'Poppins, sans-serif',
                            }}
                        />
                        <button style={{
                            width: '100%', padding: '0.75rem', borderRadius: '6px',
                            backgroundColor: '#F9BF29', color: '#2F2F2F', border: 'none',
                            cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem',
                            fontFamily: 'Poppins, sans-serif', transition: 'opacity 0.2s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: '1px solid #3a3a3a', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: '#6C757D', fontSize: '0.85rem' }}>
                        © {new Date().getFullYear()} Furni. All rights reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            backgroundColor: '#3B5D50', color: '#fff', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'transform 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <ArrowUp size={16} />
                    </button>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
