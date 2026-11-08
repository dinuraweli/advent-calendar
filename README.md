# Advent Calendar 🕯️

A digital Advent calendar for Sunday school. Each day from **December 1–25**
reveals a **scripture verse**, a short **reflection**, and a small **activity**,
in **English, Sinhala, and Tamil**.

- Three separate pages: pick a language → a short intro → the **Nativity scene**.
- The scene is a **progressive Nativity**: one new element appears each day
  (sky → stable → Holy Family → shepherds → angels → star → wise men → the
  Christ child on the 25th). Tap a day below to open its reading.
- **Future days stay locked** until their date (based on the phone's clock).
- Mark a day done with a ⭐; progress and language are remembered on the device.
- Works **offline** after the first load and can be "added to home screen".

No build step, no server, no accounts. Just static files — perfect for sharing a
single link over WhatsApp.

---

## ✍️ Editing the daily content

All the day-by-day text lives in **`content.js`**. Open it in any text editor and
replace the `[...]` placeholders. Each day has three languages (`en`, `si`, `ta`)
and these fields:

| Field        | What it is                                   |
|--------------|----------------------------------------------|
| `title`      | short theme shown on the day's reading        |
| `verse`      | the scripture text                           |
| `reference`  | e.g. `"Isaiah 9:6"`                          |
| `reflection` | a short thought (2–4 sentences)              |
| `activity`   | a small thing to do that day                 |

Keep the quotation marks, and don't change the `day`/`date` numbers.

> You can also delete the `buildDays()` generator and just write the 25-day
> array out by hand if you prefer — whatever's easier to maintain.

The app's buttons and the intro/onboarding pages are in **`js/i18n.js`** if you
ever want to reword them.

**After editing:** if people have already added the app to their home screen,
bump `CACHE_VERSION` in `sw.js` (e.g. `advent-v1` → `advent-v2`) so their phones
pick up the new text.

---

## ▶️ Running it locally

Because the app uses a service worker, open it through a tiny local server
(not by double-clicking the file):

```bash
cd advent-calendar
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

### Testing locked/unlocked days
Add `?debug=YYYY-MM-DD` to pretend it's a certain date:

- <http://localhost:8000/?debug=2025-12-01> → only Day 1 open
- <http://localhost:8000/?debug=2025-12-10> → Days 1–10 open, 11–25 locked
- <http://localhost:8000/?debug=2025-12-25> → everything open, center candle lit

To start fresh (clear language/intro/stars), open the browser console and run
`localStorage.clear()`, or use **Settings → Reset progress / Show intro again**.

---

## 🚀 Deploying (getting a link to share)

Any static host works. Easiest options:

- **Netlify Drop** — go to <https://app.netlify.com/drop> and drag the
  `advent-calendar` folder in. You get a URL instantly.
- **Vercel** — `npm i -g vercel` then `vercel` inside the folder.
- **GitHub Pages** — push the folder to a repo and enable Pages.

Then paste the URL into WhatsApp. 🎄

### The calendar year
`ADVENT_YEAR` in `js/calendar.js` defaults to the **current year**, so it works
again next December with no changes. Pin it to a specific year there if you want.

---

## 📁 Files

```
advent-calendar/
  index.html             app shell / screens
  css/style.css          all styles (scene, day chips, day pop-up, onboarding)
  content.js             ← EDIT THIS: the 25 days of content
  js/i18n.js             UI text + intro pages (en/si/ta)
  js/calendar.js         date logic + Nativity scene & day-card rendering
  js/app.js              screen routing, state, localStorage
  manifest.webmanifest   PWA metadata
  sw.js                  offline cache (bump CACHE_VERSION on edits)
  assets/icons/          app icons
```
