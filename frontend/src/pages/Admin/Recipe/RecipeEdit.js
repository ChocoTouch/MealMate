import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { recipeService } from '@/_services/admin/recipe.service';

const RecipeEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [recipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [diets, setDiets] = useState([]);

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
                navigate('../index')
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if (flag.current === false) {
            recipeService.getRecipe(id)
                .then(res => {
                    setRecipe(res.data.data);
                    setIngredients(res.data.data.Ingredients);
                    setDiets(res.data.data.Diets);

                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='RecipeEdit'>
            Recipe EDIT
            <form onSubmit={onSubmit}>
                <div className="group">
                    <p>Créateur : {recipe.user_username}</p>
                </div>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" value={recipe.name} onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" value={recipe.description} onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="instructions">Instructions</label>
                    <input type="text" name="instructions" id="instructions" value={recipe.instructions} onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="difficulty">Difficulté</label>
                    <input type="text" name="difficulty" id="difficulty" value={recipe.difficulty} onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="theme_id">ID Thème</label>
                    <input type="text" name="theme_id" id="theme_id" value={recipe.theme_id} onChange={onChange} />
                </div>
                {/* <div className="group">
                    <label htmlFor="ingredients">Ingrédients</label>
                    <input type="text" name="ingredients" id="ingredients" value={recipe.ingredients} onChange={onChange} />
                </div> */}
                <div className="group">
                    Ingrédients : {
                        ingredients.map(ingredient => (
                            <p key={ingredient.id}>{ingredient.name}</p>
                        ))
                    }
                </div>
                <div className="group">
                    Régimes : {
                        diets.map(diet => (
                            <p key={diet.id}>{diet.name}</p>
                        ))
                    }
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default RecipeEdit;