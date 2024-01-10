import BlogPost from "@/components/blog/BlogPost";
import { getAllPosts, getSinglePost, getTagValue } from "@/utils/blog/posts";
import { Metadata } from "next";
import { nip19 } from "nostr-tools";
import React, { Suspense } from "react";

type BlogEntryProps = {
  params: {
    nevent: `nevent1${string}`;
  };
};

export async function generateStaticParams() {
  const [events, relays] = await getAllPosts(
    "d8a2c33f2e2ff3a9d4ff2a5593f3d5a59e9167fa5ded063d0e49891776611e0c",
  );
  return events.map((event) => ({
    nevent: nip19.neventEncode({ id: event.id, relays }),
  }));
}

export async function generateMetadata({
  params,
}: BlogEntryProps): Promise<Metadata> {
  const event = await getSinglePost(params.nevent);
  if (!event) {
    return {};
  }
  const title = getTagValue(event, "title", 1);
  const image = getTagValue(event, "image", 1);
  return {
    title: title,
    openGraph: {
      title,
      images: [image ? image : ""],
    },
    twitter: {
      title,
      images: [image ? image : ""],
    },
  };
}

async function BlogEntry({ params }: BlogEntryProps) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BlogPost nevent={params.nevent} />
    </Suspense>
  );
}

export default BlogEntry;
