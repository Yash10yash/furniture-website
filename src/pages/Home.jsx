import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Products from '../components/Products';
import WhyChooseUs from '../components/WhyChooseUs';
import InteriorTips from '../components/InteriorTips';
import ProductRow from '../components/ProductRow';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Products />
            <WhyChooseUs />
            <InteriorTips />
            <ProductRow />
            <Footer />
        </>
    );
};

export default Home;
