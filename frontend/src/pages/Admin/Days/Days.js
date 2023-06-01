import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { dayService } from '@/_services/admin/day.service';

const Days = () => {
    const [days, setDays] = useState([]);
    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            dayService.getAllDaysOfWeek()
                .then(res => {
                    setDays(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const delDays = (dayId) => {
        dayService.deleteDayOfWeek(dayId)
            .then(res =>{
                setDays((current) => current.filter(day => day.id !== dayId))
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='Days'>
            liste des days
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Date de création</th>
                        <th>Date d'édition</th>
                        <th>Date de suppression</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        days.map(day => (
                            <tr key={day.id}>
                                <td><Link to={`../edit/${day.id}` }>{day.id}</Link></td>
                                <td>{day.name}</td>
                                <td>{day.createdAt}</td>
                                <td>{day.updatedAt}</td>
                                <td>{day.deletedAt}</td>
                                <td><span className='del_ubtn' onClick={() => delDays(day.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Days;