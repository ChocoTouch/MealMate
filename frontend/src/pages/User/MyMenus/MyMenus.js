import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuService } from '@/_services/user/menu.service';

import './mymenus.css'

const MyMenus = () => {
    const [menus, setMenus] = useState([]);
    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            menuService.getAllMenus()
                .then(res => {
                    setMenus(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const delMenu = (menuId) => {
        menuService.trashMyMenu(menuId)
            .then(res => {
                setMenus((current) => current.filter(menu => menu.id !== menuId))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='MyMenus'>
            <h1>Mes Menus</h1>
            <Link className='createmenu' to={`add`}>Création de menu</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menus.map(menu => (
                            <tr key={menu.id}>
                                <td><Link to={`edit/${menu.id}` }>{menu.name}</Link></td>
                                <td>{menu.description}</td>
                                <td><span className='del_ubtn' onClick={() => delMenu(menu.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyMenus;