import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const width = 700;

const widthModifier = {
  width: `${width}px`,
};

export default function PatientHP() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


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
        <TabPanel value="2">Self-Assessment</TabPanel>
      </TabContext>
    </Box>
  );
}