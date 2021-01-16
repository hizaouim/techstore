import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Rating from './Rating.component';

const ArticleDetail = (props) => {
    
    const [article, setArticle] = useState({})
    const [image, setImage] = useState ('')
    const url = 'http://localhost:5000/articles/image'
    useEffect(() =>{
        Axios.get('http://localhost:5000/articles/'+props.match.params.id )
        .then(res => {
            console.log('array1'+ res.data);
            setArticle( res.data )
        }, err => console.log(err))
    }, [])

    function handleClick (e)  {
        console.log('1');
      //  console.log('2'+ typeof( props.updateCart()));
        props.updateCart ()
    }
    return (
        <div className=' bg-light p-2 rounded'>
            <div className="row">
            <div className="col-3">
            <img src={`${url}/${article.image}`} className='p-3' alt=""/>
            </div>
            <div className="col-9">
            <p><b>{article.title}</b></p>
            <Rating  value={article.reviews} 
                                numreviews = {article.numReviews} 
                        >

                        </Rating>
            <hr/>
            <p>Condition: {article.condition}</p>            
            <p>Year: {article.year}</p>
            <p>Color: {article.color}</p>
            <p><b>{article.price}$</b></p>

            <button className='btn btn-success' onClick={handleClick} >Add to Cart</button>
            </div>
            </div>
        </div>
    );
};

export default ArticleDetail;