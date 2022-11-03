import axios from 'axios';
import { URLS } from '../config/constant';
export const login = ({username, password, userType}) => axios.get(URLS.login, { params: {
    email: username,
    password,
    userType
  }}).then(
      auth => {
        if (auth.data.data.logged) {
          sessionStorage.setItem("AUTH_TOKEN", JSON.stringify({...auth.data.data, userType}) ); 
        }
        return auth.data.data;
      }
  );

export const signUp = (userData) => {
  let register_url = URLS.register_patient;
  if(userData.userType === 'patient') {
    register_url = URLS.register_patient;
  }
  if (userData.userType === 'counselor') {
    register_url = URLS.register_counselor;
  }
  if (userData.userType === 'manager') {
    register_url = URLS.register_manager;
  }
  if (userData.userType === 'doctor') {
    register_url = URLS.register_doctor;
  }
  return axios.post(register_url, userData).then(
    auth => {
      if(auth.data.errors === undefined ) {
        sessionStorage.setItem("AUTH_TOKEN", JSON.stringify({...userData}));
      } else {
        return auth.data
      }
      return auth.data;
    }
);

}


export const logOut = () => {
  sessionStorage.removeItem("AUTH_TOKEN");
}