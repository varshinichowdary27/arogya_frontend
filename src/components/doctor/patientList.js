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
import { getPatientList, getUserInfo } from '../../services/loginAPI';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Tooltip } from '@material-ui/core';
import { DeleteDialog } from '../Counselor/DeleteDialog';
import { AppointmentDialog } from '../Counselor/AppointmentDialog';



function Row(props) {
    const { row, reload } = props;
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [selfOpen, setSelfOpen] = React.useState(false);

    return (
        <React.Fragment>
            {deleteOpen && <DeleteDialog patientDetails={row} handleClose={() => setDeleteOpen(false)} reload={reload}></DeleteDialog>}
            {selfOpen && <AppointmentDialog patientDetails={row} handleClose={() => setSelfOpen(false)} reload={reload}></AppointmentDialog>}
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
                <TableCell component="th" scope="row">
                    {row.lastName}
                </TableCell>
                <TableCell>{row.emailAddress}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell size='small' align="center">
                    <Tooltip title="Click to Schedule Appointment with patient">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setSelfOpen(true)}
                        >
                            <ScheduleIcon color='action'></ScheduleIcon>
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell size='small' align="center">
                    <Tooltip title="Click to Delete patient's Assesement">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setDeleteOpen(true)}
                        >
                            <DeleteIcon color='error'></DeleteIcon>
                        </IconButton>
                    </Tooltip>
                </TableCell>
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
                                    {row.questions_list.map((questions, index) => (
                                        <TableRow key={index}>
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
        id: PropTypes.string.isRequired
    }).isRequired,
};

const dataMapper = ({ appointment_id, question_answers, patient: {
    lastName,
    emailAddress,
    phoneNumber,
    id } }) => {
    return {
        lastName,
        emailAddress,
        phoneNumber,
        id: appointment_id,
        questions_list: question_answers.questions_list
    };
}

export const PatientList = () => {
    const [patientList, setPatientList] = React.useState([]);
    const [reload, setReload] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState("");
    const [loading, setloading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const doctor_id = getUserInfo().id;
    React.useEffect(() => {
        setloading(true);
        setPatientList([]);
        setErrMsg("");
        getPatientList()
            .then(data => data.details)
            .then(data => data.filter(patient =>  patient.doctor_id === doctor_id 
            && patient.appointment_start_time == null))
            .then(patientList => patientList.map(patient => dataMapper(patient)))
            .then(patientList => {
                setPatientList(patientList);
            })
            .catch(() => {
                setErrMsg("Unable to fetch patient List");
            }).finally(() => setloading(false))
    }, [doctor_id, reload])
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
                                        <Tooltip title="Reload patient List">
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => setReload(!reload)}
                                            >
                                                <ReplayIcon></ReplayIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell>Email ID</TableCell>
                                    <TableCell align="right">Mobile Number</TableCell>
                                    <TableCell style={{ width: "144px" }} size='small' align="center">Schedule Appointment</TableCell>
                                    <TableCell style={{ width: "124px" }} size='small' align="center">Delete Assesement</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patientList.map((patient, index) => (
                                    <Row key={index} row={patient} reload={() => { setSuccess(true); setReload(true) }} />
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