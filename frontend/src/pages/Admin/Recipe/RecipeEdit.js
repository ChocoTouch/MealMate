import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { recipeService } from '@/_services/admin/recipe.service';
import './recipeedit.css'

const RecipeEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [recipe, setRecipe] = useState([]);
    const [tables, setTables] = useState({
        diets: [],
        ingredients: [],
        theme: [],
        comments: []
    })

    const flag = useRef(false);

    const onChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(recipe);
        recipeService.updateRecipe(recipe)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if (flag.current === false) {
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

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className='RecipeEdit'>
            <aside className=''>
                <div className="group">
                    <p className='group_title'>Ingrédients :</p> {
                        tables.ingredients.map(ingredient => (
                            <div key={ingredient.id}>
                                <p>ID : {ingredient.id}</p>
                                <p>Nom : {ingredient.name}</p>
                                <p>Calories : {ingredient.calories}</p>
                                <p>Prix : {ingredient.price}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="group">
                    <p className='group_title'>Régimes :</p> {
                        tables.diets.map(diet => (
                            <div key={diet.id}>
                                <p>ID : {diet.id}</p>
                                <p>{diet.name}</p>
                            </div>
                        ))
                    }
                </div>
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

            <form onSubmit={onSubmit}>
                <p className='form_title'>édition d'une recette :</p>
                <div className="group">
                    <p>Créateur : {recipe.user_username}</p>
                </div>
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
                    <label htmlFor="theme_id">ID Thème</label>
                    <input type="text" name="theme_id" id="theme_id" defaultValue={recipe.theme_id} onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>

        </section>
    );
};

export default RecipeEdit;