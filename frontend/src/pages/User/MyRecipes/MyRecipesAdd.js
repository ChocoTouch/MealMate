import React, { useEffect, useState, useRef, } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeService } from '@/_services/user/recipe.service';
import { themeService } from '@/_services/user/theme.service';

const MyRecipesAdd = () => {

    let navigate = useNavigate();

    const [recipe, setRecipe] = useState([]);

    const [themes, setThemes] = useState([]);
    
    const flag = useRef(false);

    const onChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (flag.current === false) {
            getThemes()
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onSubmit = (e) => {
        e.preventDefault();
        recipeService.addMyRecipe(recipe)
            .then(res => navigate('../'))
            .catch(err => console.log(err))
    }

    const getThemes = () => {
        themeService.getAllThemes()
            .then(res => {
                setThemes(res.data.data);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='RecipeAdd'>
            ajout d'une recette :
            <form className="formadd" onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" onChange={onChange} autoComplete="off" required />
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" onChange={onChange} autoComplete="off" required />
                </div>
                <div className="group">
                    <label htmlFor="instructions">Instructions</label>
                    <input type="text" name="instructions" id="instructions" onChange={onChange} autoComplete="off" required/>
                </div>
                <div className="group">
                    <label htmlFor="difficulty">Difficulté</label>
                    <input name="difficulty" type='number' min="1" max="5" value={recipe.difficulty || 1} onChange={onChange} id="difficulty" />
                </div>
                <div className="group">
                    <label htmlFor="theme">ID Thème</label>
                    <select name="theme_id" value={recipe.theme_id} onChange={onChange} id="theme" required>
                        {
                            themes.map(theme => (
                                <option key={theme.id} name="theme_id" value={theme.id}>{theme.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="group">
                    <label htmlFor="image">Uploader fichier Image</label>
                    <input type="file" name="image" onChange={onChange} id="image"/>
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default MyRecipesAdd;