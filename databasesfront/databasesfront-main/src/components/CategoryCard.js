import React, {useState} from "react";
import {Button, Card} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

function CategoryCard({category, booksCount, token}){
    const navigate = useNavigate()

    // if(! isLibrary){
    //     const details = () => {
    //         fetch("http://localhost:8090/api/prumirnuki/getAllPrumirnuki",{
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(book)
    //         })
    //         .then(r => r.json())
    //         .then(r => {
    //             navigate('/prymir',{state:{pryms:r,bookName:book.bookName}})
    //         })
    //     }

    //     return(
    //         <Card className="mx-auto p-2" style={{ width: '18rem' }}>
    //             <Card.Body>
    //                 <Card.Title>{book.bookName}</Card.Title>
    //                 <Card.Text>
    //                 <div>Ціна: {book.pages}</div>
    //                 <div>Сторінок: {book.bookPrice}</div>
    //                 </Card.Text>
    //                 <Button variant="primary" onClick={details}>Детальніше</Button>
    //             </Card.Body>
    //         </Card>
    //     )
    // } else {
    //     const details = () => {
    //         fetch("http://localhost:8090/api/prumirnuki/takenInfo?id="+book.id,{
    //         method: 'GET',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': token
    //         }
    //         })
    //         .then(r => r.json())
    //         .then(r => {
    //             navigate('/prymir',{state:{history:r,book:book}})
    //         })
    //     }

    //     return(
    //         <Card className="mx-auto p-2" style={{ width: '18rem' }}>
    //             <Card.Body>
    //                 <Card.Title>{book.bookName}</Card.Title>
    //                 <Card.Text>
    //                 <div>Ціна: {book.pages}</div>
    //                 <div>Сторінок: {book.bookPrice}</div>
    //                 </Card.Text>
    //                 <Button variant="primary" onClick={details}>L</Button>
    //             </Card.Body>
    //         </Card>
    //     )
    // }

    const details = () => {
        fetch("http://localhost:8090/api/books/allBooksByGaluz",{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        },
        body: JSON.stringify({id:category.id})
        })
        .then(r => r.json())
        .then(r => {
            navigate('/books',{state:{categoryName:category.galuz_num, books:r}})
        })
    }

    return(
        <Card className="mx-auto p-2" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Категорія {category.galuz_num}</Card.Title>
                <Card.Text>
                 <div>Книг в галузі: {booksCount}</div>
                 </Card.Text>
                <Button variant="primary" onClick={details}>Перейти до категорії</Button>
            </Card.Body>
        </Card>
    )
}
export default CategoryCard;
