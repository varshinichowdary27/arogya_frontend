import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import { BASE_ULR, URLS } from './config/constant';
import SignInOutContainer from './containers/signInOutContainer';
import { Grid, Paper,Box,CssBaseline } from '@material-ui/core'
import arogya_poster from './arogya_poster.jpeg'

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
  
    <div className="App">
    <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
           <img src={arogya_poster} style={{width:'100%',height:'100%'}} alt="Arogya Image" />
          </Grid>
        

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          ></Box>
          <div className='signinContainer' style={{width:'100%'}}>
           {loggedIn ? <Home loginCallBack={ () => {
         setLoggedIn(sessionStorage.getItem("AUTH_TOKEN") !== null);
       }}/> : 
       <SignInOutContainer loginCallBack={ () => {
         setLoggedIn(sessionStorage.getItem("AUTH_TOKEN") !== null);
       }}></SignInOutContainer> 
     
     
     }
              </div>
         </Grid> 
         </Grid>
      </div>

  );
}

export default App;
