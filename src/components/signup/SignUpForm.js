import React from 'react'
import api from '../../api/axiosConfig'
import { useState } from 'react';
import { TextField, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Snackbar } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import MyButton from '../MyButton';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        name: '',
        phone: '',
        email: ''
    });
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.password || !formData.name || !formData.phone || !formData.email) {
            setMessage('Fields cannot be empty. Please fill them');
            setOpen(true);
            return;
        }
        try {
            const response = await api.post('/register', formData);
            if (response.data === "") {
                setMessage('Username already exists');
                setOpen(true);
            } else {
                console.log(response.data);
                setMessage('Successfully Registered!... Redirecting to HomePage');
                setOpen(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000)
            }
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
            />
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="UserName"
                    variant="outlined"
                    fullWidth
                    required
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                />
                <FormControl variant="outlined" required>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>


                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <MyButton text="Register" type="submit" />
            </Box>
        </div>
    )
}

export default SignUpForm