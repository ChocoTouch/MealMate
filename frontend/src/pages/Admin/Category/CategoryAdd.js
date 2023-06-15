import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '@/_services/admin/category.service';

const CategoryAdd = () => {

    let navigate = useNavigate();

    const [category, setCategory] = useState([]);

    const onChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(category);
        categoryService.addCategory(category)
            .then(res => navigate('../'))
            .catch(err => console.log(err))
    }

    return (
        <div className='CategoryAdd'>
            <form className='formadd' onSubmit={onSubmit}>
                <div className="group">
                    <h1>Ajout d'une Catégorie :</h1>
                </div>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" onChange={onChange} autoComplete="off" required/>
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default CategoryAdd;