import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FormHelperText } from '@material-ui/core'
import * as Yup from 'yup'
import { signUp } from '../services/loginAPI';

const Signup = ({loginCallBack}) => {
    const [errMsg, setErrMsg] = useState("");
    const [accountType, setAccountType] = useState("patient");
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const initialValues = {
        name: '',
        email_address: '',
        gender: 'male',
        phone_number: '',
        password: '',
        confirmPassword: ''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email_address: Yup.string().email("Enter valid email").required("Required"),
        phone_number: Yup.number().typeError("Enter valid Phone Number").required('Required'),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required")
    })
    const handleChange = (event) =>{
        setAccountType(event.target.value);
    }
    const onSubmit = (values, props) => {
        //TODO send user type and other information
        console.log("entered");
        signUp({...values, age: 18, last_name: values.name
        ,gender: "male", userType: accountType
        })
        .then(data => {
            console.log(data);
            if(data.errors) {
                setErrMsg(data.errors[0]);
            } else {
                loginCallBack();
                console.log(values);
                props.resetForm();
                setErrMsg("");
            }
        },
        (error) => {
            setErrMsg("Unable to regiester")
        }).finally(() =>  props.setSubmitting(false));
    }
    return (
        <Grid>
            <Paper style={paperStyle} elevation={0}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>
                            <div style={{color: 'red'}}>
                            {errMsg}
                            </div>
                            <Field required as={TextField} fullWidth name="name" label='Name'
                                placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
                            <Field required as={TextField} fullWidth name="email_address" label='Email'
                                placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />
                            <FormHelperText><ErrorMessage name="gender" /></FormHelperText>
                            <Field as={TextField} required fullWidth name="phone_number" label='Phone Number'
                                placeholder="Enter your phone number" helperText={<ErrorMessage name="phoneNumber" />} />
                            <FormControl style={{
                                width: '100%',
                                padding: '12px'
                            }}>
                                        <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={accountType}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value='patient'>Patient</MenuItem>
                                            <MenuItem value='doctor'>Doctor</MenuItem>
                                            <MenuItem value='counselor'>Counselor</MenuItem>
                                            <MenuItem value='manager'>Manager</MenuItem>
                                        </Select>
                            </FormControl>

                            {accountType === 'doctor' || accountType === 'counselor' ?
                            <Field as={TextField} required fullWidth name='registration_number'
                            label='Registration Number' placeholder="Enter your Registration number"
                            />:null
                        }
                        
                            <Field as={TextField} required fullWidth name='password' type="password"
                                label='Password' placeholder="Enter your password"
                                helperText={<ErrorMessage name="password" />} />
                            <Field as={TextField} required fullWidth name="confirmPassword" type="password"
                                label='Confirm Password' placeholder="Confirm your password"
                                helperText={<ErrorMessage name="confirmPassword" />} />
                            <Button style={{margin: '   15px'}} type='submit' variant='contained' disabled={props.isSubmitting}
                                color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>


                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default Signup;
