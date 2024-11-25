import React, { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { parseISO } from 'date-fns';
import InputLabel from '@mui/material/InputLabel';


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';







export default function AddTraining(props) {
    const [training, setTraining] = useState({
        date: parseISO('2024-11-25T15:30:00'),
        duration: '',
        activity: '',
        customer: ''
    })

    const [customers, setCustomers] = useState([]);
    
    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            const data = await response.json();
            setCustomers(data._embedded.customers)
            console.log(data)
            
        }
        catch (e) {
            console.error(e)
        }
    }

    

    



    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    };

    const handleDateChange = (date) => {
        setTraining({ ...training, date });
      };
    
      const handleCustomerChange = (event) => {
        setTraining({ ...training, customer: event.target.value });
      };

    const handleSave = () => {
        props.saveTrainning(training);
        console.log(training);
        setOpen(false);
    }

    useEffect(() => {
        if (open) {
          fetchCustomers();
        }
      }, [open]);

    return (
        <div>
        <Button onClick={handleClickOpen}>Add a new training</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Training</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="customer-select-label">Customer</InputLabel>
                <Select
                  labelId="customer-select-label"
                  id="customer"
                  value={training.customer}
                  onChange={handleCustomerChange}
                  label="Customer"
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
                      {customer.firstname} {customer.lastname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Container components={['DateTimePicker']}>
                <DateTimePicker
                  label="Date & Time"
                  value={training.date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth/>}
                />
              </Container>
            </LocalizationProvider>
  
            <TextField
              autoFocus
              required
              id="activity"
              name="activity"
              label="Activity"
              value={training.activity}
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              required
              id="duration"
              name="duration"
              label="Duration"
              value={training.duration}
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>

    )

}