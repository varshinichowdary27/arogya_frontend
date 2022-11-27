import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { PatientList } from './patientList';
import { Appointments } from './appointments';
import { getDoctor } from '../../services/loginAPI';

const width = 700;

const widthModifier = {
  width: `${width}px`,
};

export default function CounselorHP() {
  const [value, setValue] = React.useState('1');
  const [doctors, setDoctors] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    getDoctor()
    .then(doctors => setDoctors(doctors))
    .finally();
    return;
  }, [])

  return (
    <Box sx={{ width: '500%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example"  indicatorColor="secondary" centered>
            <Tab label="Patients List" value="1" style={widthModifier} />
            <Tab label="Appointments List" value="2" style={widthModifier} />
          </TabList>
        </Box>
        <TabPanel value="1"><PatientList doctors={doctors}/></TabPanel>
        <TabPanel value="2"><Appointments doctors={doctors}></Appointments></TabPanel>
      </TabContext>
    </Box>
  );
}