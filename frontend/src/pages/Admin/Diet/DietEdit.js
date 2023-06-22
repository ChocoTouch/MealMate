import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dietService } from '@/_services/admin/diet.service';

const DietEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [diet, setDiet] = useState([]);
    const flag = useRef(false);

    const onChange = (e) => {
        setDiet({
            ...diet,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dietService.updateDiet(diet)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        if (flag.current === false) {
            dietService.getDiet(id)
                .then(res => {
                    setDiet(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='DietEdit'>
            édition d'un Régime :
            <form className="formedit" onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={diet.name} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" defaultValue={diet.description} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default DietEdit;