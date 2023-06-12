import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dietService } from '@/_services/admin/diet.service';

const DietAdd = () => {

    let navigate = useNavigate();

    const [diet, setDiet] = useState([]);

    const onChange = (e) => {
        setDiet({
            ...diet,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(diet);
        dietService.addDiet(diet)
            .then(res => navigate('../'))
            .catch(err => console.log(err))
    }

    return (
        <div className='DietAdd'>
            <form className='formadd' onSubmit={onSubmit}>
                <div className="group">
                    <h1>Ajout d'un Régime :</h1>
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
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default DietAdd;