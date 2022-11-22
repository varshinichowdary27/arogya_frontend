import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import moment from 'moment';
import { Stack, TextField } from '@mui/material';

export const AppointmentDialog = ({
  patientDetails,
  handleClose
}) => {
  const [value, setValue] = React.useState(
    moment('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Schedule Appointment
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to schedule 30 min appoinment with {patientDetails.lastName}.
          To complete this action, Select Date and start time below and click <i>Confirm</i> to Confirm appoinment.
        </DialogContentText>
        <DialogContentText style={{ padding: "30px 0px 0px" }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack   justifyContent="center"
                spacing={0}>
              <DateTimePicker
                label="Select Appoinment Date and Time"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>`
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: "20px" }}>
        <Button variant="contained" autoFocus onClick={handleClose}>
        Confirm
        </Button>
        <Button variant="outlined" onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}