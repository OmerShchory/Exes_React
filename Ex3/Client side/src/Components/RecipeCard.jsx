import React from "react";
import { Card, Button } from "react-bootstrap";

export default function RecipeCard({ recipe, btnText, clickEvent, btnColor }) {
  return (
    <Card style={{ width: "12rem" }}>
      <Card.Img variant="top" src={recipe.Image} style={{ height: "8rem" }} />
      <Card.Body>
        <Card.Title>{recipe.Name}</Card.Title>
        <Card.Text>{recipe.CookingMethod}</Card.Text>
        {btnText && (
          <Button onClick={() => clickEvent(recipe)} variant={btnColor}>
            {btnText}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
