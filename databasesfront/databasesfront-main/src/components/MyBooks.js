import React, {useState, useEffect} from "react";
import {Form,Table} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {userMenu} from '../menuConfig'
import Prym from "./Prym";

function MyBooks({token}){
    const [pryms, setPryms] = useState(false)
    useEffect(() => {
        const data = fetch("http://localhost:8090/api/prumirnuki/getByUser",{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
        })
        .then(r => r.json())
        .then(r => {
            setPryms(r);
        })
    })
    
    const messageApprove = (approve) => {
        if(approve) 
            return "Примірник на рука" 
        return "Можете забрати примірник в бібліотеці"
    }

    if(pryms){
        const pryms_arr = []
        for(let p of pryms){
            if(p.expecteddate){
                pryms_arr.push(
                    <tr>
                        <td>{p.prymid}</td>
                        <td>{p.bookname}</td>
                        <td>{messageApprove(p.status_approve)}</td>
                        <td>Очікувана дата повернення {p.expecteddate}</td>
                    </tr>
                )
            }
            else{
                pryms_arr.push(
                    <tr>
                        <td>{p.prymid}</td>
                        <td>{p.bookname}</td>
                        <td>{messageApprove(p.status_approve)}</td>
                        <td>Ви ще не отримали примірник</td>
                    </tr>
                )
            }
        }

        return(
            <div>
                <Navigation data={userMenu}/>
                <h2>Взяті примірники</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Номер примірника</th>
                        <th>Назва книги</th>
                        <th>Стан</th>
                        <th>Дата повернення</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pryms_arr}
                    </tbody>
                </Table>
            </div>
        )
    }

    return(
        <div>
            <Navigation data={userMenu}/>
            <h2>Взяті примірники</h2>
        </div>
    )
}
    
    
export default MyBooks;
