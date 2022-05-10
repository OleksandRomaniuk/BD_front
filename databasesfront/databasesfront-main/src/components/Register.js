import React, {useState} from "react";
import {Form,Button} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {mainMenu} from '../menuConfig'

function RegisterForm(){

    const [validated, setValidated] = useState(false);
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "READER",
        faatherName: "",
        adressa: "",
        work_place: "",
        date: "",
        phone_number1: "",
        phone_number2: "",
        phone_number3: ""
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
             fetch("http://localhost:8090/api/registration",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            })
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(data => {
                if(data.status != 201){
                    alert(data.body.message)
                }
                else{
                    alert("Реєстація успішна!")
                    window.location.reload(false)
                }
            })
            // .then(data=>{ console.log(data); })
        }

    }

    return(
        <div>
            <Navigation data={mainMenu}/>
            <div className="col-sm-6 mx-auto">
                <h2>Реєстрація</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Прізвище</Form.Label>
                        <Form.Control required type="text" placeholder="Прізвище" onChange={e => state.firstName = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control  required type="text" placeholder="Ім'я" onChange={e => state.lastName = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>По-батькові</Form.Label>
                        <Form.Control required type="text" placeholder="По-батькові" onChange={e => state.faatherName = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="emailasd" placeholder="Email" onChange={e => state.email = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control required type="password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" placeholder="Пароль" onChange={e => state.password = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                        <Form.Label>Адреса</Form.Label>
                        <Form.Control required type="text" placeholder="Адреса" onChange={e => state.adressa = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                        <Form.Label>Робоча адреса</Form.Label>
                        <Form.Control required type="text" placeholder="Робоча адреса" onChange={e => state.work_place = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
                        <Form.Label>Дата народження</Form.Label>
                        <Form.Control required type="date" placeholder="Дата народження" onChange={e => state.date = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                        <Form.Label>Номер телефону 1</Form.Label>
                        <Form.Control required pattern="\+38[0-9]{10}" type="text" placeholder="Номер телефону 1" onChange={e => state.phone_number1 = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
                        <Form.Label>Номер телефону 2</Form.Label>
                        <Form.Control pattern="\+38[0-9]{10}" type="text" placeholder="Номер телефону 2" onChange={e => state.phone_number2 = e.target.value}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput12">
                        <Form.Label>Номер телефону 3</Form.Label>
                        <Form.Control pattern="\+38[0-9]{10}" type="text" placeholder="Номер телефону 3" onChange={e => state.phone_number3 = e.target.value}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Зареєструватися
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default RegisterForm;
