# Boba Bash Greater Noida: your card, your site

Every Boba Pass has an ID on the front, like **grn07**. Your card's QR code and NFC chip open **your own page** in this repo:

```
https://bobabash.github.io/sites/7/
```

That page starts as a placeholder. Replace it with anything you build: a portfolio, a game, a project demo.

---

## Add your site in 6 steps

**1. Find your number.** Take the digits from your card ID: `grn07` → **7**. (Also shown at [cards.boba-bash.xyz/me](https://cards.boba-bash.xyz/me).)

**2. Fork this repo.** Click **Fork** at the top right of this page.

**3. Open your folder.** In your fork, go to `sites/7/` (your number).

**4. Build your page.** Edit `sites/7/index.html`. Add CSS, JS and images in the same folder.

**5. Open a pull request** back to this repo, titled:

```
Card 7: Your Name
```

**6. Wait for a merge.** An organiser reviews it. About a minute after the merge, your card opens your page.

---

## Rules

A check runs on every pull request. It fails if you break these:

- ✅ Only change files inside **`sites/<your number>/`**
- ✅ One card folder per pull request
- ✅ Each file under **5 MB**, no symlinks
- ✅ Use **relative paths**: `./style.css`, `./img/me.png` (not `/style.css`)
- ✅ Keep it friendly: everyone who taps your card sees it

Don't touch anything else in the repo: the files at the root, `sites/<n>.html`, `sites/template/` and `sites/loader.html` make the cards work.

## Editing in the browser (no git needed)

1. Open your fork on github.com and go to `sites/7/index.html`.
2. Click the ✏️ pencil, edit, then **Commit changes**.
3. To add images, open `sites/7/`, then **Add file → Upload files**.
4. Back on your fork's main page, click **Contribute → Open pull request**.

## Test before you send

Open `sites/7/index.html` straight in your browser, or from the repo root run:

```bash
npx serve .
```

Then visit `http://localhost:3000/sites/7/`.

## Want your card to open something else?

You don't need a PR for that. Log in at [cards.boba-bash.xyz/me](https://cards.boba-bash.xyz/me) → **My card**, and pick your project page or any link. The QR code and the NFC tap both follow it.

---

<details>
<summary>How the cards work (for the curious)</summary>

| Address | What it is |
| --- | --- |
| `bobabash.github.io/7` | The link in the NFC chip. Shows the Boba Bash logo, asks the dashboard where card 7 goes, then sends you there. |
| `bobabash.github.io/sites/7` | The link in the printed QR code. Same thing (`sites/7.html`). |
| `bobabash.github.io/sites/7/` | Card 7's project page (`sites/7/index.html`), the default destination. |

The dashboard at [cards.boba-bash.xyz](https://cards.boba-bash.xyz) decides where every card goes, live. If it can't be reached, the pages fall back to `map.json` in this repo. The code is at [brahmtej2009/bobabash-cards](https://github.com/brahmtej2009/bobabash-cards).

</details>
