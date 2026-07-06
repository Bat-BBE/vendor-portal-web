"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
}

export function DeleteArticleDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
}: DeleteArticleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Устгах уу?</DialogTitle>
          <DialogDescription>
            {title ? `"${title}"` : "Энэ"} бичлэгийг устгахдаа итгэлтэй байна
            уу? Энэ үйлдлийг буцаах боломжгүй.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Болих
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Устгах
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
