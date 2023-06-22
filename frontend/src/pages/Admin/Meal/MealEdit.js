import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mealService } from '@/_services/admin/meal.service';

const MealEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [meal, setMeal] = useState([]);
    const flag = useRef(false);

    const onChange = (e) => {
        setMeal({
            ...meal,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        mealService.updateMeal(meal)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        if (flag.current === false) {
            mealService.getMeal(id)
                .then(res => {
                    setMeal(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='MealEdit'>
            édition d'un Repas :
            <form className="formedit" onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={meal.name} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" defaultValue={meal.description} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default MealEdit;