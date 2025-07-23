import React from 'react';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Paper
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

function Login() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 320 }}>
        <Typography variant="h5" gutterBottom>
          Log In
        </Typography>

        <Box display="flex" alignItems="flex-end" mb={2}>
          <AccountCircle sx={{ color: 'action.active', mr: 1 }} />
          <TextField fullWidth label="Username" variant="outlined" />
        </Box>

        <Box display="flex" alignItems="flex-end" mb={2}>
          <Lock sx={{ color: 'action.active', mr: 1 }} />
          <TextField fullWidth label="Password" type="password" variant="outlined" />
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 1, mb: 1 }}
        >
          Log in
        </Button>

        <FormControlLabel control={<Checkbox />} label="Remember me" />

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don´t have an account?{' '}
          <Link href="#" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
