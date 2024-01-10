import { authorData, getSinglePost, getTagValue } from "@/utils/blog/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import ShareButtons from "./ShareButtons";

const components = {
  h1: (props: any) => (
    <h1 {...props} className="text-4xl text-white my-2">
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2 {...props} className="text-4xl text-white my-2">
      {props.children}
    </h2>
  ),
  strong: (props: any) => (
    <strong {...props} className="font-bold">
      {props.children}
    </strong>
  ),
  p: (props: any) => (
    <p {...props} className="my-1">
      {props.children}
    </p>
  ),
  blockquote: (props: any) => (
    <blockquote {...props} className="italic !text-zinc-400">
      {props.children}
    </blockquote>
  ),
  code: (props: any) => (
    <span {...props} className="italic bg-zinc-900 p-1 rounded inline-block">
      {props.children}
    </span>
  ),
  pre: (props: any) => (
    <pre className="overflow-x-scroll p-2 bg-zinc-900 rounded my-2">
      <code {...props} className="text-zinc-200 font-mono">
        {props.children}
      </code>
    </pre>
  ),
};

function parseContent(content: string) {
  const pieces = [];
  const lines = content.split("\n");
  const h2s = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      h2s.push({ h2: lines[i], line: i });
    }
  }
  if (h2s.length > 2) {
    const firstPart = lines.slice(0, h2s[1].line);
    const secondPart = lines.slice(h2s[1].line);
    pieces.push(firstPart);
    pieces.push(secondPart);
  }
  return pieces;
}

type BlogPostProps = {
  nevent: `nevent1${string}`;
};

async function BlogPost({ nevent }: BlogPostProps) {
  const event = await getSinglePost(nevent);
  if (!event || event.pubkey !== authorData.pubkey) {
    notFound();
  }

  const parts = parseContent(event.content);

  const title = getTagValue(event, "title", 1);
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-4 max-w-4xl">
        <main className="p-4 bg-zinc-800 lg:m-4 text-white lg:col-span-3">
          <h1 className="text-4xl border-b-2 border-white pb-2 mb-2">
            {title}
          </h1>
          {parts.map((part, i) => {
            if (i === 1) {
              return (
                <>
                  <MDXRemote
                    source={part.join("\n")}
                    components={components}
                    key={i}
                  />
                </>
              );
            } else {
              return (
                <MDXRemote
                  source={part.join("\n")}
                  components={components}
                  key={i}
                />
              );
            }
          })}
        </main>
        <div className="lg:order-first lg:m-4 lg:mr-0 flex flex-col gap-4">
          <div className="flex flex-col bg-zinc-800 items-center p-4 rounded gap-2">
            <div className="w-24 h-24 relative">
              <Image
                src={authorData.content.picture}
                fill
                style={{ borderRadius: "1rem" }}
                alt="Image of Jibun AI author Starbuilder"
              />
            </div>
            <p className="text-white">{authorData.content.name}</p>
            <p className="text-center text-xs text-zinc-400 italic">
              {authorData.content.about}
            </p>
          </div>
          <div className="flex flex-col bg-zinc-800 items-center p-4 rounded">
            <p className="text-white">Share this post</p>
            <ShareButtons nevent={nevent} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
