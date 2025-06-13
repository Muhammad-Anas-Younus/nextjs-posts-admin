"use client";
import { IPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

const useGetAllPosts = () => {
  const fetchPosts = async (): Promise<IPost[]> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    return res.json();
  };

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return query;
};

export default useGetAllPosts;
