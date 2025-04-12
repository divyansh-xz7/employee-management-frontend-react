import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import EmployeeChart from './EmployeeChart'
import DepartmentChart from './DepartmentChart'
import { useSelector } from 'react-redux';
import {useTheme} from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { useGetAllEmployeesQuery } from "../../services/employeeApi";
import { setProfile } from "../../slices/metaSlice";
import Loading from '../Loading'


const Dashboard = ({changeTheme}) => {
  const dispatch = useDispatch();
  const {username} = useSelector(state=>state.auth)
  const {data:employees, isLoading:empLoading} = useGetAllEmployeesQuery();
  dispatch(setProfile({employees, username}));

  const role = useSelector(state=>state.meta?.role);
  const theme = useTheme();

  if(empLoading) return (<Loading/>)

  return (
    <Box sx={{display:'flex'}}>
        <Sidebar changeTheme={changeTheme}/>
        <Box sx={{flex:5}}>
            <Box sx={{display:'flex',width:'100%', background:theme.palette.background.header, height:'8vh'}}>
              <Typography sx={{margin:1, fontWeight:500}}>
                Dashboard
              </Typography>
            </Box>
            <EmployeeChart/>
            <DepartmentChart/>
        </Box>

    </Box>
  )
}

export default Dashboard