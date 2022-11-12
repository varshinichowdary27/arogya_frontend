import axios from 'axios';
import { URLS } from '../config/constant';
export const login = ({ email, password, userType }) => axios.get(URLS.login, {
  params: {
    email,
    password,
    userType
  }
}).then(
  auth => {
    if (auth.data.data.logged) {
      sessionStorage.setItem("AUTH_TOKEN", JSON.stringify({ ...auth.data.data, userType }));
    }
    return auth.data.data;
  }
);

export const send_self_Assesment = (email_address, questions_list) => {
  console.log(questions_list);
  return axios.post(URLS.register_appointment,
    {
      email_address: email_address,
      assessment: {
        questions_list: questions_list.map(q => ({ question: q.question, problem_frequency: q.answer }))
      }
    }).then(
      auth => {
        return auth.data.data;
      }
    )
};

export const signUp = (userData) => {
  let register_url = URLS.register_patient;
  if (userData.userType === 'patient') {
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
      if (auth.data.errors === undefined) {
        sessionStorage.setItem("AUTH_TOKEN", JSON.stringify({ ...userData }));
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

export const getPatientList = () => axios.get(URLS.get_appointments).then(
  auth => {
    return auth.data.data;
  }
);

export const getUserInfo =  () => JSON.parse(sessionStorage.getItem("AUTH_TOKEN"));

export const getUserTypeToDisplay=  (userData) => {
  let userType= ""
  if (userData.userType === 'patient') {
    userType = 'Patient';
  }
  if (userData.userType === 'counselor') {
    userType = 'Counselor';
  }
  if (userData.userType === 'manager') {
    userType = 'Manager';
  }
  if (userData.userType === 'doctor') {
    userType = 'Doctor';
  }
  return userType;
};