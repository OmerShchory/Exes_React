import Navbar from 'react-bootstrap/Navbar';
import {shopLogo} from '../Assets/images';

export default function Nav(){
    return( 
        <Navbar className="navbar">
            <Navbar.Brand>
            <img
                src={shopLogo}
                width="50"
                heaight="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
            </Navbar.Brand>
        </Navbar>
    )
}
