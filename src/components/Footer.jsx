import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#004d40', // Darker green for a more vibrant health-related theme
        color: '#fff',
        py: 6,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '5px solid #1b5e20', // Slightly darker border for contrast
        position: 'relative',
      }}
    >
      {/* Footer Text */}
      <Typography
        variant="body2"
        sx={{
          fontSize: '18px', // Slightly larger text for readability
          fontWeight: '500',
          lineHeight: '1.6',
          letterSpacing: '0.8px',
          mb: 3, // Increased margin for better spacing
          fontFamily: "'Poppins', sans-serif",
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // More noticeable shadow for text
        }}
      >
        © 2024 HEALTHNEXUS. Your health, our priority.
      </Typography>

      {/* Social Media Links */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
        <Link
          href="https://facebook.com"
          target="_blank"
          sx={{
            color: '#fff',
            fontSize: '28px', // Slightly larger icons for better visibility
            transition: 'all 0.3s ease',
            '&:hover': { color: '#81c784' }, // Soft green hover effect
            '&:active': { color: '#388e3c' }, // Active color for buttons
          }}
        >
          <Facebook />
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          sx={{
            color: '#fff',
            fontSize: '28px',
            transition: 'all 0.3s ease',
            '&:hover': { color: '#81c784' },
            '&:active': { color: '#388e3c' },
          }}
        >
          <Twitter />
        </Link>
        <Link
          href="https://instagram.com"
          target="_blank"
          sx={{
            color: '#fff',
            fontSize: '28px',
            transition: 'all 0.3s ease',
            '&:hover': { color: '#81c784' },
            '&:active': { color: '#388e3c' },
          }}
        >
          <Instagram />
        </Link>
        <Link
          href="https://linkedin.com"
          target="_blank"
          sx={{
            color: '#fff',
            fontSize: '28px',
            transition: 'all 0.3s ease',
            '&:hover': { color: '#81c784' },
            '&:active': { color: '#388e3c' },
          }}
        >
          <LinkedIn />
        </Link>
      </Box>

      {/* Privacy Policy Link */}
      <Box sx={{ mt: 2 }}>
        <Link
          href="#"
          sx={{
            color: '#fff',
            fontSize: '16px',
            fontWeight: '400',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            '&:hover': { color: '#81c784' }, // Green hover effect for links
          }}
        >
          Privacy Policy
        </Link>
      </Box>

      {/* Back to top button */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer',
          backgroundColor: '#388e3c',
          borderRadius: '50%',
          padding: '10px',
          '&:hover': { backgroundColor: '#81c784' },
        }}
      >
        <Typography variant="body2" sx={{ color: '#fff', fontSize: '14px' }}>
          ↑
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
