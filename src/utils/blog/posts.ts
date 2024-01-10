import { Event, SimplePool, nip19 } from "nostr-tools";
import { cache } from "react";

const pool = new SimplePool();

const relays = ["wss://relay.damus.io"];

type Nevent = `nevent1${string}`;

async function getPostsByAuthor(pubkey: string): Promise<[Event[], string[]]> {
  const events = await pool.querySync(relays, {
    kinds: [30023],
    authors: [pubkey],
  });
  return [events, relays];
}

async function getSinglePosts(nevent: Nevent): Promise<Event | undefined> {
  const {
    data: { id, relays },
  } = nip19.decode(nevent);
  const event = await pool.get(relays || ["wss://relay.damus.io"], {
    ids: [id],
  });
  if (!event) {
    return undefined;
  }
  return event;
}

export function getTagValue(e: Event, tagName: string, position: number) {
  for (let i = 0; i < e.tags.length; i++) {
    if (e.tags[i][0] === tagName) {
      return e.tags[i][position];
    }
  }
}

export const getSinglePost = cache(getSinglePosts);
export const getAllPosts = cache(getPostsByAuthor);

export const authorData = {
  content: {
    name: "egge",
    nip05: "egge@getcurrent.io",
    about:
      "Building current; a nostr + bitcoin client! https://app.getcurrent.io 💜⚡️🧡",
    picture: "https://i.current.fyi/ddf03aca85ade039/profile/avatar_68029.png",
    lud16: "egge@getcurrent.io",
  },
  created_at: 1693236363,
  id: "d8958b807a2b7f8e5b204d3c6606d7da87ed5f7b4d4f2acfd493b70402d14912",
  kind: "0",
  pubkey: "ddf03aca85ade039e6742d5bef3df352df199d0d31e22b9858e7eda85cb3bbbe",
  sig: "8ed5b538cb67b02df1c0157f382e5663e0e1704e9b12222822acabe2b69a31b4b8b51d899328391f00b6f667134e541bc8286d39a14a908d1c46e779b3747b5b",
  tags: [],
};
