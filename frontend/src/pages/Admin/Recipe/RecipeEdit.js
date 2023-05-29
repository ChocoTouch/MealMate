import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { recipeService } from '@/_services/admin/recipe.service';

const RecipeEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [recipe, setRecipe] = useState([]);
    // const [ingredients, setIngredients] = useState([]);
    // const [diets, setDiets] = useState([]);
    // const [theme, setTheme] = useState([]);
    const [tables, setTables] = useState({
        diets : [],
        ingredients : [],
        theme : []
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
                navigate('../index')
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if (flag.current === false) {
            recipeService.getRecipe(id)
                .then(res => {
                    setRecipe(res.data.data);
                    // setIngredients(res.data.data.Ingredients);
                    // setDiets(res.data.data.Diets);
                    setTables({
                        diets : res.data.data.Diets,
                        ingredients : res.data.data.Ingredients,
                        theme : res.data.data.Theme
                    })
                    console.log(res.data.data)
                    console.log(tables)
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='RecipeEdit'>
            édition d'une recette :
            <form onSubmit={onSubmit}>
                <div className="group">
                    <p>Créateur : {recipe.user_username}</p>
                </div>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={recipe.name} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" defaultValue={recipe.description} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="instructions">Instructions</label>
                    <input type="text" name="instructions" id="instructions" defaultValue={recipe.instructions} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="difficulty">Difficulté</label>
                    <input type="text" name="difficulty" id="difficulty" defaultValue={recipe.difficulty} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="theme_id">ID Thème</label>
                    <input type="text" name="theme_id" id="theme_id" defaultValue={recipe.theme_id} onChange={onChange} autoComplete="off"/>
                </div>
                {/* <div className="group">
                    <label htmlFor="ingredients">Ingrédients</label>
                    <input type="text" name="ingredients" id="ingredients" value={recipe.ingredients} onChange={onChange} />
                </div> */}
                <div className="group">
                    Ingrédients : {
                        tables.ingredients.map(ingredient => (
                            <p key={ingredient.id}>{ingredient.name}</p>
                        ))
                    }
                </div>
                <div className="group">
                    Régimes : {
                        tables.diets.map(diet => (
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