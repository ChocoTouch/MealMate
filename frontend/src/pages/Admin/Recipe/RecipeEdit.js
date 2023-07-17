import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { recipeService } from '@/_services/admin/recipe.service';
import './recipe.css'

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
                <div className="items">
                    <p className='items_title'>Ingrédients :</p> {
                        tables.ingredients.map(ingredient => (
                            <div className='item' key={ingredient.id}>
                                <p><span>ID :</span> {ingredient.id}</p>
                                <p><span>Nom :</span> {ingredient.name}</p>
                                <p><span>Calories :</span> {ingredient.calories}</p>
                                <p><span>Prix :</span> {ingredient.price}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="items">
                    <p className='items_title'>Régimes :</p> {
                        tables.diets.map(diet => (
                            <div className='item' key={diet.id}>
                                <p><span>ID :</span> {diet.id}</p>
                                <p><span>Nom :</span> {diet.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="items">
                    <p className='items_title'>Commentaires :</p>
                    {
                        tables.comments.map(comment => (
                            <div className='item' key={comment.id}>
                                <p><span>ID :</span> {comment.id}</p>
                                <p><span>Pseudo :</span> {comment.user_username}</p>
                                <p className='message'><span>Message :</span> {comment.message}</p>
                            </div>
                        ))
                    }
                </div>
            </aside>
            <div className='forms'>
            <form className="formedit" onSubmit={onSubmit}>
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
            </div>
        </section>
    );
};

export default RecipeEdit;