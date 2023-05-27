import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/_services/user.service';

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
            .then(res => navigate('../index'))
            .catch(err => console.log(err))
    }
    return (
        <div className='UserAdd'>
            User ADD
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" name="firstname" onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="username">Pseudo</label>
                    <input type="text" name="username" onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="roles">Rôles</label>
                    <input type="text" name="roles" onChange={onChange} />
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default UserAdd;