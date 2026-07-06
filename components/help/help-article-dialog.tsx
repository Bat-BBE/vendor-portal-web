"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { type HelpArticle, type HelpFileType } from "@/lib/types/help";

const FILE_TYPE_OPTIONS: { value: HelpFileType; label: string }[] = [
  { value: "youtube", label: "Youtube бичлэг" },
  { value: "video", label: "Видео бичлэг" },
  { value: "pdf", label: "PDF файл" },
];

interface HelpArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: HelpArticle | null;
  onSave: (data: {
    title: string;
    fileType: HelpFileType;
    url: string;
  }) => void;
}

interface HelpArticleDialogContentProps {
  article: HelpArticle | null;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    title: string;
    fileType: HelpFileType;
    url: string;
  }) => void;
}

export function HelpArticleDialog({
  open,
  onOpenChange,
  article,
  onSave,
}: HelpArticleDialogProps) {
  const formKey = React.useMemo(
    () => `${open ? "open" : "closed"}-${article?.id ?? "new"}`,
    [open, article?.id],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-xl p-0 gap-0">
        <HelpArticleDialogContent
          key={formKey}
          article={article}
          onOpenChange={onOpenChange}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
}

function HelpArticleDialogContent({
  article,
  onOpenChange,
  onSave,
}: HelpArticleDialogContentProps) {
  const [title, setTitle] = React.useState(article?.title ?? "");
  const [fileType, setFileType] = React.useState<HelpFileType>(
    article?.fileType ?? "youtube",
  );
  const [url, setUrl] = React.useState(article?.url ?? "");

  function handleSave() {
    onSave({ title, fileType, url });
    onOpenChange(false);
  }

  const urlLabel =
    fileType === "youtube"
      ? "Video Youtube URL"
      : fileType === "video"
        ? "Видео бичлэг URL"
        : "PDF файлын URL";

  return (
    <>
      <DialogHeader className="border-b p-5">
        <DialogTitle>
          {article ? "Тусламж засварлах" : "Тусламж, Заавар үүсгэх..."}
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Гарчиг</label>
          <Textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Гарчиг бичих..."
            className="min-h-24 resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Файлын төрөл
          </label>
          <Tabs
            value={fileType}
            onValueChange={(v) => setFileType(v as HelpFileType)}
          >
            <TabsList className="grid w-full grid-cols-3 p-1 bg-[#E6EBF1]">
              {FILE_TYPE_OPTIONS.map((opt) => (
                <TabsTrigger
                  key={opt.value}
                  value={opt.value}
                  className="p-2 font-bold data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  {opt.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            {urlLabel}
          </label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Текст бичих..."
          />
        </div>
      </div>

      <DialogFooter className="border-t p-5">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Гарах
        </Button>
        <Button onClick={handleSave} disabled={!title.trim()}>
          Хадгалах
        </Button>
      </DialogFooter>
    </>
  );
}
