import React from "react";
import { useQuery } from "@apollo/client";
import { ContentImage, TeacherImage, Media } from "../mocks";
import {
  articleScreenQuery,
  ArticleScreenQuery,
  ArticleScreenQueryVariables,
} from "../graphql";
import { ErrorMessage, Loading, CenterContents, Progressbar } from "../components";
import { useVideoDownload } from "../hooks";

export interface ArticleScreenProps {
  id: string;
}

export const ArticleScreen: React.FC<ArticleScreenProps> = ({ id }) => {
  const { data, error, loading } = useQuery<
    ArticleScreenQuery,
    ArticleScreenQueryVariables
  >(articleScreenQuery, {
    variables: { id },
  });

  const article = data?.Article;
  console.log(article)

  // const {downloadFile, progress} = useVideoDownload(article?.media_download!, `Article ${id}`)

  if (loading) return <Loading />;
  if (error) return <ErrorMessage msg={JSON.stringify(error)} />;
  if (!article) return <ErrorMessage msg="Missing article data" />;

  return (
    <>
      <CenterContents>
        <h1 style={{ textAlign: "center" }}>Article</h1>
        <h4 style={{ textAlign: "center" }}>{article.title}</h4>
      </CenterContents>
      <ContentImage src={article.no_text_image.processed_url} />
      <TeacherImage src={article.teacher.image.processed_url} />
      {article.media_source && <Media src={article.media_source} />}
    </>
  );
};
