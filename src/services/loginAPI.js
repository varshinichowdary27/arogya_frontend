import axios from 'axios';
import { URLS } from '../config/constant';
export const login = ({username, password, userType}) => axios.get(URLS.login, {
    username,
    password,
    userType
  }).then(
      auth => sessionStorage.getItem("AUTH_TOKEN", {...auth, userType})
  );

export const signUp = ({userData}, userType) => {
  let register_url = '';
  if(userType === 'patient') {
    register_url = 'register_patient';
  }
  if (userType === 'patient') {
    register_url = 'register_counselor';
  }
  return axios.put(register_url, userData).then(
    auth => {
      sessionStorage.getItem("AUTH_TOKEN", {...auth, userType});
      return auth;
    }
);

}


export const logOut = () => {
  sessionStorage.removeItem("AUTH_TOKEN");
}