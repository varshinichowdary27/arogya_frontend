import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { CircularProgress, Stack, TextField } from '@mui/material';
import { appointmentUpdate, getUserInfo } from '../../services/loginAPI';

export const AppointmentDialog = ({
  patientDetails,
  handleClose,
  reload
}) => {
  const [value, setValue] = React.useState(
    moment(),
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const close = () => !isLoading && handleClose();
  const counsellor_id = getUserInfo().id
  const onSubmit = () => {
    setIsLoading(true);
    appointmentUpdate(patientDetails.id, { appointment_start_time: value, counsellor_id })
      .then()
      .finally(() => {
        setIsLoading(false);
        reload();
        close();
      })
  }

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      open
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Schedule Appointment
      </DialogTitle>
      <DialogContent>
        {/* {isLoading ? <CircularProgress /> :
          (<> */}
            <DialogContentText>
              You are about to schedule 30 min appoinment with {patientDetails.lastName}.
              <div>
                To complete this action, Select Date and start time below and click <i>Confirm</i> to Confirm appoinment.
              </div>
            </DialogContentText>
            <DialogContentText style={{ padding: "30px 0px 0px" }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack justifyContent="center"
                  spacing={0}>
                  <DateTimePicker
                    label="Select Appoinment Date and Time"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </DialogContentText>
          {/* </>)} */}
          </DialogContent>
      <DialogActions style={{ padding: "20px" }}>
        <Button disabled={isLoading} variant="contained" autoFocus onClick={onSubmit}>
          Confirm
        </Button>
        <Button disabled={isLoading} variant="outlined" onClick={close} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}