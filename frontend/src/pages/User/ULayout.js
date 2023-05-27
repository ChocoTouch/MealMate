import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/user/Header';

const ULayout = () => {
    return (
        <div className='ULayout'>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default ULayout;