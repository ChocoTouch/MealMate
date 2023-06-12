import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ingredientService } from '@/_services/admin/ingredient.service';

const IngredientAdd = () => {

    let navigate = useNavigate();

    const [ingredient, setIngredient] = useState([]);

    const onChange = (e) => {
        setIngredient({
            ...ingredient,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(ingredient);
        ingredientService.addIngredient(ingredient)
            .then(res => navigate('../'))
            .catch(err => console.log(err))
    }

    return (
        <div className='IngredientAdd'>
            <form className='formadd' onSubmit={onSubmit}>
                <div className="group">
                    <h1>Ajout d'un Ingrédient :</h1>
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
                    <label htmlFor="price">Prix</label>
                    <input type="text" name="price" id="price" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="calories">Calories</label>
                    <input type="text" name="calories" id="calories" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default IngredientAdd;