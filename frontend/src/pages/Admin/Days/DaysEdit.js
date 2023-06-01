import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dietService } from '@/_services/admin/diet.service';

const DayEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [diet, setDay] = useState([]);
    const flag = useRef(false);

    const onChange = (e) => {
        setDay({
            ...diet,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dietService.updateDayOfWeek(diet)
            .then(res => {
                navigate('../index')
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        if (flag.current === false) {
            dietService.getDayOfWeek(id)
                .then(res => {
                    setDay(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='DayEdit'>
            édition d'un Jour :
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={diet.name} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default DayEdit;