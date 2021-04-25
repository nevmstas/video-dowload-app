import React, { useRef } from "react";

export const VideoPlayer: React.FC<{ url: string | null }> = ({ url }) => {
  const ref = useRef<HTMLVideoElement>(null);

  const onPlay = () => {
    ref.current?.play();
  };
  const onPause = () => {
    ref.current?.pause();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "500px",
        marginBottom: "10px",
      }}
    >
      {url ? (
        <>
          <video className="video-carousel-card-video" ref={ref}>
            <source src={url} type="video/mp4" />
          </video>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={onPlay}>play</button>
            <button onClick={onPause}>pause</button>
          </div>
        </>
      ) : (
        <span>something went wrong!</span>
      )}
    </div>
  );
};
