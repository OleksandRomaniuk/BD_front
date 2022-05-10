import React, {useState, useEffect} from "react";
import {Card,Button,Offcanvas,Form} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {libraryMenu, userMenu} from '../menuConfig'
import CategoryCard from "./CategoryCard";
import AuthorBooks from "./AuthorBooks";
import LibraryBook from "./LibraryBook";

function CategoryObj({category, token}){
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [content, setContent] = useState([]);
    const [categoryState, setCategoryState] = useState({
        id: category.id,
        galuz_num: category.galuz_num,
    })
    const handleClose = () => {
        setContent([]);
        setShow(false)
    };

    const handleSubmitEdit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            alert("Не валідно заповнені поля")
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else{
            event.preventDefault();
             fetch("http://localhost:8090/api/books/updateGaluz",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                },
                body: JSON.stringify(categoryState)
            })
            .then(data => {
                if(data.status != 200){
                    alert(data.body.message)
                }
                else{
                    alert("Дані категорії оновлені")
                    window.location.reload()
                }
            })
        }

    }

    const handleShowBooks = () => {
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
            let book_arr = []
            for(let b of r)
                book_arr.push(<LibraryBook book={b} token={token}/>)
            setContent(book_arr);
            setShow(true);
        })
    };

    const handleShowEdit = () => {
        setContent([
            <Form noValidate validated={validated} onSubmit={handleSubmitEdit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Номер категорії: {category.id}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Назва</Form.Label>
                    <Form.Control  required type="text" pattern="^[A-Z][a-z]*$" defaultValue={category.galuz_num} placeholder="Назва" onChange={e => categoryState.galuz_num = e.target.value}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Змінити
                </Button>
            </Form>
        ])
        setShow(true);
    };

    if(content){
        return(
            <>
                <Card className="mx-auto p-2" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{category.galuz_num}</Card.Title>
                        <Card.Text>
                            Категорія
                        </Card.Text>
                        <div className="d-flex flex-wrap justify-content-around">
                            <Button variant="primary" className="p-2" onClick={handleShowEdit}>Редагувати</Button>
                            <Button variant="info" className="p-2 mt-2" onClick={handleShowBooks}>Переглянути книжки</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{category.galuz_num}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {content}
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )
    }

    return (
        <Card className="mx-auto p-2" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{category.galuz_num}</Card.Title>
                <Card.Text>
                    Категорія
                </Card.Text>
                <div className="d-flex flex-wrap justify-content-around">
                    <Button variant="primary" className="p-2" onClick={handleShowEdit}>Редагувати</Button>
                    <Button variant="info" className="p-2 mt-2" onClick={handleShowBooks}>Переглянути книжки</Button>
                </div>
            </Card.Body>
        </Card>
    )
}
    
    
export default CategoryObj;
