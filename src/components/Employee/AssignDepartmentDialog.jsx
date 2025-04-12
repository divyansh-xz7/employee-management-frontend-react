import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { useAllocateDepartmentMutation } from '../../services/employeeApi';
import { useGetAllDepartmentsQuery } from '../../services/departmentApi';

const AssignDepartmentDialog = ({ open, handleClose, employee }) => {
  const [allocateDepartment, { isLoading }] = useAllocateDepartmentMutation();
  const { data: departments = [] } = useGetAllDepartmentsQuery();

  const [departmentName, setDepartment] = useState('');

  const handleSave = async () => {
    try {
      await allocateDepartment({ employeeId:employee?.employeeId, departmentName });
      handleClose();
    } catch (error) {
      // handle error
      console.log(error)
    }
  };

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Assign Department to {employee?.name}</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Department"
          value={departmentName}
          onChange={handleChange}
          fullWidth
        >
          {departments?.map((dpt) => (
            <MenuItem key={dpt?.departmentName} value={dpt?.departmentName}>
              {dpt?.departmentName}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={isLoading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignDepartmentDialog;