import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api_production } from "../Service/apiService";
import Swal from "sweetalert2";
import { useState } from "react";

export default function IngredientForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [calories, setCalories] = useState("");
  let ingredients = [];
  const url = `${api_production}/Ingredients`;

  //Check if there is already ingredient with the same name
  const checkIngredients = (event) => {
    event.preventDefault();

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        ingredients = data;
        const checkExist = ingredients.filter((ing) => ing.Name === name);
        if (checkExist.length !== 0) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ingredient already exist",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
        insertIngredient();
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  //Insert the ingredient
  const insertIngredient = () => {
    const ingredient = {
      Name: name,
      Image: image,
      Calories: calories,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (ing) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Ingredient successfully saved",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  //Reset the form
  const resetForm = () => {
    setName("");
    setImage("");
    setCalories("");
  };

  return (
    <div
      style={{
        alignContent: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form className="mt-3" onSubmit={checkIngredients}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            type="text"
            placeholder="Enter the name"
            required
            style={{ maxWidth: 400 }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image (URL)</Form.Label>
          <Form.Control
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ maxWidth: 400 }}
            type="text"
            placeholder="Enter URL image"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Calories </Form.Label>
          <Form.Control
            value={calories}
            onChange={(e) => setCalories(parseInt(e.target.value))}
            style={{ maxWidth: 400 }}
            type="number"
            placeholder="Enter calories"
            required
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit" style={{ width: 70 }}>
          Submit
        </Button>
        <Button
          variant="outline-danger"
          style={{ marginLeft: 75, width: 70 }}
          onClick={resetForm}
        >
          Clear
        </Button>
      </Form>
    </div>
  );
}
