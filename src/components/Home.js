
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideMenu from '../components/SideMenu';
import PatientHP from '../components/PatientHP';
import CounselorHP from '../components/CounselorHP';
import DoctorHP from '../components/DoctorHP';
import ManagerHP from '../components/ManagerHP';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { getUserInfo } from '../services/loginAPI';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Home({ loginCallBack }) {
  const classes = useStyles();
  const user = getUserInfo();
  let userType = user?.userType;

  return (
    <>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" style={{
        backgroundColor: "lightseagreen"
      }}>
          <Toolbar>
            <Typography variant="h3" gutterBottom style={{
              color: "white",
              margin: "10px"
            }}>
              Arogya
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {userType !== null && <div className={classes.root}>
        {userType === 'patient' ? (
          <>
            <PatientHP />
          </>
        ) : null}

        {userType === 'counselor' ? (
          <>
            <CounselorHP />
          </>
        ) : null}

        {userType === 'manager' ? (

          <>
            <ManagerHP />
          </>
        ) : null}

        {userType === 'doctor' ? (

          <>
            <DoctorHP />
          </>
        ) : null}
        <SideMenu loginCallBack={loginCallBack} />
      </div>}
    </>
  );
}

export default Home;