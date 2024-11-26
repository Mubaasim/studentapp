import { Button } from '@mui/material'
import React from 'react'

const MyButton = (props) => {
    return (
        <Button
            {...props}
            variant="contained"
            fullWidth
            sx={{
                textTransform: "none",
            }}
        >
            {props.text}
        </Button>
    )
}

export default MyButton