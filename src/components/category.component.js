import React from 'react';

const Category = (props) => {
    return (
        <div className='rounded p-1 m-2 bg-light '>
        <p> {props.category.name} </p>
        
    </div>
    );
};

export default Category;