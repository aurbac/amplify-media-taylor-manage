import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";


import { createTheme, ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LinkMui from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';


import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DescriptionIcon from '@mui/icons-material/Description';


import SvgIcon from '@mui/material/SvgIcon';

const LayoutApp = () => {


  const defaultTheme = createTheme({
    palette: {
      text:{
        primary: "#353740"
      },
      background: {
        default: "#F8F9FA"
        //default: "#fcfcfc"
      },
      primary: {
        main: "#FFD201",
        dark: "#FFD201",
        light: '#FFE201',
        contrastText: "#16191F" //button text white instead of black
      },
    }
    
  });


  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />




        <Container disableGutters maxWidth="xl" component="main" >
          <div>
            <Outlet />
          </div>
        </Container>



      

    </ThemeProvider>
  );
};

export default LayoutApp;