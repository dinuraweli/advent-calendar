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
    renderPreviewBanner();
    show("calendar");
    // Arriving back from a refresh with the reader open in history: tidy up.
    if (history.state && history.state.advent) history.replaceState(null, "");
    const openDayParam = +qp.get("open");
    if (openDayParam && AdventCal.isUnlocked(openDayParam)) openDay(openDayParam);
  }

  // Shown only when ?preview=YYYY-MM-DD is in the URL, so reviewers know
  // the locked days are locked on purpose.
  function renderPreviewBanner() {
    const el = document.getElementById("preview-banner");
    const v = AdventCal.previewDate();
    if (!v) { el.hidden = true; return; }
    const [y, m, d] = v.split("-").map(Number);
    const label = new Date(y, m - 1, d).toLocaleDateString("en-GB",
      { day: "numeric", month: "long", year: "numeric" });
    el.textContent = "Preview: showing the calendar as it will look on " + label +
      ". Later days are locked until their date.";
    el.hidden = false;
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

  // A lit candle for each intro slide (Advent wreath colours).
  function onbArt(i) {
    return '<span class="onb-candle">' + AdventCal.candleSVG(["hope", "peace", "joy", "love"][i] || "christ", true) + "</span>";
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

  // ---- Home: progress bar + grid of day cards ----------------------
  function renderHome() {
    AdventCal.renderProgress(document.getElementById("advent-progress"));
    AdventCal.renderGrid(document.getElementById("day-grid"), {
      doneSet: state.done,
      onOpenDay: openDay,
      onLockedDay: lockedDay,
      onPendingDay: () => toast(t().pendingToast)
    });
    const n = AdventCal.unlockedCount();
    document.getElementById("scene-progress").textContent = n > 0
      ? t().dayProgress.replace("{n}", n).replace("{total}", AdventCal.total())
      : t().beforeStart;
  }

  function lockedDay(day) {
    toast(t().lockedToast.replace("{date}", AdventCal.longDate(day)));
  }

  // ---- Reader: page-opening animation, then two scrolls ------------
  const reader = document.getElementById("reader");
  const scrollReading = document.getElementById("scroll-reading");
  const scrollTask = document.getElementById("scroll-task");
  const pageTurn = document.getElementById("page-turn");
  const settingsSheet = document.getElementById("settings-sheet");
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let historyDepth = 0;   // how many history entries the reader has pushed

  function openDay(day, cardEl) {
    state.activeDay = day;
    document.getElementById("reading-body").innerHTML = AdventCal.renderReading(day, state.lang);
    document.getElementById("task-body").innerHTML = AdventCal.renderTask(day, state.lang);
    document.getElementById("to-task").addEventListener("click", goToTask);
    updateDoneBtn();

    history.pushState({ advent: "reading", day }, "");
    historyDepth = 1;

    lockScroll(true);
    reader.hidden = false;
    scrollTask.hidden = true;
    requestAnimationFrame(() => reader.classList.add("is-open"));

    if (cardEl && !reduceMotion()) {
      playOpening(cardEl, () => showScroll(scrollReading));
    } else {
      showScroll(scrollReading);
    }
  }

  // 1) The tapped card zooms out to the centre of the screen.
  // 2) Its front swings open like the page of a book.
  // 3) The scroll unrolls (onOpened).
  function playOpening(cardEl, onOpened) {
    const r = cardEl.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    let tw = Math.min(vw * 0.62, 280);
    let th = tw * r.height / r.width;
    if (th > vh * 0.62) { th = vh * 0.62; tw = th * r.width / r.height; }
    const tl = (vw - tw) / 2, tt = (vh - th) / 2;

    // The moving page is a copy of the card itself.
    const front = pageTurn.querySelector(".page-front");
    front.innerHTML = "";
    const copy = cardEl.cloneNode(true);
    copy.removeAttribute("id");
    copy.classList.remove("is-today");
    copy.setAttribute("tabindex", "-1");
    front.appendChild(copy);

    Object.assign(pageTurn.style, {
      left: tl + "px", top: tt + "px", width: tw + "px", height: th + "px"
    });
    pageTurn.hidden = false;
    cardEl.style.visibility = "hidden";

    const leaf = pageTurn.querySelector(".page-leaf");
    const zoom = pageTurn.animate([
      { transform: "translate(" + (r.left - tl) + "px," + (r.top - tt) + "px) scale(" + (r.width / tw) + ")" },
      { transform: "translate(0,0) scale(1)" }
    ], { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" });

    zoom.onfinish = () => {
      const turn = leaf.animate([
        { transform: "rotateY(0deg)" },
        { transform: "rotateY(-12deg) translateZ(30px)", offset: 0.15 },
        { transform: "rotateY(-178deg)" }
      ], { duration: 850, easing: "cubic-bezier(.45,.05,.3,1)", fill: "both" });
      const fade = pageTurn.animate([{ opacity: 1 }, { opacity: 1, offset: 0.65 }, { opacity: 0 }],
        { duration: 850, fill: "both" });
      setTimeout(onOpened, 380);
      turn.onfinish = () => {
        pageTurn.hidden = true;
        zoom.cancel(); turn.cancel(); fade.cancel();
        front.innerHTML = "";
        cardEl.style.visibility = "";
      };
    };
  }

  function showScroll(el) {
    el.hidden = false;
    el.classList.remove("is-rolling-up", "is-unrolling");
    el.querySelector(".scroll-paper").scrollTop = 0;
    void el.offsetWidth;
    el.classList.add("is-unrolling");
    const focusEl = el.querySelector(".scroll-close");
    setTimeout(() => focusEl && focusEl.focus({ preventScroll: true }), 50);
  }

  function hideScroll(el, done) {
    if (el.hidden) { done && done(); return; }
    if (reduceMotion()) { el.hidden = true; done && done(); return; }
    el.classList.remove("is-unrolling");
    el.classList.add("is-rolling-up");
    setTimeout(() => {
      el.hidden = true;
      el.classList.remove("is-rolling-up");
      done && done();
    }, 380);
  }

  function goToTask() {
    history.pushState({ advent: "task", day: state.activeDay }, "");
    historyDepth = 2;
    showTaskView();
  }
  function showTaskView() {
    hideScroll(scrollReading, () => showScroll(scrollTask));
  }
  function showReadingView() {
    hideScroll(scrollTask, () => showScroll(scrollReading));
  }

  // Close buttons / backdrop: unwind the history entries we added, so the
  // phone's Back button and our close button behave the same way.
  function requestClose() {
    if (historyDepth > 0) {
      history.go(-historyDepth);
      // Fallback: if the browser skips our history entries, close anyway.
      setTimeout(() => {
        if (!reader.hidden && reader.classList.contains("is-open") &&
            !(history.state && history.state.advent)) closeReader();
      }, 700);
    } else closeReader();
  }

  function closeReader() {
    historyDepth = 0;
    const open = !scrollTask.hidden ? scrollTask : scrollReading;
    hideScroll(open, () => {
      reader.classList.remove("is-open");
      setTimeout(() => {
        reader.hidden = true;
        scrollReading.hidden = true;
        scrollTask.hidden = true;
        lockScroll(false);
        const card = document.querySelector('.card[data-day="' + state.activeDay + '"]');
        if (card) card.focus({ preventScroll: true });
      }, 200);
    });
  }

  window.addEventListener("popstate", e => {
    if (reader.hidden) return;
    const s = e.state && e.state.advent;
    if (s === "task") { historyDepth = 2; showTaskView(); }
    else if (s === "reading") { historyDepth = 1; showReadingView(); }
    else closeReader();
  });

  function lockScroll(on) {
    document.documentElement.classList.toggle("no-scroll", on);
    document.body.classList.toggle("no-scroll", on);
  }

  function updateDoneBtn() {
    const dict = t();
    const btn = document.getElementById("day-done-btn");
    const done = state.done.has(state.activeDay);
    btn.classList.toggle("is-done", done);
    btn.querySelector(".star").innerHTML = done ? AdventCal.ICONS.star : AdventCal.ICONS.starOutline;
    btn.querySelector(".done-label").textContent = done ? dict.markedDone : dict.markDone;
  }

  // Marking the act as done shows the star briefly, then closes the scroll.
  // Tapping again on a day already done un-marks it.
  function toggleDone() {
    const d = state.activeDay;
    const btn = document.getElementById("day-done-btn");
    if (state.done.has(d)) {
      state.done.delete(d);
      saveDone(); updateDoneBtn(); renderHome();
      return;
    }
    state.done.add(d);
    saveDone();
    updateDoneBtn();
    btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop");
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled = false;
      renderHome();
      requestClose();
    }, 800);
  }

  // ---- Settings sheet ----------------------------------------------
  function openSheet(sheet) {
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add("is-open"));
    lockScroll(true);
  }
  function closeSheet(sheet) {
    sheet.classList.remove("is-open");
    lockScroll(false);
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

    // Reader
    document.getElementById("day-done-btn").addEventListener("click", toggleDone);
    document.getElementById("back-to-reading").addEventListener("click", () => history.back());
    reader.querySelectorAll("[data-close-reader]").forEach(el =>
      el.addEventListener("click", requestClose));

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
        if (!reader.hidden && state.activeDay) {
          document.getElementById("reading-body").innerHTML = AdventCal.renderReading(state.activeDay, state.lang);
          document.getElementById("task-body").innerHTML = AdventCal.renderTask(state.activeDay, state.lang);
          document.getElementById("to-task").addEventListener("click", goToTask);
          updateDoneBtn();
        }
      }));
    document.getElementById("reset-progress").addEventListener("click", resetProgress);
    document.getElementById("replay-intro").addEventListener("click", replayIntro);

    // Close sheets with Escape
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        if (!reader.hidden) requestClose();
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
