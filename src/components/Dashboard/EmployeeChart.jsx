import * as React from 'react';
import { PieChart, PieSeries } from '@mui/x-charts/PieChart';
import { Container, Box, Typography } from '@mui/material';
import {useGetAllEmployeesQuery} from '../../services/employeeApi';
import { useGetCountryQuery } from "../../services/countryApi";
import {useTheme} from '@mui/material/styles';
import Loading from '../Loading'

export default function EmployeeChart() {
  const theme = useTheme();

    const {data:employees, isFetching, error} = useGetAllEmployeesQuery();
    const {data:countries, isLoading:countryLoading} = useGetCountryQuery();

    const object = {};

    if(countryLoading)
    return (<Loading/>)
    
    // countries.forEach((country)=>{
    //     object[country?.name] = 0;
    // })

    if(isFetching)
    return <div>Loading chart...</div>
    if(error)
    return <div>Could not load the chart.</div>


    // const countryFrequency ={India:0,USA:0,Japan:0,UK:0,Singapore:0,Brazil:0,Thailand:0,Bhutan:0,Russia:0,Pakistan:0}
    
    const processData = (employees) => {
        const countryFreq = employees.reduce((acc, {country})=>{
            acc[country.name] = (acc[country.name] || 0) +1;
            return acc;
        }, object);
        return Object.keys(countryFreq).map(country=>({
            label:country,
            value:countryFreq[country]
        }));
    };

    const chartData = processData(employees || []);
    console.log(chartData)
    
  return (
    <>
        <Typography sx={{fontSize:'18px', m:2}}>Employee vs Regions</Typography>
        <Box sx={{display:'flex', flexWrap:'wrap', width:'95%', height:'50vh', justifyContent:'flex-start', margin:'2.5%',  background:theme.palette.background.paper, borderRadius:5, boxShadow:' 0 3px 10px rgb(0 0 0 / 0.2)'}}>
        <PieChart
        series={[
            {
            data: chartData
            },
        ]}
        
        />
        
    </Box>
    </>
  );
}