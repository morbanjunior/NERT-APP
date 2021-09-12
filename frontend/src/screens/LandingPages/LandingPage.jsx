import React, {useEffect} from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {

       const history = useHistory()
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo){
            history.push("/mynotes");
        }
     }, [history])
     

    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className='title'>Welcome to Note Zipper</h1>
                            <p className="subtitle"> One Safe Place For all your Notes.</p>
                        </div>
                        <div className='buttonContainer'>
                            <Link to="/login">
                                <Button size='lg' className='landingbutton'>Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button size='lg' className='landingbutton' variant='outline-primary'>Sign Up</Button>
                            </Link>
                        </div>

                    </div>

                </Row>
            </Container>

        </div>
    )
}

export default LandingPage
