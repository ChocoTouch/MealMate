import React, { useEffect, useState } from 'react';
//Limport { useNavigate } from 'react-router-dom';
import { userService } from '../../../_services/user.services';

const User = () => {
    //let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        userService.getAllUsers()
            .then(res => {
                setUsers(res.data.data);
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div className='User'>
            USER LIST
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Pseudo</th>
                        <th>Telephone</th>
                        <th>Role</th>
                        <th>Date de création</th>
                        <th>Date d'édition</th>
                        <th>Date de suppression</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td >{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.firstname}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.telephone}</td>
                                <td>{user.roles}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.updatedAt}</td>
                                <td>{user.deletedAt}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default User;