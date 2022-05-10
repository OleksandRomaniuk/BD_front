import React, {useEffect, useState} from "react";
import {Table,Button} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {adminMenu, mainMenu} from '../menuConfig'

function AdminPage({token}){
    const [users, setUsers] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8090/api/Cooperation/expired",{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
        })
        .then(r => r.json())
        .then(r => {
            setUsers(r)
        })
    })

    if(users){
        const increase = (id) => {
            fetch("http://localhost:8090/api/Cooperation/increaseCooperation?id="+id,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                }
            })
            .then(r => {
                if(r.status != 200){
                    alert(r.body.message)
                }else{
                    window.location.reload();
                }
            })
        }

        const users_obj = []
        for(let u of users){
            users_obj.push(
                <tr>
                    <td>{u.prumirnuki.id}</td>
                    <td>{u.expectedDate}</td>
                    <td>{u.user.lastName}</td>
                    <td>{u.user.firstName}</td>
                    <td>{u.user.adressa}</td>
                    <td><Button onClick={() => increase(u.id)}>Подовжити</Button></td>
                </tr>
            )
        }
        return(
            <div>
                <Navigation data={adminMenu}/>
                <h3>Список боржників</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Номер примірника</th>
                            <th>Очікувана дата повернення</th>
                            <th>Прізвище</th>
                            <th>Ім'я</th>
                            <th>Адреса</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users_obj}
                    </tbody>
                </Table>
            </div>
        )
    }
    return(
        <div>
            <Navigation data={adminMenu}/>
            <div className="col-sm-6 mx-auto">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Номер примірника</th>
                            <th>Очікувана дата повернення</th>
                            <th>Прізвище</th>
                            <th>Ім'я</th>
                            <th>Адреса</th>
                        </tr>
                    </thead>
                </Table>
            </div>
        </div>
    )
}
export default AdminPage;
