import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const ImageUpload = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (allowedExtensions.includes(ext)) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid image file.');
      }
    }
  };

  const handleUpload = () => {
    if (preview) {
      onUpload(preview);
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Button
          variant="contained"
          component="label"
          sx={{
            background: '#3db28c',
            color: '#fff',
            fontSize: '16px',
            px: 4,
            py: 1,
            mb: 2,
            '&:hover': {
              background: '#1e88e5',
            },
          }}
        >
          Choose Image
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      </motion.div>

      {preview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '1.5rem' }}
        >
          <img
            src={preview}
            alt="Preview"
            style={{
              width: '100%',
              maxWidth: '300px',
              borderRadius: '10px',
              border: '2px solid #3db28c',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
            }}
          />
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Button
          variant="contained"
          onClick={handleUpload}
          sx={{
            background: '#1e88e5',
            color: '#fff',
            fontSize: '16px',
            px: 4,
            py: 1,
            mt: 3,
            '&:hover': {
              background: '#3db28c',
            },
          }}
        >
          Upload
        </Button>
      </motion.div>
    </Box>
  );
};

export default ImageUpload;
