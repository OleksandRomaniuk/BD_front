import React, {useState, useEffect} from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import {Button, Table} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {userMenu} from '../menuConfig'
import Prym from './Prym'

function PrymirnyksPage({token}){
    const location = useLocation()
    const navigate = useNavigate()
    const pryms = []
    for(let p of location.state.prym){
        if(p.ifactive){
            pryms.push(
                <tr>
                    <td>{p.id}</td>
                    <td>Наявно</td>
                    <td><Button onClick={() => reserve(p.id)}>Замовити</Button></td>
                </tr>
            )
        }
        else{
            pryms.push(
                <tr>
                    <td>{p.id}</td>
                    <td>Очікується повернення {p.expecteddate}</td>
                    <td><Button disabled>Замовити</Button></td>
                </tr>
            )
        }
    }

    const reserve = (prymId) => {
        fetch("http://localhost:8090/api/Cooperation/createCooperation",{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        },
        body: JSON.stringify({id: prymId})
        })
        .then(r => {
            navigate('/books',{state:location.state.booksState})})
    }

    return(
        <div>
            <Navigation data={userMenu}/>
            <h2>Поточний стан примірників</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Номер примірника</th>
                    <th>Стан</th>
                    <th>Замовити</th>
                    </tr>
                </thead>
                <tbody>
                    {pryms}
                </tbody>
            </Table>
        </div>
    )
}
    
    
export default PrymirnyksPage;
