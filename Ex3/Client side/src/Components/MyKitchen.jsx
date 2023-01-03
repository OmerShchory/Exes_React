import React, { useEffect, useState } from "react";
import Recipes from "./Recipes";
import { api_production } from "../Service/apiService";
import IngredientCard from "./IngredientCard";
import NewModal from "./NewModal";

export default function MyKitchen() {
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  //Happened only one time to get the recipes
  useEffect(() => {
    getRecipes();
  }, []);

  //Get all the recipes
  const getRecipes = () => {
    const url = `${api_production}/Recipes`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  //Show the ingredients in the recipe
  const showIngredients = (recipe) => {
    setIngredients(recipe.Ingredients);
    setShowModal(true);
  };

  return (
    <>
      <NewModal
        title="Ingredients"
        handleClose={() => setShowModal(false)}
        show={showModal}
        body={
          <div className="ingredientsDiv">
            {ingredients.map((ing) => (
              <IngredientCard ingredient={ing} key={ing.Id} />
            ))}
          </div>
        }
      />

      <Recipes
        btnText="Show Ingredients"
        btnColor="outline-info"
        title="Recipes"
        show={showIngredients}
        recipes={recipes}
      />
    </>
  );
}
