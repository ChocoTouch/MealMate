import React, { useState, useEffect, useRef } from "react";
import { recipeService } from "@/_services/public/recipe.service";
import { menuService } from "@/_services/public/menu.service";
import { userService } from "@/_services/public/user.service";
import RecipeCard from "@/components/public/RecipeCard";
import UserCard from "@/components/public/UserCard";
import searchbarimage from "../../assets/images/Salmon.png";
import "./home.css";

const Home = () => {
	const [recipes, setRecipes] = useState([]);
	const [menus, setMenus] = useState([]);
    const [users, setUsers] = useState([]);
	const flag = useRef(false);
	const [isLoad, setLoad] = useState(false);

	useEffect(() => {
		if (flag.current === false) {
			recipeService
				.getAllRecipes()
				.then((res) => {
					if (res.data.data.slice(res.data.data.length - 4).length > 5) {
						setRecipes(res.data.data.slice(res.data.data.length - 4));
					} else {
						setRecipes(res.data.data);
					}
					console.log(res.data.data);
					setLoad(true);
				})
				.catch((err) => console.log(err));
			menuService.getAllMenus().then((res) => {
				if (res.data.data.slice(res.data.data.length - 4).length > 3) {
					setRecipes(res.data.data.slice(res.data.data.length - 2));
				} else {
					setMenus(res.data.data);
				}
				console.log(res.data.data);
				setLoad(true);
			});
            userService
				.getAllUsers()
				.then((res) => {
					if (res.data.data.slice(res.data.data.length - 5).length > 6) {
						setUsers(res.data.data.slice(res.data.data.length - 5));
					} else {
						setUsers(res.data.data);
					}
					console.log(res.data.data);
					setLoad(true);
				})
				.catch((err) => console.log(err));
		}
		return () => (flag.current = true);
	}, []);

	if (!isLoad) {
		return <div>chargement....</div>;
	}
	return (
		<div className="home">
			<section className="recipes-searchbar">
				<img
					src={searchbarimage}
					alt="Filet de saumon cuisiné"
					className="searchbar-image"
				/>
				<div className="searchbar-container">
					<h1 className="searchbar-title">
						Explorez les recettes
						<br />
						du mmmmmonde entier
					</h1>
					<p className="searchbar-text">
						Plongez vous dans l'univers des recettes de cuisine provenant du monde entier et créées par des milliers de
						personnes professionnelles ou amatrices
					</p>
					<input
						type="text"
						placeholder="Recherche..."
						name="searchbar-input"
						id="searchbar-input"
						className="searchbar-input"
					/>
				</div>
			</section>

			<section className="recipes-list">
				<h1 className="list-title">Dernières recettes</h1>
				<div className="left-bar"></div>
				<div className="list-cards">
					{recipes.map((recipe, id) => (
						<RecipeCard
							key={id}
							recipe={recipe}
							image="https://picsum.photos/400/400?random=1"
						/>
					))}
				</div>
			</section>
			<section className="menus-list">
				{menus.map((menu, id) => (
					<article
						className="menucard-article"
						key={id}
					>
						<img
							className="menucard-image"
							src="https://picsum.photos/400/400?random=2"
							alt={menu.name}
						/>
						<p className="menucard-title">{menu.name}</p>
					</article>
				))}
			</section>
            <section className="users-list">
				<h1 className="list-title">Nos créateurs les plus populaires</h1>
				<div className="left-bar"></div>
				<div className="list-cards">
					{users.map((user, id) => (
						<UserCard
							key={id}
							user={user}
							image="https://picsum.photos/400/400?random=3"
						/>
					))}
				</div>
			</section>
		</div>
	);
};

export default Home;
