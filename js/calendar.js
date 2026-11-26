/* =====================================================================
   ADVENT CALENDAR — DATES, PROGRESS BAR, GRID AND SCROLL CONTENT
   ===================================================================== */

// The content in content.js is for Advent 2026, which begins on
// Sunday 29 November.
const ADVENT_YEAR = 2026;

function dayImage(entry) {
  return entry && entry.img ? "assets/days/" + entry.img : "";
}

const AdventCal = (() => {

  const DAYS = () => ADVENT_CONTENT.days;
  const total = () => DAYS().length;

  // ---- Small inline icons (used instead of emoji) -------------------
  const ICONS = {
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="currentColor"/></svg>',
    starOutline: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  // ---- Dates --------------------------------------------------------

  // ?preview=YYYY-MM-DD (or ?debug=) pretends today is that date.
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

  function currentDay() {
    const t = getToday().getTime();
    const hit = DAYS().find(e => dateOf(e.day).getTime() === t);
    return hit ? hit.day : null;
  }

  // The day's text, or null if it hasn't been added to content.js yet.
  function content(day, lang) {
    const e = entry(day);
    return e[lang] || e.en || null;
  }
  function hasContent(day) { return !!content(day, "en"); }

  // ---- The four Sundays + Christmas ---------------------------------

  const CANDLES = ["hope", "peace", "joy", "love"];

  function checkpoints() {
    const list = [];
    DAYS().forEach(e => {
      if (dateOf(e.day).getDay() === 0 && list.length < 4) {
        list.push({ day: e.day, key: CANDLES[list.length], week: list.length + 1 });
      }
    });
    const last = DAYS()[DAYS().length - 1];
    list.push({ day: last.day, key: "christ", week: 5 });
    return list;
  }

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

  // Each language can set its own date order in i18n.js, e.g. Sinhala
  // writes "නොවැම්බර් 30 වන සඳුදා". {d} day, {m} month, {wd} weekday.
  function fmt(pattern, day, months) {
    const t = dict();
    const d = dateOf(day);
    return pattern.replace("{d}", d.getDate()).replace("{m}", months[d.getMonth()])
      .replace("{wd}", t.weekdays[d.getDay()]);
  }
  function shortDate(day) {
    return fmt(dict().shortDateFmt || "{d} {m}", day, dict().monthsShort);
  }
  function longDate(day) {
    return fmt(dict().longDateFmt || "{wd}, {d} {m}", day, dict().months);
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

  // The bar fills with the reader's own progress: each day marked done
  // moves it forward, and a Sunday candle lights once the fill reaches it.
  function renderProgress(el, doneSet) {
    const t = dict();
    const n = total();
    const done = DAYS().filter(e => doneSet && doneSet.has(e.day)).length;
    const frac = n ? done / n : 0;
    const width = (frac * 100).toFixed(2) + "%";

    // Start from the previous width so the change animates.
    const prev = el.querySelector(".prog-fill");
    const startWidth = prev ? prev.style.width : width;

    el.innerHTML =
      '<div class="prog-track" role="progressbar" aria-valuemin="0" aria-valuemax="' + n +
        '" aria-valuenow="' + done + '" aria-label="' + esc(t.progressLabel) + '">' +
        '<div class="prog-rail"></div>' +
        '<div class="prog-fill" style="width:' + startWidth + '"></div>' +
        checkpoints().map(c => {
          const pos = (c.day - 1) / (n - 1) * 100;
          const lit = done > 0 && frac * 100 >= pos - 0.01;
          return (
            '<div class="prog-cp' + (lit ? " is-lit" : "") + " cp-" + c.key + '" style="left:' + pos.toFixed(2) + '%">' +
              '<div class="cp-candle">' + candleSVG(c.key, lit) + "</div>" +
              '<div class="cp-dot"></div>' +
              '<div class="cp-label"><span class="cp-date">' + esc(shortDate(c.day)) + "</span></div>" +
            "</div>"
          );
        }).join("") +
      "</div>";

    if (startWidth !== width) {
      const fill = el.querySelector(".prog-fill");
      void fill.offsetWidth; // let the start width apply before animating
      fill.style.width = width;
    }
  }

  // ---- Grid of day cards, grouped by week --------------------------

  function renderGrid(grid, handlers) {
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
          '<span class="week-title">' + esc(t.weekTitles[w.week - 1]) + "</span>";
        grid.appendChild(h);
      }
      grid.appendChild(makeCard(e, handlers));
    });
  }

  function makeCard(e, { onOpenDay, onLockedDay, onPendingDay, doneSet }) {
    const day = e.day;
    const unlocked = isUnlocked(day);
    const ready = hasContent(day);
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

    if (unlocked && ready) {
      const img = dayImage(e);
      el.innerHTML =
        '<div class="card-art">' +
          (img ? '<img class="card-img" loading="lazy" alt="" src="' + img + '" ' +
            'onerror="this.closest(\'.card\').classList.add(\'noimg\')">' : "") +
          '<div class="card-ph"><span class="card-ph-num">' + d.getDate() + "</span>" +
            '<span class="card-ph-month">' + esc(t.months[d.getMonth()]) + "</span></div>" +
          (done ? '<span class="card-badge">' + ICONS.star + "</span>" : "") +
        "</div>" +
        '<div class="card-cap">' +
          '<span class="card-theme">' + esc(content(day, document.body.dataset.lang || "en").title) + "</span>" +
        "</div>";
      if (!img) el.classList.add("noimg");
    } else {
      // Locked, or its date has come but the text hasn't been added yet.
      if (unlocked) el.classList.add("is-pending");
      el.innerHTML =
        '<div class="card-cover">' +
          '<span class="card-cover-num">' + d.getDate() + "</span>" +
          '<span class="card-cover-month">' + esc(t.months[d.getMonth()]) + "</span>" +
          (unlocked ? "" : '<span class="card-cover-lock">' + ICONS.lock + "</span>") +
        "</div>";
    }

    el.addEventListener("click", () =>
      !unlocked ? onLockedDay(day) : ready ? onOpenDay(day, el) : onPendingDay(day));
    return el;
  }

  // ---- Scroll 1: theme, readings, reflection ------------------------

  function renderReading(day, lang) {
    const t = dict();
    const c = content(day, lang);
    const w = weekOf(day);
    const img = dayImage(entry(day));
    return (
      (img
        ? '<figure class="rd-illus"><img alt="" src="' + img + '" onerror="this.parentNode.remove()"></figure>'
        : "") +
      '<p class="rd-kicker"><span>' + esc(t.dayWord + " " + day) + '</span><span class="rd-kicker-date">' + esc(longDate(day)) + "</span></p>" +
      '<p class="rd-week">' + candleSVG(w.key, true) + "<span>" + esc(t.weekTitles[w.week - 1]) + "</span></p>" +
      (c.feast ? '<p class="rd-feast">' + esc(c.feast) + "</p>" : "") +
      '<h2 class="rd-title" id="reader-title">' + esc(c.title) + "</h2>" +
      '<div class="rd-ornament" aria-hidden="true">✦ ✦ ✦</div>' +
      (c.readings
        ? '<section class="rd-section">' +
            '<h3 class="rd-label">' + esc(t.readingsLabel) + "</h3>" +
            '<p class="rd-readings">' + esc(c.readings) + "</p>" +
          "</section>"
        : "") +
      '<section class="rd-section">' +
        '<h3 class="rd-label">' + esc(t.reflectionLabel) + "</h3>" +
        paragraphs(c.reflection) +
      "</section>" +
      '<button class="btn-scroll" id="to-task" type="button">' +
        esc(t.viewTask) + "</button>"
    );
  }

  // ---- Scroll 2: Today's Act ----------------------------------------

  function renderTask(day, lang) {
    const t = dict();
    const c = content(day, lang);
    return (
      '<p class="rd-kicker"><span>' + esc(t.dayWord + " " + day) + '</span><span class="rd-kicker-date">' + esc(longDate(day)) + "</span></p>" +
      '<h2 class="rd-title" id="task-title">' + esc(t.taskTitle) + "</h2>" +
      (c.actTitle ? '<p class="task-theme">' + esc(c.actTitle) + "</p>" : "") +
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
    ADVENT_YEAR, ICONS, candleSVG, total, getToday, previewDate, isUnlocked, unlockedCount, currentDay,
    shortDate, longDate, renderProgress, renderGrid, renderReading, renderTask
  };
})();
