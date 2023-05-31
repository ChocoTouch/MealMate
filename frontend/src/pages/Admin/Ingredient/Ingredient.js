import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ingredientService } from '@/_services/admin/ingredient.service';

const Ingredient = () => {
    const [ingredients, setIngredients] = useState([]);
    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            ingredientService.getAllIngredients()
                .then(res => {
                    setIngredients(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const delIngredient = (ingredientId) => {
        ingredientService.deleteIngredient(ingredientId)
            .then(res =>{
                setIngredients((current) => current.filter(ingredient => ingredient.id !== ingredientId))
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='Ingredient'>
            liste des ingredients
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Calories</th>
                        <th>Prix</th>
                        <th>Date de création</th>
                        <th>Date d'édition</th>
                        <th>Date de suppression</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ingredients.map(ingredient => (
                            <tr key={ingredient.id}>
                                <td><Link to={`../edit/${ingredient.id}` }>{ingredient.id}</Link></td>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.description}</td>
                                <td>{ingredient.calories}</td>
                                <td>{ingredient.price}</td>
                                <td>{ingredient.createdAt}</td>
                                <td>{ingredient.updatedAt}</td>
                                <td>{ingredient.deletedAt}</td>
                                <td><span className='del_ubtn' onClick={() => delIngredient(ingredient.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Ingredient;