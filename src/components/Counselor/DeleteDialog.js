import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';
import { appointmentDelete } from '../../services/loginAPI';
import { Alert } from '@mui/material';

export const DeleteDialog = ({
  patientDetails,
  handleClose,
  reload
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const close = () => !isLoading && handleClose();
  const [errMsg, setErrMsg] =React.useState("");
  const onSubmit = () => {
    setIsLoading(true);
    appointmentDelete(patientDetails.id)
    .then(()=> {
      setErrMsg("");
      reload();
      close();
    }, () => {setErrMsg("Unable to Delete Assesement");})
    .finally(() => {
        setIsLoading(false);
      })
  }
  return (
    <Dialog
      open
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Delete Self-Assesement
      </DialogTitle>
      <DialogContent sx={{ display: "inline-flex" }}>
        <WarningIcon color="error" style={{
          width: "50px", height: "100%",
          padding: "0px 20px"
        }}></WarningIcon>
        <DialogContentText>
          <p>
          <DialogContentText>
            {errMsg !== ""  && <Alert severity="error">{errMsg}</Alert>}
          </DialogContentText>
          </p>
          You are about to delete {patientDetails.lastName}'s self-assement.
          This action is permanent. Do you want to Delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: "20px" }}>
        <Button disabled={isLoading}variant="contained" color="error" autoFocus onClick={onSubmit}>
          Delete
        </Button>
        <Button disabled={isLoading} variant="outlined" onClick={close} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}