import React, {useState, useEffect} from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import Navigation from "./Navigation";
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {libraryMenu, userMenu} from '../menuConfig'
import Prym from './Prym'
import LibraryPrym from "./LibraryPrym";

function PrymirnyksPageLibrary({token}){
    const location = useLocation()
    const navigate = useNavigate()
    const pryms = []

    for(let p of location.state.prym){
        pryms.push(
           <LibraryPrym token={token} prym={p}/>
        )
    }

    
    const create = () =>{
        navigate('/prymir/create',{state:{bookId:location.state.bookId}})
    }
    return(
        <div>
            <Navigation data={libraryMenu}/>
            <h2>{location.state.bookName}</h2>
            <Button variant="primary" className="mb-3" onClick={create}>Додати примірник</Button>
            <div className="d-flex flex-wrap">
                {pryms}
            </div>
        </div>
    )


}
    
    
export default PrymirnyksPageLibrary;
