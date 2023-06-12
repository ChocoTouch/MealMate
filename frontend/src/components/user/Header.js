import React from 'react';
import { Link } from "react-router-dom";
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
						<Link to="recipes">Recettes</Link>
					</li>
					<li>
						<Link to="menu">Menus</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to="me/recipes">Mes Recettes</Link>
					</li>
					<li>
						<Link to="me/menus">Mes Menus</Link>
					</li>
					<li>
						<Link to="me">Mon Profil</Link>
					</li>
				</ul>
				<button onClick={logout}>Déconnexion</button>
			</nav>
		</header>
    );
};

export default Header;