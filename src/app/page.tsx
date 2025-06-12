import { BlogSection } from "@/components/shared/blog-section";
import React from "react";

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-purple-600 font-medium mb-2">Latest posts</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Untitled blog</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Interviews, tips, guides, industry best practices, and news.
        </p>
      </div>
      <BlogSection />
    </div>
  );
};

export default HomePage;
