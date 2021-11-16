import React, { useState } from 'react';
import { Backdrop, Box, Fade, Modal, TextField, Typography, Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingModal = ({ handleClose, open, booking, date, setBookingSuccess }) => {
    const { name, time, price } = booking;
    const { user } = useAuth();
    const initialValue = { patientName: user.displayName, email: user.email, phone: '' }
    const [bookingInfo, setBookingInfo] = useState(initialValue)

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo }
        newInfo[field] = value;
        console.log(newInfo)
        setBookingInfo(newInfo)
    }


    const handleBookingSubmit = e => {

        //collect date
        const appointment = {
            ...bookingInfo,
            serviceName: name,
            time,
            price,
            date: date.toLocaleDateString()
        }
        // send data to server
        axios.post('https://obscure-chamber-60035.herokuapp.com/appointments', appointment)
            .then(res => {
                if (res.data.insertedId) {
                    setBookingSuccess(true);
                }
            })

        handleClose();
        e.preventDefault();
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {name}
                        </Typography>
                        <form onSubmit={handleBookingSubmit}>
                            <TextField
                                disabled
                                sx={{ width: '90%', m: 2 }}
                                id="outlined-size-small"
                                defaultValue={time}
                                size="small"
                            />
                            <TextField
                                sx={{ width: '90%', m: 2 }}
                                id="outlined-size-small"
                                name="patientName"
                                onBlur={handleOnBlur}
                                defaultValue={user.displayName}
                                size="small"
                            />
                            <TextField
                                sx={{ width: '90%', m: 2 }}
                                id="outlined-size-small"
                                name="email"
                                onBlur={handleOnBlur}
                                defaultValue={user.email}
                                size="small"
                            />
                            <TextField
                                sx={{ width: '90%', m: 2 }}
                                id="outlined-size-small"
                                name="phone"
                                onBlur={handleOnBlur}
                                defaultValue="Phone Number"
                                size="small"
                            />
                            <TextField
                                disabled
                                sx={{ width: '90%', m: 2 }}
                                id="outlined-size-small"
                                defaultValue={date.toDateString()}
                                size="small"
                            />
                            <Button sx={{ width: '90%', m: 2 }} type="submit" variant="contained">Submit</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default BookingModal;