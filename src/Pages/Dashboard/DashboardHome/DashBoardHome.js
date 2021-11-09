import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Calender from '../../Shared/Calender/Calender';
import Appointment from '../Appointment/Appointment';

const DashBoardHome = () => {
    const [date, setDate] = useState(new Date());

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Calender date={date} setDate={setDate} />
            </Grid>
            <Grid item xs={12} md={8}>
                <Appointment date={date} />
            </Grid>
        </Grid>
    );
};

export default DashBoardHome;