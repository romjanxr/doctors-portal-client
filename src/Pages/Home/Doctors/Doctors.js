import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('https://obscure-chamber-60035.herokuapp.com/doctors')
            .then(res => res.json())
            .then(data => setDoctors(data))
    }, [])

    return (
        <div>
            <h2>Our Doctors {doctors.length}</h2>
            <Grid container spacing={2}>
                {
                    doctors.map((doctor) => (
                        <Grid key={doctor._id} item xs={12} sm={6} md={4}>
                            <img src={`data:image/*;base64,${doctor.image}`} alt="" />
                            <h3>{doctor.name}</h3>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export default Doctors;