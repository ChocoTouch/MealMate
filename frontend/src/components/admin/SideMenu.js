import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <aside className='SideMenu'>
            <ul>
                <li><Link to="/admin/user">Accueil Utilisateur</Link></li>
                <li><Link to="/admin/home">Accueil Public</Link></li>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li>
                    Utilisateur
                    <ul>
                        <li><Link to="/admin/users/index">Liste</Link></li>
                        <li><Link to="/admin/users/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Recette
                    <ul>
                        <li><Link to="/admin/recipes/index">Liste</Link></li>
                        <li><Link to="/admin/recipes/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Menu
                    <ul>
                        <li><Link to="/admin/menus/index">Liste</Link></li>
                        <li><Link to="/admin/menus/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Thème
                    <ul>
                        <li><Link to="/admin/themes/index">Liste</Link></li>
                        <li><Link to="/admin/themes/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Repas
                    <ul>
                        <li><Link to="/admin/meals/index">Liste</Link></li>
                        <li><Link to="/admin/meals/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Ingrédient
                    <ul>
                        <li><Link to="/admin/ingredients/index">Liste</Link></li>
                        <li><Link to="/admin/ingredients/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Régime
                    <ul>
                        <li><Link to="/admin/diets/index">Liste</Link></li>
                        <li><Link to="/admin/diets/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Jour
                    <ul>
                        <li><Link to="/admin/days/index">Liste</Link></li>
                        <li><Link to="/admin/days/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Plat
                    <ul>
                        <li><Link to="/admin/courses/index">Liste</Link></li>
                        <li><Link to="/admin/courses/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Catégorie
                    <ul>
                        <li><Link to="/admin/categories/index">Liste</Link></li>
                        <li><Link to="/admin/categories/add">Ajouter</Link></li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
};

export default SideMenu;