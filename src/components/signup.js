import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FormHelperText } from '@material-ui/core'
import * as Yup from 'yup'
import axios from 'axios';
import { signUp } from '../services/loginAPI';

const Signup = ({loginCallBack}) => {
    const [errMsg, setErrMsg] = useState("");
    const [accountType, setAccountType] = useState(10);
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const initialValues = {
        name: '',
        email_address: '',
        gender: 'male',
        phone_number: '',
        password: '',
        confirmPassword: '',
        userType: 'counselor'
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
        signUp({...values, age: 18, last_name: values.name, userType: 'counselor', 
        registration_number: "afads"
        ,gender: "male"
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
            <Paper style={paperStyle}>
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
                            {errMsg}
                            <Field required as={TextField} fullWidth name="name" label='Name'
                                placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
                            <Field required as={TextField} fullWidth name="email_address" label='Email'
                                placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />
                            <FormHelperText><ErrorMessage name="gender" /></FormHelperText>
                            <Field as={TextField} required fullWidth name="phone_number" label='Phone Number'
                                placeholder="Enter your phone number" helperText={<ErrorMessage name="phoneNumber" />} />
                            <FormControl fullwidth >
                                        <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={accountType}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Patient</MenuItem>
                                            <MenuItem value={20}>Doctor</MenuItem>
                                            <MenuItem value={30}>counsellor</MenuItem>
                                            <MenuItem value={40}>manager</MenuItem>
                                        </Select>
                            </FormControl>

                            {accountType == 20 || accountType == 30 ?
                            <Field as={TextField} required fullWidth name='Registration Number'
                            label='Registration Number' placeholder="Enter your Registration number"
                            />:null
                        }
                        
                            <Field as={TextField} required fullWidth name='password' type="password"
                                label='Password' placeholder="Enter your password"
                                helperText={<ErrorMessage name="password" />} />
                            <Field as={TextField} required fullWidth name="confirmPassword" type="password"
                                label='Confirm Password' placeholder="Confirm your password"
                                helperText={<ErrorMessage name="confirmPassword" />} />
                            <Button type='submit' variant='contained' disabled={props.isSubmitting}
                                color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>


                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default Signup;
