import React from 'react'
import { Container, Grid2, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MyButton from '../MyButton';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <div>
            <Container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    gap: 2,
                }}
            >

                <Grid2 container spacing={7}>
                    <Grid2 size={12}>
                        <Typography variant="h4" align="center">
                            Student Registration Application
                        </Typography>
                    </Grid2>
                    <Grid2 size={6} align="center">
                        <MyButton text="Register" onClick={handleRegisterClick} />
                    </Grid2>
                    <Grid2 size={6} align="center">
                        <MyButton text="Login" onClick={handleLoginClick}/>
                    </Grid2>


                </Grid2>
            </Container>

        </div>
    )
}

export default Home