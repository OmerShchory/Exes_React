import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function RecipeCard(props) {
    const recipe = props.recipeCard;
    const btnText = props.btnText;
    const clickEvent = props.clickEvent;
  return (
    <Card>
      <Card.Img variant="top" src={recipe.image} />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>{recipe.cookingMethod}</Card.Text>
        <Button variant="primary" onClick={() => clickEvent(recipe)}>{btnText}</Button>
      </Card.Body>
    </Card>
   )
}



