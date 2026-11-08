/* =====================================================================
   ADVENT CALENDAR — APP (routing, state, persistence)
   ===================================================================== */

(() => {
  const STORE = {
    lang: "advent.lang",
    seenIntro: "advent.seenIntro",
    done: "advent.done"
  };

  // ---- State -------------------------------------------------------
  const state = {
    lang: localStorage.getItem(STORE.lang) || null,
    seenIntro: localStorage.getItem(STORE.seenIntro) === "1",
    done: new Set(JSON.parse(localStorage.getItem(STORE.done) || "[]")),
    onbIndex: 0,
    activeDay: null
  };

  function t() {
    return ADVENT_I18N[state.lang] || ADVENT_I18N.en;
  }

  function saveDone() {
    localStorage.setItem(STORE.done, JSON.stringify([...state.done]));
  }

  // ---- Screen routing ----------------------------------------------
  const screens = ["language", "onboarding", "calendar"];
  function show(screen) {
    screens.forEach(s => {
      document.getElementById("screen-" + s).hidden = (s !== screen);
    });
    window.scrollTo(0, 0);
  }

  function route() {
    // Optional URL overrides (handy for testing / direct links):
    //   ?lang=en|si|ta   preselect a language
    //   ?start=calendar  skip the intro and go straight to the calendar
    const qp = new URLSearchParams(location.search);
    const qlang = qp.get("lang");
    if (qlang && ADVENT_I18N[qlang]) state.lang = qlang;
    if (qp.get("start") === "calendar") state.seenIntro = true;

    if (!state.lang) { show("language"); return; }
    applyLang();
    if (!state.seenIntro) { renderOnboarding(); show("onboarding"); return; }
    renderHome();
    show("calendar");
    const openDayParam = +qp.get("open");
    if (openDayParam && AdventCal.isUnlocked(openDayParam)) openDay(openDayParam);
  }

  // ---- Language ----------------------------------------------------
  function applyLang() {
    const dict = t();
    document.documentElement.lang = state.lang;
    document.documentElement.setAttribute("dir", dict._dir || "ltr");
    document.body.dataset.lang = state.lang;
    // Fill any element with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    // Reflect in settings segmented control
    syncLangSegments();
  }

  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem(STORE.lang, lang);
    applyLang();
  }

  function syncLangSegments() {
    document.querySelectorAll("#lang-seg button").forEach(b => {
      b.classList.toggle("is-active", b.dataset.lang === state.lang);
    });
  }

  // ---- Onboarding --------------------------------------------------
  function renderOnboarding() {
    const dict = t();
    const slidesEl = document.getElementById("onb-slides");
    const dotsEl = document.getElementById("onb-dots");
    state.onbIndex = 0;
    slidesEl.innerHTML = dict.onboarding.map((s, i) =>
      '<div class="onb-slide" data-i="' + i + '">' +
        '<div class="onb-art" aria-hidden="true">' + onbArt(i) + "</div>" +
        '<h2 class="onb-title">' + s.title + "</h2>" +
        '<p class="onb-body">' + s.body + "</p>" +
      "</div>"
    ).join("");
    dotsEl.innerHTML = dict.onboarding.map((_, i) =>
      '<span class="dot" data-i="' + i + '"></span>').join("");
    updateOnb();

    // Swipe support
    let startX = null;
    slidesEl.ontouchstart = e => { startX = e.touches[0].clientX; };
    slidesEl.ontouchend = e => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (dx < -40) nextOnb();
      else if (dx > 40) prevOnb();
      startX = null;
    };
  }

  function onbArt(i) {
    return ["🕯️", "🎁", "📆", "✨"][i] || "✨";
  }

  function updateOnb() {
    const dict = t();
    const slidesEl = document.getElementById("onb-slides");
    slidesEl.style.transform = "translateX(" + (-state.onbIndex * 100) + "%)";
    document.querySelectorAll("#onb-dots .dot").forEach((d, i) =>
      d.classList.toggle("is-active", i === state.onbIndex));
    const last = state.onbIndex === dict.onboarding.length - 1;
    document.getElementById("onb-next").textContent = last ? dict.start : dict.next;
  }

  function nextOnb() {
    const dict = t();
    if (state.onbIndex < dict.onboarding.length - 1) {
      state.onbIndex++; updateOnb();
    } else finishOnb();
  }
  function prevOnb() {
    if (state.onbIndex > 0) { state.onbIndex--; updateOnb(); }
  }
  function finishOnb() {
    state.seenIntro = true;
    localStorage.setItem(STORE.seenIntro, "1");
    route();
  }

  // ---- Home: grid of illustrated day-cards -------------------------
  function renderHome() {
    AdventCal.renderGrid(document.getElementById("day-grid"), {
      doneSet: state.done,
      onOpenDay: openDay,
      onLockedDay: lockedDay
    });
    const maxDay = AdventCal.unlockedCount();
    const prog = document.getElementById("scene-progress");
    prog.textContent = maxDay > 0
      ? t().dayProgress.replace("{n}", maxDay)
      : t().beforeStart;
  }

  function lockedDay(day) {
    const msg = t().lockedToast.replace("{n}", day);
    toast(msg);
  }

  // ---- Day sheet ---------------------------------------------------
  const daySheet = document.getElementById("day-sheet");
  const settingsSheet = document.getElementById("settings-sheet");

  function openDay(day) {
    state.activeDay = day;
    const body = document.getElementById("sheet-body");
    body.innerHTML = AdventCal.renderDay(day, state.lang, t());
    body.scrollTop = 0;
    daySheet.querySelector(".sheet-panel").scrollTop = 0;
    // Step 2: reveal the activity on demand.
    const revealBtn = document.getElementById("reveal-activity");
    if (revealBtn) {
      revealBtn.addEventListener("click", () => {
        const act = document.getElementById("day-activity");
        act.hidden = false;
        revealBtn.hidden = true;
        act.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
    updateDoneBtn();
    openSheet(daySheet);
  }

  function updateDoneBtn() {
    const dict = t();
    const btn = document.getElementById("day-done-btn");
    const done = state.done.has(state.activeDay);
    btn.classList.toggle("is-done", done);
    btn.querySelector(".star").textContent = done ? "⭐" : "☆";
    btn.querySelector("[data-i18n='markDone']").textContent =
      done ? dict.markedDone : dict.markDone;
  }

  function toggleDone() {
    const d = state.activeDay;
    if (state.done.has(d)) state.done.delete(d);
    else state.done.add(d);
    saveDone();
    updateDoneBtn();
    renderHome(); // reflect star on the day picker
  }

  // ---- Sheets (generic open/close) ---------------------------------
  function openSheet(sheet) {
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add("is-open"));
    document.body.classList.add("no-scroll");
  }
  function closeSheet(sheet) {
    sheet.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { sheet.hidden = true; }, 250);
  }

  // ---- Toast -------------------------------------------------------
  let toastTimer = null;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add("is-show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove("is-show");
      setTimeout(() => { el.hidden = true; }, 250);
    }, 2600);
  }

  // ---- Settings ----------------------------------------------------
  function resetProgress() {
    if (!confirm(t().resetConfirm)) return;
    state.done.clear();
    saveDone();
    renderHome();
  }
  function replayIntro() {
    state.seenIntro = false;
    localStorage.removeItem(STORE.seenIntro);
    closeSheet(settingsSheet);
    renderOnboarding();
    show("onboarding");
  }

  // ---- Wire up events ----------------------------------------------
  function bind() {
    // Language picker
    document.querySelectorAll("#screen-language .lang-btn").forEach(b =>
      b.addEventListener("click", () => { setLang(b.dataset.lang); route(); }));

    // Onboarding
    document.getElementById("onb-next").addEventListener("click", nextOnb);
    document.getElementById("onb-skip").addEventListener("click", finishOnb);

    // Day sheet
    document.getElementById("day-done-btn").addEventListener("click", toggleDone);
    daySheet.querySelectorAll("[data-close-sheet]").forEach(el =>
      el.addEventListener("click", () => closeSheet(daySheet)));

    // Settings
    document.getElementById("open-settings").addEventListener("click", () => {
      syncLangSegments();
      openSheet(settingsSheet);
    });
    settingsSheet.querySelectorAll("[data-close-settings]").forEach(el =>
      el.addEventListener("click", () => closeSheet(settingsSheet)));
    document.querySelectorAll("#lang-seg button").forEach(b =>
      b.addEventListener("click", () => {
        setLang(b.dataset.lang);
        renderHome();
        if (!daySheet.hidden && state.activeDay) openDay(state.activeDay);
      }));
    document.getElementById("reset-progress").addEventListener("click", resetProgress);
    document.getElementById("replay-intro").addEventListener("click", replayIntro);

    // Close sheets with Escape
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        if (!daySheet.hidden) closeSheet(daySheet);
        if (!settingsSheet.hidden) closeSheet(settingsSheet);
      }
    });
  }

  // ---- Service worker (offline) ------------------------------------
  // Registers for offline use, and auto-reloads once when a new version
  // takes over so updated content/images never show stale.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const hadController = !!navigator.serviceWorker.controller;
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing || !hadController) return; // skip on very first install
        refreshing = true;
        location.reload();
      });
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

  // ---- Go ----------------------------------------------------------
  bind();
  route();
})();
