"use client";
import { useMutation } from "@tanstack/react-query";

const useDeletePost = () => {
  const deletePost = async (id: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: deletePost,
  });

  return mutation;
};

export default useDeletePost;
