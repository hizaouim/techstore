import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Article from './Article.component';

const ArticlesByCat = (props) => {
    
    const [articlesByCategory, setArticlesByCategory] = useState([])
    const [url, setUrl] = useState('')

    useEffect(() => {
        
        console.log('data' +  JSON.stringify (props.match.params.id));
        
          Axios.get('http://localhost:5000/articles/byCategory/'+props.match.params.id )
        .then(res => {
            console.log('array'+ res.data);
            setArticlesByCategory( res.data )
        }, err => console.log(err))
    }, [])
    
    return (
        <div>
            {
                    articlesByCategory.length > 0 ?
                 articlesByCategory.map (
                    article => {
                        return  (<Article article={article} />)
                    }):
                    ''
                }
            
        </div>
    );
};

export default ArticlesByCat;