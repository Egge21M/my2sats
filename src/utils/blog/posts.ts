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
  const relayList =
    relays && relays.length > 0 ? relays : ["wss://relay.damus.io"];
  const event = await pool.get(
    relayList,
    {
      ids: [id],
    },
    { maxWait: 2500 },
  );
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

export function getTagValues(e: Event, tagName: string, position: number) {
  const tagValues: string[] = [];
  for (let i = 0; i < e.tags.length; i++) {
    if (e.tags[i][0] === tagName) {
      tagValues.push(e.tags[1][position]);
    }
  }
  return tagValues.length > 0 ? tagValues : undefined;
}

export function getPostMetadata(e: Event) {
  const postMetadata: {
    image?: string;
    title?: string;
    summary?: string;
    hashtags?: string[];
  } = {};
  const image = getTagValue(e, "image", 1);
  const title = getTagValue(e, "title", 1);
  const summary = getTagValue(e, "summary", 1);
  const hashtags = getTagValues(e, "t", 1);
  if (image) {
    postMetadata.image = image;
  }
  if (title) {
    postMetadata.title = title;
  }
  if (summary) {
    postMetadata.summary = summary;
  }
  if (hashtags) {
    postMetadata.hashtags = hashtags;
  }
  return postMetadata;
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
