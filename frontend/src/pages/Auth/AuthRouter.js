import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import { PLayout } from '@/pages/Public';

import Error from '@/_utils/Error'

const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<PLayout />}>
                <Route index element={<Login />}/>
                <Route path="login" element={<Login />}/>
                <Route path="*" element={<Error />}/>
            </Route>
        </Routes>
    );
};

export default AuthRouter;