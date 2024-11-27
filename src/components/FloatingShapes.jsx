import React from 'react';
import { motion } from 'framer-motion';

const floatingShapes = [
  { size: 100, color: '#3db28c', x: -200, y: 100 },
  { size: 150, color: '#1e88e5', x: 300, y: -150 },
  { size: 120, color: '#ffffff', x: -400, y: 200 },
  { size: 90, color: '#3db28c', x: 200, y: 300 },
];

const FloatingShapes = () => {
  return (
    <>
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{
            x: shape.x,
            y: shape.y,
            scale: 0.8,
          }}
          animate={{
            x: [shape.x, shape.x + 50, shape.x],
            y: [shape.y, shape.y - 50, shape.y],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            position: 'absolute',
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            borderRadius: '50%',
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />
      ))}
    </>
  );
};

export default FloatingShapes;
