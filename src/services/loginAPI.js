import axios from 'axios';
import { URLS } from '../config/constant';
export const login = ({username, password}) => axios.get(URLS.login, {
    timeout: 5000
  }).then(
      a => console.log("adadasd"),
      () => console.log("error")
  );


export const signup = ({userData}) => 
    axios.post(URLS.signup,userData);