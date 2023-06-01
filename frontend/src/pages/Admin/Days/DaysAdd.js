import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dayService } from '@/_services/admin/day.service';

const DayAdd = () => {

    let navigate = useNavigate();

    const [day, setDay] = useState([]);

    const onChange = (e) => {
        setDay({
            ...day,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(day);
        dayService.addDayOfWeek(day)
            .then(res => navigate('../index'))
            .catch(err => console.log(err))
    }

    return (
        <div className='DayAdd'>
            ajout d'un Jour :
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default DayAdd;