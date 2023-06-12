import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeService } from '@/_services/admin/recipe.service';

const RecipeAdd = () => {

    let navigate = useNavigate();

    const [recipe, setRecipe] = useState([]);

    const onChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(recipe);
        recipeService.addRecipe(recipe)
            .then(res => navigate('../'))
            .catch(err => console.log(err))
    }

    return (
        <div className='RecipeAdd'>
            <form className='formadd' onSubmit={onSubmit}>
                <div className="group">
                    <h1>Ajout d'une Recette :</h1>
                </div>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="instructions">Instructions</label>
                    <input type="text" name="instructions" id="instructions" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="difficulty">Difficulté</label>
                    <input type="text" name="difficulty" id="difficulty" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="theme">ID Thème</label>
                    <input type="number" name="theme" id="theme" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="user_id">ID Utilisateur</label>
                    <input type="number" name="user_id" id="user_id" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default RecipeAdd;