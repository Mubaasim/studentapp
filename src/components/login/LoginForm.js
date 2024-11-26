import React from 'react'
import api from '../../api/axiosConfig'
import { useState } from 'react';
import { TextField, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Snackbar } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import MyButton from '../MyButton'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.password) {
            setMessage('Fields cannot be empty. Please fill them');
            setOpen(true);
            return;
        }
        try {
            const response = await api.post('/login', formData);
            console.log(response.data);
            if (response.data === "") {
                setMessage("Invalid username or password");
                setOpen(true);
            }
            else {
                setMessage('Successfully Logged In');
                setOpen(true);
                localStorage.setItem("userName",response.data);
                setTimeout(() => {
                    navigate('/userdetails');
                }, 1000)
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
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
                <MyButton text="Login" type="submit" />
            </Box>
        </div>
    )
}

export default LoginForm