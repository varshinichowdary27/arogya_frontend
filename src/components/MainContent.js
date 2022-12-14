import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: `linear-gradient(#808080,#808080)`,
    backgroundImage: `linear-gradient(#808080,#FFFFFF,#808080)`,
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
}));

function MainContent() {
  const classes = useStyles();

  return (
    <main className={classes.fullWidth}>
      <div className={classes.title}>

      </div>
      <div className={classes.content}>
        <Typography variant='h6' >
          <b>Welcome to Counselor's HomePage</b>
        </Typography>
      </div>
    </main>
  );
}

export default MainContent;