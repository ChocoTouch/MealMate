import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/admin/Header';
import Footer from '@/components/admin/Footer';
import SideMenu from '@/components/admin/SideMenu';

import './admin.css';

const ALayout = () => {
    return (
        <div className='ALayout'>
            <Header/>
            <div id="admin">
                <SideMenu/>
                <div id="admin_body">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ALayout;