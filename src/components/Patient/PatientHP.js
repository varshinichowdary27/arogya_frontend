import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getAssessmentDetails, getUserInfo} from '../../services/loginAPI';
import selfAssessment from "./selfAssessment";
import Quiz from "./Quiz";
const width = 700;

const widthModifier = {
  width: `${width}px`,
};

export default function PatientHP() {
  const [value, setValue] = React.useState('1');
   const [patientList, setPatientList] = React.useState([]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const user = getUserInfo();
  let userEmail = user?.email_address;
  const [errMsg, setErrMsg] = React.useState("");
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
        getAssessmentDetails(userEmail).then(
            patientList => patientList.map(patient => dataMapper(patient)),
        ).then(
            patientList => setPatientList(patientList),
            console.log(patientList),
        ).catch(() => setErrMsg("Unable to fetch patient List"))
    })

  return (
    <Box sx={{ width: '500%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="black" indicatorColor="secondary" centered>
            <Tab label="Appointments" value="1" style={widthModifier} />
            <Tab label="Self-Assessment" value="2" style={widthModifier} />
          </TabList>
        </Box>
        <TabPanel value="1">Appointments</TabPanel>
        <TabPanel value="2">
        {patientList.length == 0 ? <Quiz /> : <selfAssessment />}

        </TabPanel>
      </TabContext>
    </Box>
  );
}