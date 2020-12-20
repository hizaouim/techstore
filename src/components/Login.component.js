import React, { useContext, useState } from 'react';
import axios from 'axios'
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const [email, setemail] = useState ('')
    const [password, setPassword] = useState ('')
    const [passwordCheck, setPasswordCheck] = useState ('')
    const [errorMsg, setErrorMsg] = useState('')
    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    const handlePassChange = (e)=>{
        setPassword(e.target.value)
    }
    const handleemailChange = (e) =>{
        setemail(e.target.value)
    }
    const handlePassCheckChange = (e) =>{
        setPasswordCheck(e.target.value)
    }

    const handlesubmit = async (e) =>{

       
        e.preventDefault()
        
        const msg = ''
        try {
            const newuser = {
                email: email,
                password: password
            }
            const data =  await axios.post('http://localhost:5000/users/login',newuser)
            console.log(JSON.stringify(data.data.user))
            console.log('data'+ data.data.token);
            setUserData({
                token : data.data.token,
                user : data.data.user
            })
            localStorage.setItem('auth-token', data.data.token)
            history.push('/')
        } catch (error) {
            console.log(error.response.data.msg);
            setErrorMsg(error.response.data.msg)
        }
        
    }
    return (
        <div>
            <form onSubmit={handlesubmit} >
            <div className="form-group">
                <label htmlFor="">email:</label>
                <input class="form-control" type="text" 
                name="" 
                id=""
                value={email}
                onChange={handleemailChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Password:</label>
                <input class="form-control" 
                type="Password" 
                name="" id=""
                value={password}
                onChange={handlePassChange}/>
            </div>
            <input type='submit'  className='btn btn-primary' 
            value='Login'/>
            <p>{errorMsg}</p>
            </form>
        </div>
    );
};

export default Login;