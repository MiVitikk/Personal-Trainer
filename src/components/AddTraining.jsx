import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Container from '@mui/material/Container';
import { parseISO } from 'date-fns';



export default function AddTraining(props) {
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: ''
    })
    const [value, setValue] = React.useState(parseISO('2022-04-17T15:30:00'));

    

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

    const handleSave = () => {
        props.saveTrainning(training);
        console.log(training);
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Add a new training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Container components={['DateTimePicker', 'DateTimePicker']}>
                            
                            <DateTimePicker
                                
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
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
            </Dialog>
        </div>

    )

}