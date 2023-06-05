import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Contact, About } from '@/pages/Public';
import ULayout from '@/pages/User/ULayout';
import Error from '@/_utils/Error';
import { Profile } from '@/pages/User/Profile';
import { MyRecipes, MyRecipesAdd, MyRecipesEdit } from '@/pages/User/MyRecipes';
import { MyMenus, MyMenusAdd, MyMenusEdit } from '@/pages/User/MyMenus';

const UserRouter = () => {
    return (
        <Routes>
            <Route element={<ULayout />}>
                <Route index element={<Home />} />

                <Route path="home" element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
                <Route path="me">
                    <Route index element={<Profile />} />
                    {/* <Route path="edit" element={<ProfileEdit />} /> */}
                    <Route path="recipes">
                        <Route index element={<MyRecipes />} />
                        <Route path="add" element={<MyRecipesAdd />} />
                        <Route path="edit/:id" element={<MyRecipesEdit />} />
                    </Route>
                    <Route path="menus">
                        <Route index element={<MyMenus />} />
                        <Route path="add" element={<MyMenusAdd />} />
                        <Route path="edit/:id" element={<MyMenusEdit />} />
                    </Route>
                </Route>

                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default UserRouter;