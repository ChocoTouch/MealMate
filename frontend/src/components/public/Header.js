import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from '../../assets/images/MealMateLogo.png'

const Header = () => {
	return (
		<header className="publicheader">
			<nav>
				<img src={logo} alt="Mealmate Logo" className="logo"/>
				<ul>
					<li>
						<Link to="/home">accueil</Link>
					</li>
					<li>
						<Link to="/contact">contact</Link>
					</li>
					<li>
						<Link to="/about">à propos</Link>
					</li> |
					<li>
						<Link to="/admin">Admin</Link>
					</li>
					<li>
						<Link to="/user">User</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
