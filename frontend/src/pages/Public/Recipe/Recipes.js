import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { recipeService } from '@/_services/public/recipe.service';
import defaultrecipeimage from "../../../assets/images/DefaultRecipeImage.png"

import './recipes.css'

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        if (flag.current === false) {
            recipeService.getAllRecipes()
                .then(res => {
                    setRecipes(res.data.data);
                    console.log(res.data.data)
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])


    return (
        <div className='Recipes'>
            <h1>Liste des Recettes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Difficulté</th>
                        <th>Thème</th>
                        <th>Créateur</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recipes.map(recipe => (
                            <tr key={recipe.id}>
                                <td><Link to={`${recipe.User.slug}/recipe/${recipe.slug}`}>{recipe.name}</Link></td>
                                <td>{recipe.description}</td>
                                <td>{recipe.difficulty}</td>
                                <td>{recipe.Theme.name}</td>
                                <td>{recipe.User.username}</td>
                                <td><img src={recipe.image ? "/"+ recipe.image : defaultrecipeimage} alt={recipe.name}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Recipes;