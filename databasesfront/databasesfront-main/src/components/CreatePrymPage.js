import React, {useState} from "react";
import {Form,Button} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {libraryMenu, mainMenu} from '../menuConfig'
import {useLocation,useNavigate} from 'react-router-dom';

function CreatePrymPage({token}){
    const location = useLocation()
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [state, setState] = useState({
        bookId: location.state.bookId,
        shelfNumber: 0
    })

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else{
            event.preventDefault();
             fetch("http://localhost:8090/api/prumirnuki/createPrumirnuki",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                },
                body: JSON.stringify(state)
            })
            .then(data => {
                if(data.status != 200){
                    alert(data.body.message)
                }
                else{
                    navigate("/")
                }
            })
        }

    }

    return(
        <div>
            <Navigation data={libraryMenu}/>
            <div className="col-sm-6 mx-auto">
                <h2>Створення примірника</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Номер книги: {location.state.bookId}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Полиця</Form.Label>
                        <Form.Control  required type="text" pattern="^[1-9][0-9]*$" placeholder="Полиця" onChange={e => state.shelfNumber = parseInt(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Змінити
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default CreatePrymPage;
