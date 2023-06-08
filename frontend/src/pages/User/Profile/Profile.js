import React, { useEffect, useRef, useState } from 'react';
import { accountService } from '@/_services';
import { userService } from '@/_services/user/user.service';

const Profile = () => {

    const [user, setUser] = useState([]);
    const flag = useRef(false);



    useEffect(() => {
        if (flag.current === false) {
            getMyInfo()
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeEdit = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        userService.updateMyProfile(user)
            .then(res => {
                accountService.saveToken(res.data.access_token);
                getMyInfo();
                console.log(res)
            })
            .catch(err => console.log(err))


    }

    const getMyInfo = () => {
        userService.getMyUser()
            .then(res => {
                setUser(res.data.data)
            })
    }
    return (
        <div className='Profile'>
            Profil de {user.username}
            <p>email : {user.email}</p>
            <p>firstname : {user.firstname}</p>
            <p>name : {user.name}</p>
            <p>username : {user.username}</p>
            <p>telephone : {user.telephone}</p>

            <form onSubmit={onSubmit}>
            Edition du profil
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={user.name} onChange={onChangeEdit} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" name="firstname" id="firstname" defaultValue={user.firstname} onChange={onChangeEdit} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="username">Pseudo</label>
                    <input type="text" name="username" id="username" defaultValue={user.username} onChange={onChangeEdit} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email} onChange={onChangeEdit} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="telephone">Telephone</label>
                    <input type="text" name="telephone" id="telephone" defaultValue={user.telephone} onChange={onChangeEdit} autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="password">Saisissez votre mot de passe pour éditer votre profil</label>
                    <input type="password" name="password" id="password" defaultValue="" onChange={onChangeEdit} autoComplete="off" />
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;