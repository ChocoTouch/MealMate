import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuService } from '@/_services/user/menu.service';


const MyMenusAdd = () => {

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
        menuService.addMyMenu(menu)
            .then(res => navigate('../'))
            .catch(err => console.log(err))
    }

    return (
        <div className='MenuAdd'>
            ajout d'un menu :
            <form className="formadd" onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" onChange={onChange} autoComplete="off" required/>
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" onChange={onChange} autoComplete="off" required/>
                </div>
                <div className="group">
                    <label htmlFor="image">Uploader fichier Image</label>
                    <input type="file" name="image" onChange={onChange} id="image"/>
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default MyMenusAdd;