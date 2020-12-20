import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import UserContext from '../context/UserContext'
import articlesByCat from './ArticlesByCat.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Navbar = (props) => {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const [list, setList ] = useState([])

  useEffect (()=>{
      Axios.get ('http://localhost:5000/categories')
      .then(res => {
          setList(res.data)
      }, 
      err => console.log(err))
  }, [])

  

    const {userData, setUserData} = useContext(UserContext)
    const history = useHistory()
    const register = () => {  history.push('/register')}
    const login = () => {  history.push('/login')}
    const logout = () => {
      console.log('log out');
      setUserData({
        token : undefined,
        user : undefined
      })
      localStorage.setItem (
        'auth-token' , ''
      )
    }

    return (
        <div  >
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            
            <Link to='/' className='navbar-brand'>teXtore</Link>
          
            <button class="navbar-toggler" type="button" data-toggle="collapse" 
              aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" 
              onClick={handleNavCollapse}
              >
              <span class="navbar-toggler-icon"></span>
            </button>

  <div class={`${isNavCollapsed ? 'collapse ' : ''} navbar-collapse`} id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active m-1">
        <Link to='/'>Articles</Link>
      </li>
      <li class="nav-item m-1">
        <Link to='/categories'>Categories</Link>
      </li>
      <li>
        <div className="form-group ">
          <input type="text" name="" id="" placeholder='search'/>
        </div>
      </li>
      </ul>
      { userData.user ?
    <ul className='navbar '>
     <li class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {userData.user.username}
        </a>
         <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          
          <Link to='/account'>Account</Link>
          <a class="dropdown-item" href="#">Orders</a>
          <Link to='/Upload'>Sell a product</Link>
          <div class="dropdown-divider"></div>
          
          <button onClick={logout} class="dropdown-item" >Log out</button>
       
        </div>
        </li> 
        <Link to={`/cart/${userData.user.id}`}>
        <li><FontAwesomeIcon icon={faShoppingCart}/> 
        <span> {props.cartArts} </span> </li>
        </Link>
        </ul>
    :
    <>
    <button onClick={register} >Register</button>
    <button onClick={login} >Login</button>
    </>
    
   
}
     
    
    


    
  </div>
        </div>
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            <ul class="navbar-nav mr-auto ">
              {
                  list.map (category => {
                   
                    return  (
                    <li className='m-1 '>
                      <Link className='text-dark' to={`/articlesByCat/${category._id}`}
                      > 
                          {  category.name}                       
                      </Link>
                    </li>
                    )
                })
              }
            </ul>
           

       </div>
       
        </div>
    );
};

export default Navbar;