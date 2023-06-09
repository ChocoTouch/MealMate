import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { dietService } from '@/_services/admin/diet.service';

const Diet = () => {
    const [diets, setDiets] = useState([]);
    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            dietService.getAllDiets()
                .then(res => {
                    setDiets(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const delDiet = (dietId) => {
        dietService.deleteDiet(dietId)
            .then(res =>{
                setDiets((current) => current.filter(diet => diet.id !== dietId))
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='list_table'>
            liste des diets
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
                        diets.map(diet => (
                            <tr key={diet.id}>
                                <td><Link to={`../edit/${diet.id}` }>{diet.id}</Link></td>
                                <td>{diet.name}</td>
                                <td>{diet.description}</td>
                                <td>{diet.createdAt}</td>
                                <td>{diet.updatedAt}</td>
                                <td>{diet.deletedAt}</td>
                                <td><span className='del_ubtn' onClick={() => delDiet(diet.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Diet;