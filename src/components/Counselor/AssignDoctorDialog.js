import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { appointmentUpdate } from '../../services/loginAPI';

export const AssignDoctorDialog = ({
  patientDetails,
  handleClose,
  doctors = []
}) => {
  const [doctor, setDoctor] = React.useState(doctors.length > 0 ? doctors[0] : []);
  const doctorChange = (event) => {
    setDoctor(event.target.value);
  }

  const [isLoading, setIsLoading] = React.useState(false);
  const close = () => !isLoading && handleClose();
  const onSubmit = () => {
    setIsLoading(true);
    appointmentUpdate(patientDetails.id, { doctor_id: doctor.id })
      .then()
      .finally(() => setIsLoading(false) && close())
  }
  return (
    <Dialog
      open
      onClose={close}
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
            {doctors.length > 0 ?
              <FormControl>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={doctor}
                  label="List of Doctor"
                  onChange={doctorChange}
                >
                  {doctors.map((doctorP, index) => (
                    <MenuItem value={doctorP} key={index}>{doctorP.name}</MenuItem>
                  ))}
                </Select>
              </FormControl> :
              <p>
                <DialogContentText >
                  No Doctor is there
                 </DialogContentText>
              </p>
            }
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: "20px" }}>
        <Button variant="contained" autoFocus onClick={onSubmit}>
          confirm
        </Button>
        <Button variant="outlined" onClick={close} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}