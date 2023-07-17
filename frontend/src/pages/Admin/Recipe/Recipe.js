import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { recipeService } from '@/_services/admin/recipe.service';
import defaultrecipeimage from "../../../assets/images/DefaultRecipeImage.png"

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const flag = useRef(false);

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
        <div className='Recipes'>
            <h1>liste des recettes :</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Difficulté</th>
                        <th>Thème</th>
                        <th>Créateur</th>
                        <th>Image</th>
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
                                <td><Link to={`edit/${recipe.id}`}>{recipe.id}</Link></td>
                                <td><p>{recipe.name}</p></td>
                                <td><p>{recipe.description}</p></td>
                                <td><p className='difficulty'>{recipe.difficulty}</p></td>
                                <td><p className='theme'>{recipe.Theme.name}</p></td>
                                <td><p>{recipe.user_username}</p></td>
                                <td><img src={recipe.image ? "/"+ recipe.image : defaultrecipeimage} alt={recipe.name}/></td>
                                <td><p>{recipe.createdAt}</p></td>
                                <td><p>{recipe.updatedAt}</p></td>
                                <td><p>{recipe.deletedAt}</p></td>
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