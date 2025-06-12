"use client";
import useInfinitePosts from "@/api/use-get-posts"; // Import the new hook
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BlogSection() {
  const {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfinitePosts();

  if (error) {
    return <p>Error loading posts</p>;
  }

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Loader className="animate-spin w-8 h-8" />
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return <p>No Posts Found</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card className="group cursor-pointer border-0 shadow-none hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <Image
                    src={`https://picsum.photos/400/240?random=${post.id}`}
                    alt={post.title}
                    width={400}
                    height={240}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4 px-4">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0 ml-2" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">{post.body}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Loading More Indicator */}
      {isFetchingNextPage && (
        <div className="flex justify-center mb-8">
          <Loader className="animate-spin w-6 h-6" />
          <span className="ml-2 text-gray-600">Loading more posts...</span>
        </div>
      )}

      {/* View All Posts Button */}
      {hasNextPage && (
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "View all posts"}
          </Button>
        </div>
      )}
    </section>
  );
}
