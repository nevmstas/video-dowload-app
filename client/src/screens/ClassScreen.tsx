import React from "react";
import { useQuery } from "@apollo/client";
import {
  ContentImage,
  TeacherImage,
  Media,
  isImageOrMediaDownload,
} from "../mocks";
import {
  classScreenQuery,
  ClassScreenQuery,
  ClassScreenQueryVariables,
} from "../graphql";
import {
  ErrorMessage,
  Loading,
  CenterContents,
  Progressbar,
} from "../components";
import { useVideoDownload } from "../hooks/useVideoDownload";

export interface ClassScreenProps {
  id: string;
}

const getClassSaveDestination = (id: string) => `classes/${id}`

export const ClassScreen: React.FC<ClassScreenProps> = ({ id }) => {
  const { data, error, loading } = useQuery<
    ClassScreenQuery,
    ClassScreenQueryVariables
  >(classScreenQuery, {
    variables: { id },
  });

  const class_ = data?.Class;
  
  const {
    onPlay,
    onPause,
    onCancel,
    videoRef,
    progress,
    file,
    downloadFile,
    onRemove,
  } = useVideoDownload(class_?.media_download!, getClassSaveDestination(id.toString()));

  const isLoading = 0 < progress && progress < 100

  if (loading) return <Loading />;
  if (error) return <ErrorMessage msg={JSON.stringify(error)} />;
  if (!class_) return <ErrorMessage msg="Missing class data" />;

  return (
    <>
      <CenterContents>
        <h1 style={{ margin: 0 }}>Class</h1>
        <h4>{class_.title}</h4>
      </CenterContents>
      <ContentImage src={class_.no_text_image.processed_url} />
      <TeacherImage src={class_.teacher.image.processed_url} />
      <Media src={class_.media_source} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          marginBottom: "10px",
        }}
      >
        <video className="video-carousel-card-video" ref={videoRef}>
          <source src={class_.media_download} type="video/mp4" />
        </video>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onPlay}>play</button>
          <button onClick={onPause}>pause</button>
        </div>
      </div>

      {isLoading && isImageOrMediaDownload(JSON.parse(file)) && <Progressbar progress={progress} />}
      {isLoading && isImageOrMediaDownload(JSON.parse(file)) ? (
        <button onClick={onCancel}>cancel</button>
      ) : isImageOrMediaDownload(JSON.parse(file)) ? (
        <button onClick={onRemove}>remove</button>
      ) : null}

      {!isImageOrMediaDownload(JSON.parse(file)) ? (
        <button onClick={downloadFile}>download</button>
      ) : null}
    </>
  );
};
