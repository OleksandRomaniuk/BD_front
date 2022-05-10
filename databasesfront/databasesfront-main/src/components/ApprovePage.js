import React, {useState, useEffect} from "react";
import {Button,Table} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {libraryMenu, userMenu} from '../menuConfig'
import CategoryCard from "./CategoryCard";

function ApprovePage({token}){
    const [requests, setRequests] = useState(false)

    useEffect(() => {
        const data = fetch("http://localhost:8090/api/Cooperation/allCoopToApprove",{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
        })
        .then(r => r.json())
        .then(r => {
            setRequests(r);
        })
    })

    if(requests){
        const approve = (id) => {
            fetch("http://localhost:8090/api/Cooperation/confirmCooperation",{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            },
            body: JSON.stringify({id: id})
            })
            .then(r => {
                window.location.reload(false)})
        }
        const requests_arr = []
        for(let r of requests){
            requests_arr.push(
                <tr>
                    <td>{r.id}</td>
                    <td>{r.prumirnuki_id}</td>
                    <td>{r.lastName}</td>
                    <td>{r.firstname}</td>
                    <td><Button onClick={() => approve(r.id)}>Підтвердити</Button></td>
                </tr>
            )
        }

        return(
            <div>
                <Navigation data={libraryMenu}/>
                <h3>Запити на видачу книг</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Номер запита</th>
                        <th>Номер примірника</th>
                        <th>Прізвище користувача</th>
                        <th>Ім'я користувача</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests_arr}
                    </tbody>
                </Table>
            </div>
        )
    }

    return(
        <div>
            <Navigation data={libraryMenu}/>
            <h3>Запити на видачу книг</h3>
            <div className="d-flex flex-wrap">
            </div>
        </div>
    )
}
    
    
export default ApprovePage;
