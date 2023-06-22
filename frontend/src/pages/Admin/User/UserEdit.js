import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '@/_services/admin/user.service';

const UserEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();


    const [user, setUser] = useState([]);
    const flag = useRef(false);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log(user)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        userService.updateUser(user)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        if (flag.current === false) {
            userService.getUser(id)
                .then(res => {
                    setUser(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='UserEdit'>
            édition d'un utilisateur :
            <form className="formedit" onSubmit={onSubmit} encType="multipart/form-data">
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={user.name} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" name="firstname" id="firstname" defaultValue={user.firstname} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="username">Pseudo</label>
                    <input type="text" name="username" id="username" defaultValue={user.username} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="telephone">Telephone</label>
                    <input type="text" name="telephone" id="telephone" defaultValue={user.telephone} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="roles">Rôles</label>
                    <input type="text" name="roles" id="roles" defaultValue={user.roles} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="image">Uploader fichier Image</label>
                    <input type="file" name="image" onChange={onChange} id="image"/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;