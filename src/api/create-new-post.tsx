"use client";
import { useMutation } from "@tanstack/react-query";

const useCreateNewPost = () => {
  const createPost = async (post: {
    title: string;
    body: string;
    userId: number;
  }) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: createPost,
  });

  return mutation;
};

export default useCreateNewPost;
