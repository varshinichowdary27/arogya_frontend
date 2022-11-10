
import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import MainContent from '../components/MainContent';
import Quiz from '../components/Quiz';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Home({loginCallBack}) {
  const classes = useStyles();
    const [accountType, setAccountType] = useState(null);
    const[itemValue,setItemValue] = useState(null);


  return (
//    <div className={classes.root}>
//      <TopMenu />
//      <SideMenu loginCallBack={loginCallBack}/>
//
//      <MainContent />

<Quiz />
//    </div>
  );
}

export default Home;