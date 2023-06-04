import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Contact, About } from '@/pages/Public';
import ULayout from '@/pages/User/ULayout';
import Error from '@/_utils/Error';
import { Profile } from '@/pages/User/Profile';

const UserRouter = () => {
    return (
        <Routes>
            <Route element={<ULayout />}>
                <Route index element={<Home />} />

                <Route path="/home" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default UserRouter;