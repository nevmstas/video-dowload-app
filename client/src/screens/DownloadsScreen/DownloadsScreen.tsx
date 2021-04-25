import React from "react";
import { VideoPlayer } from "../../components";
import { useDownloads } from "../../hooks/useDownloads";
// import { DownloadCard } from "./DownloadCard";

export const DownloadsScreen: React.FC = () => {
  const classes = useDownloads("classes");

  // const articles = useDownloads('articles')
  // const meditations = useDownloads('mediations')

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Downloads</h1>
      <h4>Downloaded Classes</h4>
      <div style={{ display: "flex" }}>
        {classes.map((cl) => (
          <VideoPlayer url={JSON.parse(cl!).originalSource} />
        ))}
      </div>
      {/* .map(d => <DownloadCard {...d} />) */}

      <h4>Downloaded Meditations</h4>
      {/* .map(d => <DownloadCard {...d} />) */}

      <h4>Downloaded Articles</h4>
      {/* .map(d => <DownloadCard {...d} />) */}

      <h4>Downloaded Courses</h4>
      {/* .map(d => <DownloadCard {...d} />) */}
    </>
  );
};
