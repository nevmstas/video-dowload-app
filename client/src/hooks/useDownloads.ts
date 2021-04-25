import { useEffect, useState } from "react";
import { fs } from "../mocks";

export const useDownloads = (subject: string) => {
  const [downloads, setDownloads] = useState<(string | null)[]>([]);

  const getDownladKeys = async () => {
    return (await fs.ls()).filter(key => key.startsWith(subject))
  }

  const getDownloads = async () => {
    const promises = (await  getDownladKeys()).map(key => fs.readFile(key))
    setDownloads((await Promise.all(promises)))
  }

  useEffect(() => {
    getDownloads()
  }, [])

  return downloads
};
