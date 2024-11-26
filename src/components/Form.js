import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await axios.post("https://api.example.com/submit", formData);
    //   console.log("Response:", response.data);
    //   alert("Form submitted successfully!");
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   alert("Failed to submit the form.");
    // }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" sx={{ marginBottom: 4 }}>
        Contact Us
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          type="email"
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  );
}
