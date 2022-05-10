import React, {useState} from "react";
import {Button, Card} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

function LibraryPrym({prym, token}){
    const navigate = useNavigate()

        const toEdit = () => {
            navigate('/prymir/edit',{state:{number:prym.id, shelf:prym.shelfNumber}})
        }

        const deletePrym = (id) =>{
            fetch("http://localhost:8090/api/prumirnuki/deletePrumirnuki?id=" + id,{
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                },
            }).then(r => {
                if(r.status != 200){
                    alert(r.body.message)
                }else{
                    navigate('/')
                }
            })
        }

        return(
            <Card className="mx-auto p-2" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>
                        <div>Номер: {prym.id}</div>
                    </Card.Title>
                    <Card.Text>
                        <div>Полиця: {prym.shelfNumber}</div>
                    </Card.Text>
                    <Button variant="primary" onClick={toEdit}>Редагувати</Button>
                    <Button variant="secondary" onClick={() => deletePrym(prym.id)}>Видалити</Button>
                </Card.Body>
            </Card>
        )
}
export default LibraryPrym;
