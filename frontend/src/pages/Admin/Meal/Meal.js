import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { mealService } from '@/_services/admin/meal.service';

const Meal = () => {
    const [meals, setMeals] = useState([]);
    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            mealService.getAllMeals()
                .then(res => {
                    setMeals(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const delMeal = (mealId) => {
        mealService.deleteMeal(mealId)
            .then(res =>{
                setMeals((current) => current.filter(meal => meal.id !== mealId))
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='list_table'>
            liste des meals
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Date de création</th>
                        <th>Date d'édition</th>
                        <th>Date de suppression</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        meals.map(meal => (
                            <tr key={meal.id}>
                                <td><Link to={`edit/${meal.id}` }>{meal.id}</Link></td>
                                <td>{meal.name}</td>
                                <td>{meal.description}</td>
                                <td>{meal.createdAt}</td>
                                <td>{meal.updatedAt}</td>
                                <td>{meal.deletedAt}</td>
                                <td><span className='del_ubtn' onClick={() => delMeal(meal.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Meal;