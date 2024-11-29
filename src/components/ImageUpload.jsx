import React, { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

const ImageUpload = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(ext)) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  const handleUpload = () => {
    if (preview) {
      onUpload(preview);
    } else {
      alert("Please select an image to upload.");
    }
  };

  const handleQuery = async () => {
    if (query.trim()) {
      try {
        const result = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: query }],
            max_tokens: 50,
          },
          {
            headers: {
              Authorization:
                "Bearer sk-proj-THWbKZCbhwzch-bVay5-Omn1KKwfnDxhyE3W3rJAJumA8zMD2CXu1p2AmYJpl7i5T0u3d_-DEFT3BlbkFJLvqrT6vZATG2TfEK64dLAjdF1twF3BCcQs_X8_SjInUPe1gplpCkKYiY9Splt1adQI5YLUFLI",
              "Content-Type": "application/json",
            },
          }
        );
        setResponse(result.data.choices[0].message.content.trim());
      } catch (error) {
        if (error.response?.status === 429) {
          alert("Too many requests. Please try again later.");
        } else {
          console.error(error);
          alert("Failed to fetch response from OpenAI.");
        }
      }
    } else {
      alert("Please enter a query.");
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      {/* Image Upload Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="contained"
          component="label"
          sx={{
            background: "#3db28c",
            color: "#fff",
            fontSize: "16px",
            px: 4,
            py: 1,
            mb: 2,
            "&:hover": {
              background: "#1e88e5",
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
          style={{ marginTop: "1.5rem" }}
        >
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "2px solid #3db28c",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="contained"
          onClick={handleUpload}
          sx={{
            background: "#1e88e5",
            color: "#fff",
            fontSize: "16px",
            px: 4,
            py: 1,
            mt: 3,
            "&:hover": {
              background: "#3db28c",
            },
          }}
        >
          Upload
        </Button>
      </motion.div>

      {/* Chat Box Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Chat with AI
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleQuery}
          sx={{
            background: "#1e88e5",
            color: "#fff",
            fontSize: "16px",
            px: 4,
            py: 1,
            "&:hover": {
              background: "#3db28c",
            },
          }}
        >
          Search
        </Button>
        {response && (
          <Typography
            variant="body1"
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {response}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
