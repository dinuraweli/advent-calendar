/* =====================================================================
   ADVENT CALENDAR — DATES, PROGRESS BAR, GRID AND SCROLL CONTENT
   ===================================================================== */

// The content in content.js is written for Advent 2026, which begins on
// Sunday 29 November. Change this (and the dates in content.js) for a
// future year.
const ADVENT_YEAR = 2026;

// Illustrations live in assets/days/. Each day in content.js names its
// own image file (or none, which shows a gentle placeholder).
function dayImage(entry) {
  return entry && entry.img ? "assets/days/" + entry.img : "";
}

const AdventCal = (() => {

  const DAYS = () => ADVENT_CONTENT.days;
  const total = () => DAYS().length;

  // ---- Dates --------------------------------------------------------

  // ?preview=YYYY-MM-DD (or ?debug=) pretends today is that date, for
  // testing and for showing reviewers how a given day will look.
  function previewDate() {
    const params = new URLSearchParams(location.search);
    const v = params.get("preview") || params.get("debug");
    return v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
  }

  function getToday() {
    const v = previewDate();
    if (v) {
      const [y, m, d] = v.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function entry(day) { return DAYS().find(x => x.day === day); }

  // content.js stores dates as "MM-DD".
  function dateOf(day) {
    const [m, d] = entry(day).date.split("-").map(Number);
    return new Date(ADVENT_YEAR, m - 1, d);
  }

  function isUnlocked(day) {
    return getToday().getTime() >= dateOf(day).getTime();
  }

  function unlockedCount() {
    return DAYS().filter(e => isUnlocked(e.day)).length;
  }

  // The day number that is "today", or null outside the Advent season.
  function currentDay() {
    const t = getToday().getTime();
    const hit = DAYS().find(e => dateOf(e.day).getTime() === t);
    return hit ? hit.day : null;
  }

  // ---- Seasons: the four Sundays + Christmas ------------------------

  // Every Sunday in the list starts a new week of Advent; Christmas Day
  // closes the season. Each gets a candle on the progress bar.
  const CANDLES = ["hope", "peace", "joy", "love"];

  function checkpoints() {
    const list = [];
    DAYS().forEach(e => {
      if (dateOf(e.day).getDay() === 0 && list.length < 4) {
        const key = CANDLES[list.length];
        list.push({ day: e.day, key, week: list.length + 1 });
      }
    });
    const last = DAYS()[DAYS().length - 1];
    list.push({ day: last.day, key: "christ", week: 5 });
    return list;
  }

  // Which week a day belongs to (1–4), or 5 for Christmas Day.
  function weekOf(day) {
    const cps = checkpoints();
    if (day === cps[cps.length - 1].day) return cps[cps.length - 1];
    let cur = cps[0];
    cps.forEach(c => { if (c.key !== "christ" && day >= c.day) cur = c; });
    return cur;
  }

  // ---- Labels -------------------------------------------------------

  function dict() {
    return ADVENT_I18N[document.body.dataset.lang] || ADVENT_I18N.en;
  }

  function shortDate(day) {
    const d = dateOf(day);
    return d.getDate() + " " + dict().monthsShort[d.getMonth()];
  }

  function longDate(day) {
    const t = dict();
    const d = dateOf(day);
    return t.weekdays[d.getDay()] + ", " + d.getDate() + " " + t.months[d.getMonth()];
  }

  function content(day, lang) {
    const e = entry(day);
    return e[lang] || e.en;
  }

  // ---- Progress bar with candle checkpoints ------------------------

  function candleSVG(key, lit) {
    const body = {
      hope: "#6b3fa0", peace: "#6b3fa0", joy: "#e07aa6", love: "#6b3fa0", christ: "#fbf7ee"
    }[key];
    const stroke = key === "christ" ? "#d8c9a6" : "rgba(0,0,0,.15)";
    return (
      '<svg viewBox="0 0 24 44" class="candle-svg" aria-hidden="true">' +
        (lit
          ? '<ellipse class="flame-glow" cx="12" cy="9" rx="9" ry="10" fill="#ffd36b" opacity=".35"/>' +
            '<path class="flame" d="M12 2c3 4 4.5 6.5 4.5 9a4.5 4.5 0 0 1-9 0C7.5 8.5 9 6 12 2z" fill="#ffb627"/>' +
            '<path d="M12 6.5c1.4 2 2 3.2 2 4.4a2 2 0 0 1-4 0c0-1.2.6-2.4 2-4.4z" fill="#fff3c4"/>'
          : "") +
        '<line x1="12" y1="15" x2="12" y2="18" stroke="#3a2a1a" stroke-width="1.4" stroke-linecap="round"/>' +
        '<rect x="6" y="18" width="12" height="24" rx="2" fill="' + body + '" stroke="' + stroke + '"/>' +
        '<rect x="8" y="20" width="2.5" height="18" rx="1.2" fill="#fff" opacity=".25"/>' +
      "</svg>"
    );
  }

  function renderProgress(el) {
    const t = dict();
    const n = total();
    const today = getToday().getTime();
    const first = dateOf(1).getTime();
    const lastDay = dateOf(n).getTime();

    // How far along the season we are (0 → 1).
    let frac = 0;
    if (today >= lastDay) frac = 1;
    else if (today >= first) {
      const idx = DAYS().filter(e => dateOf(e.day).getTime() <= today).length;
      frac = (idx - 1) / (n - 1);
    }

    const cps = checkpoints();
    el.innerHTML =
      '<div class="prog-track" role="progressbar" aria-valuemin="0" aria-valuemax="' + n +
        '" aria-valuenow="' + unlockedCount() + '" aria-label="' + esc(t.progressLabel) + '">' +
        '<div class="prog-rail"></div>' +
        '<div class="prog-fill" style="width:' + (frac * 100).toFixed(2) + '%"></div>' +
        cps.map(c => {
          const pos = (c.day - 1) / (n - 1) * 100;
          const lit = isUnlocked(c.day);
          return (
            '<div class="prog-cp' + (lit ? " is-lit" : "") + " cp-" + c.key + '" style="left:' + pos.toFixed(2) + '%">' +
              '<div class="cp-candle">' + candleSVG(c.key, lit) + "</div>" +
              '<div class="cp-dot"></div>' +
              '<div class="cp-label"><span class="cp-name">' + esc(t.candles[c.key]) + "</span>" +
                '<span class="cp-date">' + esc(shortDate(c.day)) + "</span></div>" +
            "</div>"
          );
        }).join("") +
      "</div>";
  }

  // ---- Grid of day cards, grouped by week --------------------------

  function renderGrid(grid, { onOpenDay, onLockedDay, doneSet }) {
    const t = dict();
    grid.innerHTML = "";
    let lastWeek = null;
    DAYS().forEach(e => {
      const w = weekOf(e.day);
      if (w.week !== lastWeek) {
        lastWeek = w.week;
        const h = document.createElement("div");
        h.className = "week-head wk-" + w.key;
        h.innerHTML =
          '<span class="week-candle">' + candleSVG(w.key, isUnlocked(w.day)) + "</span>" +
          '<span class="week-text"><span class="week-title">' + esc(t.weekTitles[w.week - 1]) + "</span>" +
          '<span class="week-theme">' + esc(t.candles[w.key]) + "</span></span>";
        grid.appendChild(h);
      }
      grid.appendChild(makeCard(e, { onOpenDay, onLockedDay, doneSet }));
    });
  }

  function makeCard(e, { onOpenDay, onLockedDay, doneSet }) {
    const day = e.day;
    const unlocked = isUnlocked(day);
    const isToday = currentDay() === day;
    const done = doneSet.has(day);
    const d = dateOf(day);
    const t = dict();

    const el = document.createElement("button");
    el.className = "card";
    el.dataset.day = day;
    el.setAttribute("aria-label", t.dayWord + " " + day + ", " + longDate(day));
    el.classList.add(unlocked ? "is-unlocked" : "is-locked");
    if (isToday) el.classList.add("is-today");
    if (done) el.classList.add("is-done");
    if (d.getDay() === 0) el.classList.add("card--sunday");
    if (day === total()) el.classList.add("card--special");

    if (unlocked) {
      const img = dayImage(e);
      el.innerHTML =
        '<div class="card-art">' +
          (img ? '<img class="card-img" loading="lazy" alt="" src="' + img + '" ' +
            'onerror="this.closest(\'.card\').classList.add(\'noimg\')">' : "") +
          '<div class="card-ph"><span class="card-ph-num">' + d.getDate() + '</span><span class="card-ph-mark">✦</span></div>' +
          '<span class="card-date-chip">' + esc(shortDate(day)) + "</span>" +
          (done ? '<span class="card-badge">⭐</span>' : "") +
        "</div>" +
        '<div class="card-cap">' +
          '<span class="card-theme">' + esc(content(day, document.body.dataset.lang || "en").title) + "</span>" +
        "</div>";
      if (!img) el.classList.add("noimg");
    } else {
      el.innerHTML =
        '<div class="card-cover">' +
          '<span class="card-cover-num">' + d.getDate() + "</span>" +
          '<span class="card-cover-month">' + esc(t.months[d.getMonth()]) + "</span>" +
          '<span class="card-cover-lock">🔒</span>' +
        "</div>";
    }

    el.addEventListener("click", () => unlocked ? onOpenDay(day, el) : onLockedDay(day));
    return el;
  }

  // ---- Scroll 1: theme, scripture, reflection -----------------------

  function renderReading(day, lang) {
    const t = dict();
    const c = content(day, lang);
    const e = entry(day);
    const w = weekOf(day);
    const img = dayImage(e);
    return (
      (img
        ? '<figure class="rd-illus"><img alt="" src="' + img + '" onerror="this.parentNode.remove()"></figure>'
        : "") +
      '<p class="rd-kicker">' + esc(t.dayWord + " " + day) + " · " + esc(longDate(day)) + "</p>" +
      '<p class="rd-week">' + candleSVG(w.key, true) +
        "<span>" + esc(t.weekTitles[w.week - 1]) + " · " + esc(t.candles[w.key]) + "</span></p>" +
      (c.feast ? '<p class="rd-feast">' + esc(c.feast) + "</p>" : "") +
      '<h2 class="rd-title" id="reader-title">' + esc(c.title) + "</h2>" +
      '<div class="rd-ornament" aria-hidden="true">✦ ✦ ✦</div>' +
      '<section class="rd-section">' +
        '<h3 class="rd-label">📖 ' + esc(t.verseLabel) + "</h3>" +
        '<blockquote class="rd-verse">' + esc(c.verse) + "</blockquote>" +
        '<cite class="rd-ref">' + esc(c.reference) + "</cite>" +
        (c.readings ? '<p class="rd-readings"><strong>' + esc(t.readingsLabel) + ":</strong> " + esc(c.readings) + "</p>" : "") +
      "</section>" +
      '<section class="rd-section">' +
        '<h3 class="rd-label">💭 ' + esc(t.reflectionLabel) + "</h3>" +
        paragraphs(c.reflection) +
      "</section>" +
      '<button class="btn-scroll" id="to-task" type="button">' +
        "<span>✏️</span> " + esc(t.viewTask) + " <span aria-hidden=\"true\">→</span></button>"
    );
  }

  // ---- Scroll 2: the day's task --------------------------------------

  function renderTask(day, lang) {
    const t = dict();
    const c = content(day, lang);
    return (
      '<p class="rd-kicker">' + esc(t.dayWord + " " + day) + " · " + esc(longDate(day)) + "</p>" +
      '<div class="task-icon" aria-hidden="true">✏️</div>' +
      '<h2 class="rd-title" id="task-title">' + esc(t.taskTitle) + "</h2>" +
      '<p class="task-theme">' + esc(c.actTitle || c.title) + "</p>" +
      '<div class="rd-ornament" aria-hidden="true">✦ ✦ ✦</div>' +
      '<div class="task-body">' + paragraphs(c.activity) + "</div>"
    );
  }

  // Blank lines start a new paragraph; lines beginning "- " become a list.
  function paragraphs(text) {
    return String(text).split(/\n\s*\n/).map(block => {
      let html = "", list = [], para = [];
      const flushList = () => {
        if (list.length) html += "<ul>" + list.map(li => "<li>" + esc(li) + "</li>").join("") + "</ul>";
        list = [];
      };
      const flushPara = () => {
        if (para.length) html += "<p>" + para.map(esc).join("<br>") + "</p>";
        para = [];
      };
      block.trim().split("\n").forEach(l => {
        if (/^\s*-\s+/.test(l)) { flushPara(); list.push(l.replace(/^\s*-\s+/, "")); }
        else { flushList(); para.push(l); }
      });
      flushList(); flushPara();
      return html;
    }).join("");
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, ch =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  }

  return {
    ADVENT_YEAR, total, getToday, previewDate, isUnlocked, unlockedCount, currentDay,
    shortDate, longDate, renderProgress, renderGrid, renderReading, renderTask
  };
})();
