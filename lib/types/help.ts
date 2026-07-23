export type HelpFileType = "youtube" | "video" | "pdf";

export interface HelpArticle {
  id: string;
  title: string;
  image: string;
  fileType: HelpFileType;
  url: string;
}

export interface ContactArticle {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
}
