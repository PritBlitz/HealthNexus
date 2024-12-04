import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageUpload from "../components/ImageUpload";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const UploadPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUpload = (image) => {
    setUploadedImage(image);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative", 
        overflow: "hidden",
      }}
    >
      {/* Background Pulse Animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none", 
        }}
      >
        {/* Pulse Circles */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(0, 255, 85, 0.2)",
            animation: "pulseAnimation 3s infinite ease-out",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            background: "rgba(0, 255, 85, 0.4)",
            animation: "pulseAnimation 4s infinite ease-out",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: "rgba(0, 255, 85, 0.6)",
            animation: "pulseAnimation 5s infinite ease-out",
          }}
        />
      </Box>

      <Header />

      <Box
        sx={{
          textAlign: "center",
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
              color: "#ffffff",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "2.5rem",
              lineHeight: "1.5",
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)",
              letterSpacing: "2px",
            }}
          >
            Welcome to HealthNexus
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#ffffff",
              fontFamily: "'Lato', sans-serif",
              fontSize: "1.1rem",
              mt: 3,
              lineHeight: "1.8",
              maxWidth: "800px",
              margin: "auto",
              textAlign: "center",
              fontStyle: "italic",
              fontWeight: "300",
              letterSpacing: "1px",
            }}
          >
            HealthNexus is built on cutting-edge technology designed to help
            detect early health issues, empowering individuals to take proactive
            steps toward maintaining a healthier lifestyle. With easy-to-use
            tools and real-time health insights, we aim to provide an intuitive,
            modern solution for everyday health monitoring.
          </Typography>
        </motion.div>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
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
                color: "#006400",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Your Uploaded Image
            </Typography>
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "10px",
                border: "3px solid #48c78e",
                boxShadow: "0px 6px 12px rgba(48, 147, 106, 0.5)",
                animation: "pulse 1.5s infinite ease-in-out",
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
