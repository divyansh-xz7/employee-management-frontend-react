import React, { useState } from "react";
import { Button, TextField, Container, Typography, InputAdornment, IconButton, Grid} from "@mui/material";
import {Box} from '@mui/system'
import {useTheme} from '@mui/material/styles';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import loginlight from '../../images/login_light.png';
import logindark from '../../images/login-dark.png';
import {useLoginMutation} from '../../services/authApi';
import {setCredentials} from '../../slices/authSlice';
import { useDispatch } from "react-redux";


const Login = ({changeTheme}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, {isLoading}] = useLoginMutation();

  const handleLogin = async (e) => {
    try{
      e.preventDefault();
      const username = email;
      setEmail('');
      setPassword('');
      const {jwtToken}= await login({email, password}).unwrap();
      dispatch(setCredentials({token:jwtToken, username}));
  
      navigate('/dashboard')
    }
    catch(error)
    {
      alert("Failed to login!");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    
    <Container component="main" sx={{display:'flex', flexDirection:'row', minHeight:'95vh', alignItems:'center', justifyContent:'space-around', backgroundColor:theme.palette.background.default}}>
        
        <Box sx={{height:'90vh', width:'50%', background:'gray', alignItems:'center', borderRadius:10}} display={{  md: 'flex',sm: 'none', xs:'none' }}>
            <img src={loginlight} alt="Login Image" width="100%" />
        </Box>
        
        <Box sx={{display:'flex', flexDirection:'column'}}>
        <Typography sx={{fontWeight:700}} component="h1" variant="h5" gutterBottom>
            Welcome!
        </Typography>
        <Typography sx={{marginBottom:2}} component="p" variant="body1">
            It's great to see you here again.
        </Typography>
        <form noValidate onSubmit={handleLogin}>
        <Typography sx={{fontSize:{xs:'14px', sm:'18px'}, mb:-2}}>Email ID</Typography>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Typography sx={{fontSize:{xs:'14px', sm:'18px'}, mb:-2}}>Password</Typography>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ 
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                )
            }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" disabled={isLoading || (password=='' || email=='')} sx={{}}>
              {isLoading?'Loading..':'Login'}
            </Button>
            <Typography sx={{m:2}} variant="body2" color="textSecondary" align="center">
            Don't have account yet? <NavLink to="/signup" style={{textDecoration:'none', color:theme.palette.text.primary}}>Sign Up</NavLink>
            </Typography>
        </form>
        </Box>
    </Container>
  );
};

export default Login;