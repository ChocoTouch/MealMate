import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { recipeService } from '@/_services/admin/recipe.service';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            recipeService.getAllRecipes()
                .then(res => {
                    setRecipes(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const delRecipe = (recipeId) => {
        recipeService.deleteRecipe(recipeId)
            .then(res => {
                setRecipes((current) => current.filter(recipe => recipe.id !== recipeId))
            })
            .catch(err => console.log(err))
    }




    return (
        <div className='Recipe'>
            liste des recettes :
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Difficulté</th>
                        <th>Thème</th>
                        <th>Créateur</th>
                        <th>Date de création</th>
                        <th>Date d'édition</th>
                        <th>Date de suppression</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recipes.map(recipe => (
                            <tr key={recipe.id}>
                                <td><Link to={`../edit/${recipe.id}`}>{recipe.id}</Link></td>
                                <td>{recipe.name}</td>
                                <td>{recipe.description}</td>
                                <td>{recipe.difficulty}</td>
                                <td>{recipe.Theme.name}</td>
                                <td>{recipe.user_username}</td>
                                <td>{recipe.createdAt}</td>
                                <td>{recipe.updatedAt}</td>
                                <td>{recipe.deletedAt}</td>
                                <td><span className='del_ubtn' onClick={() => delRecipe(recipe.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Recipe;