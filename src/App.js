import { useCallback, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Switch } from '@mui/material';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Departments from './components/Department/Departments';
import { useSelector } from 'react-redux';
import Employees from './components/Employee/Employees';
import Employee from './components/Employee/Employee';
import { darkTheme, lightTheme } from './utils/theme';

function App() {
  
  const [theme, setTheme] = useState(darkTheme);

  const changeTheme = useCallback(()=>{
    if(theme==lightTheme)
    setTheme(darkTheme);
    else
    setTheme(lightTheme);
    
  }, [theme, lightTheme, darkTheme]);

  const Secure = () => {
    const token = useSelector((state)=> state?.auth?.token);
    if(!token)
    return <Navigate to="/login" replace/>;
    return <Outlet/>;
  }

  const NotAvailable = () => {
    const token = useSelector((state)=> state?.auth?.token);
    if(token)
    return <Navigate to="/dashboard" replace/>;
    return <Outlet/>;
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Switch checked={darkMode} onChange={handleThemeChange} /> */}
      {/* The rest of your application */}
      <BrowserRouter>
      <Routes>
      <Route element={<NotAvailable/>}>
      <Route path='/' element={<Login changeTheme={changeTheme}/>}/>
      <Route exact path='/login' element={<Login changeTheme={changeTheme}/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      </Route>

      <Route element={<Secure/>}>
      <Route exact path='/departments' element={<Departments changeTheme={changeTheme}/>}/>
      <Route exact path='/dashboard' element={<Dashboard changeTheme={changeTheme}/>}/>
      <Route exact path='/employees' element={<Employees changeTheme={changeTheme}/>}/>
      <Route exact path='/employee/:id' element={<Employee changeTheme={changeTheme}/>}/>
      </Route>

      </Routes>
      </BrowserRouter>
    </ThemeProvider>
    
    </>
  );
}

export default App;
