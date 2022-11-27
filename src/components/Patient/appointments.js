import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getAssessmentDetails, getPatientList, getUserInfo } from '../../services/loginAPI';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { Tooltip } from '@material-ui/core';
import moment from 'moment';



function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <Tooltip title="Expand/Collapse Patient's Self Assessment Results">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.assignedTo}</TableCell>
                <TableCell align="center">{row.appointment_start_date}</TableCell>
                <TableCell align="center">{row.appointment_start_time}</TableCell>
                <TableCell align="center">{row.submissionDate}</TableCell>
                <TableCell component="th" scope="row">
                    {row.lastName}
                </TableCell>
                <TableCell>{row.emailAddress}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Self Assessment Results
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Problem</TableCell>
                                        <TableCell>Frequency</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.questions_list.map((questions) => (
                                        <TableRow key={questions.date}>
                                            <TableCell component="th" scope="row">
                                                {questions.question}
                                            </TableCell>
                                            <TableCell>{questions.problem_frequency}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        phoneNumber: PropTypes.string.isRequired,
        questions_list: PropTypes.arrayOf(
            PropTypes.shape({
                question: PropTypes.string.isRequired,
                problem_frequency: PropTypes.string.isRequired,
            }),
        ).isRequired,
        emailAddress: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }).isRequired,
};

const dataMapper = ({ appointment_id, appointment_start_time, question_answers, patient: {
    lastName,
    emailAddress,
    phoneNumber,
    id } }) => {
    return {
        lastName,
        emailAddress,
        phoneNumber,
        appointment_start_date: appointment_start_time !== null? new moment(appointment_start_time).format('YYYY-MM-DD') : "-",
        appointment_start_time: appointment_start_time !== null? new moment(appointment_start_time).format('HH:mm:ss') : "-",
        id: appointment_id,
        status: "-",
        assignedTo: "-",
        submissionDate: appointment_start_time !== null? new moment(appointment_start_time).format('HH:mm:ss') : "-",
        questions_list: question_answers.questions_list
    };
}



const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
const comparotor = 
    (a,b) => new moment(a).format(dateTimeFormat) - new moment(b).format(dateTimeFormat);


export const Appointments = () => {

    const [patientList, setPatientList] = React.useState([]);
    const [reload, setReload] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState("");
    const [loading, setloading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const userEmail = getUserInfo().email_address
    React.useEffect(() => {
        setloading(true);
        setPatientList([]);
        setErrMsg("");
        getAssessmentDetails(userEmail)
            .then(data => data.details)
            .then(patientList => patientList.map(patient => dataMapper(patient)))
            .then(patientList => {
                setPatientList(patientList.sort(comparotor));
            })
            .catch(() => {
                setErrMsg("Unable to fetch patient List");
            }).finally(() => setloading(false))
    }, [reload])
    return (
        <>
            {loading ? (<CircularProgress />) : (
                <>
                    {errMsg !== "" && <Alert severity="error">{errMsg}</Alert>}
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Tooltip title="Reload Appointment Details">
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => setReload(!reload)}
                                            >
                                                <ReplayIcon>Reload Appointment Details</ReplayIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>Appoinment Status</TableCell>
                                    <TableCell>Assigned To</TableCell>
                                    <TableCell>Appoinment Date</TableCell>
                                    <TableCell>Appoinment Time</TableCell>
                                    <TableCell>Submission Date</TableCell>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell>Email ID</TableCell>
                                    <TableCell align="right">Mobile Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patientList.map((patient, index) => (
                                    <Row key={index} row={patient}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                            Successfully updated Patient's Self-Assesement
                        </Alert>
                    </Snackbar>
                </>
            )}
        </>
    );
}