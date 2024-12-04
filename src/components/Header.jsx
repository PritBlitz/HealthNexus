import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Home, Info, ContactMail } from '@mui/icons-material';  // Adding icons for buttons

const Header = () => {
  return (
    <motion.div initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <AppBar
        position="sticky" // Change to sticky
        sx={{
          top: 0, // Ensures the AppBar sticks at the top
          background: 'linear-gradient(135deg, #34b89b, #1f8e70)', // Health-related gradient colors
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)', // Soft shadow for depth
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 20px' }}>
          {/* Left section with logo, if needed */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: 'transparent',
                background: 'linear-gradient(90deg, #e86054, #ff9f43, #35cdaf)', // Vibrant gradient for text
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text', // For Safari
                fontWeight: 'bold',
                letterSpacing: '2px',
                fontFamily: '"Roboto", sans-serif',
                fontSize: '2rem',
                textAlign: 'center',
                animation: 'textGlow 2s ease-in-out infinite', // Text glow animation
              }}
            >
              HEALTHNEXUS
            </Typography>
          </Box>

          {/* Right section for buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              sx={{
                color: '#fff',
                mx: 2,
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#00695c',
                  transform: 'scale(1.05)', // Button scaling effect on hover
                },
              }}
              startIcon={<Home sx={{ fontSize: 20 }} />}
            >
              Home
            </Button>
            <Button
              sx={{
                color: '#fff',
                mx: 2,
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#00695c',
                  transform: 'scale(1.05)',
                },
              }}
              startIcon={<Info sx={{ fontSize: 20 }} />}
            >
              About
            </Button>
            <Button
              sx={{
                color: '#fff',
                mx: 2,
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#00695c',
                  transform: 'scale(1.05)',
                },
              }}
              startIcon={<ContactMail sx={{ fontSize: 20 }} />}
            >
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;
