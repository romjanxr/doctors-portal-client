import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import doctors from '../../../images/doctor.png'
import bg from '../../../images/appointment-bg.png'

const AppointmentBanner = () => {
    const appointmentBg = {
        background: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: '175px',
        marginBottom: '175px',
        backgroundBlendMode: 'darken',
        backgroundColor: 'rgba(5, 57, 70, 0.9)',
    }

    return (
        <Box style={appointmentBg} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img style={{ marginTop: '-110px' }} width="400px" src={doctors} alt="" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography sx={{ mt: 5, mb: 2, color: 'success.main', fontWeight: 500 }} variant="h6">
                            Appointment
                        </Typography>
                        <Typography sx={{ mt: 5, mb: 2, fontWeight: 600 }} variant="h4" style={{ color: 'white' }}>
                            Make an Appointment Today
                        </Typography>
                        <p style={{ color: 'white' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ducimus sequi dicta placeat mollitia consequuntur earum alias quae deserunt ab?</p>
                        <Button variant="contained">Learn More</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
};

export default AppointmentBanner;