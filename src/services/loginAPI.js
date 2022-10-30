import axios from 'axios';
import { URLS } from '../config/constant';
export const login = ({username, password, userType}) => axios.get(URLS.login, { params: {
    email: username,
    password,
    userType
  }}).then(
      auth => {
        sessionStorage.setItem("AUTH_TOKEN", JSON.stringify({...auth.data.data, userType}) );
        return auth.data.data;
      }
  );

export const signUp = (userData, userType) => {
  let register_url = '/register_patient';
  if(userType === 'patient') {
    register_url = '/register_patient';
  }
  if (userType === 'counselor') {
    register_url = '/register_counselor';
  }
  return axios.post(register_url, userData).then(
    auth => {
      sessionStorage.setItem("AUTH_TOKEN", JSON.stringify({...userData, userType}));
      return auth;
    }
);

}


export const logOut = () => {
  sessionStorage.removeItem("AUTH_TOKEN");
}