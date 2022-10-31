import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link ,CssBaseline,Box} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { login } from '../services/loginAPI';
import arogya_poster from '../arogya_poster.jpeg'
const Login = ({ handleChange, loginCallBack}) => {

    const [errMsg, setErrMsg] = useState("");
    const [accountType, setAccountType] = useState(10);
    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const accountHandleChange = (event) =>{
        setAccountType(event.target.value);
            }
    const initialValues = {
        username: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })
    const onSubmit = (values, props) => {
        // TODO send userType
        login({...values, userType: 'counselor'})
            .then(data => {
                console.log(data);
                if(data.logged) {
                    loginCallBack();
                    console.log(values);
                    props.resetForm()
                    setErrMsg("");
                } else {
                    setErrMsg("Username or password that you provide is wrong");
                }
            },
            () => {
                setErrMsg("Unable to Login");
            }).finally(() =>  props.setSubmitting(false));
    }
    return (
        
        <Grid>
            <Paper style={paperStyle} elevation={0}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            {errMsg}
                            <FormControl fullwidth >
                                        <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={accountType}
                                            label="Age"
                                            onChange={accountHandleChange}
                                        >
                                            <MenuItem value={10}>Patient</MenuItem>
                                           
                                            
                                            <MenuItem value={20}>manager</MenuItem>
                                        </Select>
                            </FormControl>
                            <Field as={TextField} label='Username' name="username"
                                placeholder='Enter username' fullWidth required
                                helperText={<ErrorMessage name="username" />}
                            />
                            <Field as={TextField} label='Password' name="password"
                                placeholder='Enter password' type='password' fullWidth required
                                helperText={<ErrorMessage name="password" />} />
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                        </Form>
                    )}
                </Formik>
                <Typography >`Don't have an account ?
                    <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
        
      
    )
}

export default Login
