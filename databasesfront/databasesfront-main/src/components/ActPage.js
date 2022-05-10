import React, {useState, useEffect} from "react";
import {Button,Table, Offcanvas, Form} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {libraryMenu, userMenu} from '../menuConfig'
import CategoryCard from "./CategoryCard";

function ActPage({token}){
    const [requests, setRequests] = useState(false)
    const [act, setAct] = useState({
        price: 0
    })
    const [show, setShow] = useState(false);
    const [prym, setPrym] = useState(false);
    const [existsActs, setExistsActs] = useState(false);
    const [validated, setValidated] = useState(false);


    const handleClose = () => {
        setShow(false)
    };

    const handleShowAdd = (prym) => {
        setPrym(prym)
        setShow(true);
    };

    useEffect(() => {
        Promise.all([fetch("http://localhost:8090/api/Cooperation/allTaken",{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
        })
        .then(r => r.json())
        .then(r => {
            setRequests(r);
        }),
        fetch("http://localhost:8090/api/users/getAkts",{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
            })
            .then(r => r.json())
            .then(r => {
                setExistsActs(r);
        })])
    },[])

    const hadleCreateAkt = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            alert("Ціна вказана у не правильному форматі")
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else{
            event.preventDefault();
             fetch("http://localhost:8090/api/users/createAkt",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                },
                body: JSON.stringify({
                    aktType:"money",
                    price:act.price,
                    user_id:prym.user_id,
                    prumirnuki_id:prym.prumirnuki_id
                })
            })
            .then(data => {
                if(data.status != 200){
                    alert(data.body.message)
                }
                else{
                    alert("Акт створено")
                    window.location.reload()
                }
            })
        }
    }

    if(requests && existsActs){
        const requests_arr = []
        for(let r of requests){
            requests_arr.push(
                <tr>
                    <td>{r.id}</td>
                    <td>{r.prumirnuki_id}</td>
                    <td>{r.lastName}</td>
                    <td>{r.firstname}</td>
                    <td>{r.expecteddate}</td>
                    <td><Button onClick={() => handleShowAdd(r)}>Створити акт</Button></td>
                </tr>
            )
        }

        const existAkts_arr = []
        for(let a of existsActs){
            existAkts_arr.push(
                <tr>
                    <td>{a.id}</td>
                    <td>{a.prumirnuki_id}</td>
                    <td>{a.lastname}</td>
                    <td>{a.firstname}</td>
                    <td>{a.price}</td>
                    <td>{a.bookname}</td>
                </tr>
            )
        }

        return(
            <div>
                <Navigation data={libraryMenu}/>
                <h3>Створення актів</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Номер замовлення</th>
                        <th>Номер примірника</th>
                        <th>Прізвище користувача</th>
                        <th>Ім'я користувача</th>
                        <th>Очікувана дата повернення</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests_arr}
                    </tbody>
                </Table>
                <h3>Існуючі акти</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Номер акту</th>
                        <th>Номер примірника</th>
                        <th>Прізвище користувача</th>
                        <th>Ім'я користувача</th>
                        <th>Ціна</th>
                        <th>Назва книги</th>
                        </tr>
                    </thead>
                    <tbody>
                        {existAkts_arr}
                    </tbody>
                </Table>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Інформація у акті</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Form noValidate validated={validated} onSubmit={hadleCreateAkt}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label><strong>Номер примірника:</strong> {prym.prumirnuki_id}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label><strong>Номер користувача:</strong> {prym.user_id}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label><strong>Прізвище користувача:</strong> {prym.lastName}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label><strong>Ім'я користувача:</strong> {prym.firstname}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label><strong>Ціна відшкодування</strong></Form.Label>
                            <Form.Control  required type="text" pattern="^[1-9][0-9]*$" placeholder="Ціна відшкодування" onChange={e => act.price = parseInt(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Додати
                        </Button>
                    </Form>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        )
    }

    return(
        <div>
            <Navigation data={libraryMenu}/>
            <h3>Створення актів</h3>
            <div className="d-flex flex-wrap">
            </div>
        </div>
    )
}
    
    
export default ActPage;
