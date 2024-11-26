import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig'
import MyAppBar from './MyAppBar'
import { TextField, Box, Paper, Container, Snackbar } from '@mui/material'
import MyButton from '../MyButton';
import { useNavigate } from 'react-router-dom'

const UserDetails = () => {
  const [student, setStudent] = useState();
  const [Edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: ''
  });
  const userName = localStorage.getItem('userName');;


  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await api.get(`/userdetails/${userName}`);
        console.log(response.data);
        setStudent(response.data);
        setFormData({
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
          email: response.data.email
        });
      } catch (error) {
        console.error('Error fetching student details:', error);
        navigate('/');
      }
    }
    fetchStudentDetails();
  }, [navigate, userName]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = { ...formData };
    try {
      const response = await api.post('/update', formDataToSend);
      console.log(response.data);
      setMessage('Successfully Updated');
      setOpen(true);
      setEdit(!Edit);
      navigate('/userdetails');
    } catch (error) {
      console.error('Updation error:', error.response?.data || error.message);
      alert('Updation failed!');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setEdit(!Edit);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MyAppBar userName={userName} />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            width: "100%",
          }}
        >
          {student &&
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
                value={userName}
                onChange={handleChange}
                disabled
              />


              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!Edit}
              />
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!Edit}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!Edit}
              />

              <MyButton text={Edit ? "Cancel" : "Edit"} onClick={handleEditClick} />
              <MyButton text="Save" type="submit" disabled={!Edit} />
            </Box>
          }
        </Paper>
      </Container>

    </div>
  )
}

export default UserDetails