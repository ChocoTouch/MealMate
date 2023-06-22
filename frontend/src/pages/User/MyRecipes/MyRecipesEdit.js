import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { recipeService } from '@/_services/user/recipe.service';
import { themeService } from '@/_services/user/theme.service';
import { dietService } from '@/_services/user/diet.service';
import { ingredientService } from '@/_services/user/ingredient.service';

//import './recipeedit.css'

const MyRecipesEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [recipe, setRecipe] = useState([]);
    const [tables, setTables] = useState({
        diets: [],
        ingredients: [],
        theme: [],
        comments: []
    })
    const [themes, setThemes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [diets, setDiets] = useState([]);

    const flag = useRef(false);


    useEffect(() => {
        if (flag.current === false) {
            getDiets()
            getRecipe()
            getThemes()
            getIngredients()
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value

        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        recipeService.updateMyRecipe(recipe)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }


    const getIngredients = () => {
        ingredientService.getAllIngredients()
            .then(res => {
                setIngredients(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const getDiets = () => {
        dietService.getAllDiets()
            .then(res => {
                setDiets(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const getThemes = () => {
        themeService.getAllThemes()
            .then(res => {
                setThemes(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const getRecipe = () => {
        recipeService.getRecipe(id)
            .then(res => {
                setRecipe(res.data.data);
                setTables({
                    diets: res.data.data.Diets,
                    ingredients: res.data.data.Ingredients,
                    theme: res.data.data.Theme,
                    comments: res.data.data.Comments
                })
            })
            .catch(err => console.log(err))
    }

    const addIngredient = (e) => {
        e.preventDefault();
        recipeService.addIngredientInMyRecipe(e.target[0].value, {
            recipe_id: id,
            count: e.target[1].value
        })
            .then(res => {
                getRecipe();
            })
            .catch(err => console.log(err))
    }

    const delIngredient = (ingredientId) => {
        recipeService.deleteIngredientInMyRecipe(ingredientId, {
            data: {
                recipe_id: id,
            }
        })
            .then(res => {
                getRecipe();
            })
            .catch(err => console.log(err))
    }

    const addDiet = (e) => {
        e.preventDefault();
        recipeService.addDietInMyRecipe(e.target[0].value, {
            recipe_id: recipe.id
        })
            .then(res => {
                getRecipe();
            })
            .catch(err => console.log(err))
    }

    const delDiet = (dietId) => {
        recipeService.deleteDietInMyRecipe(dietId, {
            data: {
                recipe_id: recipe.id,
                count: recipe.count
            }
        })
            .then(res => {
                getRecipe();
            })
            .catch(err => console.log(err))
    }

    return (

        <div className='RecipeEdit'>
            <aside className=''>

                <div className="group">
                    <p className='group_title'>Ingrédients :</p>
                    {
                        tables.ingredients.map(ingredient => (
                            <div key={ingredient.id}>
                                <p>Nom : {ingredient.name}</p>
                                <p>Calories : {ingredient.calories}</p>
                                <p>Prix : {ingredient.price}</p>
                                <p>Quantité : {ingredient.Recipe_ingredient.count}</p>
                                <p className='del_ubtn' onClick={() => delIngredient(ingredient.id)}>Supprimer</p>
                            </div>
                        ))
                    }
                </div>
                <div className="group">
                    <p className='group_title'>Régimes :</p>
                    {
                        tables.diets.map(diet => (
                            <div key={diet.id}>
                                <p>{diet.name}</p>
                                <p className='del_ubtn' onClick={() => delDiet(diet.id)}>Supprimer</p>
                            </div>
                        ))
                    }
                </div>
                <div className="group">
                    <p className='group_title'>Commentaires :</p>
                    {
                        tables.comments.map(comment => (
                            <div key={comment.id}>
                                <p>écris par : {comment.user_username}</p>
                                <p>Message : {comment.message}</p>
                            </div>
                        ))
                    }
                </div>
            </aside>
            <form className="formedit" onSubmit={onSubmit} >
                <p className='form_title'>édition d'une recette :</p>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={recipe.name} onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" defaultValue={recipe.description} onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="instructions">Instructions</label>
                    <input type="text" name="instructions" id="instructions" defaultValue={recipe.instructions} onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="difficulty">Difficulté</label>
                    <input name="difficulty" type='number' min="1" max="5" value={recipe.difficulty || 1} onChange={onChange} id="difficulty" />
                </div>
                <div className="group">
                    <label htmlFor="theme">Thèmes</label>
                    <select name="theme_id" value={recipe.theme_id} onChange={onChange} id="theme">
                        {
                            themes.map(theme => (
                                <option key={theme.id} name="theme_id" value={theme.id}>{theme.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="group">
                    <label htmlFor="image">Uploader fichier Image</label>
                    <input type="file" name="image" onChange={onChange} id="image"/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
            <form className="add_ingredient" onSubmit={addIngredient} >
                <p className='form_title'>Ajouter un ingrédient :</p>
                <div className="group">
                    <label htmlFor="ingredient_id">Ingrédient</label>
                    <select name="ingredient_id" value={tables.ingredients.ingredient_id} onChange={onChange} id="ingredient_id">
                        {
                            ingredients.map(ingredient => (
                                <option key={ingredient.id} name="ingredient_id" value={ingredient.id}>{ingredient.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="group">
                    <label htmlFor="count">Quantité</label>
                    <input type="number" name="count" id="count" value={recipe.count || 1} onChange={onChange} autoComplete="off" min="1" />
                </div>
                <button>Ajouter ingrédient</button>
            </form>
            <form className="add_diet" onSubmit={addDiet} >
                <p className='form_title'>Ajouter un régime :</p>
                <div className="group">
                    <label htmlFor="diet_id">Régime</label>
                    <select name="diet_id" value={tables.diets.diet_id} onChange={onChange} id="diet_id">
                        {
                            diets.map(diet => (
                                <option key={diet.id} name="diet_id" value={diet.id}>{diet.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button>Ajouter Régime</button>
            </form>
        </div>
    );
};

export default MyRecipesEdit;