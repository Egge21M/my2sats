import BlogPost from "@/components/blog/BlogPost";
import {
  authorData,
  getAllPosts,
  getPostMetadata,
  getSinglePost,
  getTagValue,
} from "@/utils/blog/posts";
import { Metadata } from "next";
import { nip19 } from "nostr-tools";
import React, { Suspense } from "react";

type BlogEntryProps = {
  params: {
    nevent: `nevent1${string}`;
  };
};

export async function generateStaticParams() {
  const [events, relays] = await getAllPosts(authorData.pubkey);
  return events.map((event) => ({
    nevent: nip19.neventEncode({ id: event.id, relays }),
  }));
}

export async function generateMetadata({
  params,
}: BlogEntryProps): Promise<Metadata> {
  const event = await getSinglePost(params.nevent);
  if (!event || event.pubkey !== authorData.pubkey) {
    return {};
  }
  const postMetadata = getPostMetadata(event);
  return {
    title: postMetadata.title,
    description: postMetadata.summary,
    keywords: postMetadata.hashtags,
    openGraph: {
      title: postMetadata.title,
      images: [postMetadata.image || ""],
    },
    twitter: {
      title: postMetadata.title,
      images: [postMetadata.image || ""],
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
