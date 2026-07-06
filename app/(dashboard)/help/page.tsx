"use client";

import * as React from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpArticleCard } from "@/components/help/help-article-card";
import { HelpArticleDialog } from "@/components/help/help-article-dialog";
import { DeleteArticleDialog } from "@/components/help/delete-article-dialog";
import { helpArticles as initialArticles } from "@/lib/data/help-articles";
import { type HelpArticle, type HelpFileType } from "@/lib/types/help";

const PAGE_SIZE = 8;

export default function HelpPage() {
  const [articles, setArticles] =
    React.useState<HelpArticle[]>(initialArticles);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingArticle, setEditingArticle] =
    React.useState<HelpArticle | null>(null);

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deletingArticle, setDeletingArticle] =
    React.useState<HelpArticle | null>(null);

  const filtered = React.useMemo(
    () =>
      articles.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [articles, search],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openCreateDialog() {
    setEditingArticle(null);
    setDialogOpen(true);
  }

  function openEditDialog(article: HelpArticle) {
    setEditingArticle(article);
    setDialogOpen(true);
  }

  function handleSave(data: {
    title: string;
    fileType: HelpFileType;
    url: string;
  }) {
    if (editingArticle) {
      setArticles((prev) =>
        prev.map((a) => (a.id === editingArticle.id ? { ...a, ...data } : a)),
      );
    } else {
      setArticles((prev) => [
        {
          id: crypto.randomUUID(),
          image: "/assets/help/default-thumbnail.jpg",
          ...data,
        },
        ...prev,
      ]);
    }
  }

  function openDeleteDialog(article: HelpArticle) {
    setDeletingArticle(article);
    setDeleteOpen(true);
  }

  function handleDeleteConfirm() {
    if (deletingArticle) {
      setArticles((prev) => prev.filter((a) => a.id !== deletingArticle.id));
    }
    setDeleteOpen(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Хайх"
            className="pl-9"
          />
        </div>
        <Button
          onClick={openCreateDialog}
          type="submit"
          variant="brandSecondary"
          className="gap-[8px] px-6 py-5 text-[13px]"
        >
          Бичлэг нэмэх
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {paginated.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-16 text-sm text-muted-foreground">
          Илэрц олдсонгүй
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-4">
          {paginated.map((article) => (
            <HelpArticleCard
              key={article.id}
              article={article}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Өмнөх
          </Button>
          <span className="text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Дараах
          </Button>
        </div>
      )}

      <HelpArticleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        article={editingArticle}
        onSave={handleSave}
      />

      <DeleteArticleDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title={deletingArticle?.title}
      />
    </div>
  );
}
