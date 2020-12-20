import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter as Router, Route } from 'react-router-dom'
import articlesList from './components/articlesList.component';
import categoriesList from './components/categoriesList.component';
import Login from './components/Login.component';
import Navbar from './components/Navbar.component';
import Register from './components/Register.component';
import UserContext from './context/UserContext'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Upload from './components/Upload.component';
import ArticlesByCat from './components/ArticlesByCat.component';
import ArticleDetail from './components/ArticleDetail.component';
import Cart from './components/Cart.component';
import Account from './components/Account.component';

 function App() {
  const [cartArts, setCartArts] = useState(0)

   const [userData, setUserData] = useState({
     token : undefined,
     user : undefined
   })
   
   useEffect(()=>{
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token')
      if (token === null){
        localStorage.setItem('auth-token', '')
        token = ''
      }
      const tokenResponse = await axios.post(
          'http://localhost:5000/users/tokenIsValid',
          null,
          { headers : { 'x-auth-token' : token }}
      )
      
      if (tokenResponse.data){
        const userRes = await axios.get (
          'http://localhost:5000/users/user',
           {headers : { 'x-auth-token' : token }}
        )
        console.log('here '+userRes.email);
        setUserData({
          token,
          user: userRes.data
        })
      }
    }
    checkLoggedIn()
   }, [])

   function updateCart  () {
     console.log('testss');
      setCartArts (cartArts + 1)
   }

  return (
    <Router>
      <UserContext.Provider value={{userData, setUserData}}  >
      <div className="container">
      <Navbar  cartArts = {cartArts} />
      <br/>
      <Route path='/' exact component ={articlesList} />
      <Route path='/categories' component ={categoriesList} />
      <Route path='/login' component ={Login} />
      <Route path='/register' component ={Register} />
      <Route path='/Upload' component ={Upload} />
      <Route path='/articlesByCat/:id' component ={(props) => <ArticlesByCat {...props} key={window.location.pathname}/>}   />
      <Route path='/cart/:id' component ={Cart} />
      <Route path='/account' component ={Account} />
      <Route  path="/articles/:id" 
      render={(props) => <ArticleDetail {...props} updateCart={updateCart} />} />

      
      </div>
      </UserContext.Provider>
      
    </Router>
  );
}

export default App;
