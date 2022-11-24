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
import { getPatientList } from '../../services/loginAPI';
import { Alert, CircularProgress } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { Tooltip } from '@material-ui/core';
import { DeleteDialog } from './DeleteDialog';
import { AssignDoctorDialog } from './AssignDoctorDialog';
import { AppointmentDialog } from './AppointmentDialog';
import moment from 'moment';



function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [doctorOpen, setDoctorOpen] = React.useState(false);
    const [selfOpen, setSelfOpen] = React.useState(false);

    return (
        <React.Fragment>
            {deleteOpen && <DeleteDialog patientDetails={row} handleClose={() => setDeleteOpen(false)}></DeleteDialog>}
            {doctorOpen && <AssignDoctorDialog patientDetails={row} handleClose={() => setDoctorOpen(false)}></AssignDoctorDialog>}
            {selfOpen && <AppointmentDialog patientDetails={row} handleClose={() => setSelfOpen(false)}></AppointmentDialog>}
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
                <TableCell align="right">{row.Appointment_start_time}</TableCell>
                <TableCell component="th" scope="row">
                    {row.lastName}
                </TableCell>
                <TableCell align="right">{row.emailAddress}</TableCell>
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
        phoneNumber: PropTypes.number.isRequired,
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

const dataMapper = ({ question_answers, patient: {
    lastName,
    emailAddress,
    appointment_start_time,
    counsellor_id,
    phoneNumber } }) => {
    return {
        lastName,
        emailAddress,
        phoneNumber,
        appointment_start_date: appointment_start_time,
        appointment_start_time,
        counsellor_id,
        questions_list: question_answers.questions_list
    };
}
const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
const comparotor = 
    (a,b) => new moment(a).format(dateTimeFormat) - new moment(b).format(dateTimeFormat);


export const Appointments = ({isConsullor}) => {

    const [patientList, setPatientList] = React.useState([]);
    const [reload, setReload] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState("");
    const [loading, setloading] = React.useState(true);
    React.useEffect(() => {
        setloading(true);
        setPatientList([]);
        setErrMsg("");
        getPatientList()
            .then(data => data.details)
            .then(patientList => patientList.map(patient => dataMapper(patient))
                .filter(patient => patient[isConsullor ? 'counsellor_id' : 'doctor_id' ] != null 
                    && patient.appointment_start_time != null)
            )
            .then(patientList => {
                setPatientList(patientList.sort(comparotor));
            })
            .catch(() => {
                setErrMsg("Unable to fetch patient List");
            }).finally(() => setloading(false))
    }, [reload, isConsullor])
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
                                    <TableCell>Appoinment Date</TableCell>
                                    <TableCell>Appoinment Time</TableCell>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell align="right">Email ID</TableCell>
                                    <TableCell align="right">Mobile Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patientList.map((patient, index) => (
                                    <Row key={index} row={patient} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
}