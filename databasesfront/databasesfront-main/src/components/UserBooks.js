import React, {useState, useEffect} from "react";
import {Form,Button} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {userMenu} from '../menuConfig'
import Book from './Book'

function UserBooks({token}){
    const [books, setBooks] = useState(false)
    useEffect(() => {
        const data = fetch("http://localhost:8090/api/books/AllBooks",{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
        })
        .then(r => r.json())
        .then(r => {
            setBooks(r);
        })
    })

    if (books){
        let books_arr = []
        for(let b of books){
            books_arr.push(<Book book={b}/>)
        }
        return (
        <div>
             <Navigation data={userMenu}/>
             <h3>Книги наявні у Бібліотеці</h3>
             <div className="d-flex flex-wrap">
                {books_arr}
            </div>
        </div>)
    }
    return(
        <div>
            <Navigation data={userMenu}/>
            <h3>Книги наявні у Бібліотеці</h3>
            <div className="d-flex flex-wrap">
            </div>
        </div>
    )
}
    
    
export default UserBooks;
