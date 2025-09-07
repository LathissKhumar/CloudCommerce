import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', color: 'error.main', py: 6 }}>
      <Typography variant="h3" color="error" gutterBottom>404 - Page Not Found</Typography>
      <Typography>The page you are looking for does not exist.</Typography>
    </Box>
  );
}

export default NotFound;
