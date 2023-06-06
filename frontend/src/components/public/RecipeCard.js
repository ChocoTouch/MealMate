import React from 'react';
import './recipeCard.css'
import { motion } from "framer-motion"

const RecipeCard = ({ recipe, image }) => {
    return (
        <motion.article className='recipecard-article'
        whileHover={{scale: 1.06}} initial={{x: -200, opacity: 0}} 
        animate={{x: 0, opacity: 1}} transition={{duration: 0.5}}>
            <p className='recipecard-title'>{recipe.name}</p>
            <p className='recipecard-difficulty'>Difficulté : {recipe.difficulty}</p>
            <p className='recipecard-text'>{recipe.description}</p>
            <img className='recipecard-image' src={image} alt={recipe.name} />
        </motion.article>

    );
};

export default RecipeCard;