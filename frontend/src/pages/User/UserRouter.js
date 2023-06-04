import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Contact, About } from '@/pages/Public';
import ULayout from '@/pages/User/ULayout';
import Error from '@/_utils/Error';
import { Profile } from '@/pages/User/Profile';
import { MyMenus } from '@/pages/User/MyMenus';
import { MyRecipes, MyRecipesAdd, MyRecipesEdit } from '@/pages/User/MyRecipes';

const UserRouter = () => {
    return (
        <Routes>
            <Route element={<ULayout />}>
                <Route index element={<Home />} />

                <Route path="/home" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/me">
                    <Route index element={<Profile />} />
                    <Route path="recipes">
                        <Route path="index" element={<MyRecipes />} />
                        <Route path="add" element={<MyRecipesAdd />} />
                        <Route path="edit/:id" element={<MyRecipesEdit />} />
                    </Route>
                    <Route path="menus" element={<MyMenus />} />
                </Route>

                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default UserRouter;