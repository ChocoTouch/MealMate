import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import { Home, Contact, About, PLayout } from '@/pages/Public';

import Error from '@/_utils/Error'

const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<PLayout />}>
                <Route index element={<Login />}/>
                <Route path="login" element={<Login />}/>
                <Route path="home" element={<Home />}/>
                <Route path="contact" element={<Contact />}/>
                <Route path="about" element={<About />}/>
                <Route path="*" element={<Error />}/>
            </Route>
        </Routes>
    );
};

export default AuthRouter;