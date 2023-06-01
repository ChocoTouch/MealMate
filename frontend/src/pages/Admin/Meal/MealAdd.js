import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mealService } from '@/_services/admin/meal.service';

const MealAdd = () => {

    let navigate = useNavigate();

    const [meal, setMeal] = useState([]);

    const onChange = (e) => {
        setMeal({
            ...meal,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(meal);
        mealService.addMeal(meal)
            .then(res => navigate('../index'))
            .catch(err => console.log(err))
    }

    return (
        <div className='MealAdd'>
            ajout d'un Repas :
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default MealAdd;