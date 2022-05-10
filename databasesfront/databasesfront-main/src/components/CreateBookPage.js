import React, {useState, useEffect} from "react";
import {Form,Button} from 'react-bootstrap'
import {useLocation} from 'react-router-dom';
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {libraryMenu, userMenu} from '../menuConfig'
import CategoryCard from "./CategoryCard";
import Book from "./Book";

function CreateBookPage({token}){
    const [validated, setValidated] = useState(false);
    const [authorsObj, setAuthorsObj] = useState(false);
    const [categoriesObj, setCategoriesObj] = useState(false);
    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])
    const [state, setState] = useState({
        bookName: "",
        city: "",
        year: "",
        pulish: "",
        pages: "",
        bookPrice: "",
        author_id: [],
        galuz_id: []
    })

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8090/api/books/allAvtors",{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
            }).then(r => r.json()),
            fetch("http://localhost:8090/api/books/allGaluz",{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
            }).then(r => r.json())
        ]).then(([ra, rc]) => {
            setAuthorsObj(ra)
            setCategoriesObj(rc)
        })
        
    }, [])

    const parseAuthorsObj = (author) => {
        return(
            <option value={String(author.id)}>{author.authorFirstname} {author.authorSecondname}</option>
        )
    }

    const parseCategoryObj = (category) => {
        return(
            <option value={String(category.id)}>{category.galuz_num}</option>
        )
    }

    const getAuthorInputForm = () => {
        return(
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                <Form.Label>Автор</Form.Label>
                <Form.Select required type="text" placeholder="автор" onChange={e => {
                    state.author_id.push(e.target.value)
                    }}>
                        <option>Обрати автора</option>
                        {authorsObj.map( author => parseAuthorsObj(author))}
                </Form.Select>
            </Form.Group>
        )
    }

    const getCategoryInputForm = () => {
        return(
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                <Form.Label>Категорія</Form.Label>
                <Form.Select required type="text" placeholder="автор" onChange={e => {
                    state.galuz_id.push(e.target.value)
                    }}>
                        <option>Обрати категорію</option>
                        {categoriesObj.map( category => parseCategoryObj(category))}
                </Form.Select>
            </Form.Group>
        )
    }

    const addAuthor = () => {
        setAuthors(s => {
            return [
                ...s,
                getAuthorInputForm()
            ]
        })
    }

    const addCategory = () => {
        setCategories(s => {
            return [
                ...s,
                getCategoryInputForm()
            ]
        })
    }
    if(authorsObj && categoriesObj){
        const handleSubmit = async (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                setValidated(true);
            }
            else if (state.author_id.length == 0){
                event.preventDefault();
                event.stopPropagation();
                alert("Ви не додали жодного автора")
            }
            else if (state.galuz_id.length == 0){
                event.preventDefault();
                event.stopPropagation();
                alert("Ви не додали жодної категорії")
            }
            else{
                event.preventDefault();
                 fetch("http://localhost:8090/api/books/createBook",{
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
                        alert("Книга додана")
                        window.location.reload(false)
                    }
                })
                .then(data=>{ console.log(data); })
            }

        }
        return(
            <div>
                <Navigation data={libraryMenu}/>
                <h3>Додати книгу</h3>
                    <div className="mx-auto p-2">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Назва книги</Form.Label>
                                    <Form.Control required type="text" placeholder="Назва книги" onChange={e => state.bookName = e.target.value}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Місто видання</Form.Label>
                                    <Form.Control  required type="text" placeholder="Місто видання" onChange={e => state.city = e.target.value}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                    <Form.Label>Рік видання</Form.Label>
                                    <Form.Control required type="text" placeholder="Рік видання" onChange={e => state.year = e.target.value}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                    <Form.Label>Видавництво</Form.Label>
                                    <Form.Control required type="text" placeholder="Видавництво" onChange={e => state.pulish = e.target.value}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                    <Form.Label>Кількість сторінок</Form.Label>
                                    <Form.Control required type="text" pattern="^[1-9][0-9]*$" placeholder="Кількість сторінок" onChange={e => state.pages = e.target.value}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                                    <Form.Label>Ціна</Form.Label>
                                    <Form.Control required type="text" placeholder="Ціна" pattern="^[1-9][0-9]*$" onChange={e => state.bookPrice = e.target.value}/>
                                </Form.Group>
                                {authors}
                                <Button variant="primary" onClick={addAuthor}>
                                    Додати автора
                                </Button>
                                {categories}
                                <Button variant="primary" onClick={addCategory}>
                                    Додати категорію
                                </Button>
                                <Button variant="primary" type="submit">
                                    Додати книжку
                                </Button>
                            </Form>
                    </div>
            </div>
        )
    }

    return(
        <div>
            <Navigation data={libraryMenu}/>
            <h3>Додати книгу</h3>
        </div>
    )
}
    
    
export default CreateBookPage;
