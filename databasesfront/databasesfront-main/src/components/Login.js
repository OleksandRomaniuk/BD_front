import React, {useState} from "react";
import {Form,Button} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {mainMenu} from '../menuConfig'
import PropTypes from 'prop-types'

function LoginForm({setToken, setRole}){
    
    const [validated, setValidated] = useState(false);
    const [state, setState] = useState({
        email: "",
        password: "",
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
             fetch("http://localhost:8090/api/auth/login",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            })
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(data => {
                if(data.status != 200){
                    alert(data.body.message)
                }
                else{
                    setToken(data.body.token)
                    setRole(data.body.role)
                    window.location.reload(false)
                }
            })
        }

    }

    return(
        <div>
            <Navigation data={mainMenu}/>
            <div className="col-sm-6 mx-auto">
                <h2>Логін</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="emailasd" placeholder="Email" onChange={e => state.email = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control required type="password" pattern="[A-Za-z0-9_]*[A-Z]+[A-Za-z0-9_]*" placeholder="Пароль" onChange={e => state.password = e.target.value}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Залогінитися
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default LoginForm;

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired,
    setRole: PropTypes.func.isRequired
}
