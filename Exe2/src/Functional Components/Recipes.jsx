import React from 'react'
import RecipeCard from './RecipeCard';

export default function Recipes(props) {
    const recipes = props.recipes;
    const title = props.title;
    const btnText = props.btnText;
    const clickEvent = props.clickEvent;
    const counter = props.counter;

  return (
    <div> 
        <h1>{title}</h1>
        <h3>Recipes made: {counter}</h3>
        <div className='recipesDiv'>
            {recipes.map((recipe, key)=><RecipeCard recipeCard={recipe} key={key} btnText={btnText} clickEvent={clickEvent} />)}
        </div>
    </div>
  )
}
