import React from 'react';

const Card = ({recipe, image}) => {
    console.log(recipe)
    return (

        <article className='card_article'>
            <img src={image}/>
            <div>{recipe.description}</div>
        </article>

    );
};

export default Card;