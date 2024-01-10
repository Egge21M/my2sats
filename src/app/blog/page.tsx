import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/utils/blog/posts";
import React, { Suspense } from "react";

export const revalidate = 3600;

async function Blog() {
  const [events, relays] = await getAllPosts(
    "ddf03aca85ade039e6742d5bef3df352df199d0d31e22b9858e7eda85cb3bbbe",
  );
  return (
    <div className=" flex-1 flex flex-col justify-center items-center ">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-200 my-12">
        Blog Posts
      </h2>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid-cols-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            return (
              <div className="opacity-0 animate-fade-in " key={event.id}>
                <PostCard event={event} key={event.id} relays={relays} />
              </div>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
}

export default Blog;
