# savs-stuff — project context

## what this is
A personal website and non-conventional portfolio. `index.html` is the top-level hub linking to several categories of content: personal writing, hosted events, and other interesting links. The aesthetic is intentionally minimal and informal — monospaced font, no framework, plain HTML.

## current file structure

```
savs-stuff/
  index.html              ← top-level hub: links to writing, events, other, friends
  style.css               ← event-only CSS (uses CSS variables for theming; do not use for simple pages)
  site.css                ← shared CSS for simple pages (body font, .container)
  CONTEXT.md              ← this file
  js/
    scavenger.js          ← shared scavenger hunt logic: initScavenger(), showPage()
    load-csv.js           ← CSV fetcher/parser: loadCSV() — for Partiful-based events
  writing/
    ezra.html             ← "the ezra song" (2023-10-30) — personal essay
    sf.html               ← "when i think about san francisco" (2025-04-10) — personal essay
    miami.html            ← "10 hours at the miami airport" (2025-12-30) — personal essay
  events/
    september/
      index.html          ← "19th night of september" (2025-09-19) — party mini-app
      data.js             ← hand-curated clues (no answers), calls initScavenger()
    mingling/
      index.html          ← "singling & mingling" (2026-02-20) — party mini-app
      data.js             ← clues + answers from Partiful, calls initScavenger()
  other/
    thoughts.html         ← scratchpad / questions page
    ok.html               ← wellness checklist ("r u ok?")
  friends/
    index.html            ← links to things other people made
```

## two distinct subsystems

**Simple pages** (`index.html`, `writing/`, `other/`, `friends/`) share `site.css` and use a plain `.container` div for centered, left-aligned content. Keep these minimal.

**Event pages** (`events/`) are independent mini single-page apps with their own theming via `style.css` and CSS variables. They have animated gradients, custom fonts, scavenger hunts, etc. Treat them as a separate concern.

## how a new event works

1. Copy any `events/` folder, rename it
2. Update the EVENT CONFIG block in `index.html` (CSS variables for colors/fonts, any per-event animations)
3. Add the event to `index.html` at the root
4. Replace `data.js` with one of two patterns:

**Hand-curated data.js:**
```js
const STORAGE_KEY = 'savs-party-eventname-YYYY-MM';
const scavengerItems = [
    { clue: "fun fact here", answer: "Name" },
    // answer: "" if unknown (no confetti will fire)
];
initScavenger(scavengerItems, STORAGE_KEY);
```

**CSV-based data.js (Partiful export):**
```js
const STORAGE_KEY = 'savs-party-eventname-YYYY-MM';
loadCSV('data.csv', STORAGE_KEY);
```
Then drop the raw Partiful CSV export into the event folder as `data.csv`. No other changes needed.

## how the CSV loading works
`load-csv.js` fetches `data.csv`, auto-detects columns (looks for headers containing "name", "status", "fun fact"), filters for Status = "Going" and non-empty fun facts, and builds the scavenger items array. Handles quoted fields/commas inside values (RFC 4180).

**Requires HTTP** — `fetch()` won't work opening the file directly from desktop. Use a local server or the live site.

To run a local server: open a terminal in `savs-stuff/` and run:
```
python3 -m http.server 8080
```
Then open http://localhost:8080

## how scavenger hunt logic works
- `scavenger.js` exposes `initScavenger(items, storageKey)` and `showPage(pageId)`
- If `answer` is non-empty and the user types the correct name → confetti + input turns green and locks
- If `answer` is `""` → no validation, just saves whatever they type
- Progress is saved to localStorage per event using the unique STORAGE_KEY

## how theming works
All shared styles are in `style.css` using CSS custom properties. Each event's `index.html` has an EVENT CONFIG block that sets:
```css
:root {
    --gradient: ...;
    --text: ...;
    --border: ...;
    --placeholder: ...;
    --font-body: ...;
    --font-heading: ...;
}
```
Per-event animations (e.g. disco spin, pulsing border glow) also go in the config block.

## every event's script load order
```html
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
<script src="../../js/scavenger.js"></script>
<script src="../../js/load-csv.js"></script>
<script src="data.js"></script>
```
Always the same. `data.js` is always last and calls either `initScavenger()` or `loadCSV()`.

## what's not done yet
- Importer/preview tool (optional): a local HTML page to preview what a Partiful CSV will produce before dropping it into an event folder
- Hosting on savannahdu.com — need to figure out deployment (likely just FTP or GitHub Pages)
- `thirty.html` from the original `/workspace/september/` folder was never migrated — it was incomplete anyway

## original files
The original versions of all pages live in `/Users/savannahdu/workspace/september/` and are untouched.
