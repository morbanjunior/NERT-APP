import React, {useState, useEffect } from 'react'
import { Form, Button, Row,Col } from 'react-bootstrap'
import ErrorMessage from '../../component/ErrorMessage'
import MainScreen from '../../component/MainScreen'
import './RegisterScreen.css'
import { Link, useHistory} from 'react-router-dom'
import Loading from '../../component/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'


const RegisterScreen = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [pic, setPic] = useState("https://icon-library.com/images/22215-dog.ico.ico")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const [message, setMessagee] = useState(null)
    const [picMessage, setPicMessage] = useState(null)
    
    
    const dispatch = useDispatch()
    
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const history = useHistory()
    
    useEffect(() => {
        if(userInfo){
            history.push("/mynotes")
        }
    }, [history, userInfo])

    //Register Handler
    const submitHandler = async (e) =>{
        e.preventDefault()
       
        if(password !== confirmpassword){
            setMessagee( 'Passwords do not match' )
        }
        else{
            dispatch(register(name, email, password, pic))
        }
       
    } 

        //updateFotos
    const postDetails = (pics) =>{
        if (!pics){
            return setPicMessage("Please Select an Image")
        }
         setPicMessage(null)

         if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
             const data = new FormData()
             data.append('file', pics)
             data.append('upload_preset', 'notezipper')
             data.append('cloud_name', 'exodiatec')
             fetch("https://api.cloudinary.com/v1_1/exodiatec/image/upload", {
                 method: "post",
                 body: data,
             })
             .then((res) => res.json())
             .then((data) =>{
                 console.log(data)
                 setPic(data.url.toString())
             })
             .catch((err)=>{
                 console.log(err)
             })
         } else{
             return setPicMessage("Please Select an Image")
         }
    }
    
    
    return (
        <MainScreen title="REGISTER">
            <div className="RegisterContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                { message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name"
                        value={name}
                        placeholder="Entre Name"
                        onChange={(e)=> setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email"
                        value={email}
                        placeholder="Entre Email Address"
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="FormBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                        value={password}
                        placeholder="Entre Password"
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                         value={confirmpassword}
                        placeholder="Confirm passwordd"
                        onChange={(e)=> setConfirmpassword(e.target.value)}
                        />
                    </Form.Group>
                    { picMessage && (
                        <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                    )}

                    <Form.Group controlId="pic">
                        <Form.Label>Profile Pincture</Form.Label>
                        <Form.File
                            onChange={(e)=> postDetails(e.target.files[0])}                        
                            id="custom-file"
                            type="image/png"
                            label="Upload Profile Picture"
                            custom
                        
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>

                </Form>

                <Row className="py-3">
                    <Col>
                      Have an Account? <Link to="/login">Login</Link>  
                    </Col>

                </Row>

            </div>
            </MainScreen>
    )
}

export default RegisterScreen
