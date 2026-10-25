# Boba Bash Greater Noida: ship your project to your Boba Pass

Tap your card on a phone, or scan its QR code: it opens **your own page**. Right now that's a placeholder. Replace it with what you built today.

## 1. Find your number

Your card ID is on the front, like **grn07**. Your folder is the digits after grn: **07**.

- Your files go in the folder **sites/07/**
- Your page goes live at **bobabash.github.io/sites/07/**

## 2. Fork the repo

Open [github.com/bobabash/bobabash.github.io](https://github.com/bobabash/bobabash.github.io) and click **Fork** (top right). No GitHub account? [Make one](https://github.com/signup), it takes a minute.

## 3. Replace the placeholder

Your folder already has an **index.html**: that's the "waiting for its owner" page. **Replace its contents** with your site. Keep the name **index.html**, it's the page people land on.

**Plain HTML / CSS / JS**

- In the browser: open `sites/07/index.html` in your fork, click the ✏️ pencil, paste your page, **Commit changes**.
- Add more files with **Add file → Upload files** while inside `sites/07/`.
- Link files relatively: `./style.css`, `./script.js`, `./img/me.png`. Not `/style.css`.

**React, Vite, Svelte, Vue or anything with a build step**

Ship the **built files**, not the source:

1. Make asset paths relative. Vite: add `base: './'` to `vite.config.js`. Create React App: add `"homepage": "."` to `package.json`.
2. Run the build (`npm run build`).
3. Put everything inside `dist/` (or `build/`) into `sites/07/`. The `index.html` from the build replaces the placeholder.

Next.js: use `output: 'export'` with `basePath: '/sites/07'`, then ship the `out/` folder.

**Already hosted somewhere else?** (Vercel, Netlify, Replit, your own domain) You don't need a PR. Log in at [cards.boba-bash.xyz/me](https://cards.boba-bash.xyz/me), go to **My card** and pick **Any link I want**.

## 4. Open a pull request

On your fork's page click **Contribute → Open pull request**. Title it:

```
grn07: Your Name
```

## 5. Merged by itself

A bot checks your pull request. If everything is inside your folder **and** your GitHub username is saved in your dashboard ([cards.boba-bash.xyz/me](https://cards.boba-bash.xyz/me) → Account), it merges by itself and tells you in a comment. Otherwise it says what to fix, or an organiser merges it.

A minute or two after the merge, tapping your card opens your page. Check it at `bobabash.github.io/sites/07/`.

## Rules (a bot checks every PR)

- Only change files inside **your folder**, e.g. **sites/07/**
- Don't touch **sites/7.html** (the file next to the folders: it's what your card opens first) or anything else in the repo
- One card folder per pull request
- Each file under **5 MB**, no symlinks
- Keep it friendly: everyone who taps your card sees it

If the check fails, open it, read the message, fix your branch and push again: the PR updates by itself.

## Common problems

- **Blank page or missing styles:** your paths start with `/`. Make them `./`.
- **404:** the file must be called `index.html` (lowercase) and sit directly in `sites/07/`, not in a subfolder.
- **Old version showing:** wait two minutes, then hard-refresh.

Stuck? Use **Get help** in your dashboard at [cards.boba-bash.xyz/me](https://cards.boba-bash.xyz/me) and an organiser will come over.

---

<details>
<summary>How the cards work (for the curious)</summary>

| Address | What it is |
| --- | --- |
| `bobabash.github.io/sites/7` | What the NFC chip and the printed QR code open (`sites/7.html`, no zero, because that's what's printed). Shows the Boba Bash logo, asks the dashboard where card 7 goes, then sends you there. |
| `bobabash.github.io/sites/07/` | Card grn07's project page (`sites/07/index.html`), the default destination. |

The dashboard at [cards.boba-bash.xyz](https://cards.boba-bash.xyz) decides where every card goes, live. If it can't be reached, the pages fall back to `map.json` in this repo. The code is at [brahmtej2009/bobabash-cards](https://github.com/brahmtej2009/bobabash-cards).

</details>
