import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { recipeService } from '@/_services/user/recipe.service';
import "./myrecipes.css"

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        if (flag.current === false) {
            recipeService.getMyRecipes()
                .then(res => {
                    setRecipes(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const delRecipe = (recipeId) => {
        recipeService.trashMyRecipe(recipeId)
            .then(res => {
                setRecipes((current) => current.filter(recipe => recipe.id !== recipeId))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='MyRecipes'>
            <h1>Mes Recettes</h1>
            <Link to={`add`} className='createrecipe'>Créer une recette</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Difficulté</th>
                        <th>Thème</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recipes.map(recipe => (
                            <tr key={recipe.id}>
                                <td><Link to={`edit/${recipe.id}`}>{recipe.name}</Link></td>
                                <td><p>{recipe.description}</p></td>
                                <td><p className='difficulty'>{recipe.difficulty}</p></td>
                                <td><p className='theme'>{recipe.Theme.name}</p></td>
                                <td><span className='del_ubtn' onClick={() => delRecipe(recipe.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyRecipes;