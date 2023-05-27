import React, { useState, useEffect, useRef } from 'react';
import { recipeService } from '@/_services/admin/recipe.service';
import Card from '@/components/public/Card';

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
        return <div>Chargement....</div>
    }
    return (
        <div className='home'>
            {
                recipes.map((recipe, id) => (
                    <Card key={id} recipe={recipe} image='https://picsum.photos/400/400?random=' />
                ))
            }
        </div>
    );
};

export default Home;
