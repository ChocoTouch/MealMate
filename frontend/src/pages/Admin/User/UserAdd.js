import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/_services/admin/user.service';

const UserAdd = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState([]);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        userService.addUser(user)
            .then(res => navigate('../'))
            .catch(err => console.log(err))
    }
    return (
        <div className='UserAdd'>

            <form className='formadd' onSubmit={onSubmit}>
                <div className="group">
                    <h1>Ajout d'un utilisateur :</h1>
                </div>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" onChange={onChange} autoComplete="off" required/>
                </div>
                <div className="group">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" name="firstname" id="firstname" onChange={onChange} autoComplete="off" required/>
                </div>
                <div className="group">
                    <label htmlFor="username">Pseudo</label>
                    <input type="text" name="username" id="username" onChange={onChange} autoComplete="off"required/>
                </div>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={onChange} autoComplete="off" required/>
                </div>
                <div className="group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" onChange={onChange} autoComplete="off" required/>
                </div>
                <div className="group">
                    <label htmlFor="roles">Rôles</label>
                    <input type="text" name="roles" id="roles" onChange={onChange} autoComplete="off" required/>
                </div>
                <div className="group">
                    <label htmlFor="telephone">Téléphone</label>
                    <input type="tel" name="telephone" id="telephone" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default UserAdd;