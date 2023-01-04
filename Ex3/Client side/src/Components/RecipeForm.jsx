import Form from "react-bootstrap/Form";
import { api_production } from "../Service/apiService";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import TextInput from "../Common/TextInput";
import CheckBoxInput from "../Common/CheckBoxInput";
import NumberInput from "../Common/NumberInput";
import FormButtons from "../Common/FormButtons";

export default function RecipeForm() {
  const formRef = useRef(null);
  const [itemsChecked, setItemsChecked] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [cookingMethod, setCookingMethod] = useState("");
  const [time, setTime] = useState("");
  const url = `${api_production}`;

  //Save the ingredient that chosen
  const handleChecked = (event) => {
    let choosen = [];
    if (event.target.checked === true) {
      choosen = ingredients.filter(
        (ing) => ing.Id === parseInt(event.target.id)
      );
      setItemsChecked([...itemsChecked, choosen[0]]);
    } else {
      choosen = itemsChecked.filter(
        (ing) => ing.Id !== parseInt(event.target.id)
      );
      setItemsChecked(choosen);
    }
  };

  //Happed one time to bring all the ingredients
  useEffect(() => {
    fetch(url + "/Ingredients")
      .then((response) => response.json())
      .then((ingredients) => {
        setIngredients(ingredients);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    // eslint-disable-next-line
  }, []);

  //Insert recipe
  const insertRecipe = (event) => {
    event.preventDefault();
    if (itemsChecked.length === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You have to choose ingredients",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const recipe = {
      Name: name,
      Image: image,
      CookingMethod: cookingMethod,
      ingredients: itemsChecked,
      Time: time,
    };

    fetch(url + "/Recipes", {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (rec) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Recipe successfully saved",
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
    const checkboxes = formRef.current.querySelectorAll(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setItemsChecked("");
    setName("");
    setImage("");
    setTime("");
    setCookingMethod("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form className="mt-3" onSubmit={insertRecipe} ref={formRef}>
        <TextInput
          label="Name"
          value={name}
          changedText={(e) => setName(e.target.value)}
          placeholder="Enter recipe name"
        />
        <TextInput
          label="Image"
          value={image}
          changedText={(e) => setImage(e.target.value)}
          placeholder="Enter URL image"
        />

        <TextInput
          label="Cooking method"
          value={cookingMethod}
          changedText={(e) => setCookingMethod(e.target.value)}
          placeholder="Enter cooking method"
        />

        <CheckBoxInput
          ingredients={ingredients}
          handleChecked={handleChecked}
        />

        <NumberInput
          label="Time"
          value={time}
          changedNumber={(e) => setTime(parseInt(e.target.value))}
          placeholder="Enter time"
        />
        <FormButtons resetForm={resetForm} />
      </Form>
    </div>
  );
}
