import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { menuService } from "@/_services/public/menu.service";
import { dayService } from "@/_services/public/day.service";
import { mealService } from "@/_services/public/meal.service";

import './menus.css'

const Menu = () => {
	const { slug } = useParams();

	const flag = useRef(false);

	const [menu, setMenu] = useState([]);
	const [user, setUser] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [days, setDays] = useState("");
	const [meals, setMeals] = useState([]);
	const [isLoad, setLoad] = useState(false);

	useEffect(() => {
		if (flag.current === false) {
			menuService
				.getMenu(slug)
				.then((res) => {
					setMenu(res.data.data);
					setRecipes(res.data.data.Recipes);
					setUser(res.data.data.User);
					console.log("menu", res.data.data);
					dayService
						.getAllDaysOfWeek(slug)
						.then((res) => {
							setDays(res.data.data);
							console.log("days", res.data.data);
							mealService
								.getAllMeals(slug)
								.then((res) => {
									setMeals(res.data.data);
									setLoad(true);
									console.log("meals", res.data.data);
								})
								.catch((err) => console.log(err));
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		}
		return () => {
			flag.current = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isLoad) {
		return <div>chargement....</div>;
	}

	const checkRecipe = (recipe,menuRecipe, dayName, mealName) => {
		if (menuRecipe.DayOfWeek.name === dayName && menuRecipe.Meal.name === mealName) {
			return (
				<p key={menuRecipe.id}>
                    {recipe.name}
                    <strong>{menuRecipe.Course.name}</strong>
				</p>
			);
		}
		return <span key={menuRecipe.id}></span>;
	};

	return (
		<div className="Menu">
			<div className="left_sections">
				<section className="menu_info">
					<h1>{menu.name}</h1>
					<p>{menu.description}</p>
				</section>
				<section className="menu_recipes">
					<table>
						<thead>
							<tr>
								<th></th>
								<th>{meals[0].name}</th>
								<th>{meals[1].name}</th>
								<th>{meals[2].name}</th>
								<th>{meals[3].name}</th>
							</tr>
						</thead>
						<tbody>
							<tr className="LUNDI">
								<td style={{ height: "10vw" }}>{days[0].name}</td>
								<td>
									{recipes.map((recipe) => (
										<div key={recipe.id}>
											{recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[0].name,meals[0].name)))}
										</div>
									))}
								</td>
								<td>
									{recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[0].name,meals[1].name)))}    
                                        </div>
									))}
								</td>
								<td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[0].name,meals[2].name)))}    
                                        </div>
									))}
								</td>
								<td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[0].name,meals[3].name)))}    
                                        </div>
									))}
								</td>
							</tr>
							<tr className="MARDI">
								<td style={{ height: "10vw" }}>{days[1].name}</td>
								<td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[1].name,meals[0].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[1].name,meals[1].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[1].name,meals[2].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[1].name,meals[3].name)))}    
                                        </div>
									))}
								</td>
							</tr>
							<tr className="MERCREDI">
								<td style={{ height: "10vw" }}>{days[2].name}</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[2].name,meals[0].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[2].name,meals[1].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[2].name,meals[2].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[2].name,meals[3].name)))}    
                                        </div>
									))}
								</td>
							</tr>
							<tr className="JEUDI">
								<td style={{ height: "10vw" }}>{days[3].name}</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[3].name,meals[0].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[3].name,meals[1].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[3].name,meals[2].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[3].name,meals[3].name)))}    
                                        </div>
									))}
								</td>
							</tr>
							<tr className="VENDREDI">
								<td style={{ height: "10vw" }}>{days[4].name}</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[4].name,meals[0].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[4].name,meals[1].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[4].name,meals[2].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[4].name,meals[3].name)))}    
                                        </div>
									))}
								</td>
							</tr>
							<tr className="SAMEDI">
								<td style={{ height: "10vw" }}>{days[5].name}</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[5].name,meals[0].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[5].name,meals[1].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[5].name,meals[2].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[5].name,meals[3].name)))}    
                                        </div>
									))}
								</td>
							</tr>
							<tr className="DIMANCHE">
								<td style={{ height: "10vw" }}>{days[6].name}</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[6].name,meals[0].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[6].name,meals[1].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[6].name,meals[2].name)))}    
                                        </div>
									))}
								</td>
                                <td>
                                    {recipes.map((recipe) => (
										<div key={recipe.id}>
                                            {recipe.Menu_recipes.map((menu_recipe) => (checkRecipe(recipe,menu_recipe,days[6].name,meals[3].name)))}    
                                        </div>
									))}
								</td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>
			<div className="right_sections">
				<section className="menu_user">
					<h2>{user.username}</h2>
				</section>
				<section className="menu_comments"></section>
			</div>
		</div>
	);
};

export default Menu;
