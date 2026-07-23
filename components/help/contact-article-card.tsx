import { type ContactArticle } from "@/lib/types/help";
import { PhoneIcon, MailIcon } from "lucide-react";

interface ContactArticleCardProps {
  article: ContactArticle;
}

export function ContactArticleCard({ article }: ContactArticleCardProps) {
  return (
    <div className="flex flex-col p-4 justify-center items-start gap-5">
      <div className="flex flex-col gap-1 items-start justify-center">
        <p className="line-clamp-2 text-base font-semibold text-foreground">
          {article.name}
        </p>
        <p className="line-clamp-2 text-sm text-foreground-secondary">
          {article.description}
        </p>
      </div>
      <div className="flex flex-col gap-2 items-start justify-center">
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5" />
          <span className="line-clamp-2 text-sm text-foreground">
            {article.phone}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MailIcon className="w-5 h-5" />
          <span className="line-clamp-2 text-sm text-foreground">
            {article.email}
          </span>
        </div>
      </div>
    </div>
  );
}
