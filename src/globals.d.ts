import { Event } from "nostr-tools";

type RelayObject = {
  [relayUrl: string]: {
    read: boolean;
    write: boolean;
  };
};

type EventTemplate = {
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
};

declare global {
  interface Window {
    nostr: {
      signEvent: (event: EventTemplate) => Promise<Event>;
      getRelays: () => Promise<RelayObject>;
    };
  }
}
