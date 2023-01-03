import React from "react";
import { Card } from "react-bootstrap";

export default function IngredientCard({ ingredient }) {
  return (
    <Card style={{ width: "12rem" }}>
      <Card.Img variant="top" src={ingredient.Image} />
      <Card.Body>
        <Card.Title>{ingredient.Name}</Card.Title>
        <Card.Text>{ingredient.Calories}</Card.Text>
      </Card.Body>
    </Card>
  );
}
