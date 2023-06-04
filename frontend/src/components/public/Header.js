import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./header.css";
import logo from "../../assets/images/MealMateLogo.png";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
	const [searchBar, setSearchBar] = useState(false);

	const handleSearchBar = () => {
		searchBar ? setSearchBar(false) : setSearchBar(true);
	};

	return (
		<header className="publicheader">
			<nav>
				<img
					src={logo}
					alt="Mealmate Logo"
					className="logo"
				/>
				<ul>
					<li>
						<Link to="home">accueil</Link>
					</li>
					<li>
						<Link to="contact">contact</Link>
					</li>
					<li>
						<Link to="about">à propos</Link>
					</li>
					<li>
						<IconButton onClick={handleSearchBar}>
							<SearchIcon />
						</IconButton>
					</li>
					<li>
						{searchBar ? (
							<motion.input
								className="search-bar"
								id="search-bar"
								type="text"
								autoFocus
								initial={{ x: 50 }}
								animate={{ x: 0 }}
								transition={{ duration: 0.5 }}
							/>
						) : null}
					</li>
				</ul>
				<Link to="/admin" className="login-btn">Se connecter</Link>
			</nav>
		</header>
	);
};

export default Header;
