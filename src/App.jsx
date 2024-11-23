import { useState } from 'react'

import './App.css'
import CustomerList from './components/CustomerList'
import TrainingList from './components/TrainingList';
import { Container } from '@mui/material'
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Tab } from '@mui/material'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {TabPanel} from "@mui/lab"
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import EventCalendar from './components/Calendar/EventCalendar';


function App() {
  const [value, setValue] = useState('1');

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <h1>Personal Trainer</h1>
      <CssBaseline />
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6">Personal Trainer</Typography>
        </Toolbar>
      </AppBar>

      
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="tabs">
                <Tab label="Customers" value="1" />
                <Tab label="Trainings" value="2" />
                <Tab label="Calendar" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1"><CustomerList /></TabPanel>
            <TabPanel value="2"><TrainingList /></TabPanel>
            <TabPanel value="3"><EventCalendar /></TabPanel>

          </TabContext>
        </Box>
      

    </Container>
  )
}

export default App
