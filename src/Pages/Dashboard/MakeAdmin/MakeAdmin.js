import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
const axios = require('axios').default;

const MakeAdmin = () => {
    const [email, setEmail] = useState();
    const [success, setSuccess] = useState(false);
    const { token } = useAuth()
    const handleEmailOnBlur = e => {
        setEmail(e.target.value)
    }

    const handleAdminSubmit = e => {
        axios.put('https://obscure-chamber-60035.herokuapp.com/users/admin', { email }, { headers: { authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    setSuccess(true);
                    console.log(res);
                }
            })
        e.preventDefault();
    }
    return (
        <div>
            <h2>Make an Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField
                    id="standard-basic"
                    label="Your email"
                    type="email"
                    variant="standard"
                    onBlur={handleEmailOnBlur}
                />
                <Button type="submit" variant="contained">Make Admin</Button>
            </form>
            {
                success && <Alert severity="success">Admin Create Successfully</Alert>
            }
        </div>
    );
};

export default MakeAdmin;