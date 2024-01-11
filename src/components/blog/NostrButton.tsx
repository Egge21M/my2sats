import { SimplePool } from "nostr-tools";
import React from "react";
import { GiOstrich } from "react-icons/gi";

export type NostrStatus = {
  available: boolean;
  status: "error" | "successfull" | "init" | "loading";
};

type NostrButtonProps = {
  nostr: NostrStatus;
  setNostr: React.Dispatch<React.SetStateAction<NostrStatus>>;
  nevent: `nevent1${string}`;
};

function NostrButton({ nostr, setNostr, nevent }: NostrButtonProps) {
  let buttonColor;
  let buttonHoverColor;
  let buttonText;
  if (nostr.status === "error") {
    buttonColor = "bg-red-500";
    buttonHoverColor = "bg-red-600";
    buttonText = "Error...";
  } else if (nostr.status === "successfull") {
    buttonColor = "bg-green-500";
    buttonHoverColor = "bg-green-600";
    buttonText = "Success!";
  } else {
    buttonColor = "bg-purple-500";
    buttonHoverColor = "bg-purple-600";
    buttonText = "nostr";
  }
  if (nostr.status === "loading") {
    buttonText === "Loading...";
  }

  async function clickHandler() {
    setNostr({ ...nostr, status: "loading" });
    const pool = new SimplePool();
    let relayList: string[] = [];
    try {
      const event = await window.nostr.signEvent({
        created_at: Math.floor(Date.now() / 1000),
        kind: 1,
        tags: [],
        content: `Check out this post! ${process.env["NEXT_PUBLIC_HOSTNAME"]}/blog/${nevent}`,
      });
      try {
        const relays = await window.nostr.getRelays();
        if (relays) {
          Object.keys(relays).map((relayUrl) => {
            if (relays[relayUrl].write === true) {
              relayList.push(relayUrl);
            }
          });
        } else {
          relayList = ["wss://relay.damus.io"];
        }
      } catch (e) {
        relayList = ["wss://relay.damus.io"];
      }
      const pubs = await Promise.allSettled(pool.publish(relayList, event));
      const successes = pubs.filter((res) => res.status === "fulfilled");
      if (successes.length === 0) {
        throw new Error("All pubs failed");
      }
      setNostr({ available: true, status: "successfull" });
      pool.close(relayList);
    } catch (e) {
      pool.close(relayList);
      setNostr({ available: true, status: "error" });
    }
  }

  return (
    <button
      className={`flex py-2 px-4 ${buttonColor} transition-colors duration-1000 items-center gap-2 justify-center rounded text-white hover:${buttonHoverColor}`}
      onClick={clickHandler}
    >
      <GiOstrich />
      <p>{buttonText}</p>
    </button>
  );
}

export default NostrButton;
