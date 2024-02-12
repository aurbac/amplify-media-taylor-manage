import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import LinearProgress from '@mui/material/LinearProgress';

import { get } from 'aws-amplify/api';

import LinkMui from '@mui/material/Link';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';


import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';


import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';


import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import TheatersIcon from '@mui/icons-material/Theaters';
import EditIcon from '@mui/icons-material/Edit';

import dayjs from 'dayjs';


import axios from 'axios';


function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));


const Media = () => {

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);


    const [open, setOpen] = React.useState(false);
    const [enabledAddUpdate,setEnabledAddUpdate] = React.useState(false);
    
    const [loading,setLoading] = React.useState(false);
    const [loadingDialog,setLoadingDialog] = React.useState(false);
    const [errorMessage,setErrorMessage] = React.useState("");
    const [spaces,setSpaces] = React.useState([]);
    const [mediaSelect, setMediaSelect] = React.useState([]);
    const [dateTime,setDateTime] = React.useState("");
    const [timestamp, setTimestamp] = React.useState(0);
    
  const [num, setNum] = useState(0);

  const MINUTE_MS = 60000;

  useEffect(() => {
    // 👇️ only runs once
    console.log('useEffect ran');

    if(!loading && spaces.length==0){
      getSpaces()
    }

    const interval = setInterval(() => {
      console.log('Logs every minute');
      getSpaces();
    }, MINUTE_MS);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.


  }, []); // 👈️ empty dependencies array
    
    
    const handleClick = async (e) => {
        e.preventDefault();
        //getAnswer();
    }

    const handleClickOpen = (value) => (e) => {
        //setIndexQuery(value)
        e.preventDefault();
        getMedia("add");
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
        setEnabledAddUpdate(false)
        setMediaSelect([]);
    };
    
    const handleAddUpdate = async () => {
        if (enabledAddUpdate){
          setLoadingDialog(true);
          setEnabledAddUpdate(false)
          try {
              const res = await axios.post('https://jl4jfr7rtd.execute-api.us-east-1.amazonaws.com/addUpdateSpace', 
                  {
                      media: mediaSelect,
                      dateTime: dateTime,
                      channel: "Multimedios4",
                      headers: {
                          "Content-Type": "application/json"
                      }
                  }
              );
              console.log(res)
              setLoadingDialog(false)
              //setMediaSelect(res.data)
              setEnabledAddUpdate(true)
               getSpaces()
          } catch (error) {
              setErrorMessage(error.message);
              setLoadingDialog(false)
              setEnabledAddUpdate(true)
          }
          setOpen(false);
          setMediaSelect([]);
        }
    };

    const getSpaces = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://jl4jfr7rtd.execute-api.us-east-1.amazonaws.com/getSpaces', 
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log(res)
            setLoading(false)
            setSpaces(res.data)
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false)
        }
    }


    const getMedia = async (operation) => {
        setLoadingDialog(true);
        try {
            const res = await axios.get('https://jl4jfr7rtd.execute-api.us-east-1.amazonaws.com/getMedia', 
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log(res)
            setLoadingDialog(false)
            setMediaSelect(res.data)
        } catch (error) {
            setErrorMessage(error.message);
            setLoadingDialog(false)
        }
    }
    
    const handleChangeSelected = (value) => (event) => {
        let newArr = [...mediaSelect]
        newArr[value].selected = event.target.checked
        setMediaSelect(newArr)
    };
    
    const handleChangeDate = (event) => {
        console.log(event)
        if ((event.$m%10)==0){
            setDateTime(event.$d)
            setEnabledAddUpdate(true)
        }
    };


  return (
    <>
        
        <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>

                <Typography component="h1" variant="h4" sx={{ p: '0px 0px 10px 12px', m:0, fontWeight: 500, fontSize: 26 }}>
                    Administrador de espacios comerciales
                </Typography>
                <Grid item sx={{ minHeight: 6 }}>
                    { loading && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                    )}    
                </Grid>

              


                { errorMessage!=="" && (
                    <Alert sx={{ m: '0px 0px 24px 0px' }} variant="outlined" severity="error">{errorMessage}</Alert>
                )}


                <Paper container
                    sx={{ p: '16px 16px', m: '0px 0px 24px 0px', borderRadius: 3 }}
                    elevation={4}
                >
                        <Button variant="contained" onClick={handleClickOpen("")}>
                            Actualizar espacio comercial
                        </Button>
                    
      
                    <Grid >
                      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Listado de espacios comerciales establecidos
                      </Typography>
                      <Demo>
                        <List dense={dense}>
                           {spaces.map((space, index) => (
                            <ListItem
                              secondaryAction={
                                <div>
                                { !Object.hasOwn(space, 'ttl') && (
                                  <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                                </div>
                              }
                            >
                              <ListItemAvatar>
                                <Avatar>
                                  <TheatersIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                    disableTypography
                                              primary={
                                                <div>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 550 }}>
                                                  {dayjs.unix(space['time_stamp']).format("YYYY-MM-DD HH:mm:ss") }
                                                  &nbsp;
                                                  { Object.hasOwn(space, 'ttl') && (
                                                      <Chip label="programado" color="success" size="small" />
                                                  )}
                                                </Typography>
                                                
                                                <Typography variant="body2">  
                                                  {space['media'].map((ad, index) => (
                                                      <div>
                                                            {ad}
                                                      </div>
                                                  ))}
                                                </Typography>
                                                </div>
                                              }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Demo>
                    </Grid>
                    
                    
                    
                    

                </Paper>
            
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth={'md'}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Actualizar espacio comercial
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                
                
                <Grid item sx={{ minHeight: 6 }}>
                    { loadingDialog && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                    )}    
                </Grid>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                    defaultValue={dayjs()}
                    minutesStep={10}
                    disablePast={true}
                    onChange={handleChangeDate}
                    label="Seleccionar la hora y minuto del espacio de publicidad" />
                  </DemoContainer>
                </LocalizationProvider>
                
                <FormLabel component="legend">Seleccionar comerciales</FormLabel>
                <FormGroup>
                    {mediaSelect.map((media, index) => (
                        <div>
                              <FormControlLabel
                                key={"selected"+index}
                                label={media.media_id}
                                control={<Checkbox checked={media.selected} onChange={handleChangeSelected(index)} />}
                              />
                        </div>
                    ))}
                </FormGroup>
            
                </DialogContent>
                <DialogActions>
                  <Button  disabled={!enabledAddUpdate} autoFocus onClick={handleAddUpdate} variant="contained">
                    Actualizar
                  </Button>
                </DialogActions>
            </BootstrapDialog>
            
            
            
            
        </Container>
    </>
  );
};

export default Media;