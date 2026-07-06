"use client";

import Image from "next/image";
import { type HelpArticle } from "@/lib/types/help";
import { HelpArticleActions } from "./help-article-actions";

interface HelpArticleCardProps {
  article: HelpArticle;
  onEdit: (article: HelpArticle) => void;
  onDelete: (article: HelpArticle) => void;
}

export function HelpArticleCard({
  article,
  onEdit,
  onDelete,
}: HelpArticleCardProps) {
  return (
    <div className="group flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-2 bottom-2">
          <HelpArticleActions
            onEdit={() => onEdit(article)}
            onDelete={() => onDelete(article)}
          />
        </div>
      </div>
      <p className="line-clamp-2 text-sm font-semibold text-foreground">
        {article.title}
      </p>
    </div>
  );
}
