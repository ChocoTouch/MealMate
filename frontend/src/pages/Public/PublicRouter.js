import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Contact, About, PLayout } from '@/pages/Public';
import { Recipe, Recipes} from '@/pages/Public/Recipe';
import { Menu, Menus} from '@/pages/Public/Menu';
import Error from '@/_utils/Error';

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PLayout />}>
                <Route index element={<Home />} />

                <Route path="/home" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="recipes">
                    <Route index element={<Recipes/>} />
                    <Route path=":user_username/recipe/:slug" element={<Recipe/>} />
                </Route>
                <Route path="menus">
                    <Route index element={<Menus/>} />
                    <Route path=":user_username/menu/:slug" element={<Menu/>} />
                </Route>

                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default PublicRouter;