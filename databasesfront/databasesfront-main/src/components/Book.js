import React, {useState} from "react";
import {Button, Card} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

function Book({booksState, book, token, isLibrary}){
    const navigate = useNavigate()

    const details = () => {
        fetch("http://localhost:8090/api/prumirnuki/prymReturnData?id="+book.id,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
        })
        .then(r => r.json())
        .then(r => {
            navigate('/prymir',{state:{prym:r, booksState:booksState}})
        })
    }

    return(
        <Card className="mx-auto p-2" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{book.bookName}</Card.Title>
                <Card.Text>
                <div>Ціна: {book.pages}</div>
                <div>Сторінок: {book.bookPrice}</div>
                </Card.Text>
                <Button variant="primary" onClick={details}>Подивитися наявні примірники</Button>
            </Card.Body>
        </Card>
    )
}
export default Book;
