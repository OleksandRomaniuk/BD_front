import React, {useState} from "react";
import {Button, Card} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

function Prym({prym, token, isTaken}){
    const navigate = useNavigate()

    if(!isTaken){
        const takePrym = () => {
            fetch("http://localhost:8090/api/Cooperation/cooperation",{
                method: 'POST',
                headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(prym)
                })
                .then(r => {
                    navigate('/')
                }).catch(e => console.log(e))
        }
        

        return(
            <Card className="mx-auto p-2" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Доступний</Card.Title>
                    <Card.Text>
                    <div>Полиця: {prym.shelfNumber}</div>
                    </Card.Text>
                    <Button variant="primary" onClick={takePrym}>Взяти</Button>
                </Card.Body>
            </Card>
        )
    } else {
        const returnPrym = () => {
            fetch("http://localhost:8090/api/Cooperation/returnbook",{
                method: 'POST',
                headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(prym)
                })
                .then(r => {
                    navigate('/')
                }).catch(e => console.log(e))
        }

        return(
            <Card className="mx-auto p-2" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Примірник книги {prym.books.bookName}</Card.Title>
                    <Card.Text>
                        <div>Номер: {prym.id}</div>
                    </Card.Text>
                    <Card.Text>
                        <div>Полиця: {prym.shelfNumber}</div>
                    </Card.Text>
                    <Button variant="primary" onClick={returnPrym}>Повернути</Button>
                </Card.Body>
            </Card>
        )
    }
}
export default Prym;
