import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Login from '../components/login'
import Signup from '../components/signup'
import { Grid,Box,CssBaseline } from '@material-ui/core'
import arogya_poster from '../arogya_poster.jpeg'
const SignInOutContainer = ({loginCallBack}) => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle = { width: 340, margin: "20px auto" }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (

      
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (

    
    <Grid container component="main" style={{height: '100%'}} sx={{ height: '100%%' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
           <img src={arogya_poster} style={{width:'100%',height: '100%'}} alt="Arogya" />
          </Grid>
        

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          ></Box>
          <div className='signinContainer' style={{width:'100%'}}>
    <Paper elevation={1} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Sign In" />

        <Tab label="Sign Up" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} loginCallBack={loginCallBack} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup loginCallBack={loginCallBack}/>
      </TabPanel>
    </Paper>
    </div>
         </Grid> 
         </Grid>
        
     
  )
}

export default SignInOutContainer;
