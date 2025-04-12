import React, { useEffect, useState } from 'react';
import { Box,TextField, Checkbox, ListItemText, FormControl, InputLabel, Select, MenuItem, Typography, IconButton } from '@mui/material';
import { useGetCountryQuery } from "../../services/countryApi";
import {useGetAllEmployeesQuery} from '../../services/employeeApi';
import {useGetAllDepartmentsQuery} from '../../services/departmentApi'
import filerEmployees from '../../utils/filterMethods';
import { useDispatch } from 'react-redux';
import {setFilterEmp} from '../../slices/metaSlice';
import SearchIcon from '@mui/icons-material/Search';
import filterEmployees from '../../utils/filterMethods';
import Loading from '../Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllManagers } from '../../utils/employeeUtil';

const FilterEmployees = () => {

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [birthday, setBirthday] = useState(false);
  const [countries, setCountries] = useState([]);
  const [managers, setManagers] = useState([]);
  const [departments, setDepartments] = useState([]);

  
  const {data:countryOptions, isLoading:countryLoading} = useGetCountryQuery();
  const {data:employees, isFetching, error} = useGetAllEmployeesQuery();
  const {data:departmentOptions, isFetching:isFetching2} = useGetAllDepartmentsQuery();
  const allManagers = getAllManagers(employees);
  
  const handleSearch = () => {
    const filteredEmp = filterEmployees(employees, search, countries, managers, birthday, departments, departmentOptions);
    if(filteredEmp)
    dispatch(setFilterEmp({filteredEmp}));
  }

  const reset = () => {
    setSearch('');
    setBirthday(false);
    setCountries([]);
    setDepartments([]);
    setManagers([]);
    handleSearch();
  }

  useEffect(()=>{
    handleSearch();
  },[isFetching])

  if(countryLoading || isFetching || isFetching2) return (<Loading/>);
  console.log(filerEmployees)
  
  return (
    <Box sx={{display:'flex',width:'100%', flexWrap:'wrap', gap:1, minHeight:'8vh', alignItems:'center', my:1}}>
    <TextField
        label="Search by email or name"
        value={search}
        size='small'
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        sx={{width:'20%', ml:1}}
      />
      <Checkbox
        checked={birthday} size='small'
        onChange={(e) => setBirthday(e.target.checked)}
      />
      {/* <ListItemText size='small' primary="Birthday" sx={{display:'flex'}}/> */}
      <Typography sx={{fontSize:'15px'}}>Show Birthday</Typography>
      <FormControl size='small' variant="outlined" style={{ width: '16%' }}>
        <InputLabel size='small' id="demo-multiple-checkbox-label">Countries</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          size='small'
          value={countries}
          onChange={(e) => setCountries(e.target.value)}
          renderValue={(selected) => `${selected.length} selected`}
          label="Countries"
        >
          {countryOptions.map((country) => (
            <MenuItem size='small' key={country?.name} value={country?.name}>
              <Checkbox size='small' checked={countries.indexOf(country?.name) > -1} />
              <ListItemText size='small' primary={country?.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size='small' variant="outlined" style={{ width: '16%' }}>
        <InputLabel size='small' id="demo-multiple-checkbox-label">Reportees Of</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          size='small'
          value={managers}
          onChange={(e) => setManagers(e.target.value)}
          renderValue={(selected) => `${selected.length} selected`}
          label="Managers"
        >
          {allManagers.map((manager) => (
            <MenuItem size='small' key={manager?.employeeId} value={manager?.employeeId}>
              <Checkbox size='small' checked={managers.indexOf(manager?.employeeId) > -1} />
              <ListItemText size='small' primary={manager?.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size='small' variant="outlined" style={{  width: '16%' }}>
        <InputLabel size='small' id="demo-multiple-checkbox-label">Departments</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          size='small'
          value={departments}
          onChange={(e) => setDepartments(e.target.value)}
          renderValue={(selected) => `${selected.length} selected`}
          label="Departments"
        >
          {departmentOptions.map((department) => (
            <MenuItem size='small' key={department?.departmentName} value={department?.departmentName}>
              <Checkbox size='small' checked={departments.indexOf(department?.departmentName) > -1} />
              <ListItemText size='small' primary={department?.departmentName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton sx={{color:'grey'}} onClick={handleSearch}><SearchIcon/></IconButton>
      <IconButton onClick={reset}><DeleteIcon/></IconButton>

    
    </Box>
  );
};

export default FilterEmployees;