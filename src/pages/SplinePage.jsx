import React from "react";
import Spline from "@splinetool/react-spline";
import "../styles/SplinePage.css"; // Add styling here

const SplinePage = ({ onScreenClick }) => {
  return (
    <div onClick={onScreenClick} className="spline-container">
      {/* Left text content */}
      <div className="welcome-text">
        <h1 className="welcome-header">Welcome to</h1>
        <h1 className="animated-title">
          {Array.from("HealthNexus").map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>
              {char}
            </span>
          ))}
        </h1>

        {/* Small line with click instruction */}
        <div className="click-line">Click anywhere on the screen</div>
      </div>

      {/* Spline scene */}
      <div className="spline-scene">
        <Spline scene="https://prod.spline.design/Dz9RCokXvgX1SmOs/scene.splinecode" />
      </div>
    </div>
  );
};

export default SplinePage;
