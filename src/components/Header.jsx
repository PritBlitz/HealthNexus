import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.div initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #3db28c, #1e88e5)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              color: '#fff',
              fontWeight: 'bold',
              letterSpacing: '1.2px',
            }}
          >
            HEALTHNEXUS
          </Typography>
          <Box>
            <Button sx={{ color: '#fff', mx: 1 }}>Home</Button>
            <Button sx={{ color: '#fff', mx: 1 }}>About</Button>
            <Button sx={{ color: '#fff', mx: 1 }}>Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;
