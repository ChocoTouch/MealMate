import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuService } from '@/_services/admin/menu.service';

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
    return (
        <div className='MyMenus'>
            Mes Menus
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menus.map(menu => (
                            <tr key={menu.id}>
                                <td><Link to={`edit/${menu.id}` }>{menu.id}</Link></td>
                                <td>{menu.name}</td>
                                <td>{menu.description}</td>
                                {/* <td><span className='del_ubtn' onClick={() => delMenu(menu.id)}>Supprimer</span></td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Link to={`add`}>Création de menu</Link>
        </div>
    );
};

export default MyMenus;