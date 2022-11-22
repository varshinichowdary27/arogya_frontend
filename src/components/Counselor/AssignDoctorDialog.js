import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Form } from 'formik';

export const AssignDoctorDialog = ({
  patientDetails,
  handleClose,
  listOfDoctors = []
}) => {
  const [doctor, setDoctor] = React.useState("");
  const doctorChange = (event) => {
    setDoctor(event.target.value);
  }
  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Assign Doctor
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to assign patient <i>{patientDetails.lastName}</i> to a Doctor.
          <div>To complete this action, Select Doctor from drop down below and click <i>Confirm</i> to Confirm Assignment.</div>
        </DialogContentText>
        <DialogContentText style={{ padding: "30px 0px 0px" }}>
          <Stack justifyContent="center"
            spacing={0} >
            <FormControl>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={doctor}
                label="List of Doctor"
                onChange={doctorChange}
              >
                {listOfDoctors.map((doctor, index) => (
                  <MenuItem value={doctor} key={index}>{doctor}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: "20px" }}>
        <Button variant="contained" autoFocus onClick={handleClose}>
          confirm
        </Button>
        <Button variant="outlined" onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}