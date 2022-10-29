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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: `linear-gradient(#cfd9df,#e2ebf0)`,
    color: 'grey',
  },
  bigAvatar: {
    margin: 30,
    width: 100,
    height: 100,
  },
}));

function SideMenu() {
    const classes = useStyles();
  
    return (
      <Drawer
        open={true}
        variant='permanent'
        anchor='left'
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
       <Grid container justify='center' alignItems='center'>
          <Avatar
            src='https://www.google.com/search?q=profile+picture+default+image+js&sxsrf=ALiCzsZtPrmlhqqNgwDqCPKrHUl95D6ydA:1666980691241&source=lnms&tbm=isch&sa=X&ved=2ahUKEwipmMv_woP7AhXsEVkFHdFhBQEQ_AUoAXoECAIQAw&biw=1536&bih=754&dpr=1.25#imgrc=zo-PD7u7TYS2vM'
            className={classes.bigAvatar}
          />
        </Grid>
        <List>
          {['Profile', 'Sign Out'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <AccountCircle /> : <ExitToApp />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
  
  export default SideMenu;