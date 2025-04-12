import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { useGetAllEmployeesQuery, useAllocateManagerMutation } from '../../services/employeeApi';

const AssignManagerDialog = ({ open, handleClose, employee }) => {
  const [allocateManager, { isLoading }] = useAllocateManagerMutation();
  const { data: employees = [] } = useGetAllEmployeesQuery();

  const [managerId, setManagerId] = useState(employee.managerId || '');

  const handleSave = async () => {
    try {
      await allocateManager({ employeeId:employee?.employeeId, managerId });
      handleClose();
    } catch (error) {
      // handle error
      console.log(error)
    }
  };

  const handleChange = (event) => {
    setManagerId(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Assign Manager to {employee?.name}</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Manager"
          value={managerId}
          onChange={handleChange}
          fullWidth
        >
          {employees?.map((emp) => (
            <MenuItem key={emp?.employeeId} value={emp?.employeeId}>
              {emp?.name}
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

export default AssignManagerDialog;