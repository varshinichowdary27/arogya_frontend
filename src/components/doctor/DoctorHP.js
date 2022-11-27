import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Appointments } from './appointments';
import { PatientList } from './patientList';

const width = 700;

const widthModifier = {
  width: `${width}px`,
};

export default function DoctorHP() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '500%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="black" indicatorColor="secondary" centered>
            <Tab label="Patients List" value="1" style={widthModifier} />
            <Tab label="Appointment Details" value="2" style={widthModifier} />
          </TabList>
        </Box>
        <TabPanel value="1"><PatientList></PatientList></TabPanel>
        <TabPanel value="2"><Appointments></Appointments></TabPanel>
      </TabContext>
    </Box>
  );
}