import Navbar from "react-bootstrap/Navbar";
import { shopLogo } from "../Assets/images";

export default function Nav() {
  return (
    <Navbar className="navbar">
      <Navbar.Brand>
        <img
          src={shopLogo}
          style={{ width: 50, height: 50, padding: 10, borderRadius: "20px" }}
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
    </Navbar>
  );
}
