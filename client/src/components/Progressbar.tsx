import React from "react";

export const Progressbar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        backgroundColor: "#caf0f8",
        borderRadius: "10px",
        /* (height of inner div) / 2 + padding */
        padding: "3px",
        width: '500px'
      }}
    >
      <div
        style={{
          backgroundColor: "#48cae4",
          width: `${progress}%`,
          color: '#caf0f8',
          height: "20px",
          borderRadius: "10px",
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {progress} %
      </div>
    </div>
  );
};
