import React from 'react';

const Category = (props) => {
    const url = 'http://localhost:5000/articles/image'

    return (
        <div className="col-4">
        <div className='rounded p-1 m-2 bg-light '>
        
        <p> {props.category.name} </p>
        <img src={`${url}/${props.category.image}`} className='p-2 rounded-circle'  alt=""/>

    </div>
    </div>
    );
};

export default Category;