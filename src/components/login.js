import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { login } from '../services/loginAPI';
const Login = ({ handleChange, loginCallBack }) => {

    const [errMsg, setErrMsg] = useState("");
    const [userType, setAccountType] = useState('patient');
    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const accountHandleChange = (event) => {
        setAccountType(event.target.value);
    }
    const initialValues = {
        email: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })
    const onSubmit = (values, props) => {
        // TODO send userType
        login({ ...values, userType: userType })
            .then(data => {
                console.log(data);
                if (data.logged) {
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
                }).finally(() => props.setSubmitting(false));
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
                            <div style={{ color: 'red' }}>
                                {errMsg}
                            </div>
                            <FormControl style={{ width: "100%", padding: "10px 0px" }}>
                                <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userType}
                                    label="userType"
                                    onChange={accountHandleChange}
                                >
                                    <MenuItem value='patient'>Patient</MenuItem>
                                    <MenuItem value='doctor'>Doctor</MenuItem>
                                    <MenuItem value='counselor'>Counselor</MenuItem>
                                    <MenuItem value='manager'>Manager</MenuItem>
                                </Select>
                            </FormControl>
                            <Field as={TextField} label='email' name="email"
                                placeholder='Enter email' fullWidth required
                                helperText={<ErrorMessage name="email" />}
                            />
                            <Field as={TextField} label='Password' name="password"
                                placeholder='Enter password' type='password' fullWidth required
                                helperText={<ErrorMessage name="password" />} />
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                        </Form>
                    )}
                </Formik>
                <Typography variant='caption' >`Don't have an account ?
                    <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>


    )
}

export default Login
