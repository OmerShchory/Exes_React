import React from "react";
import Form from "react-bootstrap/Form";

export default function CheckBoxInput(props) {
  return (
    <Form.Group className="mb-3">
      {props.ingredients.length > 0 &&
        props.ingredients.map((ingredient) => (
          <Form.Check
            onChange={props.handleChecked}
            label={ingredient.Name}
            id={ingredient.Id}
            key={ingredient.Id}
          />
        ))}
    </Form.Group>
  );
}
