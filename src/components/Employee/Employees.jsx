import Sidebar from '../Sidebar/Sidebar';
import { Box, Container, Paper, TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody } from '@mui/material';
import FilterEmployees from './FilterEmployees';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EmployeeRow from './EmployeeRow';
import { useGetAllEmployeesQuery } from "../../services/employeeApi"
import {useGetAllDepartmentsQuery, useAddDepartmentMutation} from '../../services/departmentApi';
import Loading from '../Loading';
import { getCurrentDepartment, getEmployeeById } from '../../utils/employeeUtil';
import {useTheme} from '@mui/material/styles';


const Employees = ({changeTheme}) => {
  const theme = useTheme();

  const filteredEmp = useSelector(state=>state?.meta?.filteredEmp);
  const {data:employees, isLoading} = useGetAllEmployeesQuery();
  const {data:departments, error, isLoading:isLoading2} = useGetAllDepartmentsQuery();

  
  if(isLoading || isLoading2) return (<Loading/>)

  return (
    <Box sx={{display:'flex'}}>
        <Sidebar changeTheme={changeTheme}/>
        <Box sx={{flex:5}}>
            <Box sx={{display:'flex',width:'100%', background:theme.palette.background.header, height:'8vh'}}>
              <Typography sx={{margin:1, fontWeight:500}}>
                Employees
              </Typography>
            </Box>
            <FilterEmployees/>

            <TableContainer component={Paper}>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>Current Department</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    filteredEmp?.map((emp)=>{
                      const manager = getEmployeeById(employees, emp.managerId);
                      const department = getCurrentDepartment(emp, departments);
                      return (<EmployeeRow employee={emp} manager={manager} department={department}/>)
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>

            {/* <Box sx={{display:'flex',width:'100%', background:'white'}}>
            {filteredEmp?.map((emp)=>emp?.name)}
            </Box> */}
            
        </Box>

    </Box>
  )
}

export default Employees