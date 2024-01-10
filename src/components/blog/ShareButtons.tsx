"use client";

import React, { useEffect, useState } from "react";
import { FaTwitter } from "react-icons/fa";
import NostrButton, { NostrStatus } from "./NostrButton";

type ShareButtonsProps = {
  nevent: `nevent1${string}`;
};

function ShareButtons({ nevent }: ShareButtonsProps) {
  const [nostr, setNostr] = useState<NostrStatus>({
    available: false,
    status: "init",
  });
  useEffect(() => {
    if (window?.nostr) {
      setNostr({ ...nostr, available: true });
    }
  }, []);

  return (
    <div className="flex flex-col w-full gap-2 max-w-sm">
      <a
        className="flex py-2 px-4 duration-1000 bg-cyan-600 hover:bg-red-600 items-center gap-2 justify-center rounded text-white"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          `${process.env["HOSTNAME"]}/blog/${nevent}`,
        )}`}
      >
        <FaTwitter />
        <p>Twitter</p>
      </a>
      {nostr.available ? (
        <NostrButton nostr={nostr} setNostr={setNostr} nevent={nevent} />
      ) : undefined}
    </div>
  );
}

// https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fjibunai.com

export default ShareButtons;
