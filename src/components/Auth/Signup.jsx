import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, IconButton, MenuItem, Grid, InputAdornment } from "@mui/material";
import signuplight from '../../images/signup-light.png';
import signupdark from '../../images/signup-dark.png';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import {useSignupMutation} from '../../services/authApi';
import { useGetCountryQuery } from "../../services/countryApi";
import { NavLink } from "react-router-dom";
import {useTheme} from '@mui/material/styles';


const initialState = {
  fullName: "",
  email: "",
  password: "",
  dob: "",
  country: "",
  city: "",
  state: "",
  address: "",
  pincode: ""
};



export default function SignUp() {


  const navigate = useNavigate();
  const theme = useTheme();


  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const {data:countries, isLoading:countryLoading} = useGetCountryQuery();

  const [signup, {isLoading}] = useSignupMutation();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {name:form.fullName, email:form.email, password:form.password, country:form.country, birthDay:form.dob, employeeAddress:{city:form.city, localAddress:form.address, pinCode:form.pincode, state:form.state, currentAddress:true, addressId:null}};
    try{
        setForm(initialState);
        const res = await signup(data).unwrap();
        navigate('/login');
    }
    catch(error)
    {
      console.error(error);
      alert("Failed to SignUp!");
    }

  };

  if(countryLoading) return (<div>Loading please wait</div>);

  return (
    <Container component="main" sx={{height:'95vh' ,display:'flex', flexDirection:'row', minHeight:'95vh', alignItems:'center', justifyContent:'space-around'}}>
        <Box sx={{height:'85vh', width:'40%', alignItems:'center'}} display={{  md: 'flex',sm: 'none', xs:'none' }}>
            <img src={signuplight} alt="Signup Image" width="100%" />
        </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5}}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Typography sx={{fontSize:{xs:'12px', sm:'15px'}, mb:-2}}>Full Name</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="Enter name"
            autoFocus
            value={form.fullName}
            onChange={handleChange} 
            size="small"
          />
        <Typography sx={{fontSize:{xs:'12px', sm:'15px'}, mb:-2}}>Email ID</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            size="small"
          />
        <Typography sx={{fontSize:{xs:'12px', sm:'15px'}, mb:-2}}>Password</Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            size="small"
            InputProps={{ 
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    onClick={handleClickShowPassword}
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                )
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Typography sx={{fontSize:{xs:'12px', sm:'15px'}, mb:-2}}>Date of Birth</Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="dob"
                type="date"
                id="dob"
                value={form.dob}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}           
                 size="small"
              />
            </Grid>
            <Grid item xs={6}>
        <Typography sx={{fontSize:{xs:'12px', sm:'15px'}, mb:-2}}>Country</Typography>

              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel id="country-label" size="small"/>
                <Select
                  labelId="country-label"
                  id="country"
                  name="country"
                  placeholder="Select country"
                  value={form.country}
                  onChange={handleChange}
                  size="small"
                >
                  {/* <MenuItem value={"United States"}>United States</MenuItem>
                  <MenuItem value={"Canada"}>Canada</MenuItem>
                  <MenuItem value={"India"}>India</MenuItem> */}
                  {
                    countries?.map((country)=>{
                      return (<MenuItem value={country?.name}>{country?.name}</MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography sx={{fontSize:{xs:'12px', sm:'15px'}, mb:-2}}>City</Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="city"
                name="city"
                placeholder="Enter City"
                autoComplete="city"
                value={form.city}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
        <Typography sx={{fontSize:{xs:'12px', sm:'15px'}, mb:-2}}>State</Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="state"
                name="state"
                placeholder="Enter State"
                autoComplete="state"
                value={form.state}
                onChange={handleChange}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={9}>
        <Typography sx={{fontSize:{xs:'12px', sm:'15px'}, mb:-2}}>Address</Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                name="address"
                placeholder="Enter Address"
                autoComplete="address"
                value={form.address}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
        <Typography sx={{fontSize:{xs:'12px', sm:'15px'}, mb:-2}}>Pincode</Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="pincode"
                name="pincode"
                autoComplete="pincode"
                placeholder="Pin"
                value={form.pincode}
                onChange={handleChange}
                size="small"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            {isLoading?'Loading..':'Sign Up'}
          </Button>
          <Typography sx={{m:2}} variant="body2" color="textSecondary" align="center">
            Already have account? <NavLink to="/login" style={{textDecoration:'none', color:theme.palette.text.primary}}>LogIn</NavLink>
            </Typography>
        </Box>
      </Box>
    </Container>
  );
}