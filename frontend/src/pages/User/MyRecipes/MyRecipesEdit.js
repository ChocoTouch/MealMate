import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { recipeService } from '@/_services/user/recipe.service';
import { themeService } from '@/_services/user/theme.service';
import { ingredientService } from '@/_services/user/ingredient.service';
//import './recipeedit.css'

const MyRecipesEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        count:"1"
    });
    const [tables, setTables] = useState({
        diets: [],
        ingredients: [],
        theme: [],
        comments: []
    })
    const [themes, setThemes] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const flag = useRef(false);


    useEffect(() => {
        if (flag.current === false) {
            getRecipe()
            getThemes()
            getIngredients()
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getIngredients = () => {
        ingredientService.getAllIngredients()
        .then(res => {
            setIngredients(res.data.data);
            console.log(res.data.data)
        })
        .catch(err => console.log(err))
    }

    const getThemes = () => {
        themeService.getAllThemes()
                .then(res => {
                    setThemes(res.data.data);
                    console.log(res.data.data)
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
                    console.log(res.data.data)
                })
                .catch(err => console.log(err))
    }
    const onChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value

        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (e.target.title === "editMyRecipe") {
            console.log(recipe);
            recipeService.updateMyRecipe(recipe)
                .then(res => {
                    navigate('../index')
                })
                .catch(err => console.log(err))
        }
    }

    const addIngredient = (e) => {
        e.preventDefault();
        recipeService.addIngredientInMyRecipe(e.target[0].value, {
            recipe_id: recipe.id,
            count: recipe.count
        })
            .then(res => {
                getRecipe();
                console.log(res)
            })
            .catch(err => console.log(err))
    }
    const delIngredient = (ingredientId) => {
        recipeService.deleteIngredientInMyRecipe(ingredientId, {
            data:{recipe_id: recipe.id,
            count: recipe.count}
        })
            .then(res => {
               getRecipe();
            })
            .catch(err => console.log(err))
    }

    return (

        <div className='RecipeEdit'>
            <aside className=''>
                <form className="add_ingredient" onSubmit={addIngredient} title='addIngredientInMyRecipe'>
                    <p className='add_ingredient_title'>Ingrédients :</p>
                    <div>{
                        tables.ingredients.map(ingredient => (
                            <div key={ingredient.id}>
                                <p>ID : {ingredient.id}</p>
                                <p>Nom : {ingredient.name}</p>
                                <p>Calories : {ingredient.calories}</p>
                                <p>Prix : {ingredient.price}</p>
                                <p>Quantité : {ingredient.Recipe_ingredient.count}</p>
                                <p className='del_ubtn' onClick={() => delIngredient(ingredient.id)}>Supprimer</p>
                            </div>
                        ))
                    }</div>

                    <select name="ingredient_id" value={tables.ingredients.ingredient_id} onChange={onChange} id="ingredient_id">
                        {
                            ingredients.map(ingredient => (
                                <option key={ingredient.id} name="ingredient_id" value={ingredient.id}>{ingredient.name}</option>
                            ))
                        }
                    </select>
                    <div className="group">
                        <label htmlFor="count">Quantité</label>
                        <input type="number" name="count" id="count" value={recipe.count || 1} onChange={onChange} autoComplete="off" min="1" />
                    </div>
                    <button>Ajouter ingrédient</button>
                </form>
                <form className="add_diet" onSubmit={onSubmit} title='addDietInMyRecipe'>
                    <p className='group_title'>Régimes :</p> {
                        tables.diets.map(diet => (
                            <div key={diet.id}>
                                <p>ID : {diet.id}</p>
                                <p>{diet.name}</p>
                            </div>
                        ))
                    }
                    <button>Ajouter Régime</button>
                </form>
                <div className="group">
                    <p className='group_title'>Commentaires :</p>
                    {
                        tables.comments.map(comment => (
                            <div key={comment.id}>
                                <p>ID : {comment.id}</p>
                                <p>Message : {comment.message}</p>
                            </div>
                        ))
                    }
                </div>
            </aside>
            <form onSubmit={onSubmit} title='editMyRecipe'>
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
                    <select name="difficulty" value={recipe.difficulty} onChange={onChange}>
                        <option name="difficulty" value="1">1</option>
                        <option name="difficulty" value="2">2</option>
                        <option name="difficulty" value="3">3</option>
                        <option name="difficulty" value="4">4</option>
                        <option name="difficulty" value="5">5</option>
                    </select>
                </div>
                <div className="group">
                    <label htmlFor="theme">Thèmes</label>
                    <select name="theme_id" value={recipe.theme_id} onChange={onChange}>
                        {
                            themes.map(theme => (
                                <option key={theme.id} name="theme_id" value={theme.id}>{theme.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default MyRecipesEdit;