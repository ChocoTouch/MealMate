import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
	return (
		<header className="PHeader">
			<nav>
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
