import React, { useState ,useEffect} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {Card,CardHeader,Grid,Avatar,Typography,TableFooter,Button,Modal,TextField,FormHelperText,InputLabel,Select,MenuItem} from '@material-ui/core'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { makeStyles} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import * as Yup from 'yup'
import "yup-phone";
import { signUp } from '../services/loginAPI';
import { Alert } from '@mui/material';
import FormControl from '@material-ui/core/FormControl';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { list_users ,perfomDelete,get_stats_data} from '../services/loginAPI';
ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: "960px",
  },
  tableHeaderCell: {
    fontWeight: "bold",
//    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  hover: {
    cursor: "pointer",
  },
  center:{
    textAlign:'center'
  }
}));





const tableHeader = [
  { label: "User Info",data: "emailAddress"},
  { label: "Account Type",data: "account_type"},
  { label: "Registration Number",data:"registrationNumber"},
  { label: "Delete User"},
];
const width = 700;

const widthModifier = {
  width: `${width}px`,
};
 const initialValues = {
        name: '',
        email_address: '',
        phone_number: '',
        password: '',
        confirmPassword: ''
    }
 const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email_address: Yup.string().email("Enter valid email").required("Required"),
        phone_number: Yup.string().phone("CA").typeError("Enter valid Phone Number").required('Required'),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
        registration_number: Yup.string().length(5, "Registration number is 5 character long")
    })

export default function ManagerHP() {

const classes = useStyles();
  const [value, setValue] = React.useState('1');
//  const [users, setUsers] = useState(USERS);
  const [errMsg, setErrMsg] = useState("");
  const [accountType, setAccountType] = useState("patient");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[list_users_response,setlist_users_response] = useState([]);
  //API Call
  const response_users= list_users();
  const stats_data = get_stats_data();

const waitResponse = async () => {
  let data = await response_users;
  setlist_users_response(data)
};
useEffect( () =>{
if(list_users_response.length == 0){
waitResponse();
}
},[list_users_response]);


   const handleAccountChange = (event) => {
          setAccountType(event.target.value);
      }
   const handleChange = (event, newValue) => {
     setValue(newValue);
   };
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
 const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];



  const deleteItem = async(index) => {

    let res = perfomDelete(index);
    let status = await res;
    setlist_users_response([]);



//    setUsers(newUsers);
  };
   const onSubmit = (values, props) => {
          //TODO send user type and other information
          console.log("entered");
          signUp({
              ...values, age: 18, last_name: values.name
              , gender: "male", userType: accountType
          })
              .then(data => {
                  console.log(data);
                  if (data.errors) {
                      setErrMsg(data.errors[0]);
                  } else {

                      console.log(values);
                      props.resetForm();
                      setErrMsg("");
                  }
              },
                  (error) => {
                      setErrMsg("Unable to regiester")
                  }).finally(() => props.setSubmitting(false));
      }
  return (

    <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Statistics" value="1" />
                <Tab label="Manage Accounts" value="2" />

              </TabList>
            </Box>
            <TabPanel value="1">
<Grid container spacing={2}>
      <Grid item xs={6}>
         <Card variant="outlined" sx={{ maxWidth: 345 }}>
             <CardHeader
                    title="Number of Registrations"
            />
            <div>
                <Doughnut data={data} options={{ maintainAspectRatio: false }} />
            </div>
         </Card>
      </Grid>
      <Grid item xs={6}>
        <Card variant="outlined" sx={{ maxWidth: 345 }} >
         <CardHeader
             title="Number of Appointments"
         />
         <div style ={{height:"50%"}}>
         <Doughnut data={data} options={{ maintainAspectRatio: false }} />
         </div>
         </Card>
      </Grid>
   </Grid>
<Grid container spacing={2}>
         <Grid item xs={12}>
         <Card variant="outlined" sx={{ maxWidth: 345 }}>
                  <CardHeader
                      title="Number of Appointments"
                  />
                  <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Dessert (100g serving)</TableCell>
                              <TableCell align="right">Calories</TableCell>
                              <TableCell align="right">Fat&nbsp;(g)</TableCell>
                              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                              <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
         </Card>
         </Grid>
    </Grid>

            </TabPanel>
            <TabPanel value="2">

<TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeader.map((cell) => (
              <TableCell key={cell.data} className={classes.tableHeaderCell}>
                {cell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>

          {list_users_response.map((row, i) => (

            <TableRow key={row.id}>
              <TableCell>
                <Grid container>
                  <Grid item lg={2}>
                    <Avatar alt={row.lastName} src="." className={classes.avatar} />
                  </Grid>
                  <Grid item lg={10}>
                    <Typography className={classes.name}>{row.lastName}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.emailAddress}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.phoneNumber}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Typography color="primary" variant="subtitle2">
                  {" "}
                  {row.account_type}
                </Typography>


              </TableCell>
              <TableCell>{row.registrationNumber}</TableCell>
              <TableCell>
                <Grid container>

                  <Grid item lg={3}>

                    <Typography>
                      <DeleteIcon
                        color="secondary"
                        onClick={deleteItem.bind(this, row)}
                        className={classes.hover}
                      />
                    </Typography>

                  </Grid>

                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <Grid container>

                <Grid item lg={6} className={classes.center}>
                  <Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpen}
                      className={classes.button}
                      startIcon={<AddIcon />}
                    >
                      Add Account
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableFooter>

      </Table>
    </TableContainer>

            </TabPanel>

          </TabContext>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style ={{marginTop:'150px'}}
          >
            <Grid>
                      <Paper style={paperStyle} elevation={0}>
                          <Grid align='center'>
                              <Avatar style={avatarStyle}>
                                  <AddCircleOutlineOutlinedIcon />
                              </Avatar>
                              <h2 style={headerStyle}>Add Account</h2>
                              <Typography variant='caption' gutterBottom>Please fill this form to add an account !</Typography>
                          </Grid>
             <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {(props) => (
                                    <Form>
                                        {errMsg !== ""  && <Alert severity="error">{errMsg}</Alert>}
                                        <Field required as={TextField} fullWidth name="name" label='Name'
                                            placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
                                        <Field required as={TextField} fullWidth name="email_address" label='Email'
                                            placeholder="Enter your email" helperText={<ErrorMessage name="email_address" />} />
                                        <FormHelperText><ErrorMessage name="gender" /></FormHelperText>
                                        <Field as={TextField} required fullWidth name="phone_number" label='Phone Number'
                                            placeholder="Enter your phone number" helperText={<ErrorMessage name="phone_number" />} />
                                        <FormControl style={{
                                            width: '100%',
                                            padding: '12px'
                                        }}>
                                            <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={accountType}
                                                label="accountType"
                                                onChange={handleAccountChange}
                                            >
                                                <MenuItem value='patient'>Patient</MenuItem>
                                                <MenuItem value='doctor'>Doctor</MenuItem>
                                                <MenuItem value='counselor'>Counselor</MenuItem>
                                                <MenuItem value='manager'>Manager</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {(accountType === 'doctor' || accountType === 'counselor') && <>
                                            <Field as={TextField} required fullWidth name='registration_number'
                                                label='Registration Number' placeholder="Enter your Registration number"
                                            />
                                            <FormHelperText><ErrorMessage name="registration_number" /></FormHelperText>
                                        </>
                                        }
                                        <Field as={TextField} required fullWidth name='password' type="password"
                                            label='Password' placeholder="Enter your password"
                                            helperText={<ErrorMessage name="password" />} />
                                        <Field as={TextField} required fullWidth name="confirmPassword" type="password"
                                            label='Confirm Password' placeholder="Confirm your password"
                                            helperText={<ErrorMessage name="confirmPassword" />} />
                                        <Button style={{ margin: '   15px' }} type='submit' variant='contained' disabled={props.isSubmitting}
                                            color='primary'>{props.isSubmitting ? "Loading" : "Add Account"}</Button>
                                            <Button style={{ margin: '   15px' }} onClick={handleClose} variant='contained' disabled={props.isSubmitting}
                                                                                        color='secondary'>{"cancel"}</Button>
                                    </Form>
                                )}
                            </Formik>
                            </Paper>
                                    </Grid>

          </Modal>
        </Box>
  );
}