import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MenuItem } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundImage: `linear-gradient(#D3D3D3,#FFFFFF,#D3D3D3)`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#000000',
  },
}));

function TopMenu() {
    const classes = useStyles();
  
    return (
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <MenuItem>
            <Typography variant='h6' className={classes.title}> 
              <b>Patients List</b>
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant='h6' className={classes.title}>
              <b>Appointments List</b>
            </Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default TopMenu;