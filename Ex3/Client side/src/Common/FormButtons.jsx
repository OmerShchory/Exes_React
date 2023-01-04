import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function FormButtons(props) {
  return (
    <Form.Group className="mb-3">
      <Button variant="outline-primary" type="submit" style={{ width: 70 }}>
        Submit
      </Button>
      <Button
        variant="outline-danger"
        style={{ marginLeft: 75, width: 70 }}
        onClick={props.resetForm}
      >
        Clear
      </Button>
    </Form.Group>
  );
}
