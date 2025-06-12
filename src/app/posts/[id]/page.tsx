"use client";
import useGetSinglePost from "@/api/use-get-single-post";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, Loader, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams<{ id: string }>();

  const { data: post, isLoading } = useGetSinglePost({ postId: params.id });

  const imageUrl = `https://picsum.photos/seed/${post?.id}/1200/600`;

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Loader className="animate-spin w-8 h-8" />
        </div>
      </section>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Back to blog link */}
      <div className="mb-8">
        <Link
          href="/posts"
          className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to blog
        </Link>
      </div>

      {/* Post header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post?.title}
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center">
            {/* <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar> */}
            {/* <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                <span className="mr-3">{formattedDate}</span>
                <Clock className="w-3 h-3 mr-1" />
                <span>{readingTime} min read</span>
              </div>
            </div> */}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-gray-600">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Featured image */}
      <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={post?.title || ""}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Post content */}
      <div className="prose prose-lg max-w-none">
        <p className="mb-6 text-gray-700 leading-relaxed">{post?.body}</p>
      </div>

      {/* Author bio */}
      <div className="mt-12 pt-10 border-t border-gray-200">
        <div className="flex items-center">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              Written by John Doe
            </h3>
            <p className="text-gray-600 mt-1">
              Content creator and industry expert with over 5 years of
              experience in writing about technology and design.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
