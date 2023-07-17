import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuService } from '@/_services/public/menu.service';
import defaultmenuimage from "../../../assets/images/DefaultMenuImage.png"

import './menus.css'

const Menus = () => {
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

    return (
        <div className='Menu'>
            <h1>Liste des Menus</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Créateur</th>
                        <th>Description</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menus.map(menu => (
                            <tr key={menu.id}>
                                <td><Link to={`${menu.User.slug}/menu/${menu.slug}`}>{menu.name}</Link></td>
                                <td>{menu.User.username}</td>
                                <td>{menu.description}</td>
                                <td><img src={menu.image ? "/"+ menu.image : defaultmenuimage} alt={menu.name}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Menus;