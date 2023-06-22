import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dayService } from '@/_services/admin/day.service';

const DayEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [day, setDay] = useState([]);
    const flag = useRef(false);

    const onChange = (e) => {
        setDay({
            ...day,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dayService.updateDayOfWeek(day)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        if (flag.current === false) {
            dayService.getDayOfWeek(id)
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
            <form className="formedit" onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={day.name} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default DayEdit;