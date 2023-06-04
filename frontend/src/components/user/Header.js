import React from 'react';
import { Link } from "react-router-dom";
import './header.css'
import { accountService } from '../../_services/account.service';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	let navigate = useNavigate();
    const logout = () => {
        accountService.logout()
        navigate("/")
    }
    return (
        <header className="UHeader">
			USER HEADER
			<nav>
				<ul>
					<li>
						<Link to="home">Accueil</Link>
					</li>
					<li>
						<Link to="contact">Contact</Link>
					</li>
					<li>
						<Link to="about">A propos</Link>
					</li>
					<li>
						<Link to="recipe">Recettes</Link>
					</li>
					<li>
						<Link to="user">Utilisateurs</Link>
					</li>
					<li>
						<Link to="category">Catégories</Link>
					</li>
					<li>
						<Link to="theme">Thèmes</Link>
					</li>
					<li>
						<Link to="course">Plats</Link>
					</li>
					<li>
						<Link to="meal">Repas</Link>
					</li>
					<li>
						<Link to="day">Jours</Link>
					</li>
					<li>
						<Link to="ingredient">Ingredients</Link>
					</li>
					<li>
						<Link to="menu">Menus</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to="me">Profil</Link>
					</li>
					<li>
						<Link to="me/recipes/index">Mes Recettes</Link>
					</li>
					<li>
						<Link to="me/menus">Mes Menus</Link>
					</li>
				</ul>
				<button onClick={logout}>Déconnexion</button>
			</nav>
		</header>
    );
};

export default Header;