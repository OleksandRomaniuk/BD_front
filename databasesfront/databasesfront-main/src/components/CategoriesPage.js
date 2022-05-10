import React, {useState, useEffect} from "react";
import {Form,Button,Offcanvas} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {libraryMenu, userMenu} from '../menuConfig'
import CategoryCard from "./CategoryCard";
import AuthorsObj from "./AuthorsObj";
import CategoryObj from "./CategoryObj";

function CategoriesPage({token}){
    const [categories, setCategories] = useState(false)
    const [validated, setValidated] = useState(false);
    const [content, setContent] = useState([]);
    const [show, setShow] = useState(false);
    const [categoryState, setAuthorState] = useState({
        galuz_num: ""
    })

    useEffect( () => {
        fetch("http://localhost:8090/api/books/allGaluz",{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
        })
        .then(r => r.json())
        .then(r => {
            setCategories(r);
        })
    })

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
             fetch("http://localhost:8090/api/books/createGaluz",{
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
                    alert("Галузь створено")
                    window.location.reload()
                }
            })
        }
    }

    const handleClose = () => {
        setContent([]);
        setShow(false)
    };

    const handleShowAdd = () => {
        setContent([
            <Form noValidate validated={validated} onSubmit={handleSubmitEdit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Назва галузі</Form.Label>
                    <Form.Control  required type="text" pattern="^[A-Z][a-z\s]*$" placeholder="Назва галузі" onChange={e => categoryState.galuz_num = e.target.value}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Додати
                </Button>
            </Form>
        ])
        setShow(true);
    };

    if(categories){
        const category_arr = []
        for(let a of categories){
            category_arr.push(<CategoryObj token={token} category={a}/>)
        }

        if(content){
            return(
                <div>
                    <Navigation data={libraryMenu}/>
                    <h3>Робота з категоріями</h3>
                    <Button variant="primary" className="mb-3" onClick={handleShowAdd}>Додати категорію</Button>
                    <div className="d-flex flex-wrap">
                        {category_arr}
                    </div>
                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Створення категорії</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {content}
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            )
        }
        return(
            <div>
                <Navigation data={libraryMenu}/>
                <h3>Робота з категоріями</h3>
                <Button variant="primary" className="mb-3" onClick={handleShowAdd}>Додати категорію</Button>
                <div className="d-flex flex-wrap">
                    {category_arr}
                </div>
            </div>
        )
    }
    return(
        <div>
            <Navigation data={libraryMenu}/>
            <h3>Робота з категоріями</h3>
            <div className="d-flex flex-wrap">
            </div>
        </div>
    )
}
    
    
export default CategoriesPage;
