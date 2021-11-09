import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth'
import register from '../../../images/login.png'

const Register = () => {
    const [registerData, setRegisterData] = useState({});
    const { user, registerUser, isLoading, authError } = useAuth();
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...registerData }
        newLoginData[field] = value;
        setRegisterData(newLoginData);
    }

    const handleRegisterSubmit = e => {
        if (registerData.password !== registerData.password2) {
            alert('password did not match')
            return e.preventDefault();;
        }
        registerUser(registerData.email, registerData.password, registerData.name, history)
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ mt: 8 }}>
                    <Typography variant="h5" gutterBottom component="div">
                        Register
                    </Typography>
                    <form onSubmit={handleRegisterSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            name="name"
                            onChange={handleOnChange}
                            label="Your Name"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            name="email"
                            onChange={handleOnChange}
                            label="Your Email"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            type="password"
                            id="standard-basic"
                            name="password"
                            onChange={handleOnChange}
                            label="Your Password"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            type="password"
                            id="standard-basic"
                            name="password2"
                            onChange={handleOnChange}
                            label="Your Password"
                            variant="standard"
                        />
                        <Button
                            sx={{ width: '75%', m: 1 }}
                            variant="contained"
                            type="submit">Register</Button>
                        <NavLink style={{ textDecoration: 'none' }} to="/login">
                            <Button variant="text">Have Account? Login Here</Button>
                        </NavLink>
                    </form>
                    {isLoading && <CircularProgress />}
                    {user?.email && <Alert severity="success">User Created Successfully</Alert>
                    }
                    {authError && <Alert severity="error">{authError}</Alert>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={register} alt="" />
                </Grid>
            </Grid>
        </Container >
    );
};

export default Register;