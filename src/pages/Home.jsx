import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Products from '../components/Products';
import WhyChooseUs from '../components/WhyChooseUs';
import InteriorDesign from '../components/InteriorDesign';
import ProductRow from '../components/ProductRow';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Products />
            <WhyChooseUs />
            <InteriorDesign />
            <ProductRow />
            <Footer />
        </>
    );
};

export default Home;
