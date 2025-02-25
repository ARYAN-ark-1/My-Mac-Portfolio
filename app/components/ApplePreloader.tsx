'use client'

import React, { useEffect, useState } from 'react';

const OSBootPreloader = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const simulateLoading = async () => {
      for (let i = 0; i <= 100; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust speed of the progress bar
        setProgress(i);
      }
      setLoading(false);
    };

    simulateLoading();
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center z-50">
      {/* Logo */}
      <img
        src="/logo52.svg" // Replace with the actual path to your logo
        alt="My Logo"
        className="w-20 h-20 mb-12" // Adjust size to resemble Mac logo proportions
      />

      {/* Loading bar */}
      <div className="w-3/4 max-w-md bg-gray-800 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-100 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      
    </div>
  );
};

export default OSBootPreloader;
