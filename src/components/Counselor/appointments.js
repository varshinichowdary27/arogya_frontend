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
import { Alert, Chip, CircularProgress, Snackbar } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { Tooltip } from '@material-ui/core';
import moment from 'moment';
import { AssignDoctorDialog } from './AssignDoctorDialog';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DeleteDialog } from './DeleteDialog';
import DeleteIcon from '@mui/icons-material/Delete';



function Row(props) {
    const { row, doctors, reload } = props;
    const [open, setOpen] = React.useState(false);
    const [doctorOpen, setDoctorOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    return (
        <React.Fragment>
                        {deleteOpen && <DeleteDialog patientDetails={row} handleClose={() => setDeleteOpen(false)} reload={reload}></DeleteDialog>}
            {doctorOpen && <AssignDoctorDialog patientDetails={row} doctors={doctors} handleClose={() => setDoctorOpen(false)} reload={reload}></AssignDoctorDialog>}
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <Tooltip title="Expand/Collapse Patient's Self Assessment Results">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                                                        {open ? 
                                <Chip color="primary" icon={<KeyboardArrowUpIcon />} label="Collapse" onClick={() => setOpen(!open)}/>
                                :  <Chip color="primary" icon={<KeyboardArrowDownIcon />} label="Assessment" onClick={() => setOpen(!open)}/>}
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>{row.appointment_start_date}</TableCell>
                <TableCell>{row.appointment_start_time}</TableCell>
                <TableCell component="th" scope="row">
                    {row.lastName}
                </TableCell>
                <TableCell>{row.emailAddress}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell size='small' align="center">
                    <Tooltip title="Click to Assign Doctor to patient">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setDoctorOpen(true)}
                        >
                              <Chip color="primary" icon={<AddCircleIcon color="primary"></AddCircleIcon>} label="Assign Doctor" onClick={() => setDoctorOpen(true)} />
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
                            <Chip color="error" icon={<DeleteIcon color='error'></DeleteIcon>} label="Delete" onClick={() => setDeleteOpen(true)} />
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

const dataMapper = ({ appointment_id, rejected, appointment_start_time, question_answers, patient: {
    lastName,
    emailAddress,
    phoneNumber,
    id } }) => {
    return {
        lastName,
        emailAddress,
        phoneNumber,
        rejected,
        appointment_start_date: new moment(appointment_start_time).format('YYYY-MM-DD'),
        appointment_start_time: new moment(appointment_start_time).format('HH:mm:ss'),
        id: appointment_id,
        questions_list: question_answers.questions_list
    };
}
const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
const comparotor = 
    (a,b) => new moment(a).format(dateTimeFormat) - new moment(b).format(dateTimeFormat);


export const Appointments = ({ doctors }) => {

    const [patientList, setPatientList] = React.useState([]);
    const [reload, setReload] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState("");
    const [loading, setloading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const id = getUserInfo().id
    React.useEffect(() => {
        setloading(true);
        setPatientList([]);
        setErrMsg("");
        getPatientList()
            .then(data => data.details)
            .then(data => data.filter(patient => patient.rejected === false && patient.counsellor_id != null 
            && patient.counsellor_id === id
            && patient.doctor_id == null 
                && patient.appointment_start_time != null))
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
                                  <TableCell style={{ width: "14px" }}>
                                        <Tooltip title="Reload patient List">
                                        <Chip icon={<ReplayIcon></ReplayIcon>}
                                                label="Reload" aria-label="expand row"
                                                size="small"
                                                onClick={() => setReload(!reload)} />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell  style={{ width: "16%" }}>Appoinment Date</TableCell>
                                    <TableCell  style={{ width: "16%" }}>Appoinment Time</TableCell>
                                    <TableCell  style={{ width: "16%" }}>Patient Name</TableCell>
                                    <TableCell   style={{ width: "16%" }}>Email ID</TableCell>
                                    <TableCell align="right">Mobile Number</TableCell>
                                    <TableCell style={{ width: "90px" }} size='small' align="center">Assign Doctor</TableCell>
                                    <TableCell style={{ width: "124px" }} size='small' align="center">Delete Assesement</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patientList.map((patient, index) => (
                                    <Row key={index} row={patient} doctors={doctors} reload={() => { setSuccess(true); setReload(!reload) }}/>
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