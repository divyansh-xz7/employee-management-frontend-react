import { Box, Container, Typography, Grid, Card } from '@mui/material'
import { TextField, Button } from "@mui/material";
import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import {useGetAllDepartmentsQuery, useAddDepartmentMutation} from '../../services/departmentApi';
import { useSelector } from 'react-redux';
import {useTheme} from '@mui/material/styles';


const Departments = ({changeTheme}) => {
  const theme = useTheme();

    const {data:departments, error, isLoading} = useGetAllDepartmentsQuery();
    const [addDepartment] = useAddDepartmentMutation();
    const role = useSelector(state=>state.meta?.role);

    const [newDpt, setNewDpt] = useState('');
    const [value, setValue] = useState("");

    const handleChange = (event) => {
      setValue(event.target.value);
    };
  

    const handleAddDept = async() => {
        try{
            if(newDpt)
            await addDepartment({departmentName:newDpt});
            setNewDpt('');
        }
        catch(err)
        {
            alert('Failed to add department')
            console.log(err)
        }
    }

  return (
    <Box sx={{display:'flex'}}>
        <Sidebar changeTheme={changeTheme}/>
        <Box sx={{flex:5}}>

            <Box sx={{width:'100%', background:theme.palette.background.header, height:'8vh', display:'flex', alignItems:'center'}}>
                <Typography sx={{margin:2, fontSize:{xs:'15px', sm:'20px'}, fontWeight:700}}>
                    Departments
                </Typography>
            </Box>

            <Box sx={{display:'flex', m:1, gap:1, width:'100%', flexWrap:'wrap'}}>
            <TextField size='small' value={value} onChange={handleChange} label="Search" variant="outlined" />
            {role==="ADMIN" && (
            <>
            <TextField size='small' value={newDpt} onChange={(e)=>setNewDpt(e.target.value)} label="Enter New Department" variant='outlined'/>
            <Button onClick={()=>handleAddDept()} variant="contained" color="primary">Add</Button>
            </>
        )}
            </Box>

            <Grid container spacing={2} sx={{margin:'2%', width:'96%'}}>
            {departments?.map((department) => (
                <Grid item xs={12} sm={6} md={4} key={department?.departmentId}>
                <Card sx={{borderRadius:3, minHeight:'50px', display:'flex', alignItems:'center'}}>
                    <Typography sx={{margin:2}} variant="body2" component="p">
                        {department?.departmentName}
                    </Typography>
                </Card>
                </Grid>
                ))}
            </Grid>
        </Box>

    </Box>
  )
}

export default Departments