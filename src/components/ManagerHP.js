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

export default function ManagerHP() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '500%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="black" indicatorColor="secondary" centered>
            <Tab label="Patients List" value="1" style={widthModifier} />
            <Tab label="Counselors List" value="2" style={widthModifier} />
            <Tab label="Doctors List" value="3" style={widthModifier} />
          </TabList>
        </Box>
        <TabPanel value="1">Patients List</TabPanel>
        <TabPanel value="2">Counselors List</TabPanel>
        <TabPanel value="3">Doctors List</TabPanel>
      </TabContext>
    </Box>
  );
}