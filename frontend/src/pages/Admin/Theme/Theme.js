import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { themeService } from '@/_services/admin/theme.service';

const Theme = () => {
    const [themes, setThemes] = useState([]);
    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            themeService.getAllThemes()
                .then(res => {
                    setThemes(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const delTheme = (themeId) => {
        themeService.deleteTheme(themeId)
            .then(res =>{
                setThemes((current) => current.filter(theme => theme.id !== themeId))
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='Theme'>
            liste des themes
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
                        themes.map(theme => (
                            <tr key={theme.id}>
                                <td><Link to={`../edit/${theme.id}` }>{theme.id}</Link></td>
                                <td>{theme.name}</td>
                                <td>{theme.description}</td>
                                <td>{theme.createdAt}</td>
                                <td>{theme.updatedAt}</td>
                                <td>{theme.deletedAt}</td>
                                <td><span className='del_ubtn' onClick={() => delTheme(theme.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Theme;