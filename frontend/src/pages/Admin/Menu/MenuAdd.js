import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuService } from '@/_services/admin/menu.service';

const MenuAdd = () => {

    let navigate = useNavigate();

    const [menu, setMenu] = useState([]);

    const onChange = (e) => {
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(menu);
        menuService.addMenu(menu)
            .then(res => navigate('../index'))
            .catch(err => console.log(err))
    }

    return (
        <div className='MenuAdd'>
            ajout d'un menu :
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
                    <label htmlFor="user_id">ID Utilisateur</label>
                    <input type="text" name="user_id" id="user_id" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default MenuAdd;