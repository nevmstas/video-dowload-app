import React, { useEffect, useRef, useState } from "react";
import { fetchBlob, fs, isImageOrMediaDownload } from "../mocks";

export const useVideoDownload = (sourse: string, saveTo: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cancelRef = useRef<any>(null);
  const [file, setFile] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fs.readFile(saveTo).then((res) => {
      setFile(res);
    });
  });

  useEffect(() => {
    if(isImageOrMediaDownload(JSON.parse(file))){
      cancelRef.current = null;
    }
  }, [file]);

  const onPlay = () => {
    videoRef.current?.play();
  };
  const onPause = () => {
    videoRef.current?.pause();
  };

  const onCancel = () => {
    cancelRef.current?.();
    onRemove();
  };

  const onRemove = () => {
    setFile(null);
    fs.unlink(saveTo);
  };

  const downloadFile = () => {
    const { onProgress, cancel } = fetchBlob(sourse, saveTo);
    cancelRef.current = cancel;
    onProgress((reseived, total) => {
      setProgress(Math.floor((reseived / total) * 100));
    });
  };

  return {
    downloadFile,
    progress,
    onCancel,
    onPause,
    onPlay,
    videoRef,
    file,
    onRemove,
  };
};
