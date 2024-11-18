import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props){
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    const [open, setOpen] = React.useState(false);

    const handleClickOpen= () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const updateCustomer = () => {
        props.updateCustomer(customer, props.customer._links.customer.href)
        setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Edit Customer</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
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
                    <Button onClick={updateCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}