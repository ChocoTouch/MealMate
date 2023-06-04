import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { recipeService } from '@/_services/user/recipe.service';

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

    return (
        <div className='MyRecipes'>
            Mes Recettes :
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
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
                                <td><Link to={`../edit/${recipe.id}`}>{recipe.id}</Link></td>
                                <td>{recipe.name}</td>
                                <td>{recipe.description}</td>
                                <td>{recipe.difficulty}</td>
                                <td>{recipe.Theme.name}</td>
                                {/* <td><span className='del_ubtn' onClick={() => delRecipe(recipe.id)}>Supprimer</span></td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Link to={`../add`}>Création de recette</Link>
        </div>
    );
};

export default MyRecipes;