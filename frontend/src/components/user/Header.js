import React from 'react';
import { Link } from "react-router-dom";
import './header.css'

const Header = () => {
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
			</nav>
		</header>
    );
};

export default Header;