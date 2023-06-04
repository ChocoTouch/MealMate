import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/user/Header';
//import SideMenu from '@/components/user/SideMenu';

import './user.css'

const ULayout = () => {
    return (
        <div className='ULayout'>
            <Header/>
            <div id="user">
                {/* <SideMenu/> */}
                <div id="user_body">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default ULayout;