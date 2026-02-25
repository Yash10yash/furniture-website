import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle, Send, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

/* ── Info Cards Data ── */
const INFO = [
    { icon: <MapPin size={20} />, label: 'Our Showroom', value: '42 Design Avenue, Mumbai, India 400001' },
    { icon: <Phone size={20} />, label: 'Call Us', value: '+91 98765 43210' },
    { icon: <Mail size={20} />, label: 'Email', value: 'hello@furni.in' },
    { icon: <Clock size={20} />, label: 'Working Hours', value: 'Mon – Sat: 10 AM – 7 PM\nSunday: 11 AM – 5 PM' },
];

/* ── Input component ── */
const Field = ({ label, error, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
        {children}
        {error && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{error}</span>}
    </div>
);

const inputStyle = (focused, error) => ({
    width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', fontFamily: 'Poppins, sans-serif',
    fontSize: '0.9rem', color: '#2F2F2F', outline: 'none', boxSizing: 'border-box',
    border: `2px solid ${error ? '#ef4444' : focused ? '#3B5D50' : '#e5e7eb'}`,
    transition: 'border-color 0.2s', backgroundColor: '#fff',
});

/* ── Contact Form ── */
const ContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [focused, setFocused] = useState('');
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [serverMsg, setServerMsg] = useState('');

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.subject.trim()) e.subject = 'Subject is required';
        if (!form.message.trim()) e.message = 'Message is required';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setStatus('loading');
        try {
            const res = await axios.post('/api/contact', form);
            setServerMsg(res.data.message || "Thank you! We'll be in touch soon.");
            setStatus('success');
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setServerMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <Field label="Your Name" error={errors.name}>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                        placeholder="John Doe" style={inputStyle(focused === 'name', errors.name)} />
                </Field>
                <Field label="Email Address" error={errors.email}>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                        placeholder="john@example.com" style={inputStyle(focused === 'email', errors.email)} />
                </Field>
            </div>

            <Field label="Subject" error={errors.subject}>
                <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}
                    placeholder="How can we help?" style={inputStyle(focused === 'subject', errors.subject)} />
            </Field>

            <Field label="Message" error={errors.message}>
                <textarea rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                    placeholder="Tell us about your project, query, or feedback…"
                    style={{ ...inputStyle(focused === 'message', errors.message), resize: 'vertical', minHeight: '130px' }} />
            </Field>

            {/* Status messages */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.875rem 1.25rem', backgroundColor: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                        <CheckCircle size={18} color="#22c55e" />
                        <span style={{ fontSize: '0.875rem', color: '#15803d', fontWeight: 600 }}>{serverMsg}</span>
                    </motion.div>
                )}
                {status === 'error' && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.875rem 1.25rem', backgroundColor: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca' }}>
                        <AlertCircle size={18} color="#ef4444" />
                        <span style={{ fontSize: '0.875rem', color: '#dc2626', fontWeight: 600 }}>{serverMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.03, boxShadow: '0 8px 24px rgba(249,191,41,0.35)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                    padding: '0.9rem 2rem', borderRadius: '10px', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    backgroundColor: status === 'loading' ? '#e5e7eb' : '#F9BF29',
                    color: status === 'loading' ? '#9CA3AF' : '#2F2F2F',
                    fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'background 0.3s',
                }}
            >
                {status === 'loading' ? (
                    <><div style={{ width: '16px', height: '16px', border: '2px solid #9CA3AF', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Sending…</>
                ) : (
                    <><Send size={16} /> Send Message</>
                )}
            </motion.button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </form>
    );
};

/* ── Contact Page ── */
const ContactPage = () => (
    <>
        <Navbar />
        <div style={{ paddingTop: '70px', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #3B5D50 0%, #2e4a3e 100%)', padding: '4rem 2rem', textAlign: 'center' }}>
                <p style={{ color: '#F9BF29', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>— We'd Love to Hear From You</p>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '0.875rem' }}>Get In Touch</h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.75 }}>
                    Have a design question, custom order inquiry, or just want to say hello? Our team typically responds within 24 hours.
                </p>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3.5rem', alignItems: 'flex-start' }}>

                    {/* LEFT — Info */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {INFO.map((item, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.45 }}
                                style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1.4rem 1.5rem', border: '1px solid #f0f0f0', display: 'flex', gap: '1rem', alignItems: 'flex-start', transition: 'box-shadow 0.3s, transform 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 28px rgba(59,93,80,0.1)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                            >
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#EBF2EF', color: '#3B5D50', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: '4px' }}>{item.label}</p>
                                    <p style={{ fontSize: '0.9rem', color: '#2F2F2F', fontWeight: 500, fontFamily: 'Poppins, sans-serif', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.value}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Google Map embedded */}
                        <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #f0f0f0', height: '200px', marginTop: '0.25rem' }}>
                            <iframe
                                title="Furni Showroom"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8082779278894!2d72.82754!3d19.0176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf25a16de809%3A0x5f54be16c0f2e9ff!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT — Form */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '2.5rem', border: '1px solid #f0f0f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontWeight: 800, fontSize: '1.4rem', color: '#2F2F2F', fontFamily: 'Poppins, sans-serif', marginBottom: '0.5rem' }}>Send Us a Message</h2>
                        <p style={{ fontSize: '0.875rem', color: '#6C757D', marginBottom: '2rem', lineHeight: 1.65 }}>Fill in the form below and we'll get back to you as soon as possible.</p>
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </div>
        <Footer />
        {/* Responsive grid */}
        <style>{`
      @media (max-width: 900px) {
        .contact-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
    </>
);

export default ContactPage;
