
import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import MainContent from '../components/MainContent';
import Quiz from '../components/Quiz';
import PatientHP from '../components/PatientHP';
import CounselorHP from '../components/CounselorHP';
import DoctorHP from '../components/DoctorHP';
import ManagerHP from '../components/ManagerHP';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Home({loginCallBack}) {
  const classes = useStyles();
    const[itemValue,setItemValue] = useState(null);
    const [userType,setUserType] = useState(null);
  
    useEffect(() => {
      if(sessionStorage.getItem("AUTH_TOKEN") !== null){
        let user = JSON.parse(sessionStorage.getItem("AUTH_TOKEN"));
        setUserType(user.userType);
  
      }
   
    }); 

  return (
   <div className={classes.root}>
     
     

      {userType === 'patient'? (

        <>
        <PatientHP />
        </>
      ):null}

{userType === 'counselor'? (

<>
<CounselorHP />
</>
):null}

{userType === 'manager'? (

<>
<ManagerHP />
</>
):null}

{userType === 'doctor'? (

<>
<DoctorHP />
</>
):null}
<SideMenu loginCallBack={loginCallBack}/>
</div>
  );
}

export default Home;