import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '70px' }}>
                <About />
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
