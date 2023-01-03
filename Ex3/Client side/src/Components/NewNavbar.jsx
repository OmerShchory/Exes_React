import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shopLogo } from "../Assets/images";

export default function NewNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <img
        src={shopLogo}
        style={{ width: 60, height: 60, padding: 10, borderRadius: "20px" }}
        width="50"
        heaight="50"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      <Navbar.Brand>
        <span style={{ fontWeight: "bold", marginLeft: 10 }}>My Kitchen</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" style={{ textDecoration: "none" }}>
            Home page
          </Link>
          <Link to="/ingredient" style={{ textDecoration: "none" }}>
            Create new ingredient
          </Link>
          <Link to="/recipe" style={{ textDecoration: "none" }}>
            Create new recipe
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
