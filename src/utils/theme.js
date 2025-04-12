import {createTheme} from '@mui/material/styles';

export const lightTheme = createTheme({
    palette:{
        mode:'light',
        background:{
            default:'#f3f5f7',
            paper: 'rgb(244, 250, 255)',
            header:'#ffffff'
        },
        text:{
            primary:'#000000'
        },
        action:{
            active:'#808080'
        }
    }
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background:{
            default:'#2A3542',
            paper: '#3D4855',
            header:'#3D4855'
        },
        text:{
            primary:'#ffffff'
        },
        action:{
            active:'#0000ff'
        }
    }
    
});