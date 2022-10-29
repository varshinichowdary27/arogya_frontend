import axios from 'axios';
import React from 'react';
import './App.css';
import SignInOutContainer from './containers';
function App() {
  axios.defaults.baseURL = 'https://api.example.com';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return (
    <div className="App">
     <SignInOutContainer/>
    </div>
  );
}

export default App;