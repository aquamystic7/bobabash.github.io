# bobabash.github.io: the link on every card

Each Boba Bash Greater Noida NFC card is flashed with `https://bobabash.github.io/<card number>`. That link never changes. Where it goes is decided live by the dashboard at [cards.boba-bash.xyz](https://cards.boba-bash.xyz).

```
tap ──> bobabash.github.io/17          this repo: logo for 5 seconds
          ├─ asks cards.boba-bash.xyz/api/go/17 where to go (and counts the tap)
          └─ dashboard down? reads map.json from this repo
          ▼
        bobabash.github.io/sites/17/   the holder's project (or the link they picked)
```

| File | What it is |
| --- | --- |
| `card.html` | The page every tap lands on. The dashboard copies it to `<n>/index.html` for each card. |
| `go.js`, `go.css` | Reads the card number, shows the logo, asks the dashboard, redirects. |
| `map.json` | Written by the dashboard. Fallback map of card to destination. |
| `404.html` | Same page, so even an unknown number shows the logo instead of GitHub's 404. |
| `index.html` | Landing page at bobabash.github.io. |

Don't open pull requests here. The dashboard commits to this repo. Projects go in [bobabash/sites](https://github.com/bobabash/sites).
