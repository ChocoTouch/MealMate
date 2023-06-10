import React, { useState, useEffect, useRef } from "react";
import { recipeService } from "@/_services/public/recipe.service";
import { menuService } from "@/_services/public/menu.service";
import { userService } from "@/_services/public/user.service";

import RecipeCard from "@/components/public/RecipeCard";
import UserCard from "@/components/public/UserCard";

import searchbarimage from "../../assets/images/Salmon.png";
import defaultmenuimage from "../../assets/images/DefaultMenuImage.png"
import defaultrecipeimage from "../../assets/images/DefaultRecipeImage.png"
import defaultuserimage from "../../assets/images/DefaultUserImage.png"
import "./home.css";

const Home = () => {
	const [recipes, setRecipes] = useState([]);
	const [menus, setMenus] = useState([]);
    const [users, setUsers] = useState([]);
	const [results, setResults] = useState([])

	const flag = useRef(false);
	const [isLoad, setLoad] = useState(false);

	useEffect(() => {
		if (flag.current === false) {
			recipeService
				.getAllRecipes()
				.then((res) => {
					setRecipes(res.data.data);
					setLoad(true);
				})
				.catch((err) => console.log(err));
			menuService.getAllMenus().then((res) => {
				if (res.data.data.length > 3) {
					setMenus(res.data.data.slice(res.data.data.length - 3));
				} else {
					setMenus(res.data.data);
				}
				setLoad(true);
			});
            userService
				.getAllUsers()
				.then((res) => {
					if (res.data.data.length > 6) {
						setUsers(res.data.data.slice(res.data.data.length - 6));
					} else {
						setUsers(res.data.data);
					}
					setLoad(true);
				})
				.catch((err) => console.log(err));
		}
		return () => (flag.current = true);
	}, []);

	const onChange = (e) => {
		const query = recipes.filter((recipe) => recipe && recipe.name && recipe.name.toLowerCase().includes(e.target.value.toLowerCase()))
		if(e.target.value !== ""){
			setResults(query)
		}
		else{
			setResults([])
		}
	}

	if (!isLoad) {
		return <div>chargement....</div>;
	}
	return (
		<div className="home">
			<section className="recipes-searchbar">
				<div className="searchbar-container">
					<h1 className="searchbar-title">
						Explorez les recettes
						<br />
						du <span>m</span><span>m</span><span>m</span><span>m</span><span>m</span>onde entier
					</h1>
					<p className="searchbar-text">
						Plongez vous dans l'univers des recettes de cuisine provenant du monde entier et créées par des milliers de
						personnes professionnelles ou amatrices
					</p>
					<div className="searchbar-search">
					<input
						type="text"
						placeholder="Recherche..."
						name="searchbar-input"
						id="searchbar-input"
						className="searchbar-input"
						onChange={onChange}
					/>
					<ul className="searchbar-results">
						{results.map((result,id) =>(
							<li key={id}>{result.name}</li>
						))}
					</ul>
					</div>
				</div>
				<img
					src={searchbarimage}
					alt="Filet de saumon cuisiné"
					className="searchbar-image"
				/>
			</section>

			<section className="recipes-list">
				<h1 className="list-title">Dernières recettes</h1>
				<div className="list-cards">
					{recipes.slice(recipes.length - 4).map((recipe, id) => (
						<RecipeCard
							key={id}
							recipe={recipe}
							image={recipe.image ? "/"+ recipe.image : defaultrecipeimage}
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
							src={menu.image ? "/"+ menu.image : defaultmenuimage}
							alt={menu.name}
						/>
						<p className="menucard-title">{menu.name}</p>
					</article>
				))}
			</section>
            <section className="users-list">
				<h1 className="list-title">Nos créateurs les plus populaires</h1>
				<div className="list-cards">
					{users.map((user, id) => (
						<UserCard
							key={id}
							user={user}
							image={user.image ? "/"+ user.image : defaultuserimage}
						/>
					))}
				</div>
			</section>
		</div>
	);
};

export default Home;
