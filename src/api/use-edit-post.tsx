"use client";
import { useMutation } from "@tanstack/react-query";

const useEditPost = () => {
  const editPost = async (body: {
    title: string;
    body: string;
    userId: number;
    id: number;
  }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${body.id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: editPost,
  });

  return mutation;
};

export default useEditPost;
