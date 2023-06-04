import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <aside className='SideMenu'>
            <ul>
                <li><Link to="home">Accueil</Link></li>
                <li><Link to="profile">Profil</Link></li>
                <li>
                    Utilisateurs
                    <ul>
                        <li><Link to="users/index">Liste</Link></li>
                    </ul>
                </li>
                <li>
                    Recettes
                    <ul>
                        <li><Link to="recipes/index">Liste</Link></li>
                        <li><Link to="recipes/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Menus
                    <ul>
                        <li><Link to="menus/index">Liste</Link></li>
                        <li><Link to="menus/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Thèmes
                    <ul>
                        <li><Link to="themes/index">Liste</Link></li>
                    </ul>
                </li>
                <li>
                    Repas
                    <ul>
                        <li><Link to="meals/index">Liste</Link></li>
                    </ul>
                </li>
                <li>
                    Ingrédients
                    <ul>
                        <li><Link to="ingredients/index">Liste</Link></li>
                    </ul>
                </li>
                <li>
                    Régimes
                    <ul>
                        <li><Link to="diets/index">Liste</Link></li>
                    </ul>
                </li>
                <li>
                    Jours
                    <ul>
                        <li><Link to="days/index">Liste</Link></li>
                    </ul>
                </li>
                <li>
                    Plats
                    <ul>
                        <li><Link to="courses/index">Liste</Link></li>
                    </ul>
                </li>
                <li>
                    Catégories
                    <ul>
                        <li><Link to="categories/index">Liste</Link></li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
};

export default SideMenu;