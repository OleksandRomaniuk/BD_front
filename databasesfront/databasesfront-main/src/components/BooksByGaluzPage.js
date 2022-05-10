import React, {useState, useEffect} from "react";
import {Form,Button} from 'react-bootstrap'
import {useLocation} from 'react-router-dom';
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {userMenu} from '../menuConfig'
import CategoryCard from "./CategoryCard";
import Book from "./Book";

function BooksByGaluzPage({token}){
    const location = useLocation()
    const books = []
    for(let b of location.state.books){
        books.push(<Book booksState={location.state} book={b} token={token}/>)
    }
    
    return(
        <div>
            <Navigation data={userMenu}/>
            <h3>Книги у категорії {location.state.categoryName}</h3>
            <div className="d-flex flex-wrap">
                {books}
            </div>
        </div>
    )
}
    
    
export default BooksByGaluzPage;
