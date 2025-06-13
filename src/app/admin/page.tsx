"use client";

import useCreateNewPost from "@/api/create-new-post";
import useDeletePost from "@/api/use-delete-post";
import useEditPost from "@/api/use-edit-post";
import useGetAllPosts from "@/api/use-get-all-posts";
import CreatePostDialog from "@/components/shared/create-post-dialog";
import EditPostDialog from "@/components/shared/edit-post-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Loader2, Plus, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface FormData {
  title: string;
  body: string;
  userId: number;
}

export default function PostsPage() {
  const { data: posts, isLoading } = useGetAllPosts();

  const { mutateAsync: createPost } = useCreateNewPost();
  const { mutateAsync: editPost } = useEditPost();
  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeletePost();

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Memoize callbacks to prevent child re-renders
  const handleCreate = useCallback(async (formData: FormData) => {
    await createPost(formData);
  }, []);

  const handleEdit = useCallback(
    async (formData: FormData) => {
      if (!editingPost) return;
      await editPost({
        body: formData.body,
        id: editingPost.id,
        title: formData.title,
        userId: formData.userId,
      });
    },
    [editingPost]
  );

  const handleDelete = useCallback(async (id: number) => {
    await deletePost(id);
    alert("Post deleted successfully!");
  }, []);

  const openEditDialog = useCallback((post: Post) => {
    setEditingPost(post);
    setIsEditDialogOpen(true);
  }, []);

  const openCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
  }, []);

  const handleCloseCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(false);
  }, []);

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false);
    setEditingPost(null);
  }, []);

  // Memoize stripHtml function
  const stripHtml = useMemo(() => {
    return (html: string) => {
      if (typeof window === "undefined") return html;
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Posts Management
          </h1>
          <p className="text-gray-600 mt-1">Manage all blog posts</p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Posts Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 min-w-[60px]">ID</TableHead>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead className="min-w-[250px] hidden md:table-cell">
                  Content
                </TableHead>
                <TableHead className="w-20 min-w-[80px]">User</TableHead>
                <TableHead className="w-24 min-w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.map((post) => (
                <PostRow
                  key={post.id}
                  post={post}
                  onEdit={openEditDialog}
                  onDelete={handleDelete}
                  stripHtml={stripHtml}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Post Dialog */}
      <CreatePostDialog
        isOpen={isCreateDialogOpen}
        onClose={handleCloseCreateDialog}
        onSubmit={handleCreate}
      />

      {/* Edit Post Dialog */}
      <EditPostDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSubmit={handleEdit}
        initialData={editingPost}
      />
    </div>
  );
}

// Memoized PostRow component to prevent unnecessary re-renders
const PostRow = React.memo(
  ({
    post,
    onEdit,
    onDelete,
    stripHtml,
  }: {
    post: Post;
    onEdit: (post: Post) => void;
    onDelete: (id: number) => void;
    stripHtml: (html: string) => string;
  }) => {
    const handleEdit = useCallback(() => {
      onEdit(post);
    }, [post, onEdit]);

    const handleDelete = useCallback(async () => {
      await onDelete(post.id);
    }, [post.id, onDelete]);

    return (
      <TableRow>
        <TableCell className="font-medium">{post.id}</TableCell>
        <TableCell className="max-w-[200px]">
          <div className="truncate pr-2" title={post.title}>
            {post.title}
          </div>
        </TableCell>
        <TableCell className="max-w-[250px] hidden md:table-cell">
          <div className="truncate pr-2" title={stripHtml(post.body)}>
            {stripHtml(post.body)}
          </div>
        </TableCell>
        <TableCell>{post.userId}</TableCell>
        <TableCell>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="w-3 h-3" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TableCell>
      </TableRow>
    );
  }
);
