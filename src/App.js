import axios from 'axios';
import React from 'react';
import './App.css';
import { BASE_ULR, URLS } from './config/constant';
import SignInOutContainer from './containers';
function App() {
  axios.defaults.baseURL = BASE_ULR
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  axios.interceptors.request.use(function (config) {
    if (config.url !== URLS.login) {
      config.headers.common['Authorization'] = sessionStorage.getItem("AUTH_TOKEN");
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  return (
    <div className="App">
     <SignInOutContainer/>
    </div>
  );
}

export default App;