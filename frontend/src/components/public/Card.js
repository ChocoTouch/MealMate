import React from 'react';
import './card.css'
import { motion } from "framer-motion"

const Card = ({ recipe, image }) => {
    console.log(recipe)
    return (

        <motion.article className='card-article'
        whileHover={{scale: 1.06}} initial={{x: -200, opacity: 0}} 
        animate={{x: 0, opacity: 1}} transition={{duration: 0.5}}>
            <img className='card-image' src={image} alt={recipe.name} />
            <p className='card-title'>{recipe.name}</p>
            <p className='card-difficulty'>Difficulté : {recipe.difficulty}</p>
            <p className='card-text'>{recipe.description}</p>
        </motion.article>

    );
};

export default Card;