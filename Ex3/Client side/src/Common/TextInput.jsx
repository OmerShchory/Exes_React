import React from "react";
import Form from "react-bootstrap/Form";

export default function TextInput(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        value={props.value}
        onChange={props.changedText}
        className="form-input"
        type="text"
        placeholder={props.placeholder}
        required
        style={{ maxWidth: 400 }}
      />
    </Form.Group>
  );
}
