import React, {useState, useEffect} from "react";
import {Form,Button} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {userMenu} from '../menuConfig'
import CategoryCard from "./CategoryCard";

function CategoryPage({token}){
    const [categoriesPrymsCount, setCategoriesPrymsCount] = useState(false)
    const [categories, setCategories] = useState(false)
    useEffect(() => {
        const data = fetch("http://localhost:8090/api/books/allGaluz",{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
        })
        .then(r => r.json())
        .then(r => {
            setCategories(r);
        })

        fetch("http://localhost:8090/api/prumirnuki/galuzPrymCount",{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
        })
        .then(r => r.json())
        .then(r => {
            setCategoriesPrymsCount(r);
        })
    })

    if (categories && categoriesPrymsCount){
        let categories_arr = []
        for(let c of categories){
            let count = 0
            for(let cc of categoriesPrymsCount){
                if(cc.id == c.id){
                    count = cc.prymCount
                    break
                }
            }
            if(count != 0){
                categories_arr.push(<CategoryCard category={c} booksCount={count} token={token}/>)
            }
        }
        return (
        <div>
             <Navigation data={userMenu}/>
             <h3>Категорії книг</h3>
             <div className="d-flex flex-wrap">
                {categories_arr}
            </div>
        </div>)
    }
    return(
        <div>
            <Navigation data={userMenu}/>
            <h3>Категорії книг</h3>
            <div className="d-flex flex-wrap">
            </div>
        </div>
    )
}
    
    
export default CategoryPage;
