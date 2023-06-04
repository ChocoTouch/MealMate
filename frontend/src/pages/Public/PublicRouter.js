import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Contact, About, PLayout } from '@/pages/Public';
import Error from '@/_utils/Error';

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PLayout />}>
                <Route index element={<Home />} />

                <Route path="/home" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />

                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default PublicRouter;