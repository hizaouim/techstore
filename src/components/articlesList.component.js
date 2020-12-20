import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Article from './Article.component';

const ArticlesList = () => {
    
    const [list, setList ] = useState([])

    useEffect (()=>{
        Axios.get ('http://localhost:5000/articles')
        .then(res => {
            setList(res.data)
        }, err => console.log(err))
    }, [])

     function dispList()  
    {
        console.log(list);
        if (list.length > 0){
        return    list.map (article => {
            console.log(article.brand);
            return  (  <Article article={article} /> )
        })
    }
    }

    return (
        <div>
            {
                dispList()
            }

        </div>
    );
};

export default ArticlesList;