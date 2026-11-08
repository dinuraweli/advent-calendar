/* =====================================================================
   ADVENT CALENDAR — DATE LOGIC + ILLUSTRATED CARD RENDERING
   ===================================================================== */

// The year this calendar runs. Defaults to the current year so it works
// again next December with no edits. To test or pin a year, set a number.
const ADVENT_YEAR = new Date().getFullYear();

// Per-day illustration files live in assets/days/ as day-01.jpg … day-25.jpg.
// Drop new art in with that name and it appears automatically. Missing files
// fall back to a gentle placeholder (handled via <img> onerror).
function dayImage(day) {
  return "assets/days/day-" + String(day).padStart(2, "0") + ".jpg";
}

const AdventCal = (() => {

  // ---- Date helpers -------------------------------------------------

  // Returns "today" as a local date at midnight. Supports a debug
  // override via ?debug=YYYY-MM-DD for testing locked/unlocked states.
  function getToday() {
    const params = new URLSearchParams(location.search);
    const debug = params.get("debug");
    if (debug && /^\d{4}-\d{2}-\d{2}$/.test(debug)) {
      const [y, m, d] = debug.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function dayDate(day) {
    return new Date(ADVENT_YEAR, 11, day); // month 11 = December
  }

  // A day (1–25) is unlocked if today is on or after December <day>.
  function isUnlocked(day) {
    return getToday().getTime() >= dayDate(day).getTime();
  }

  function unlockedCount() {
    let n = 0;
    for (let d = 1; d <= 25; d++) if (isUnlocked(d)) n++;
    return n;
  }

  // The day number that is "today" within Advent, or null if we're
  // outside Dec 1–25.
  function currentDay() {
    const t = getToday();
    if (t.getFullYear() === ADVENT_YEAR && t.getMonth() === 11) {
      const d = t.getDate();
      if (d >= 1 && d <= 25) return d;
    }
    return null;
  }

  // ---- Calendar grid of illustrated cards --------------------------

  function renderGrid(grid, { onOpenDay, onLockedDay, doneSet }) {
    grid.innerHTML = "";
    for (let d = 1; d <= 25; d++) {
      grid.appendChild(makeCard(d, { onOpenDay, onLockedDay, doneSet }));
    }
  }

  function makeCard(day, { onOpenDay, onLockedDay, doneSet }) {
    const unlocked = isUnlocked(day);
    const isToday = currentDay() === day;
    const done = doneSet.has(day);

    const el = document.createElement("button");
    el.className = "card";
    el.dataset.day = day;
    el.setAttribute("aria-label", "Day " + day);
    if (unlocked) el.classList.add("is-unlocked"); else el.classList.add("is-locked");
    if (isToday) el.classList.add("is-today");
    if (done) el.classList.add("is-done");
    if (day === 25) el.classList.add("card--special");

    if (unlocked) {
      // Show the illustration (with a graceful placeholder fallback).
      el.innerHTML =
        '<div class="card-art">' +
          '<img class="card-img" loading="lazy" alt="" src="' + dayImage(day) + '" ' +
            'onerror="this.closest(\'.card\').classList.add(\'noimg\')">' +
          '<div class="card-ph"><span class="card-ph-num">' + day + '</span><span class="card-ph-mark">✦</span></div>' +
          (done ? '<span class="card-badge">⭐</span>' : "") +
        "</div>" +
        '<div class="card-cap"><span class="card-day">' + dayLabel(day) + "</span></div>";
    } else {
      // Locked: a "wrapped" cover — no art spoiler.
      el.innerHTML =
        '<div class="card-cover">' +
          '<span class="card-cover-num">' + day + "</span>" +
          '<span class="card-cover-lock">🔒</span>' +
        "</div>";
    }

    el.addEventListener("click", () => unlocked ? onOpenDay(day) : onLockedDay(day));
    return el;
  }

  function dayLabel(day) {
    return (window.ADVENT_I18N &&
      ((ADVENT_I18N[document.body.dataset.lang] || ADVENT_I18N.en).dayWord)) ?
      (ADVENT_I18N[document.body.dataset.lang] || ADVENT_I18N.en).dayWord + " " + day :
      "Day " + day;
  }

  // ---- Day card rendering (two steps) ------------------------------

  // Step 1: illustration + scripture + reflection, with a button to reveal
  // the activity. Step 2 (the activity) is included but hidden; app.js reveals it.
  function renderDay(day, lang, t) {
    const data = ADVENT_CONTENT.days.find(x => x.day === day);
    const c = data[lang] || data.en;
    const dateLabel = "December " + day;
    return (
      '<div class="day-illus">' +
        '<img class="day-illus-img" alt="" src="' + dayImage(day) + '" ' +
          'onerror="this.closest(\'.day-illus\').classList.add(\'noimg\')">' +
        '<div class="day-illus-ph"><span>' + day + "</span></div>" +
      "</div>" +
      '<div class="day-head">' +
        '<span class="day-badge">' + t.dayWord + " " + day + "</span>" +
        '<span class="day-date">' + dateLabel + "</span>" +
      "</div>" +
      (c.title ? '<h2 class="day-title">' + esc(c.title) + "</h2>" : "") +
      section("📖", t.verseLabel,
        '<blockquote class="verse">' + esc(c.verse) + "</blockquote>" +
        '<cite class="verse-ref">' + esc(c.reference) + "</cite>") +
      section("💭", t.reflectionLabel, '<p>' + esc(c.reflection) + "</p>") +
      '<button class="btn-reveal" id="reveal-activity">' +
        '<span class="sec-icon">✏️</span> ' + esc(t.revealActivity) +
      "</button>" +
      '<div class="day-activity" id="day-activity" hidden>' +
        section("✏️", t.activityLabel, '<p>' + esc(c.activity) + "</p>") +
      "</div>"
    );
  }

  function section(icon, label, inner) {
    return (
      '<div class="day-section">' +
        '<h3 class="day-section-title"><span class="sec-icon">' + icon + "</span>" + label + "</h3>" +
        inner +
      "</div>"
    );
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, ch =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  }

  return {
    ADVENT_YEAR, getToday, isUnlocked, unlockedCount, currentDay,
    renderGrid, renderDay
  };
})();
