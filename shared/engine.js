(function () {
  var QA = window.QA, G = QA.G, MODE = QA.mode, HAS_INTRO = MODE === "landing";
  var GATE_ART = QA.GATE_ART, QUADS = QA.QUADS;
  document.body.classList.add("is-" + MODE);
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (!t || t.tagName !== "IMG") return;
    var n = +(t.getAttribute("data-retry") || 0);
    if (n >= 3) return;
    t.setAttribute("data-retry", n + 1);
    var base = t.getAttribute("src").split("&r=")[0];
    setTimeout(function () { t.setAttribute("src", base + (base.indexOf("?") < 0 ? "?" : "&") + "r=" + Date.now()); }, 1200 * (n + 1));
  }, true);
  var cascade = document.getElementById("cascade");
  var gatesEl = document.getElementById("gates");

  cascade.innerHTML = G.map(function (g, gi) {
    var t = g.tag || "h2";
    return '<section class="gate' + (g.closing ? " closing" : "") + '" data-g="' + gi + '" hidden>' + (g.topArt || '') +
      '<div class="gate-top"><div>' + (g.prompt ? '<span class="prompt-tag">Prompt ' + g.prompt + '</span>' : '') + (g.eyebrow ? '<p class="eyebrow">' + g.eyebrow + '</p>' : '') +
      (g.name ? '<' + t + ' class="gate-title">' + g.name + (g.time ? ' <span class="time-hint">' + g.time + '</span>' : '') + '</' + t + '>' : '') + '</div></div>' +
      '<div class="steps">' +
      g.steps.map(function (h, si) { return '<div class="step" data-s="' + si + '" hidden>' + h + '</div>'; }).join("") +
      '</div>' +
      '<div class="go"><button class="cue" type="button"><span class="cue-icon"><svg viewBox="0 0 29.11 24.00" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M0.02 0.91 0 1.91 0.05 2.71 0.05 5.05 0.02 6.29 0.03 12.37 0 14.91 0.03 22.74 0.26 22.94 0.48 23.03 1 23.15 2.6 23.29 7.86 23.6 11.58 23.75 14.77 23.92 20.03 23.98 23.09 23.98 25.34 23.92 28.25 23.94 28.54 23.91 28.86 23.92 29 23.85 29.05 20.34 29.09 11.14 29.08 5.68 29.02 4.22 28.89 2.82 28.71 1.58 28.58 1.26 28.46 0.75 28.23 0.72 27.66 0.72 26.86 0.68 23.65 0.38 21.12 0.22 17.25 0.05 14.35 0 10.68 0.09 6.43 0.32 0.51 0.77ZM28.72 13.15 28.71 19.52 28.66 23.43 28.63 23.57 28.02 23.6 24.92 23.58 22.66 23.65 20.58 23.65 19.29 23.62 15.69 23.6 14.14 23.55 13.92 23.52 14.05 23.35 15.83 22.08 22.22 17.74 26.49 14.71 27.97 13.71 28.68 13.15ZM0.37 12.26 0.38 12.25 1.11 12.86 3.72 15.31 5.63 17.05 7.68 18.85 12.69 23.15 12.94 23.46 12.65 23.48 11.42 23.4 8.32 23.28 3.17 22.98 1.08 22.82 0.77 22.75 0.4 22.63 0.37 22.6 0.34 19.86ZM0.34 1.37 0.35 1.35 2.51 3.54 4.08 4.97 7.74 8.11 11.88 11.55 12.6 12.12 11.48 12.15 4.95 12.14 2.57 12.06 1.14 11.97 0.48 11.89 0.4 11.91 0.37 11.88 0.35 7.12 0.4 3.06ZM28.29 1.32 28.45 2.09 28.57 3.03 28.68 4.34 28.72 5.35 28.75 9.15 28.74 12.32 28.71 12.35 20.45 12.15 13.62 12.12 15.2 11.02 17.38 9.38 19.57 7.66 22.89 4.97 25.17 3.23 26.75 2.11 27.82 1.4 28.02 1.29 28.26 1.29Z"/></svg></span><span class="sr"></span></button></div></section>' +
      (g.afterArt ? '<div class="after-art">' + g.afterArt + '</div>' : '');
  }).join("");

  gatesEl.innerHTML = G.map(function (g, i) {
    if ((HAS_INTRO && i === 0) || g.closing) return "";
    return '<li class="gate-seg" style="flex:' + g.steps.length + ' 1 0"><div class="bar" title="' + g.name + '"><div class="bar-fill"></div></div></li>';
  }).join("");

  var gateEls = [].slice.call(cascade.querySelectorAll(".gate"));
  var fills = [].slice.call(gatesEl.querySelectorAll(".bar-fill"));
  var stage = MODE === "prompt" ? "flow" : "title", skipped = false;
  var titleEl = document.getElementById("title"), flowEl = document.getElementById("flow");
  var titleArt = document.getElementById("title-art"); if (titleArt) titleArt.innerHTML = GATE_ART;
  var rg = 0, rs = 1, rt = 0; // rt: how many taps of a step's smaller reveals (data-t) are done

  function label() {
    var g = G[rg];
    if (rs < g.steps.length) return "Continue";
    if (MODE === "landing") return "Begin this week\u2019s prompt";
    if (G[rg + 1] && G[rg + 1].closing) return "Finish";
    if (rg < G.length - 1) return "Pass through to Gate " + (rg + 2);
    return "Back to the top";
  }

  // Hold the space the hidden pieces will fill, so anything below (like the gate drawing) never moves
  function reserveSpace(st) {
    [].slice.call(st.querySelectorAll(".reserve")).forEach(function (r) {
      r.style.minHeight = "0";
      var items = [].slice.call(r.querySelectorAll("[data-t]"));
      var was = items.map(function (el) { return el.hidden; });
      items.forEach(function (el) { el.hidden = false; });
      var h = r.offsetHeight;
      items.forEach(function (el, i) { el.hidden = was[i]; });
      r.style.minHeight = h + "px";
    });
  }
  // Size every drawing to the room its screen has: as big as will fit with everything else on that screen
  // (text, questions, the continue arrow) inside the viewport. Its longer side is never under 4.5rem, and its width never over 24rem.
  // Call after reserveSpace so the room held for the questions is counted.
  function artRatio(svg) {
    var vb = (svg.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number);
    return (vb.length === 4 && vb[3] > 0) ? vb[2] / vb[3] : 1;
  }
  function pageY(el) { var y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }
  function fitArt(st) {
    // a screen's graphic is either a line drawing or (on the last gate) the matrix
    var svg = st.querySelector(".gate-art:not(.fixed-art)"), mx = svg ? null : st.querySelector(".matrix-wrap");
    if ((!svg && !mx) || !st.offsetHeight) return;
    var wrap = svg ? svg.parentNode : mx, gate = st.closest(".gate");
    var ratio = 1;
    if (svg) ratio = artRatio(svg);
    else { var im = mx.querySelector("img"); ratio = (im && +im.getAttribute("height")) ? +im.getAttribute("width") / +im.getAttribute("height") : 1; }
    var rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    var minW = (svg ? 4.5 * Math.min(1, ratio) : 15) * rem, maxW = Math.min((svg ? 24 : 30) * rem, st.clientWidth, svg ? (svg.classList.contains("map-art") ? st.clientWidth : 0.45 * document.documentElement.clientWidth) : 1e9);
    // the first screen of a gate also carries the gate's title above it
    var head = (gate && gate.querySelector(".step") === st) ? pageY(st) - pageY(gate) : 0;
    var avail = window.innerHeight - 48 - 84 - head; // scroll margin above, continue arrow below
    var other = st.offsetHeight - wrap.offsetHeight; // everything on the screen except the graphic
    var w = Math.max(minW, Math.min(maxW, (avail - other - 2) * ratio));
    if (svg) svg.style.width = w + "px"; else mx.style.maxWidth = w + "px";
    checkFit(st, wrap, head);
  }
  // Drafting check: a screen is too long when its drawing, already at its smallest, would still end under the
  // phone's bottom toolbar once the screen is scrolled into place. Add ?check to any prompt URL to see a note
  // on the screen itself; the warning is also logged to the console.
  var SAFE_BOTTOM = 84; // room kept below the screen for the continue arrow and Safari's floating toolbar
  function checkFit(st, wrap, head) {
    var old = st.querySelector(".fit-warn"); if (old) old.remove();
    var bottom = 48 + head + (wrap.getBoundingClientRect().bottom - st.getBoundingClientRect().top);
    var over = Math.round(bottom - (window.innerHeight - SAFE_BOTTOM));
    if (over <= 0) return;
    var lines = Math.max(1, Math.ceil(over / 28));
    var msg = "Too long: even with the smallest drawing, this screen runs about " + lines + " line" + (lines > 1 ? "s" : "") + " (" + over + "px) past the safe area on this device. Shorten the text.";
    try { console.warn("[fit] " + msg, st); } catch (e) {}
    if (/[?&]check\b/.test(location.search)) {
      var n = document.createElement("p");
      n.className = "fit-warn";
      n.style.cssText = "margin:0;padding:.5rem .7rem;border:2px dashed #c0392b;color:#c0392b;font:600 .85rem/1.3 sans-serif;border-radius:4px";
      n.textContent = msg;
      st.insertBefore(n, st.firstChild);
    }
  }
  // The title screen has no arrow or scrolling: its drawing fills what is left of the viewport
  function fitTitle() {
    if (!titleEl) return;
    var svg = titleEl.querySelector(".gate-art");
    if (!svg || titleEl.hidden) return;
    var rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    var minW = 5.44 * rem, maxW = Math.min(10.88 * rem, titleEl.clientWidth);
    svg.style.width = minW + "px";
    titleEl.style.minHeight = "0";
    var content = titleEl.offsetHeight;
    titleEl.style.minHeight = "";
    var other = content - svg.parentNode.offsetHeight;
    var w = Math.max(minW, Math.min(maxW, (window.innerHeight - 64 - other) * artRatio(svg)));
    svg.style.width = w + "px";
  }
  function remeasure() {
    var cur = gateEls[rg] && gateEls[rg].querySelectorAll(".step")[rs - 1];
    [].slice.call(cascade.querySelectorAll(".step")).forEach(function (st) {
      if (st.hidden || !st.offsetHeight) return;
      if (st === cur && rt !== 0) return; // mid-reveal: wait until the screen is whole
      reserveSpace(st); fitArt(st);
    });
    fitTitle();
  }
  window.addEventListener("resize", remeasure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);

  var aimT = 0;
  function sync() {
    var topBar = document.querySelector(".top");
    if (topBar) topBar.classList.toggle("is-off", MODE === "landing");
    // The big opening-screen sizing stays until that screen has scrolled off the top, so nothing visibly shrinks mid-scroll.
    var aimWant = MODE === "prompt" && rg === 0 && rs === 1 && !!G[0].aim, bd = document.body;
    if (aimWant) { if (aimT) { clearInterval(aimT); aimT = 0; } bd.classList.add("aim-only"); }
    else if (bd.classList.contains("aim-only") && !aimT) {
      var aimT0 = Date.now(), aimFirst = gateEls[0] && gateEls[0].querySelector(".step");
      aimT = setInterval(function () {
        var off = !aimFirst || aimFirst.getBoundingClientRect().bottom <= 0;
        if (!off && Date.now() - aimT0 < 2600) return;
        clearInterval(aimT); aimT = 0;
        var cur = gateEls[rg] && gateEls[rg].querySelectorAll(".step")[rs - 1];
        var before = cur ? cur.getBoundingClientRect().top : 0;
        bd.classList.remove("aim-only");
        var after = cur ? cur.getBoundingClientRect().top : 0;
        if (cur && Math.abs(after - before) > 0.5) {
          if (window.__noodleShift) window.__noodleShift(after - before);
          window.scrollBy({ top: after - before, left: 0, behavior: "instant" });
        }
      }, 50);
    }
    gateEls.forEach(function (ge, g) {
      ge.hidden = g > rg;
      [].slice.call(ge.querySelectorAll(".step")).forEach(function (st, si) {
        var show = g < rg ? true : (g === rg && si < rs);
        st.hidden = !show;
        st.classList.toggle("is-past", g === rg && si < rs - 1);
        st.classList.toggle("tight", g < rg || (g === rg && (si < rs - 1 || (si === rs - 1 && !!st._landed))));
        var current = g === rg && si === rs - 1;
        // A screen that was just left lays out all its rotated lines only after the scroll away from it has finished,
        // so the change happens off screen.
        if (current) { clearTimeout(st._ft); st._ft = 0; st.classList.add("live"); }
        var deferFinal = !current && show && st.classList.contains("live");
        if (deferFinal) {
          if (!st._ft) st._ft = setTimeout(function () {
            st._ft = 0; st.classList.remove("live");
            // Laying out the finished screen changes its height; keep the screen being read exactly where it is
            var cur = gateEls[rg] && gateEls[rg].querySelectorAll(".step")[rs - 1];
            var before = cur ? cur.getBoundingClientRect().top : 0;
            sync();
            var after = cur ? cur.getBoundingClientRect().top : 0;
            if (cur && Math.abs(after - before) > 0.5 && window.__noodleShift) window.__noodleShift(after - before);
            if (cur && Math.abs(after - before) > 0.5) window.scrollBy({ top: after - before, left: 0, behavior: "instant" });
          }, 1300);
        } else {
          st.classList.toggle("done", show && !current);
        }
        [].slice.call(st.querySelectorAll("[data-t]")).forEach(function (el) {
          var t = +el.getAttribute("data-t");
          var swap = el.hasAttribute("data-swap");
          if (swap && !current) {
            if (deferFinal) return;
            // lines that replace each other: a finished screen lays them all out in order; a screen not reached yet shows none
            el.classList.remove("leaving");
            el.hidden = !show;
            return;
          }
          var nx = el.nextElementSibling;
          var replaced = current && swap && !!nx && nx.hasAttribute("data-swap") && +nx.getAttribute("data-t") <= rt;
          var hide = current && (t > rt || replaced);
          if (replaced && !el.hidden) {
            // a line being replaced fades out first, then steps aside
            el.classList.add("leaving");
            setTimeout(function () { if (el.classList.contains("leaving")) { el.hidden = true; el.classList.remove("leaving"); } }, 420);
          } else if (!hide) { el.classList.remove("leaving"); el.hidden = false; }
          else if (!el.classList.contains("leaving")) { el.hidden = true; }
        });
        if (current && rt === 0) { reserveSpace(st); fitArt(st); }
      });
      var go = ge.querySelector(".go");
      // The chevron shows whenever the next tap moves to a new screen (next step or next card), not while smaller reveals remain
      var wasHidden = go.hidden;
      go.hidden = g !== rg || (MODE === "prompt" && g === G.length - 1) || pendingTaps() > 0;
      // The chevron arrives together with the last thing to appear on the screen (not before it, and not after it)
      if (g === rg && !go.hidden) {
        var cs = ge.querySelectorAll(".step")[rs - 1], d = 0;
        if (cs) [].slice.call(cs.querySelectorAll(".seq, .w, .late")).forEach(function (el) {
          if (el.closest("[hidden]") || el.classList.contains("leaving")) return;
          var c = getComputedStyle(el);
          if (c.animationName === "none") return;
          var v = parseFloat(c.animationDelay) || 0;
          if (v > d) d = v;
        });
        var key = rg + "|" + rs + "|" + rt;
        d += 0.5; // chevron comes in half a second after the last thing appears
        if (d > 0.2) {
          go.style.setProperty("--gd", d + "s");
          if (go._lateKey !== key || wasHidden) { go.removeAttribute("data-late"); void go.offsetWidth; go._lateKey = key; }
          go.setAttribute("data-late", "");
        } else { go._lateKey = key; go.removeAttribute("data-late"); }
      }
      if (g === rg) {
        var cue = go.firstChild;
        cue.querySelector(".sr").textContent = label();
        cue.classList.toggle("up", MODE === "prompt" && rg === G.length - 1);
      }
    });
    fills.forEach(function (f, k) {
      var i = k + (HAS_INTRO ? 1 : 0), n = G[i].steps.length;
      var pct = i < rg ? 100 : (i === rg ? Math.round((rs / n) * 100) : 0);
      f.style.width = pct + "%";
    });
    fitTitle();
  }

  // A slower, gentler scroll than the browser's own: eases in and out over about a second. The target is re-read every
  // frame, so the page re-flowing while we travel (a finished screen laying itself out) can't throw it off.
  var glideRaf = 0;
  function targetTop(el) {
    var sp = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    var sm = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    return el.getBoundingClientRect().top + window.scrollY - sp - sm;
  }
  function glideTo(el, done) {
    if (glideRaf) cancelAnimationFrame(glideRaf);
    var d0 = targetTop(el) - window.scrollY;
    if (Math.abs(d0) < 2) { if (done) done(); return; }
    var dur = Math.max(900, Math.min(1900, 800 + Math.abs(d0) * 0.55)), t0 = 0;
    function stop() { if (glideRaf) cancelAnimationFrame(glideRaf); glideRaf = 0; ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (n) { window.removeEventListener(n, stop); }); }
    ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (n) { window.addEventListener(n, stop, { passive: true }); });
    function frame(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur);
      var e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; // ease in and out
      window.scrollTo({ top: targetTop(el) - d0 * (1 - e), left: 0, behavior: "instant" });
      if (k < 1) glideRaf = requestAnimationFrame(frame); else { stop(); if (done) done(); }
    }
    glideRaf = requestAnimationFrame(frame);
  }

  // Keep one element exactly where it is on screen while layout above it changes (gaps collapsing)
  function holdSteady(el, change) {
    var seen = !!(el && el.getClientRects().length);
    var before = seen ? el.getBoundingClientRect().top : 0;
    change();
    var after = (seen && el.getClientRects().length) ? el.getBoundingClientRect().top : before;
    if (seen && Math.abs(after - before) > 0.5) {
      if (window.__noodleShift) window.__noodleShift(after - before);
      window.scrollBy({ top: after - before, left: 0, behavior: "instant" });
    }
  }
  // Once a screen has landed, its big arrival gap is no longer needed: collapse it so scrolling back up is compact
  function landed(el) {
    var cur = gateEls[rg] && gateEls[rg].querySelectorAll(".step")[rs - 1];
    if (!el || el !== cur || el.classList.contains("tight")) return;
    el._landed = true;
    holdSteady(el, function () { el.classList.add("tight"); });
  }

  function scrollTo(target, isGate) {
    requestAnimationFrame(function () {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var onLand = isGate ? null : function () { landed(target); };
      try { if (reduce) { target.scrollIntoView({ behavior: "auto", block: "start" }); if (onLand) setTimeout(onLand, 60); } else glideTo(target, onLand); }
      catch (e) { target.scrollIntoView(); }
      var h = target.querySelector(isGate ? ".gate-title" : "h3");
      if (h) { h.setAttribute("tabindex", "-1"); try { h.focus({ preventScroll: true }); } catch (e) {} }
    });
  }

  function pendingTaps() {
    var st = gateEls[rg].querySelectorAll(".step")[rs - 1], max = 0;
    [].slice.call(st.querySelectorAll("[data-t]")).forEach(function (el) {
      max = Math.max(max, +el.getAttribute("data-t"));
    });
    return max - rt;
  }

  // From "Let's begin" into the prompt: scroll the screen up and away like every other transition, then open the prompt page,
  // which rises into place from below (see the arrival block at the end of this file).
  var leaving = false;
  function leaveUp() {
    if (leaving) return; leaving = true;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var flow = document.getElementById("flow");
    if (reduce || !QA.dest || !flow) { QA.goToPrompt(); return; }
    try { sessionStorage.setItem("qa-rise", String(Date.now())); } catch (err) {}
    // One continuous motion: this screen accelerates up and away, and the prompt page decelerates into place from below.
    var y0 = window.scrollY, dist = window.innerHeight, t0 = 0, DUR = 650, fired = false;
    flow.style.paddingBottom = dist + "px"; // room to scroll into
    function go() { if (fired) return; fired = true; QA.goToPrompt(); }
    function frame(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / DUR);
      window.scrollTo({ top: y0 + dist * k * k, left: 0, behavior: "instant" });
      if (k < 1) requestAnimationFrame(frame); else go();
    }
    requestAnimationFrame(frame);
    setTimeout(go, 1500);
  }

  // Screen readers: announce text that appears after a tap (a polite live region), since nothing else tells them it arrived
  var live = document.createElement("div");
  live.className = "sr"; live.setAttribute("role", "status"); live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);
  function announce(t) {
    t = (t || "").replace(/\s+/g, " ").trim();
    if (!t) return;
    live.textContent = "";
    setTimeout(function () { live.textContent = t; }, 60);
  }
  function announceScreen() { // the whole screen we just moved to, once it has had time to show
    setTimeout(function () {
      var st = gateEls[rg] && gateEls[rg].querySelectorAll(".step")[rs - 1];
      if (st) announce(st.innerText);
    }, 900);
  }
  // True when this screen's content runs below the bottom of the window, so Space and Down arrow should scroll instead of advance
  function moreBelow() {
    var st = gateEls[rg] && gateEls[rg].querySelectorAll(".step")[rs - 1];
    if (!st) return false;
    var r = document.createRange(); r.selectNodeContents(st);
    return r.getBoundingClientRect().bottom > window.innerHeight - 4;
  }

  function advance() {
    var g = G[rg];
    if (pendingTaps() > 0) {
      rt++;
      sync();
      var stR = gateEls[rg].querySelectorAll(".step")[rs - 1];
      announce([].slice.call(stR.querySelectorAll('[data-t="' + rt + '"]')).map(function (el) { return el.innerText; }).join(" "));
      return;
    }
    rt = 0;
    if (rs < g.steps.length) {
      var leftEl = gateEls[rg].querySelectorAll(".step")[rs - 1];
      rs++;
      holdSteady(leftEl, sync);
      scrollTo(gateEls[rg].querySelectorAll(".step")[rs - 1], false);
      announceScreen();
    } else if (MODE === "landing") {
      leaveUp();
    } else if (rg < G.length - 1) {
      var leftLast = gateEls[rg].querySelectorAll(".step")[rs - 1];
      rg++;
      rs = 1;
      holdSteady(leftLast, sync);
      scrollTo(gateEls[rg], true);
      announceScreen();
    } else {
      window.scrollTo(0, 0);
    }
  }

  cascade.addEventListener("click", function (e) {
    var go = e.target.closest(".go .cue");
    if (go) { advance(); return; }
    if (e.target.closest("a.skiplink")) { e.preventDefault(); return; }
    var sl = e.target.closest("a.steplink");
    if (sl) {
      e.preventDefault();
      var tgt = gateEls[+sl.getAttribute("data-g")].querySelectorAll(".step")[+sl.getAttribute("data-s")];
      if (tgt && !tgt.hidden) {
        var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        try { tgt.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); } catch (err) { tgt.scrollIntoView(); }
        var hd = tgt.querySelector("h3");
        if (hd) { hd.setAttribute("tabindex", "-1"); try { hd.focus({ preventScroll: true }); } catch (err) {} }
      }
      return;
    }
    var q = e.target.closest(".quad");
    if (q) {
      var wrap = q.parentNode, info = document.getElementById("quad-info");
      var on = q.getAttribute("aria-pressed") === "true";
      [].slice.call(wrap.querySelectorAll(".quad")).forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
      wrap.classList.remove("has-sel");
      if (on) {
        info.textContent = "";
      } else {
        var d = QUADS[q.getAttribute("data-q")];
        q.setAttribute("aria-pressed", "true");
        wrap.classList.add("has-sel");
        info.textContent = d.name + " " + d.text;
      }
      return;
    }
    var b = e.target.closest(".stuck-btn");
    if (b) {
      var p = document.getElementById(b.getAttribute("aria-controls"));
      var open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", open ? "false" : "true");
      p.hidden = open;
    }
  });

  // Tap anywhere to continue. Skips controls, text selection, and the last card (so a stray tap never restarts).
  document.addEventListener("click", function (e) {
    if (stage === "title") {
      if (!QA.dest || e.target.closest("#skip, #past")) return;
      enter(false);
      return;
    }
    if (e.target.closest("button, summary, a, input, textarea, select, label")) return;
    if (stage === "title" || (MODE === "prompt" && rg >= G.length - 1)) return;
    // A selection this tap just made (a drag, a double-tap) is left alone. A leftover one from before is cleared and the tap goes through.
    var s = window.getSelection && window.getSelection();
    if (s && String(s)) {
      var dragged = tapDown && Math.hypot(e.clientX - tapDown.x, e.clientY - tapDown.y) > 6;
      if (dragged || !tapDown || !tapDown.sel) return;
      s.removeAllRanges();
    }
    advance();
  });

  // Remember where each tap began, and whether text was already selected then
  var tapDown = null;
  document.addEventListener("pointerdown", function (e) {
    var s = window.getSelection && window.getSelection();
    tapDown = { x: e.clientX, y: e.clientY, sel: !!(s && String(s)) };
  }, true);

  // Keyboard: Space, Enter or Down arrow moves forward, like a tap. Buttons, links and form fields keep their own keys.
  document.addEventListener("keydown", function (e) {
    if (e.defaultPrevented || e.repeat || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    if (e.key !== " " && e.key !== "Enter" && e.key !== "ArrowDown") return;
    if (e.target.closest && e.target.closest("button, summary, a, input, textarea, select, [contenteditable]")) return;
    if (stage === "title") {
      if (!QA.dest) return;
      e.preventDefault();
      setTimeout(function () { enter(false); }, 0);
      return;
    }
    if (MODE === "prompt" && rg >= G.length - 1) return;
    if (e.key !== "Enter" && moreBelow()) return; // more to read below: let the key scroll
    e.preventDefault();
    setTimeout(advance, 0); // after this key press finishes, so the scroll glide is not cancelled by it
  });

  function enter(skip) {
    if (skip) { QA.goToPrompt(); return; }
    stage = "flow"; skipped = false;
    var tapNote = document.getElementById("tap-note");
    if (tapNote) tapNote.innerHTML = "Scroll up at any time<br>to revisit earlier screens";
    rg = 0; rs = 1; rt = 0;
    flowEl.hidden = false;
    sync();
    scrollTo(gateEls[rg], true);
    announceScreen();
  }
  var skipBtn = document.getElementById("skip");
  if (skipBtn) skipBtn.addEventListener("click", function () { enter(true); });

  if (MODE === "prompt") flowEl.hidden = false;
  sync();
})();

/* Try-it line trace: lit line travels through the four gates, pausing at each. Driven from JS (CSS animation inside an SVG mask does not repaint reliably in Safari). */
(function () {
  var KEYS = [[0, 100], [100, 0]];
  var DUR = 4500, DELAY = 500;
  function ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
  function offsetAt(p) {
    for (var i = 1; i < KEYS.length; i++) {
      if (p <= KEYS[i][0]) {
        var a = KEYS[i - 1], b = KEYS[i], f = (p - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * ease(f);
      }
    }
    return 0;
  }
  function run(svg) {
    var path = svg.querySelector('.map-reveal'), t0 = null;
    if (!path) return;
    function tick(now) {
      if (svg.closest('.step.done')) return;
      if (t0 === null) t0 = now + DELAY;
      var p = Math.max(0, Math.min(1, (now - t0) / DUR)) * 100;
      var o = offsetAt(p);
      path.style.strokeDashoffset = o;
      path.setAttribute('stroke-dashoffset', o); // nudge repaint
      if (p >= 50) { var cs = svg.closest('.center-screen'); if (cs) cs.classList.add('half'); } // the text below arrives when the line is halfway
      if (p < 100) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = setInterval(function () {
    var s = document.querySelector('.map-art');
    if (!s) return;
    if (reduce) { clearInterval(t); return; }
    var r = s.getBoundingClientRect(), h = window.innerHeight;
    if (r.top > 0 && r.bottom < h) { clearInterval(t); s.classList.add('seen'); run(s); }
  }, 150);
})();

/* Charge drawing: play its jolt once the drawing is actually on screen (the screen unlocks before the scroll arrives). */
(function () {
  var t = setInterval(function () {
    var s = document.querySelector('.charge-art');
    if (!s) return;
    if (s.classList.contains('seen')) { clearInterval(t); return; }
    var r = s.getBoundingClientRect(), h = window.innerHeight;
    if (r.top > 0 && r.bottom < h) s.classList.add('seen');
  }, 150);
})();


/* Highlight strokes start as soon as their screen reaches the top of the viewport. */
(function () {
  function check() {
    [].forEach.call(document.querySelectorAll(".hl:not(.hl-go)"), function (el) {
      var st = el.closest(".step") || el;
      var r = st.getBoundingClientRect();
      if (r.height > 0 && r.top <= 160 && r.bottom > 0) el.classList.add("hl-go");
    });
  }
  setInterval(check, 60);
  window.addEventListener("scroll", check, { passive: true });
})();



/* Arriving from "Let's begin": the prompt rises up into place from below, continuing the scroll the landing page started. */
(function () {
  var t = 0;
  try { t = +sessionStorage.getItem("qa-rise") || 0; sessionStorage.removeItem("qa-rise"); } catch (err) {}
  if (!t || Date.now() - t > 8000 || !window.QA || QA.mode !== "prompt") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var w = document.querySelector(".wrap");
  if (!w) return;
  var h = window.innerHeight, DUR = 800, t0 = 0;
  w.style.transform = "translateY(" + h + "px)";
  document.body.classList.add("rising");
  function frame(ts) {
    if (!t0) t0 = ts;
    var k = Math.min(1, (ts - t0) / DUR), inv = 1 - k;
    w.style.transform = k < 1 ? "translateY(" + Math.round(h * inv * inv * inv) + "px)" : "";
    if (k >= 1) document.body.classList.remove("rising");
    if (k < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* Landing page: warm the prompt page in the cache so it opens instantly after "Let's begin". */
(function () {
  if (!window.QA || QA.mode !== "landing" || !QA.dest) return;
  setTimeout(function () { try { fetch(QA.dest, { credentials: "same-origin" }).catch(function () {}); } catch (err) {} }, 1500);
})();
