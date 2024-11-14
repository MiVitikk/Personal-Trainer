import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    };

    const handleSave = () => {
        props.saveCustomer(customer);
        console.log(customer)
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}> Add a new customer </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    New Customer
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        id="firstname"
                        name="firstname"
                        label="Firstname"
                        value={customer.firstname}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField

                        required
                        id="lastname"
                        name="lastname"
                        label="Lastname"
                        value={customer.lastname}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField

                        required
                        id="streetaddress"
                        name="streetaddress"
                        label="Street Address"
                        value={customer.streetaddress}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField

                        required
                        id="postcode"
                        name="postcode"
                        label="Postcode"
                        value={customer.postcode}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField

                        required
                        id="city"
                        name="city"
                        label="City"
                        value={customer.city}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField

                        required
                        id="email"
                        name="email"
                        label="Email"
                        value={customer.email}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField

                        required
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={customer.phone}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}