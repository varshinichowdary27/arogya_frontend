import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getAssessmentDetails, getUserInfo } from '../../services/loginAPI';
import { SelfAssessment } from "./SelfAssessment";
import Quiz from "./Quiz";
import { Alert, CircularProgress } from '@mui/material';
import { Appointments } from './appointments';
const width = 700;

const widthModifier = {
  width: `${width}px`,
};

export default function PatientHP() {
  const [value, setValue] = React.useState('1');
  const [patientList, setPatientList] = React.useState([]);
  const [errMsg, setErrMsg] = React.useState("");
  const [loading, setloading] = React.useState(true);
  const [reload, setReload] = React.useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setReload(true);
  };
  const user = getUserInfo();
  let userEmail = user?.email_address;
  //let userEmail = "varshinichowdary4@gmail.com";

  const dataMapper = ({ question_answers, patient: {
    lastName,
    emailAddress,
    phoneNumber } }) => {
    return {
      lastName,
      emailAddress,
      phoneNumber,
      questions_list: question_answers.questions_list
    };
  }
  React.useEffect(() => {
    setloading(true);
    getAssessmentDetails(userEmail).then(data => data.details)
      .then(patientList => patientList.map(patient => dataMapper(patient)))
      .then(patientList => {
        setErrMsg("");
        setPatientList(patientList);
      })
      .catch(() => {
        setErrMsg("Unable to fetch  Self-assessment");
        setPatientList([]);
      }).finally(() => setloading(false))
  }, [reload, userEmail])

  return (
    <Box sx={{ width: '500%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="black" indicatorColor="secondary" centered>
            <Tab label="Self-Assessment" value="1" style={widthModifier} />
            <Tab label="Appointments" value="2" style={widthModifier} />
          </TabList>
        </Box>

        <TabPanel value="1">
          <>
            {loading ? (<CircularProgress />) : (
              <>
                {errMsg !== "" && <Alert severity="error">{errMsg}</Alert>}
                {errMsg === "" && patientList.length === 0 ? <Quiz refresh={() => setReload(!reload)}/> : <SelfAssessment data={{ patientList }} />}
              </>)}
          </>

        </TabPanel>
        <TabPanel value="2"><Appointments></Appointments></TabPanel>
      </TabContext>
    </Box>
  );
}