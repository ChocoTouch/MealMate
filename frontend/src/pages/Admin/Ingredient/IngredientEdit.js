import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ingredientService } from '@/_services/admin/ingredient.service';

const IngredientEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [ingredient, setIngredient] = useState([]);
    const flag = useRef(false);

    const onChange = (e) => {
        setIngredient({
            ...ingredient,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        ingredientService.updateIngredient(ingredient)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        if (flag.current === false) {
            ingredientService.getIngredient(id)
                .then(res => {
                    setIngredient(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='IngredientEdit'>
            édition d'un Ingrédient :
            <form className="formedit" onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={ingredient.name} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" defaultValue={ingredient.description} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="price">Prix</label>
                    <input type="text" name="price" id="price" defaultValue={ingredient.price} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="calories">Calories</label>
                    <input type="text" name="calories" id="calories" defaultValue={ingredient.calories} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default IngredientEdit;