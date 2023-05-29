import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer';

import './playout.css'

const PLayout = () => {
    return (
        <div className='playout' style={{position: "relative"}}>
            <Header/>
            <Outlet/>
            <div className='divfooter'>
                <Footer/>
            </div>
        </div>
    );
};

export default PLayout;