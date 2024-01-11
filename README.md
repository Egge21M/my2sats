# my2sats

---

my2sats is a nostr and Bitcoin powered personal blog.
It is built using NextJS. Most of its content lives on the nostr network
and is getting pulled in at build time.

When building, my2sats will look up selected events on nostr,
parse their markdown content into HTML and use it to build static
blog pages.

Core dependencies are

- NextJS
- nostr-tools
- next-mdx-remote

## Getting Started

To run the dev server:

```sh
npm install
npm run dev
```

NextJS dev server will start and serve the blog on [localhost:3000](http://localhost:3000)
