
import React, {useEffect} from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import MainScreen from '../../component/MainScreen'
import {useDispatch, useSelector } from 'react-redux'
import { deleteNoteAction, listNotes } from '../../actions/notesActions'
import  Loading  from '../../component/Loading'
import ErrorMessage from '../../component/ErrorMessage'




const MyNotes = ({ search }) => {
    

    const dispatch = useDispatch()

    //for bring the accionts User
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    
    
    //for bring the accionts note
    const noteList = useSelector((state )=> state.noteList)
    const { loading, notes, error } = noteList

    const noteCreate = useSelector((state) => state.noteCreate)
   const { success: successCreate } = noteCreate

   const noteUpdate = useSelector((state) => state.noteUpdate)
   const { success:successUpdate } = noteUpdate

   const noteDelete = useSelector((state) => state.noteDelete)
   const { loading:loadingDelete, error:errorDelete, success:successDelete } = noteDelete

    

    //Delete notess 
    const deleteHandler = (id) =>{
        if (window.confirm("Are you sure?")){
            dispatch(deleteNoteAction(id))
        }
    }
      const history = useHistory()

///Funtion For get data
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo){
             //get the note
        dispatch(listNotes())
        }else{
            history.push('/')
        }
       

        //Push to home if the user is not login
        

    }, [dispatch, history, successCreate, userInfo, successUpdate, successDelete])
    
   
///// end here. 

    return (
        <div>
           <MainScreen title={` Welcom Back ${userInfo?.name}..`}>
               <Link to="/createnote">
                   <Button style={{ marginLeft:10, marginBottom: 6}} size="lg">
                       Create New Notes
                   </Button>
                </Link> 
                   {errorDelete && <ErrorMessage variant="danger" >{errorDelete}</ErrorMessage>}
                   {loadingDelete && <Loading/>}

                   {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
                   {loading && <Loading/>}
                   {notes?.reverse()
                   .filter((filterdNote) =>
                        filterdNote.title.toLowerCase().includes(search.toLowerCase()))
                   .map(note =>(
                        <Accordion key={note._id}>
                            <Card style={{ margin: 10 }}>
                        <Card.Header style={{ display: "flex" }}>
                           <span 
                           style={{
                               color: "black",
                               textDecoration: "none",
                               flex: 1,
                               cursor: "pointer",
                               alignSelf: "center",
                               fontSize: 18,
                           }}
                           >
                               <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                                  {note.title}
                               </Accordion.Toggle>
                              </span> 
                           <div>
                               <Button href={`/note/${note._id}`}>Edit</Button>
                               <Button variant="danger" className="mx-2" onClick={()=>deleteHandler(note._id)}>Delete</Button>
                           </div>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0"> 
                        <Card.Body>
                        <h4>
                            <Badge variant="success">Category - {note.category}</Badge>
                        </h4>
                        <div className="card-body">
                           <blockquote className="blockquote mb-0">
                            <p>{note.content}</p>
                           <footer className="blockquote-footer">
                               Create on {" "}
                               <cite title="Source Title">{note.createdAt.substring(0,10)}</cite></footer>
                           </blockquote>
                        </div>

                        </Card.Body>
                        </Accordion.Collapse>
                        
                   </Card>
                       
                        </Accordion>
                        ))
                   }
                  
              
            </MainScreen>
           
        </div>
    )
}

export default MyNotes
