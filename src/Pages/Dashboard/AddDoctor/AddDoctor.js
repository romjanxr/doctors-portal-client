import { Button, Input, TextField } from '@mui/material';
import React, { useState } from 'react';

const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = e => {
        if (!image) {
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        fetch('https://obscure-chamber-60035.herokuapp.com/doctors', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                alert('doctor added successfully')
            })
            .catch(error => {
                console.error('Error:', error);
            });

        e.preventDefault();
    }

    return (
        <div>
            <h2>Add a Doctor</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: '50%' }}
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    variant="standard"
                />
                <br />
                <TextField
                    sx={{ width: '50%' }}
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    variant="standard"
                />
                <br />
                <br />
                <Input
                    accept="image/*"
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                />
                <br />
                <br />
                <Button
                    variant="contained"
                    type="submit">
                    Add Doctor
                </Button>
            </form>
        </div>
    );
};

export default AddDoctor;