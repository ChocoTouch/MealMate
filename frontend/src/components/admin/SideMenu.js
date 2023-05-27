import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <div className='SideMenu'>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li>
                    Utilisateur
                    <ul>
                        <li><Link to="/admin/user/index">Liste</Link></li>
                        <li><Link to="/admin/user/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Recette
                    <ul>
                        <li><Link to="/admin/recipe/index">Liste</Link></li>
                        <li><Link to="/admin/recipe/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Menu
                    <ul>
                        <li><Link to="/admin/menu/index">Liste</Link></li>
                        <li><Link to="/admin/menu/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Thème
                    <ul>
                        <li><Link to="/admin/theme/index">Liste</Link></li>
                        <li><Link to="/admin/theme/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Repas
                    <ul>
                        <li><Link to="/admin/meal/index">Liste</Link></li>
                        <li><Link to="/admin/meal/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Ingrédient
                    <ul>
                        <li><Link to="/admin/ingredient/index">Liste</Link></li>
                        <li><Link to="/admin/ingredient/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Régime
                    <ul>
                        <li><Link to="/admin/diet/index">Liste</Link></li>
                        <li><Link to="/admin/diet/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Jour
                    <ul>
                        <li><Link to="/admin/day/index">Liste</Link></li>
                        <li><Link to="/admin/day/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Plat
                    <ul>
                        <li><Link to="/admin/course/index">Liste</Link></li>
                        <li><Link to="/admin/course/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Catégorie
                    <ul>
                        <li><Link to="/admin/category/index">Liste</Link></li>
                        <li><Link to="/admin/category/add">Ajouter</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;