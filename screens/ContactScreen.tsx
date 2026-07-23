import { contactArticles } from "@/lib/data/contact-articles";
import { ContactArticleCard } from "@/components/help/contact-article-card";

export default function ContactScreen() {
  return (
    <div className="flex flex-col gap-6 px-2">
      {contactArticles.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-16 text-sm text-muted-foreground">
          Илэрц олдсонгүй
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 xl:grid-cols-4">
          {contactArticles.map((article) => (
            <ContactArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
