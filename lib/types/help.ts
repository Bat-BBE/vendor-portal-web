export type HelpFileType = "youtube" | "video" | "pdf";

export interface HelpArticle {
  id: string;
  title: string;
  image: string;
  fileType: HelpFileType;
  url: string;
}
