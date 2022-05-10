import React, {useState, useEffect} from "react";
import {Offcanvas,Button} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {libraryMenu, userMenu} from '../menuConfig'
import CategoryCard from "./CategoryCard";

function AuthorBooks({author, token, isShow}){
    const [show, setShow] = useState(isShow);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
    );
}
    
    
export default AuthorBooks;
