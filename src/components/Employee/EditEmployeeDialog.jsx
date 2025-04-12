import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useUpdateEmployeeMutation } from '../../services/employeeApi';
 
const EditEmployeeDialog = ({ open, handleClose, employee }) => {
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const [editedEmployee, setEditedEmployee] = useState({...employee, address:employee?.employeeAddress?.localAddress});

  const handleSave = async () => {
    try {
      await updateEmployee({...editedEmployee, employeeAddress:{...employee.employeeAddress, localAddress:editedEmployee.address}}).unwrap();
      handleClose();
    } catch (error) {
      // handle error
      console.log(error)
    }
  };

  const handleChange = (event) => {
    setEditedEmployee({
      ...editedEmployee,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" name="name" label="Full Name" value={editedEmployee?.name} onChange={handleChange} fullWidth />
        <TextField margin="dense" name="email" label="Email" value={editedEmployee?.email} onChange={handleChange} fullWidth />
        <TextField margin="dense" name="dateOfBirth" label="Date of Birth" type="date" value={editedEmployee?.dateOfBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
        <TextField margin="dense" name="address" label="Address" value={editedEmployee?.address} onChange={handleChange} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleSave} color="primary" disabled={isLoading}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeDialog;