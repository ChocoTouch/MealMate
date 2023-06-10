import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuService } from '@/_services/admin/menu.service';
import defaultmenuimage from "../../../assets/images/DefaultMenuImage.png"

const Menu = () => {
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
        menuService.deleteMenu(menuId)
            .then(res =>{
                setMenus((current) => current.filter(menu => menu.id !== menuId))
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='list_table'>
            liste des menus
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID_Utilisateur</th>
                        <th>Créateur</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Date de création</th>
                        <th>Date d'édition</th>
                        <th>Date de suppression</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menus.map(menu => (
                            <tr key={menu.id}>
                                <td><Link to={`../edit/${menu.id}` }>{menu.id}</Link></td>
                                <td>{menu.user_id}</td>
                                <td>{menu.user_username}</td>
                                <td>{menu.name}</td>
                                <td>{menu.description}</td>
                                <td><img src={menu.image ? "/"+ menu.image : defaultmenuimage} alt={menu.name}/></td>
                                <td>{menu.createdAt}</td>
                                <td>{menu.updatedAt}</td>
                                <td>{menu.deletedAt}</td>
                                <td><span className='del_ubtn' onClick={() => delMenu(menu.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Menu;