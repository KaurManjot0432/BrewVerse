import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../../state';
import './Navbar.css';
// import { Button } from '@material-ui/core';
// import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";

function Navbar() {
    const dispatch = useDispatch()
    interface User {
        email: string;
    }
    interface AppState {
        user: User;
    }
    const user = useSelector((state: AppState) => state.user)
    // const navigate = useNavigate();

    return (
        <div className='navbar'>
            <h4>BrewVerse</h4>
            <Dropdown style={{ marginRight: '5px' }}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {user.email}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => dispatch(setLogout())} >Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>
    )
}

export default Navbar;