"use client";
import { IPost } from "@/types/post";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetPosts = () => {
  const fetchPosts = async ({ pageParam = 0 }): Promise<IPost[]> => {
    const limit = pageParam === 0 ? 3 : 97;
    const start = pageParam === 0 ? 0 : 3;

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/?_limit=${limit}&_start=${start}`
    );
    return res.json();
  };

  const query = useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // Only allow one more page load (from 3 posts to all posts)
      return allPages.length === 1 ? 1 : undefined;
    },
  });

  return {
    ...query,
    posts: query.data?.pages.flat() || [],
  };
};

export default useGetPosts;
