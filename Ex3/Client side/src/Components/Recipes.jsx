import React from "react";
import RecipeCard from "./RecipeCard";

export default function Recipes({ recipes, title, show, btnText, btnColor }) {
  return (
    <div>
      {recipes.length > 0 && <h1>{title}</h1>}
      <div className="recipesDiv">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              btnText={btnText}
              btnColor={btnColor}
              clickEvent={() => show(recipe)}
              key={recipe.Id}
              recipe={recipe}
            />
          ))
        ) : (
          <div id="noRecipes">
            <h2>No Recipes yet, add some first.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
