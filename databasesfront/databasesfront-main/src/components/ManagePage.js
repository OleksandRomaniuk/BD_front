import React, {useEffect, useState} from "react";
import {Table,Button} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {adminMenu, mainMenu} from '../menuConfig'

function ManagePage({token}){
    const [users, setUsers] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8090/api/users/getUserToRegister",{
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
        const createLibrary = (id) => {
            fetch("http://localhost:8090/api/users/createLibrary?id="+id,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                }
            })
            .then(r => {
                if(r.status != 200){
                    alert(r.body.message)
                }
                else{
                    window.location.reload();
                }
            })
        }

        const users_obj = []
        for(let u of users){
            users_obj.push(
                <tr>
                    <td>{u.email}</td>
                    <td>{u.lastname}</td>
                    <td>{u.firstname}</td>
                    <td><Button onClick={() => createLibrary(u.id)}>Зробити бібліотекарем</Button></td>
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
                            <th>Пошта користувача</th>
                            <th>Прізвище</th>
                            <th>Ім'я</th>
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
                            <th>Пошта користувача</th>
                            <th>Прізвище</th>
                            <th>Ім'я</th>
                            <th></th>
                        </tr>
                    </thead>
                </Table>
            </div>
        </div>
    )
}
export default ManagePage;
