import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions';

const Header = ({ setSearch }) => {
   
    const history=useHistory()

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () =>{
        dispatch(logout())
        history.push("/")
    }

    return (

        <div>
            <Navbar bg="primary" expand="lg" variant='dark'>
                <Container>
                    <Navbar.Brand>
                        <Link to='/'>Note Zipper</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className='m-auto'>
                            <Form className="d-flex">
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-2"
                                    aria-label="Search"
                                    onChange={(e) =>setSearch(e.target.value)}
                                />

                            </Form>
                        </Nav>
                        {userInfo ? <Nav>
                            <Nav.Link>
                                <Link to='/mynotes'>My Notes</Link></Nav.Link>
                            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}
                                >Logout
                                </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>:<Nav>
                            {" "}
                            <Nav.Link>
                                <Link to='/login'>Login</Link></Nav.Link></Nav>}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
