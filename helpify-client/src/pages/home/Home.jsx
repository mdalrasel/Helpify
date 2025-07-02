import React from 'react';
import Banner from '../../components/Banner';
import PopularServices from '../../components/PopularServices';
import WhyChooseUs from '../../components/WhyChooseUs';
import HowItWorks from '../../components/HowItWorks';
import Testimonials from '../../components/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner />
            <PopularServices />
            <WhyChooseUs />
            <HowItWorks />
            <Testimonials />
            
        </div>
    );
};

export default Home;