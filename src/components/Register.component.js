import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios'


const Register = () => {
    const [email, setemail] = useState ('')
    const [password, setPassword] = useState ('')
    const [passwordCheck, setPasswordCheck] = useState ('')
    const [username, setUsername] = useState('')
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
    const handleUsernameChange = (e) =>{
        setUsername(e.target.value)
    }

    const handlesubmit = async (e) =>{

       
        e.preventDefault()
        
        const msg = ''
        try {
            const newuser = {
                email: email,
                password: password,
                passwordCheck : passwordCheck,
                username: username
            }
            const data =  await axios.post('http://localhost:5000/users/add',newuser)
            console.log(JSON.stringify(data.data.user))
            console.log('data'+ data.data.token);
            const user =  await axios.post('http://localhost:5000/users/login',{email, password})
            

            setUserData({
                token : user.data.token,
                user : user.data.user
            })
            localStorage.setItem('auth-token', user.data.token)
            history.push('/')
        } catch (error) {
            console.log('set' + error.response.data.msg);
            setErrorMsg(error.response.data.msg)
        }
        
    }

    return (
        <div>
               <form onSubmit={handlesubmit} >
               <div className="form-group">
                <label htmlFor="">username:</label>
                <input class="form-control" type="text" 
                name="" 
                id=""
                value={username}
                onChange={handleUsernameChange}/>
            </div>
           
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
            <div className="form-group">
                <label htmlFor="">Confirm Password:</label>
                <input class="form-control" 
                type="Password" 
                name="" id=""
                value={passwordCheck}
                onChange={handlePassCheckChange}/>
            </div>
            <input type='submit'  className='btn btn-primary' 
            value='Login'/>
           <p>{errorMsg}</p>
            </form>
            
        </div>
    );
};

export default Register;