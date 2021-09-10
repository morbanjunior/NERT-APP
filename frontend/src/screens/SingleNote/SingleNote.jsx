import React, {useEffect, useState } from 'react'
import MainScreen from '../../component/MainScreen'
import { Form, Button,  Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateNoteAction, deleteNoteAction } from '../../actions/notesActions'
import Loading from '../../component/Loading'
import ErrorMessage from '../../component/ErrorMessage'
import ReactMarkdown from "react-markdown"
import axios from 'axios'


const SingleNote = ({match, history}) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")

    const dispatch = useDispatch()

   const noteUpdate = useSelector((state) => state.noteUpdate)
   const { loading, error } = noteUpdate

   const noteDelete = useSelector((state) => state.noteDelete)
   const { loading:loadingDelete, error:errorDelete, success:successDelete } = noteDelete

    

    //Delete notess 
    const deleteHandler = (id) =>{
        if (window.confirm("Are you sure?")){
            dispatch(deleteNoteAction(id))
        }
        history.push("/mynotes")
    }

   useEffect(() => {
       const fetching = async () =>{
           const { data } = await axios.get(`/api/notes/${match.params.id}`)
           
           setTitle(data.title)
           setContent(data.content)
           setCategory(data.category)
           setDate(data.updatedAt)
       }

       fetching()
       
   }, [match.params.id, date])

   const resetHandler = () =>{
    setTitle("")
    setContent("")
    setCategory("")
    
   }

   const updateHandler = (e) =>{
    e.preventDefault()
    dispatch(updateNoteAction(match.params.id, title, content, category))
    if (!title || !content || !category) return;
    

    resetHandler()
    history.push("/mynotes")
}
   
    return (
        <MainScreen title="Edit Note">
        <Card>
            <Card.Header>Edit a Note</Card.Header>
            <Card.Body>
                <Form onSubmit={updateHandler}>
                {errorDelete && <ErrorMessage variant="danger" >{errorDelete}</ErrorMessage>}
                   {loadingDelete && <Loading/>}

                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                        type="text"
                        value={title}
                        palaceholder="Enter the title"
                        onChange={(e)=> setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control 
                        as="textarea"
                        value={content}
                        palaceholder="Enter the content"
                        rows={4}
                        onChange={(e)=> setContent(e.target.value)}/>
                    </Form.Group>
                    {content && (
                        <Card>
                            <Card.Header>Note Preview</Card.Header>
                            <Card.Body>
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </Card.Body>
                        </Card>
                    )}

                    <Form.Group controlId="content">
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                        type="content"
                        value={category}
                        palaceholder="Enter the Category"
                        onChange={(e)=> setCategory(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        {loading && <Loading size={50}/>}
                        <Button type="submit" variant="primary">
                            Update Note
                        </Button>
                        <Button className="mx-2" variant=" danger " onClick={() => deleteHandler(match.params.id)} variant="danger">
                            Delete Note
                        </Button>
                    </Form.Group>

                </Form>
            </Card.Body>
            <Card.Footer className="text-muted"> 
              Updated on - {date.substring(0, 10)}
            </Card.Footer>
        </Card>
    </MainScreen>

    )
}

export default SingleNote
