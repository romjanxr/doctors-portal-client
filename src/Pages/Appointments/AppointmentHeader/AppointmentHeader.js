import { Grid } from '@mui/material';
import React from 'react';
import chair from '../../../images/chair.png'
import Calender from '../../Shared/Calender/Calender';

const AppointmentHeader = ({ date, setDate }) => {
    return (
        <Grid container spacing={2} sx={{ marginBottom: '100px' }}>
            <Grid item xs={12} md={6}>
                <Calender date={date} setDate={setDate} />
            </Grid>
            <Grid item xs={12} md={6}>
                <img src={chair} alt="" />
            </Grid>
        </Grid>
    );
};

export default AppointmentHeader;