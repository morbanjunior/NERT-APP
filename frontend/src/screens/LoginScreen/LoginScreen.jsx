import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../component/MainScreen'
import './LoginScreen.css'

import Loading from '../../component/Loading'
import ErrorMessage from '../../component/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

const LoginScreen = ({history}) => {

    const [email, setEmail ] = useState ("")
    const [password, setPassword ] = useState ("")
   
    const dispatch = useDispatch()
    
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
            history.push("/mynotes")
        }
    }, [history, userInfo])
    
        //metode for validation Login
    const submitHandler = async (e) => {
        e.preventDefault()

        dispatch(login(email, password))
    }

    return (
        <MainScreen title="LOGIN">
            <div className="loginContainer">
                
                {loading && <Loading/>}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                        type="email"
                        Value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        Value={password}
                        placeholder="Enter email"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                      New Customer? <Link to="/register">Register Here</Link>  
                    </Col>

                </Row>
            </div>


        </MainScreen>
           
        
    )
}

export default LoginScreen
