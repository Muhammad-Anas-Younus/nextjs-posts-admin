"use client";
import { IPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

const useGetSinglePost = ({ postId }: { postId: string }) => {
  const getPost = async (): Promise<IPost> => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return res.json();
  };

  const query = useQuery({
    queryKey: ["single_post", postId],
    queryFn: getPost,
  });

  return query;
};

export default useGetSinglePost;
