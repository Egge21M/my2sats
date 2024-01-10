import { getTagValue } from "@/utils/blog/posts";
import Image from "next/image";
import { Event, nip19 } from "nostr-tools";
import React from "react";

type PostCardProps = {
  event: Event;
  relays: string[];
};
function PostCard({ event, relays }: PostCardProps) {
  const title = getTagValue(event, "title", 1);
  const image = getTagValue(event, "image", 1);
  const summary = getTagValue(event, "summary", 1);
  const url = `/blog/${nip19.neventEncode({ id: event.id, relays })}`;
  return (
    <a href={url} className="flex">
      <div className="flex flex-col p-4 rounded mx-4 bg-zinc-800 max-w-xl shadow-xl justify-between gap-4">
        <div className="h-32 relative rounded">
          {image ? (
            <Image
              src={image}
              fill
              alt="Post thumbnail"
              style={{ objectFit: "cover", borderRadius: "0.25rem" }}
              placeholder="blur"
              blurDataURL="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
            />
          ) : (
            <div className="bg-zinc-700 w-full h-full rounded" />
          )}
        </div>
        <div>
          <p className="text-zinc-700 text-xs">
            {new Date(event.created_at * 1000).toDateString()}
          </p>
          <p className="font-bold text-orange-500 ">{title}</p>
          <p className="line-clamp-5 text-white">{summary}</p>
        </div>
      </div>
    </a>
  );
}

export default PostCard;
