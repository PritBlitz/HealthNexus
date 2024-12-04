import React, { useState } from "react";
import { Button, Box, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registering necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

const ImageUpload = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [predictionData, setPredictionData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);  // State for controlling dialog visibility
  const [isLoading, setIsLoading] = useState(false);    // State to manage loading state

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

  const handleUpload = async () => {
    if (preview) {
      const formData = new FormData();
      const fileInput = document.querySelector('input[type="file"]');
      formData.append("file", fileInput.files[0]);

      setOpenDialog(true);  // Open the dialog immediately
      setIsLoading(true);   // Show loading spinner

      try {
        const response = await axios.post(
          "http://localhost:5000/predict",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = response.data;
        if (data.category && data.confidence !== undefined) {
          setPredictionData({
            category: data.category,
            confidence: data.confidence,
          });
        } else {
          alert("Error in prediction. Please try again.");
        }
      } catch (error) {
        console.error("Error during prediction:", error);
        alert("Failed to connect to the backend. Please try again later.");
      } finally {
        setIsLoading(false);  // Hide loading spinner when request finishes
      }
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
                "Bearer YOUR_API_KEY",
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

  // Chart data for disease prediction
  const chartData = predictionData
    ? {
        labels: [predictionData.category],
        datasets: [
          {
            label: "Confidence Level",
            data: [predictionData.confidence],
            backgroundColor: predictionData.confidence > 75 ? "green" : predictionData.confidence > 50 ? "yellow" : "red",
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      }
    : null;

  // Close dialog handler
  const handleCloseDialog = () => {
    setOpenDialog(false);
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

      {/* Dialog for Disease Prediction Chart */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ backgroundColor: "#1e88e5", color: "#fff" }}>Prediction Confidence</DialogTitle>
        <DialogContent sx={{ minWidth: "300px", maxWidth: "400px", padding: "20px", backgroundColor: "#f4f4f9" }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
              <CircularProgress />
              <Typography sx={{ marginLeft: 2 }}>Loading prediction...</Typography>
            </Box>
          ) : predictionData && chartData ? (
            <Box>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Disease Category Confidence",
                      font: { size: 16 },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </Box>
          ) : (
            <Typography sx={{ textAlign: "center" }}>
              No data available. Please upload an image to get a prediction.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#1e88e5" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageUpload;
