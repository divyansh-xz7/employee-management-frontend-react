import { Box, Card, Container, Typography, Switch } from '@mui/material'
import React from 'react'
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import MediationIcon from '@mui/icons-material/Mediation';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import { LogoutOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {logout} from '../../slices/authSlice';
import ContrastIcon from '@mui/icons-material/Contrast';


const textStyle = {display:{xs:'none', sm:'block'}, color:'white', fontSize:'14px'}

const Sidebar = ({changeTheme}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    console.log(90)
    dispatch(logout());
    navigate('/');
  }

  return (
    <Box sx={{flex:{xs:0.2, sm:1}, minHeight:'100vh', background:theme.palette.background.header}}>
        <Box sx={{background:theme.palette.background.default, width:'100%', height:'8vh', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <Typography sx={{fontSize:'18px', fontWeight:500,marginLeft:2, display:{xs:'none', sm:'block'}}}>
            WORKFORCE
          </Typography>
          <LogoutOutlined sx={{m:1}} onClick={handleLogout}/>
        </Box>
        <Box sx={{flex:{xs:0.2, sm:1}}}>

          <NavLink to='/dashboard' style={{textDecoration:'none'}}>
          {({ isActive}) => (
          <Card sx={{width:'90%', display:'flex', background:isActive ? "#318CE7":'#404040', alignItems:'center', m:'5%'}}>
            <TimelineOutlinedIcon sx={{m:1, color:'white'}}/>
            <Typography sx={textStyle}>Dashboard</Typography>
          </Card>
            )}
          </NavLink>

          <NavLink to='/employees' style={{textDecoration:'none'}}>
          {({ isActive}) => (
          <Card sx={{width:'90%', display:'flex', background:isActive ? "#318CE7":'#404040', alignItems:'center', m:'5%'}}>
            <PeopleAltIcon sx={{m:1, color:'white'}}/>
            <Typography sx={textStyle}>Employees</Typography>
          </Card>
            )}
          </NavLink>

          <NavLink to='/departments' style={{textDecoration:'none'}}>
          {({ isActive}) => (
          <Card sx={{width:'90%', display:'flex', background:isActive ? "#318CE7":'#404040', alignItems:'center', m:'5%'}}>
            <SpaceDashboardIcon sx={{m:1, color:'white'}}/>
            <Typography sx={textStyle}>Departments</Typography>
          </Card>
            )}
          </NavLink>

          <NavLink to='/' style={{textDecoration:'none'}}>
          {({ isActive}) => (
          <Card sx={{width:'90%', display:'flex', background:isActive ? "#318CE7":'#404040', alignItems:'center', m:'5%'}}>
            <MediationIcon sx={{m:1, color:'white'}}/>
            <Typography sx={textStyle}>Org Hierarchy</Typography>
          </Card>
            )}
          </NavLink>
          <ContrastIcon sx={{margin:1, cursor:'pointer'}} onClick={changeTheme}/>
          
        </Box>
    </Box>
  )
}

export default Sidebar