import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageUpload from '../components/ImageUpload';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const UploadPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUpload = (image) => {
    setUploadedImage(image);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // Health-themed gradient background
        background: 'linear-gradient(135deg, #48c78e, #3cb371)', // Health green gradient
        overflow: 'hidden',
      }}
    >
      <Header />

      {/* HealthNexus Description Section */}
      <Box
        sx={{
          textAlign: 'center',
          mt: 5,
          mb: 4,
          px: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#ffffff', // White text for readability
              fontWeight: 'bold',
              fontFamily: "'Poppins', sans-serif", // Modern font
              fontSize: '2.5rem', // Larger size for title
              lineHeight: '1.5',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)', // Subtle text shadow for emphasis
              letterSpacing: '2px', // Spacing to make text more open and readable
            }}
          >
            Welcome to HealthNexus
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#e0f7fa', // Light cyan to match the health theme
              fontFamily: "'Lato', sans-serif", // Lato for the description text
              fontSize: '1.1rem',
              mt: 3,
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: 'auto',
              textAlign: 'center',
              fontStyle: 'italic',
              fontWeight: '300',
              letterSpacing: '1px', // Added letter spacing for improved readability
            }}
          >
            HealthNexus is built on cutting-edge technology designed to help detect early health issues,
            empowering individuals to take proactive steps toward maintaining a healthier lifestyle.
            With easy-to-use tools and real-time health insights, we aim to provide an intuitive, modern solution
            for everyday health monitoring.
          </Typography>
        </motion.div>
      </Box>

      {/* Image Upload Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 4,
        }}
      >
        {uploadedImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                color: '#006400', // Dark green for heading
                fontWeight: 'bold',
                fontFamily: "'Poppins', sans-serif", // Consistent font style
              }}
            >
              Your Uploaded Image
            </Typography>
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '10px',
                border: '3px solid #48c78e', // Green border
                boxShadow: '0px 6px 12px rgba(48, 147, 106, 0.5)', // Greenish shadow
              }}
            />
          </motion.div>
        ) : (
          <ImageUpload onUpload={handleUpload} />
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default UploadPage;
