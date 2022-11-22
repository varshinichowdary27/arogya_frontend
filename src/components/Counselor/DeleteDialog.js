import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';

export const DeleteDialog = ({
  patientDetails,
  handleClose
}) => {
  return (
    <Dialog
      open
      onClose={handleClose}
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
          You are about to delete {patientDetails.lastName}'s self-assement.
          This action is permanent. Do you want to Delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: "20px" }}>
        <Button variant="contained" color="error" autoFocus onClick={handleClose}>
          Delete
        </Button>
        <Button variant="outlined" onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}