import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';
import {useGetAllEmployeesQuery} from '../../services/employeeApi';
import {useTheme} from '@mui/material/styles';
import Loading from '../Loading';
import {getCurrentDepartment} from '../../utils/employeeUtil'

import {useGetAllDepartmentsQuery} from '../../services/departmentApi';

const chartSetting = {
  xAxis: [
    {
      label: 'Number of Employees',
    },
  ]
};


export default function DepartmentChart() {

  const theme = useTheme();

    const {data:employees, isFetching, error} = useGetAllEmployeesQuery();
    const {data:departments, isFetching:isFetching2} = useGetAllDepartmentsQuery();

    if(isFetching)
    return <Loading/>
    if(error)
    return <div>Could not load the chart.</div>

    let departmentFrequency = {};

// For each employee, get their current department and update the frequency count
    employees.forEach(emp => {
      const department = getCurrentDepartment(emp, departments);
      if (!departmentFrequency[department?.departmentName]) {
        departmentFrequency[department?.departmentName] = 0;
      }
      departmentFrequency[department?.departmentName]++;
    });

    const dataset = Object.keys(departmentFrequency).map(department => {
      return {
        value: departmentFrequency[department],
        department: department.substring(0,4)
      };
    });
    
console.log(dataset)
  return (
    <Box sx={{display:'flex', flexWrap:'wrap', width:'95%', height:'50vh', justifyContent:'center', margin:'2.5%', background:theme.palette.background.paper, borderRadius:5, boxShadow:' 0 3px 10px rgb(0 0 0 / 0.2)'}}>
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'department' }]}
      series={[{ dataKey: 'value', label: 'Number of Employees' }]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
    </Box>
  );
}