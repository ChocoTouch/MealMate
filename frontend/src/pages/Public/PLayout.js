import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer';

const PLayout = () => {
    return (
        <div className='PLayout'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default PLayout;