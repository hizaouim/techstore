import React from 'react';
import Category from './category.component';
import Axios from 'axios';
import  { useEffect, useState } from 'react';

const CategoriesList = () => {
    const [list, setList ] = useState([])

    useEffect (()=>{
        Axios.get ('http://localhost:5000/categories')
        .then(res => {
            setList(res.data)
        }, 
        err => console.log(err))
    }, [])

     function dispList()  
    {
        console.log(list);
        if (list.length > 0){
        return    list.map (category => {
            console.log(category.name);
            return  (<Category category={category} />)
        })
    }
    }
    return (
        <div className='row'>
           {
            dispList()  
           }
           </div>
    );
};

export default CategoriesList;