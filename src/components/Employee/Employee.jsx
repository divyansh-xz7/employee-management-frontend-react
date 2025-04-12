import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import { Card, CardContent, Typography, TextField, Avatar, Box, Container } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Chrono } from 'react-chrono';
import { useParams } from 'react-router-dom';
import { getDepartmentById, getEmployeeById, getManager, getReporters } from '../../utils/employeeUtil';
import { useGetAllEmployeesQuery } from '../../services/employeeApi';
import Loading from '../Loading';
import { useGetAllDepartmentsQuery } from '../../services/departmentApi';
import {useTheme} from '@mui/material/styles';


function transformEmployeeData(employee, allDepartments) {

  return employee.employeeDepartmentHistory.map(dept => {
    let activeFrom = new Date(dept.activeFrom).toLocaleDateString('en-US');
    let activeTill = dept.activeTill ? new Date(dept.activeTill).toLocaleDateString('en-US') : 'Present';
    const department = getDepartmentById(allDepartments, dept.departmentId);
    return {
      title: `${department?.departmentName}`, // Replace with actual department names if available
      cardTitle: `${activeFrom} - ${activeTill}`,
    };
  });
}


const Employee = ({changeTheme}) => {
  const theme = useTheme();

  const {id} = useParams();
  const {data:employees, isLoading} = useGetAllEmployeesQuery();
  const {data:allDepartments, isLoading:isLoading2} = useGetAllDepartmentsQuery();
  if(isLoading || isLoading2) return(<Loading/>);

  let employee = getEmployeeById(employees, id);
  const manager = getManager(employees, employee?.managerId);
  const reportees = getReporters(employees, employee?.employeeId);
  let transformedData = transformEmployeeData(employee, allDepartments);
  transformedData.reverse()

  return (
    <Box sx={{display:'flex'}}>
    <Sidebar changeTheme={changeTheme}/>
    <Box sx={{flex:5}}>
      <Box sx={{display:'flex',width:'100%', background:theme.palette.background.header, height:'8vh'}}>
        <Typography sx={{margin:1.5, fontWeight:500}}>
          Employee Details
        </Typography>
      </Box>

      <Card sx={{ width:'95%', m: '2.5%' }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Avatar sx={{ width:80, height:80, bgcolor: 'primary.main' }}>W</Avatar>
          <div style={{ display: 'flex', flexDirection:'column'}}>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>{employee?.name}</Typography>
            <Typography variant="subtitle2" sx={{ marginLeft: 2, fontWeight:300 }}>{employee?.role}</Typography>
            <Typography variant="subtitle2" sx={{ marginLeft: 2, fontWeight:300 }}>Employee Id :{employee?.employeeId}</Typography>
          </div>
        </div>
        <TextField
          label="Full Name"
          value={employee?.name}
          variant="outlined"
          margin="normal"
          size='small'
          sx={{width:{xs:'90%', sm:'45%'}, mx:1}}
        />
        <TextField
          label="Email"
          value={employee?.email}
          variant="outlined"
          fullWidth
          margin="normal"
          size='small'
          sx={{width:{xs:'90%', sm:'45%'}, mx:1}}
        />
        <TextField
          label="Address"
          value={employee?.employeeAddress?.localAddress}
          variant="outlined"
          fullWidth
          margin="normal"
          size='small'
          sx={{width:'92%', mx:1}}
        />
        <TextField
          label="Current Manager"
          value={manager?.name}
          variant="outlined"
          fullWidth
          margin="normal"
          size='small'
          sx={{width:{xs:'90%', sm:'45%'}, mx:1}}
        />
        <TextField
          label="Manager's Email"
          value={manager?.email}
          variant="outlined"
          fullWidth
          margin="normal"
          size='small'
          sx={{width:{xs:'90%', sm:'45%'}, mx:1}}
        />
      </CardContent>
    </Card>

    <Paper style={{ width:'95%', margin:'2.5%', padding:'20px' }}>
      <Chrono 
        items={transformedData}
        // mode="HORIZONTAL"
        mode="VERTICAL_ALTERNATING"
        itemWidth={100} 
        cardWidth={200}
        cardHeight={50}
        fontSizes={10}
        showAllCardsHorizontal={true}
        theme={{ primary: 'deepskyblue', secondary: 'lavender', cardBgColor: 'white', cardForeColor: 'black' }}
        useReadMore={true}
        borderLessCards={true}
        highlightCardsOnHover={true}
        disableToolbar={true}
      />
    </Paper>

    <TableContainer component={Paper} sx={{ width:'95%', margin: '2.5%' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reportee Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportees.map((reportee) => (
            <TableRow key={reportee.employeeId}>
              <TableCell component="th" scope="row" sx={{display:'flex', alignItems:'center'}}>
                <Avatar sx={{ bgcolor: 'primary.main', marginRight: 1 }}>{reportee.name[0]}</Avatar>
                {reportee.name}
              </TableCell>
              <TableCell>{reportee.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Box>
  )
}

export default Employee