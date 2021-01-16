import Axios from 'axios';
import React, { useEffect, useState } from 'react';

const Account = () => {

    const [user, setUser] = useState({})
    useEffect (() =>{
        const token = localStorage.getItem ('auth-token')
        console.log( 'token' + token );
        Axios.get ('http://localhost:5000/users/user', {
            headers: {
                'x-auth-token' : token
            }
        })
        .then(res => {
            console.log(res.data);
            setUser(res.data)
        }, err => console.log(err))
    }, [])

    return (
        <div className='bg-light rounded p-2' >
            <p>My account:</p>
            <p> Username: {user.username} </p>
            <p>e-mail: {user.email}</p>
    <p>Adresse: {user.address}</p>
        </div>
    );
};

export default Account;