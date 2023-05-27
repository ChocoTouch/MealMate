import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ALayout, Dashboard } from '@/pages/Admin';
import { User, UserEdit, UserAdd } from '@/pages/Admin/User';
import { Recipe, RecipeEdit, RecipeAdd } from '@/pages/Admin/Recipe';
import { Menu, MenuEdit, MenuAdd } from '@/pages/Admin/Menu';
import { Theme, ThemeEdit, ThemeAdd } from '@/pages/Admin/Theme';
import { Meal, MealEdit, MealAdd } from '@/pages/Admin/Meal';
import { Ingredient, IngredientEdit, IngredientAdd } from '@/pages/Admin/Ingredient';
import { Diet, DietEdit, DietAdd } from '@/pages/Admin/Diet';
import { Days, DaysEdit, DaysAdd } from '@/pages/Admin/Days';
import { Course, CourseEdit, CourseAdd } from '@/pages/Admin/Course';
import { Category, CategoryEdit, CategoryAdd } from '@/pages/Admin/Category';

import Error from '@/_utils/Error';

const AdminRouter = () => {
    return (
        <div>
            <Routes>
                <Route element={<ALayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="user">
                        <Route path="index" element={<User/>}/>
                        <Route path="add" element={<UserAdd/>}/>
                        <Route path="edit/:id" element={<UserEdit/>}/>
                    </Route>
                    <Route path="recipe">
                        <Route path="index" element={<Recipe/>}/>
                        <Route path="add" element={<RecipeAdd/>}/>
                        <Route path="edit/:id" element={<RecipeEdit/>}/>
                    </Route>
                    <Route path="menu">
                        <Route path="index" element={<Menu/>}/>
                        <Route path="add" element={<MenuAdd/>}/>
                        <Route path="edit/:id" element={<MenuEdit/>}/>
                    </Route>
                    <Route path="theme">
                        <Route path="index" element={<Theme/>}/>
                        <Route path="add" element={<ThemeAdd/>}/>
                        <Route path="edit/:id" element={<ThemeEdit/>}/>
                    </Route>
                    <Route path="meal">
                        <Route path="index" element={<Meal/>}/>
                        <Route path="add" element={<MealAdd/>}/>
                        <Route path="edit/:id" element={<MealEdit/>}/>
                    </Route>
                    <Route path="ingredient">
                        <Route path="index" element={<Ingredient/>}/>
                        <Route path="add" element={<IngredientAdd/>}/>
                        <Route path="edit/:id" element={<IngredientEdit/>}/>
                    </Route>
                    <Route path="diet">
                        <Route path="index" element={<Diet/>}/>
                        <Route path="add" element={<DietAdd/>}/>
                        <Route path="edit/:id" element={<DietEdit/>}/>
                    </Route>
                    <Route path="day">
                        <Route path="index" element={<Days/>}/>
                        <Route path="add" element={<DaysAdd/>}/>
                        <Route path="edit/:id" element={<DaysEdit/>}/>
                    </Route>
                    <Route path="course">
                        <Route path="index" element={<Course/>}/>
                        <Route path="add" element={<CourseAdd/>}/>
                        <Route path="edit/:id" element={<CourseEdit/>}/>
                    </Route>
                    <Route path="category">
                        <Route path="index" element={<Category/>}/>
                        <Route path="add" element={<CategoryAdd/>}/>
                        <Route path="edit/:id" element={<CategoryEdit/>}/>
                    </Route>
                    
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </div>
    );
};

export default AdminRouter;