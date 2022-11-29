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
export const addUser = (userData) => {
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
//        sessionStorage.setItem("AUTH_TOKEN", JSON.stringify({ ...userData }));
      }
      else {
        return auth.data
      }
      return auth.data;
    }
  );

}

export const logOut = () => {
  sessionStorage.removeItem("AUTH_TOKEN");
}

export const getAssessmentDetails = (patientEmail) =>{
var request_url = URLS.get_appointments + "?email_address="+ patientEmail ;
return axios.get(request_url).then(
  auth => {
    return auth.data.data;
  }
);
}

export const getPatientList = () => axios.get(URLS.get_appointments).then(
  auth => {
    return auth.data.data;
  }
);

export const deleteAssesment = ({patientId}) => axios.delete(URLS.delete_assesment + patientId).then(
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

export const appointmentUpdate = (patientId, payload) => axios.put(URLS.changeAppointment, {...payload, appointment_id: patientId})
.then(
  auth => {
    return auth.data.data;
  }
);

export const appointmentDelete = (patientId) => axios.delete(URLS.changeAppointment +patientId)
.then(
  auth => {
    return auth.data.data;
  }
);

export const getDoctor = () => axios.get(URLS.list_doctor)
.then(
  auth => {
    return auth.data.data;
  }
);
export const list_users = () =>
Promise.all([
	fetch(URLS.list_doctor),
	fetch(URLS.list_counselor),
	fetch(URLS.patients)
]).then(function (responses) {
	// Get a JSON object from each of the responses

	return Promise.all(responses.map(function (response) {

		return response.json()
	}));
}).then(function (data) {
	// Log the data to the console
	// You would do something with both sets of data here
    let merged_data;


    data[0].data.forEach(object => {
              object.account_type = 'Doctor';
            });
     data[1].data.forEach(object => {
          object.account_type = 'Counselor';
        });
     data[2].data.forEach(object => {
              object.account_type = 'Patient';
            });

    merged_data =[].concat(data[0].data,data[1].data,data[2].data);

    return merged_data;
}).catch(function (error) {
	// if there's an error, log it
	console.log(error);
});

export const perfomDelete =(row) =>{
let url ='';
if(row.account_type == 'Patient'){
url = URLS.delete_patient +row.emailAddress;
}else if(row.account_type == 'Doctor'){
url = URLS.delete_doctor +row.emailAddress;
}else{
url = URLS.delete_counsellor +row.emailAddress;
}
return axios.delete(url).then(
    auth => {
      if (auth.data.errors === undefined) {
        return auth.data
      } else {
        return auth.data
      }
      return auth.data;
    })

}

export const get_stats_data = () => axios.get(URLS.report)
                               .then(
                                 auth => {

                                   return auth.data.data;
                                 }
                               );

