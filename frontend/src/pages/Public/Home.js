import React, { useState, useEffect, useRef } from 'react';
import { recipeService } from '@/_services/public/recipe.service';
import Card from '@/components/public/Card';
import searchbarimage from '../../assets/images/Salmon.png'
import './home.css'

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const flag = useRef(false)
    const [isLoad, setLoad] = useState(false)

    useEffect(() => {
        if (flag.current === false) {
            recipeService.getAllRecipes()
                .then(res => {
                    setRecipes(res.data.data)
                    setLoad(true)
                })
                .catch(err => console.log(err))
        }
        return () => flag.current = true
    }, [])

    if (!isLoad) {
        return <div>chargement....</div>
    }
    return (
        <div className='home'>
            <section className='recipes-searchbar'>
                <img src={searchbarimage} alt="Filet de saumon cuisiné" className='searchbar-image' />
            </section>
            <div className='searchbar-container'>
                    <h1 className='searchbar-title'>Explorez les recettes<br />du mmmmmonde entier</h1>
                    <p className='searchbar-text'>Plongez vous dans l'univers des recettes de cuisine provenant du monde entier et créées par des milliers de personnes professionnelles ou amatrices</p>
                    <input type='text' placeholder='Recherche...' name="searchbar-input" id="searchbar-input" className='searchbar-input' />
            </div>
            <section className='recipes-list'>
                    <h1 className='list-title'>Dernières recettes</h1>
                    <div className='left-bar'></div>
                <div className='list-cards'>
                {
                    recipes.map((recipe, id) => (
                        <Card key={id} recipe={recipe} image='https://picsum.photos/400/400?random=' />
                    ))
                }
                </div>
            </section>

        </div>
    );
};

export default Home;
