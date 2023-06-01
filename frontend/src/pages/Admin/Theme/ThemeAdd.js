import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { themeService } from '@/_services/admin/theme.service';

const ThemeAdd = () => {

    let navigate = useNavigate();

    const [theme, setTheme] = useState([]);

    const onChange = (e) => {
        setTheme({
            ...theme,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(theme);
        themeService.addTheme(theme)
            .then(res => navigate('../index'))
            .catch(err => console.log(err))
    }

    return (
        <div className='ThemeAdd'>
            ajout d'un Thème :
            <form onSubmit={onSubmit}>
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

export default ThemeAdd;