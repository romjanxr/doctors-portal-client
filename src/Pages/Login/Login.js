import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import login from '../../images/login.png'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, isLoading, authError, loginUser, signInWithGoogle } = useAuth();

    const location = useLocation()
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history)
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ mt: 8 }}>
                    <Typography variant="h5" gutterBottom component="div">
                        Login
                    </Typography>
                    <form onSubmit={handleLoginSubmit}>
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
                        <Button
                            sx={{ width: '75%', m: 1 }}
                            variant="contained"
                            type="submit">Login</Button>
                        <NavLink style={{ textDecoration: 'none' }} to="/register">
                            <Button variant="text">New User? Register Here</Button>
                        </NavLink>
                    </form>
                    <Button onClick={() => signInWithGoogle(location, history)} variant="contained">Google Sign In</Button>
                    <br />
                    {isLoading && <CircularProgress />}
                    {user?.email && <Alert severity="success">User Login Successfully</Alert>
                    }
                    {authError && <Alert severity="error">{authError}</Alert>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={login} alt="" />
                </Grid>
            </Grid>
        </Container >
    );
};

export default Login;