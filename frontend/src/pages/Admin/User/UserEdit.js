import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '@/_services/user.service';

const UserEdit = () => {
    const { uid } = useParams();
    let navigate = useNavigate();

    const [user, setUser] = useState([]);
    const flag = useRef(false)

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        userService.updateUser(user)
            .then(res => {
                navigate('../index')
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        if (flag.current === false) {
            userService.getUser(uid)
                .then(res => {
                    setUser(res.data.data);
                    console.log(res.data.data)
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='UserEdit'>
            USER EDIT
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" value={user.name} onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" name="firstname" value={user.firstname} onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="username">Pseudo</label>
                    <input type="text" name="username" value={user.username} onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={user.email} onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="roles">Rôles</label>
                    <input type="text" name="roles" value={user.roles} onChange={onChange} />
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;