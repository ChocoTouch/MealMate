import React from 'react';
import './userCard.css'
import { motion } from "framer-motion"

const UserCard = ({ user, image }) => {
    return (
        <motion.article className='usercard-article'
        // whileHover={{scale: 1.06}} initial={{x: -200, opacity: 0}} 
        // animate={{x: 0, opacity: 1}} transition={{duration: 0.5}}
        >            
            <div className='usercard-container'>
                <p className='usercard-title'>{user.firstname} {user.name}</p>
            </div>
            <img className='usercard-image' src={image} alt={user.name} />
            <p className='usercard-recipes'>{user.Recipes.length} recettes</p>
            <p className='usercard-menus'>{user.Menus.length} menus</p>

        </motion.article>

    );
};

export default UserCard;