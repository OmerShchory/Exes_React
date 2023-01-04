import React from "react";
import Form from "react-bootstrap/Form";

export default function NumberInput(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        value={props.value}
        onChange={props.changedNumber}
        style={{ maxWidth: 400 }}
        type="number"
        placeholder={props.placeholder}
        required
      />
    </Form.Group>
  );
}
