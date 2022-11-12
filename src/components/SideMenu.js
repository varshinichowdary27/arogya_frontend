import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { logOut } from '../services/loginAPI';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: `linear-gradient(#D3D3D3,#FFFFFF,#D3D3D3)`,
    color: 'black',
  },
  bigAvatar: {
    margin: 30,
    width: 100,
    height: 100,
  },
}));

function SideMenu({ loginCallBack }) {
  const classes = useStyles();

  return (
    <Drawer
      open={true}
      variant='permanent'
      anchor='right'
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Grid container justifyContent='center' alignItems='center'>
        <Avatar
          src='https://as2.ftcdn.net/v2/jpg/05/09/59/75/1000_F_509597532_RKUuYsERhODmkxkZd82pSHnFtDAtgbzJ.jpg'
          className={classes.bigAvatar}
        />
      </Grid>
      <List>
        {['Profile', 'Sign Out'].map((text, index) => (
          <div style={{ display: 'flex' }} onClick={() => {
            if (index === 1) {
              logOut();
              loginCallBack();
            }
          }}>
            <ListItem button key={text}>
              <ListItemIcon >
                {index % 2 === 0 ? <AccountCircle /> : <ExitToApp />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </div>
        ))}
      </List>
    </Drawer>
  );
}

export default SideMenu;