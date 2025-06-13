"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "./rich-text-editor";
import { Post } from "@/app/admin/page";

interface FormData {
  title: string;
  body: string;
  userId: number;
}

interface EditPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialData: Post | null;
}

export default function EditPostDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: EditPostDialogProps) {
  // Internal state - this prevents parent re-renders
  const [formData, setFormData] = useState<FormData>({
    title: "",
    body: "",
    userId: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        body: "",
        userId: 1,
      });
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(async () => {
    if (!formData.title.trim() || !formData.body.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
      alert("Post edited successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, title: e.target.value }));
    },
    []
  );

  const handleBodyChange = useCallback((content: string) => {
    setFormData((prev) => ({ ...prev, body: content }));
  }, []);

  const handleUserIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        userId: parseInt(e.target.value) || 1,
      }));
    },
    []
  );

  const isValid =
    formData.title.trim().length > 0 && formData.body.trim().length > 0;

  useEffect(() => {
    if (initialData) {
      setFormData({
        body: initialData.body,
        title: initialData.title,
        userId: initialData.userId,
      });
    }
  }, [initialData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Fill in the details below to edit post.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter post title..."
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Content</Label>
            <RichTextEditor
              content={formData.body}
              onChange={handleBodyChange}
              placeholder="Write your post content..."
              editable={!isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              type="number"
              value={formData.userId}
              onChange={handleUserIdChange}
              placeholder="Enter user ID..."
              disabled={isSubmitting}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Editing..." : "Edit Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
