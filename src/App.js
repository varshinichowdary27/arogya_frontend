import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import { BASE_ULR, URLS } from './config/constant';
import SignInOutContainer from './containers/signInOutContainer';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(JSON.parse(sessionStorage.getItem("AUTH_TOKEN")) !== null);
  axios.defaults.baseURL = BASE_ULR
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  axios.interceptors.request.use(function (config) {
    if (config.url !== URLS.login &&
      config.url !== URLS.register_patient &&
      config.url !== URLS.register_counselor) {
        if(sessionStorage.getItem("AUTH_TOKEN") !== null) {
          config.headers.common['Authorization'] = sessionStorage.getItem("AUTH_TOKEN");
      }
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  return (
  
    <div className="App" style={{height: '100%'}}>
    
           {loggedIn ? <Home loginCallBack={ () => {
         setLoggedIn(sessionStorage.getItem("AUTH_TOKEN") !== null);
       }}/> : 
       <SignInOutContainer loginCallBack={ () => {
         setLoggedIn(sessionStorage.getItem("AUTH_TOKEN") !== null);
       }}></SignInOutContainer> 
     
     
     }
     </div>
              

  );
}

export default App;
