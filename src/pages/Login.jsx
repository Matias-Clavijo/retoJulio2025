import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Paper,
  InputAdornment
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

          <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: 'action.active' }} />
                    </InputAdornment>
                )
              }}
          />

          <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'action.active' }} />
                    </InputAdornment>
                )
              }}
          />

          <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
          >
            Log in
          </Button>

          <FormControlLabel control={<Checkbox />} label="Remember me" />

          <Typography variant="body2" sx={{ mt: 2 }}>
            Don’t have an account?{' '}
            <Link component={RouterLink} to="/signup" underline="hover">
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Box>
  );
}

export default Login;
