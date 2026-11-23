# Advent Calendar 🕯️

A digital Advent calendar for Sunday school, built for phones. It runs from
the **First Sunday of Advent (Sunday 29 November 2026) to Christmas Day** —
27 days — in **English, Sinhala, and Tamil**.

- Pick a language → a short intro → the calendar.
- A **progress bar** across the top marks the four Sundays of Advent with
  candles and Christmas Day. Each candle lights up
  when its Sunday arrives.
- Days are grouped by week. Tapping a day zooms its card to the centre of
  the screen, the card opens like a page, then a **parchment scroll** unrolls
  with the day's theme, readings and reflection. A button at the end opens a
  **second scroll** with Today's Act. Marking it done adds a star to the day
  and closes the scroll.
- **Future days stay locked** until their date (based on the phone's clock).
- The phone's Back button closes the scroll, like a normal page.
- Works **offline** after the first load and can be "added to home screen".

No build step, no server, no accounts. Just static files.

---

## ✍️ Editing the daily content

All the day-by-day text lives in **`content.js`**. Only text provided by the
Sunday school goes there. Each day is one entry:

| Field        | What it is                                              |
|--------------|---------------------------------------------------------|
| `date`       | `"MM-DD"` — the day unlocks on this date                |
| `feast`      | optional saint's day / feast                            |
| `title`      | the reflection's theme                                  |
| `readings`   | optional: the day's readings                            |
| `reflection` | the reflection                                          |
| `actTitle`   | the name of Today's Act                                 |
| `activity`   | Today's Act (lines starting `- ` become a bullet list)  |
| `img`        | optional picture file in `assets/days/`                 |

Sinhala text goes in the `SINHALA` list in the same file, with the same
fields. Only the First Week of Advent has text so far, in English and
Sinhala; Tamil readers see English until Tamil text is added. Days without an entry still
appear on the calendar but can't be opened until their text is added.

The app's buttons, candle names and intro pages are in **`js/i18n.js`**.

**After editing:** bump `CACHE_VERSION` in `sw.js` (e.g. `advent-v19` →
`advent-v19`) so phones that have the app pick up the new text.

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
Add `?preview=YYYY-MM-DD` (or `?debug=`) to pretend it's a certain date:

- <http://localhost:8000/?preview=2026-11-29> → only the first day open
- <http://localhost:8000/?preview=2026-12-20> → 29 Nov – 20 Dec open, four candles lit
- <http://localhost:8000/?preview=2026-12-25> → everything open, Christmas candle lit

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
