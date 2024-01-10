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
    "ddf03aca85ade039e6742d5bef3df352df199d0d31e22b9858e7eda85cb3bbbe",
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
