import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#2d6a4f', 
        color: '#fff',
        py: 4,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '5px solid #1e4e2b', 
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '1.5',
          letterSpacing: '0.5px',
          mb: 2,
          fontFamily: "'Poppins', sans-serif",
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)', 
        }}
      >
        © 2024 HEALTHNEXUS. Your health, our priority.
      </Typography>

      {/* Social Media Links */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Link
          href="https://facebook.com"
          target="_blank"
          sx={{
            color: '#fff',
            fontSize: '24px',
            transition: 'all 0.3s',
            '&:hover': { color: '#48c78e' }, 
          }}
        >
          <Facebook />
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          sx={{
            color: '#fff',
            fontSize: '24px',
            transition: 'all 0.3s',
            '&:hover': { color: '#48c78e' },
          }}
        >
          <Twitter />
        </Link>
        <Link
          href="https://instagram.com"
          target="_blank"
          sx={{
            color: '#fff',
            fontSize: '24px',
            transition: 'all 0.3s',
            '&:hover': { color: '#48c78e' },
          }}
        >
          <Instagram />
        </Link>
        <Link
          href="https://linkedin.com"
          target="_blank"
          sx={{
            color: '#fff',
            fontSize: '24px',
            transition: 'all 0.3s',
            '&:hover': { color: '#48c78e' },
          }}
        >
          <LinkedIn />
        </Link>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Link
          href="#"
          sx={{
            color: '#fff',
            fontSize: '14px',
            fontWeight: '400',
            textDecoration: 'none',
            transition: 'all 0.3s',
            '&:hover': { color: '#48c78e' },
          }}
        >
          Privacy Policy
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
