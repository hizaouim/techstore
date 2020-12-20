import React from 'react';
import { Link } from 'react-router-dom';

const Article = (props) => {
    const url = 'http://localhost:5000/articles/image'

    return (
        <Link to={`/articles/${props.article._id}`} >
            <div className='rounded p-1 m-2 bg-light text-dark'>
                <div className="row">
                    <div className="col-3">
                        <img src={`${url}/${props.article.image}`} className='p-3' alt=""/>
                    </div>
                    <div className="col-9">
                    <p> <b>  {props.article.title} </b> </p>
                        <hr/>
                        <p>Condition: {props.article.condition}</p>
                        <p><b> {props.article.price}$ </b></p>            
                    </div>
            </div>
        </div>
        
        </Link>
        
    );
};
export default Article;