import { Avatar, Container, IconButton, TableCell, TableRow, Typography, Menu, MenuItem } from '@mui/material'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDeleteEmployeeMutation } from '../../services/employeeApi';
import Loading from '../Loading';
import { useSelector } from 'react-redux';
import EditEmployeeDialog from './EditEmployeeDialog';
import AssignManagerDialog from './AssignManagerDialog';
import AssignDepartmentDialog from './AssignDepartmentDialog';
import CakeIcon from '@mui/icons-material/Cake';
import { hasBirthday } from '../../utils/filterMethods';

const EmployeeRow = ({employee, manager, department}) => {
  const navigate = useNavigate();
  const {role} = useSelector(state=>state?.meta);
  const {username} = useSelector(state=>state?.auth);

  // console.log(username, profile, role)

  const [deleteEmployee, {isLoading}] = useDeleteEmployeeMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const [openEdit, setOpenEdit] = useState(false);
  const [openAM, setOpenAM] = useState(false);
  const [openDM, setOpenDM] = useState(false);



  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      handleClose();
      await deleteEmployee(employee?.employeeId);
      console.log('Employee deleted successfully');
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  }

  const handleOpenEdit = (e) => {
    e.stopPropagation();
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenAM = () => {
    setOpenAM(true);
  };

  const handleCloseAM = () => {
    setOpenAM(false);
  };

  const handleOpenDM = () => {
    setOpenDM(true);
  };

  const handleCloseDM = () => {
    setOpenDM(false);
  };

  

  if(isLoading) return (<Loading/>)

  return (
    <TableRow sx={{mx:1}}>
      <TableCell onClick={()=>navigate(`/employee/${employee?.employeeId}`)} sx={{display:'flex', alignItems:'center', gap:1, cursor:'pointer'}}>
        <Avatar sx={{width:25, height:25}}>{employee?.name[0]}</Avatar>
        <Typography sx={{fontSize:'14px'}}>{employee?.name}</Typography>
        {hasBirthday(employee) && <CakeIcon/>}
      </TableCell>
      <TableCell>{employee?.email}</TableCell>
      <TableCell>{manager?.name}</TableCell>
      <TableCell>{department?.departmentName}</TableCell>


      <IconButton aria-controls="basic-menu"
        disabled={!(role=='ADMIN' || username===employee?.email)}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}><MoreHorizIcon/></IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenEdit}>Edit</MenuItem>
        {role=='ADMIN' && (
          <>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleOpenAM}>Assign Manager</MenuItem>
        <MenuItem onClick={handleOpenDM}>Assign Department</MenuItem>
          </>
        )}

      </Menu>
      <EditEmployeeDialog open={openEdit} handleClose={handleCloseEdit} employee={employee} />
      <AssignManagerDialog open={openAM} handleClose={handleCloseAM} employee={employee}/>
      <AssignDepartmentDialog open={openDM} handleClose={handleCloseDM} employee={employee}/>
    </TableRow>
)
}

export default EmployeeRow