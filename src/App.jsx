import React, { useState } from "react";
import SplinePage from "./pages/SplinePage";
import UploadPage from "./pages/UploadPage";

const App = () => {
  const [showUploadPage, setShowUploadPage] = useState(false);

  const handleScreenClick = () => {
    setShowUploadPage(true);
  };

  return (
    <>
      {showUploadPage ? (
        <UploadPage />
      ) : (
        <SplinePage onScreenClick={handleScreenClick} />
      )}
    </>
  );
};

export default App;
