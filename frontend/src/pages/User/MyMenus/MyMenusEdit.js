import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { menuService } from '@/_services/user/menu.service';
import { recipeService } from '@/_services/user/recipe.service';
import { mealService } from '@/_services/user/meal.service';
import { courseService } from '@/_services/user/course.service';
import { dayService } from '@/_services/user/day.service';
//import './menuedit.css'

const MyMenusEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [menu, setMenu] = useState([]);
    const [tables, setTables] = useState({
        recipes: [],
        user: [],
        comments: []
    })
    const [recipes, setRecipes] = useState([]);
    const [meals, setMeals] = useState([]);
    const [courses, setCourses] = useState([]);
    const [days, setDays] = useState([]);

    const flag = useRef(false);

    useEffect(() => {
        if (flag.current === false) {
            getMenu()
            getRecipes()
            getMeals()
            getCourses()
            getDays()
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChange = (e) => {
        setMenu({
            ...menu,
            [e.target.name]: e.target.value

        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        menuService.updateMyMenu(menu)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }

    const getRecipes = () => {
        recipeService.getAllRecipes()
            .then(res => {
                setRecipes(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const getCourses = () => {
        courseService.getAllCourses()
            .then(res => {
                setCourses(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const getMeals = () => {
        mealService.getAllMeals()
            .then(res => {
                setMeals(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const getDays = () => {
        dayService.getAllDaysOfWeek()
            .then(res => {
                setDays(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const getMenu = () => {
        menuService.getMenu(id)
            .then(res => {
                setMenu(res.data.data);
                setTables({
                    recipes: res.data.data.Recipes,
                    user: res.data.data.User,
                    comments: res.data.data.Comments
                })
            })
            .catch(err => console.log(err))
    }

    const addRecipe = (e) => {
        e.preventDefault();
        menuService.addRecipeInMyMenu(e.target[0].value, {
            menu_id: id,
            meal_id: e.target[1].value,
            course_id: e.target[2].value,
            day_id: e.target[3].value,
        })
            .then(res => {
                getMenu();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const delRecipe = (recipeId) => {
        menuService.deleteRecipeInMyMenu(recipeId, {
            data: {
                menu_id: id,
            }
        })
            .then(res => {
                getMenu();
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='MenuEdit'>
            <aside>
                <div className="items">
                    <p className='items_title'>Liste des Recettes du menu :</p>
                    {
                        tables.recipes.map(recipe => (
                            <div className='item' key={recipe.id}>
                                <div className="group">
                                    <p className='group_title'>Recette</p>
                                    <div className='recette_infos'>
                                        <p>Nom : <span>{recipe.name}</span></p>
                                        <p>Description : <span>{recipe.description}</span></p>
                                        <p>Créateur : <span>{recipe.user_username}</span></p>
                                    </div>
                                    {recipe.Menu_recipes.map(menu_recipe => (
                                    <div key={menu_recipe.id} className='menu_recipe'>
                                        <div className="group">
                                            <p className='group_title'>Plat</p>
                                            <p>Nom : <span>{menu_recipe.Course.name}</span></p>
                                            <p>Description : {menu_recipe.Course.name}</p>
                                        </div>
                                        <div className="group">
                                            <p className='group_title'>Repas :</p>
                                            <p>Nom : <span>{menu_recipe.Meal.name}</span></p>
                                            <p>Description : {menu_recipe.Meal.description}</p>
                                        </div>
                                        <div className="group">
                                            <p className='group_title'>Jour :</p>
                                            <p>Nom : {menu_recipe.DayOfWeek.name}</p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                <p className='del_ubtn' onClick={() => delRecipe(recipe.id)}>Supprimer</p>
                            </div>
                        ))
                    }
                </div>
                <div className="items">
                    <p className='items_title'>Liste des commentaires du menu :</p>
                    {
                        tables.comments.map(comment => (
                            <div className='item' key={comment.id}>
                                <p>écris par : <span>{comment.user_username}</span></p>
                                <p><span>Message :</span> {comment.message}</p>
                            </div>
                        ))
                    }
                </div>
            </aside>
            <div className='forms'>
            <form className="formedit" onSubmit={onSubmit}>
                <p className='form_title'>éditer votre menu</p>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={menu.name} onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" defaultValue={menu.description} onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="image">Uploader fichier Image</label>
                    <input type="file" name="image" onChange={onChange} id="image"/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
            <form className="formadd" onSubmit={addRecipe} >
                <p className='form_title'>ajouter une recette à votre menu</p>
                <div className="group">
                    <label htmlFor="recipe_id">Recette</label>
                    <select name="recipe_id" value={tables.recipes.recipe_id} onChange={onChange} id="recipe_id">
                        {
                            recipes.map(recipe => (
                                <option key={recipe.id} name="recipe_id" value={recipe.id}>{recipe.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="group">
                    <label htmlFor="meal_id">Repas de la recette : </label>
                    <select name="meal_id" value={tables.recipes.meal_id} onChange={onChange} id="meal_id">
                        {
                            meals.map(meal => (
                                <option key={meal.id} name="meal_id" value={meal.id}>{meal.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="group">
                    <label htmlFor="course_id">Plat de la recette : </label>
                    <select name="course_id" value={tables.recipes.course_id} onChange={onChange} id="course_id">
                        {
                            courses.map(course => (
                                <option key={course.id} name="course_id" value={course.id}>{course.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="group">
                    <label htmlFor="day_id">Jour de la recette : </label>
                    <select name="day_id" value={tables.recipes.day_id} onChange={onChange} id="day_id">
                        {
                            days.map(day => (
                                <option key={day.id} name="day_id" value={day.id}>{day.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="group">
                    <button>Ajouter recette</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default MyMenusEdit;