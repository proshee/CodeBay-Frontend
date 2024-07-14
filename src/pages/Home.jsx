import React from 'react';
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';

const Home = () => {
    return (
        <div className=' px-10 md:py-8 bg-slate-300 text-gray-700 '>
            <Hero/>
            <RecentlyAdded/>
        </div>
    );
}

export default Home;
