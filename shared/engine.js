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
      (g.name ? '<' + t + ' class="gate-title">' + g.name + '</' + t + '>' : '') + '</div></div>' +
      '<div class="steps">' +
      g.steps.map(function (h, si) { return '<div class="step" data-s="' + si + '" hidden>' + h + '</div>'; }).join("") +
      '</div>' +
      '<div class="go"><button class="cue" type="button"><span class="cue-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span><span class="sr"></span></button></div></section>' +
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
    var minW = (svg ? 4.5 * Math.min(1, ratio) : 15) * rem, maxW = Math.min((svg ? 24 : 30) * rem, st.clientWidth, svg ? 0.45 * document.documentElement.clientWidth : 1e9);
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

  function sync() {
    var topBar = document.querySelector(".top");
    if (topBar) topBar.classList.toggle("is-off", MODE === "landing");
    document.body.classList.toggle("aim-only", MODE === "prompt" && rg === 0 && rs === 1 && !!G[0].aim);
    gateEls.forEach(function (ge, g) {
      ge.hidden = g > rg;
      [].slice.call(ge.querySelectorAll(".step")).forEach(function (st, si) {
        var show = g < rg ? true : (g === rg && si < rs);
        st.hidden = !show;
        st.classList.toggle("is-past", g === rg && si < rs - 1);
        var current = g === rg && si === rs - 1;
        [].slice.call(st.querySelectorAll("[data-t]")).forEach(function (el) {
          el.hidden = current && +el.getAttribute("data-t") > rt;
        });
        if (current && rt === 0) { reserveSpace(st); fitArt(st); }
      });
      var go = ge.querySelector(".go");
      // The chevron shows whenever the next tap moves to a new screen (next step or next card), not while smaller reveals remain
      go.hidden = g !== rg || (MODE === "prompt" && g === G.length - 1) || pendingTaps() > 0;
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

  function scrollTo(target, isGate) {
    requestAnimationFrame(function () {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      try { target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }
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

  function advance() {
    var g = G[rg];
    if (pendingTaps() > 0) {
      rt++;
      sync();
      return;
    }
    rt = 0;
    if (rs < g.steps.length) {
      rs++;
      sync();
      scrollTo(gateEls[rg].querySelectorAll(".step")[rs - 1], false);
    } else if (MODE === "landing") {
      QA.goToPrompt();
    } else if (rg < G.length - 1) {
      rg++;
      rs = 1;
      sync();
      scrollTo(gateEls[rg], true);
    } else {
      window.scrollTo(0, 0);
    }
  }

  cascade.addEventListener("click", function (e) {
    var go = e.target.closest(".go .cue");
    if (go) { advance(); return; }
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
    var sel = window.getSelection && String(window.getSelection());
    if (sel) return;
    advance();
  });

  function enter(skip) {
    if (skip) { QA.goToPrompt(); return; }
    stage = "flow"; skipped = false;
    rg = 0; rs = 1; rt = 0;
    flowEl.hidden = false;
    sync();
    scrollTo(gateEls[rg], true);
  }
  var skipBtn = document.getElementById("skip");
  if (skipBtn) skipBtn.addEventListener("click", function () { enter(true); });

  // Wandering line: one line that slowly draws itself from the top of the page to the bottom.
  // They sit behind everything and draw themselves downward as you scroll.
  (function () {
    var svg = document.getElementById("noodle");
    if (!svg) return;
    var NS = "http://www.w3.org/2000/svg";
    var STEP = 3, paths = [], builtW = 0, builtLen = 0;

    function sm(x) { x = x < 0 ? 0 : (x > 1 ? 1 : x); return x * x * (3 - 2 * x); }
    function burst(t, f, ph) {
      var e = Math.max(0, (Math.sin(t * f - ph) - 0.3) / 0.7);
      return e * e * (3 - 2 * e);
    }

    // Drawings the line must stay clear of (measured live, in page coordinates).
    var obs = [], obsSig = "", cEnd = null;
    function measure() {
      var list = [], sy = window.scrollY, sx = window.scrollX;
      Array.prototype.forEach.call(document.querySelectorAll(".gate-art, img.matrix, .sense-chart"), function (el) {
        var r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) return;
        list.push({ top: r.top + sy, bottom: r.bottom + sy, left: r.left + sx, right: r.right + sx });
      });
      return list;
    }
    function avoid(x, y, base) {
      var PAD = 95, RAMP = 380, i, o, dist, wt, tx;
      for (i = 0; i < obs.length; i++) {
        o = obs[i];
        dist = Math.max(0, o.top - y, y - o.bottom);
        if (dist >= RAMP) continue;
        wt = 1 - sm(dist / RAMP);
        var mid = base((o.top + o.bottom) / 2);
        tx = (mid < (o.left + o.right) / 2) ? Math.min(x, o.left - PAD) : Math.max(x, o.right + PAD);
        x = x * (1 - wt) + tx * wt;
      }
      return x;
    }

    // One line runs the length of the page, with a few loose loops in it.
    function specs(w) {
      var cx = w / 2, A = Math.min(w * 0.3, 170);
      return [{
        t0: 0, sw: 7, op: 0.09, loop: { f: 0.0042, ph: 1.4, R: 34, wv: 0.05 },
        x: function (t) { return avoid(base(t), t - 20, base); }
      }];
      function base(t) {
          var m = cx + A * 1.1 * Math.sin(t * 0.0036 + 0.6) + A * 0.3 * Math.sin(t * 0.0089);
          var H = Math.min(window.innerHeight || 800, 900);
          var s = sm((t - 0.44 * H) / (0.4 * H)), d = w * 0.18 + (w * 0.82 - w * 0.18) * s + 8 * Math.sin(t * 0.008);
          return d * (1 - sm((t - H) / 700)) + m * sm((t - H) / 700);
      }
    }

    // Opening or closing "Want to see an example?" resizes the page, which would redraw the line around the shifted drawings.
    // Hold the line still until the next tap that isn't on the example.
    var holdLine = false;
    document.addEventListener("click", function (e) { holdLine = !!(e.target && e.target.closest && e.target.closest(".ex-fold")); }, true);
    function build() {
      if (holdLine && paths.length) return;
      var w = document.documentElement.clientWidth, need = Math.max(6000, document.body.offsetHeight + 1500);
      var nobs = measure(), cl = document.querySelector(".gate.closing"), cRect = (cl && !cl.hidden) ? cl.getBoundingClientRect() : null;
      cEnd = (cRect && cRect.height > 4) ? Math.round(cRect.bottom + window.scrollY) : null;
      var sig = cEnd + "|" + JSON.stringify(nobs.map(function (o) { return [o.top, o.bottom, o.left, o.right].map(Math.round); }));
      if (w === builtW && need <= builtLen && sig === obsSig) return;
      obs = nobs; obsSig = sig;
      builtW = w; builtLen = need + 4000; // draw the path long, so it only rebuilds when the page outgrows it
      var bits = document.getElementById("noodle-bits");
      if (bits) bits.innerHTML = "";
      paths.forEach(function (p) { if (p.el.parentNode) p.el.parentNode.removeChild(p.el); });
      paths = [];
      var endT = builtLen;
      specs(w).forEach(function (s) {
        var t1 = cEnd ? cEnd - 60 : Math.min(s.t1 || endT, endT);
        if (t1 <= s.t0) return;
        var n = Math.ceil((t1 - s.t0) / STEP), d = "", cum = [0], len = 0, px = 0, py = 0, i, t, e, x, y;
        // Loop-de-loops: round, whole loops placed where no drawing is nearby
        var LR = 42, LL = 170, loops = [], tc, dirn = 1, ok, oi;
        var lastTc = -9999;
        for (tc = 500; tc < (cEnd ? cEnd - LL / 2 - LR - 30 : endT); tc += 30) {
          if (tc - lastTc < 750) continue;
          ok = true;
          for (oi = 0; oi < obs.length; oi++) if (obs[oi].bottom + 30 > tc - LL / 2 - LR && obs[oi].top - 30 < tc + LL / 2 + LR) { ok = false; break; }
          if (ok) { loops.push({ tc: tc, dir: dirn }); dirn = -dirn; lastTc = tc; }
        }
        var xs = [], hist = [];
        var pass, hw = 44, k, sum, cnt, ys, N2 = n + hw;
        for (i = 0; i <= N2; i++) xs.push(s.x(s.t0 + i * STEP)); // sampled a little past the end, so smoothing has no edge effect at the tip
        // Round off any sharp corners: a few passes of smoothing along the line, about 130px each way
        for (pass = 0; pass < 3; pass++) {
          ys = xs.slice();
          for (i = 0; i <= N2; i++) {
            sum = 0; cnt = 0;
            for (k = -hw; k <= hw; k++) { var j = i + k; j = j < 0 ? 0 : (j > N2 ? N2 : j); sum += ys[j]; cnt++; }
            xs[i] = sum / cnt;
          }
        }
        for (i = 0; i <= n; i++) {
          t = s.t0 + i * STEP;
          x = xs[i]; y = t - 20;
          if (cEnd) { var du = (t - cEnd + 60) / 400; du = du < 0 ? 0 : (du > 1 ? 1 : du); x += Math.min(w * 0.24, 90) * du * du * (3 - 2 * du); var e2 = (t - (cEnd + 320)) / 130; e2 = e2 < 0 ? 0 : (e2 > 1 ? 1 : e2); x += 95 * e2 * e2; x = Math.min(x, w - 20); }
          for (var q = 0; q < loops.length; q++) {
            var lp = loops[q];
            var lR = lp.R || LR, lL = lp.L || LL;
            if (t > lp.tc - lL / 2 && t < lp.tc + lL / 2) {
              var ph = 2 * Math.PI * sm((t - lp.tc + lL / 2) / lL);
              x += lp.dir * lR * Math.sin(ph);
              y -= lR * (1 - Math.cos(ph));
            }
          }
          d += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1);
          if (i > 0) { len += Math.sqrt((x - px) * (x - px) + (y - py) * (y - py)); cum.push(len); }
          px = x; py = y; hist.push(x, y);
        }
        if (cEnd && hist.length > 14) {
          // Below the card the thread follows a hand-drawn route: a small hook, a long swoop to the left, then a big loop
          // and a flick to the right. Control points are measured from where the thread leaves the card, and joined with a smooth curve.
          var CPR = [[0, 4], [29, 23], [32, 50], [4, 74], [-42, 120], [-56, 167], [-51, 217], [-23, 260], [17, 270], [72, 264], [114, 239], [123, 205], [110, 175], [80, 168], [55, 167], [45, 196], [46, 255], [55, 289], [80, 319], [123, 324]];
          var cp = [[px, py]], ci, cx0 = px;
          var rMin = 0, rMax = 0, lo = w * 0.14, hi = w * 0.86, shiftX = 0, ramp;
          for (ci = 0; ci < CPR.length; ci++) { rMin = Math.min(rMin, CPR[ci][0]); rMax = Math.max(rMax, CPR[ci][0]); }
          if (cx0 + rMax > hi) shiftX = hi - (cx0 + rMax);
          if (cx0 + rMin + shiftX < lo) shiftX = lo - (cx0 + rMin);
          for (ci = 0; ci < CPR.length; ci++) {
            ramp = Math.min(1, (ci + 1) / 6); ramp = ramp * ramp * (3 - 2 * ramp);
            cp.push([Math.min(w - 20, Math.max(20, cx0 + CPR[ci][0] + shiftX * ramp)), cEnd + CPR[ci][1]]);
          }
          var seg, cu, cs, cN, cP0, cP1, cP2, cP3, cu2, cu3, cqx, cqy, sp = [[px, py]], si, sj, sk, ax, ay, sq;
          for (seg = 0; seg < cp.length - 1; seg++) {
            cP0 = cp[Math.max(0, seg - 1)]; cP1 = cp[seg]; cP2 = cp[seg + 1]; cP3 = cp[Math.min(cp.length - 1, seg + 2)];
            cN = Math.max(2, Math.ceil(Math.sqrt((cP2[0] - cP1[0]) * (cP2[0] - cP1[0]) + (cP2[1] - cP1[1]) * (cP2[1] - cP1[1])) / 2));
            for (cs = 1; cs <= cN; cs++) {
              cu = cs / cN; cu2 = cu * cu; cu3 = cu2 * cu;
              cqx = 0.5 * ((2 * cP1[0]) + (-cP0[0] + cP2[0]) * cu + (2 * cP0[0] - 5 * cP1[0] + 4 * cP2[0] - cP3[0]) * cu2 + (-cP0[0] + 3 * cP1[0] - 3 * cP2[0] + cP3[0]) * cu3);
              cqy = 0.5 * ((2 * cP1[1]) + (-cP0[1] + cP2[1]) * cu + (2 * cP0[1] - 5 * cP1[1] + 4 * cP2[1] - cP3[1]) * cu2 + (-cP0[1] + 3 * cP1[1] - 3 * cP2[1] + cP3[1]) * cu3);
              sp.push([cqx, cqy]);
            }
          }
          // Relax the route a little so the curves read as soft, flowing lines (ends stay put)
          for (sk = 0; sk < 14; sk++) {
            sq = sp.map(function (q) { return [q[0], q[1]]; });
            for (si = 3; si < sp.length - 3; si++) {
              ax = 0; ay = 0;
              for (sj = -3; sj <= 3; sj++) { ax += sq[si + sj][0]; ay += sq[si + sj][1]; }
              sp[si][0] = ax / 7; sp[si][1] = ay / 7;
            }
          }
          for (si = 1; si < sp.length; si++) {
            d += "L" + sp[si][0].toFixed(1) + " " + sp[si][1].toFixed(1);
            len += Math.sqrt((sp[si][0] - px) * (sp[si][0] - px) + (sp[si][1] - py) * (sp[si][1] - py)); cum.push(len);
            px = sp[si][0]; py = sp[si][1];
          }
        }
        if (false && cEnd && bits) {
          // An unthreaded needle waits below the card, just past where the thread stops
          var g = document.createElementNS(NS, "g");
          g.setAttribute("transform", "translate(" + (px + 24).toFixed(1) + " " + (py + 14).toFixed(1) + ") rotate(-58) scale(0.7)");
          g.setAttribute("style", "color:var(--muted)");
          g.innerHTML = '<path d="M -6 10 L -6 -2 Q -6 -16 0 -16 Q 6 -16 6 -2 L 6 10 L 1.5 150 L 0 160 L -1.5 150 Z" style="fill:none;stroke:currentColor;stroke-width:3.5;stroke-linejoin:round;opacity:0.55"/>' +
            '<ellipse cx="0" cy="-3" rx="2.4" ry="9" style="fill:none;stroke:currentColor;stroke-width:3;opacity:0.55"/>';
          bits.appendChild(g);
        }
        var el = document.createElementNS(NS, "path");
        el.setAttribute("d", d);
        el.style.strokeWidth = String(s.sw);
        el.style.opacity = String(s.op);
        el.style.transition = "none";
        el.style.strokeDasharray = len + " " + len;
        el.style.strokeDashoffset = String(len);
        svg.appendChild(el);
        paths.push({ el: el, cum: cum, len: len, t0: s.t0, lead: s.lead || 0 });
      });
    }

    // The line digs downward like a root. Whenever a new screen opens, it glides down to just below that screen,
    // taking a couple of seconds. The glide is timed by the clock, not by frame count, so it can't fall behind.
    var cur = 0, from = 0, to = 0, startAt = 0, dur = 0, running = false;
    var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function paint() { paths.forEach(function (p) { p.el.style.strokeDasharray = 'none'; p.el.style.strokeDashoffset = '0'; }); }
      function paintOld() {
      paths.forEach(function (p) {
        var idx = Math.max(0, Math.min(p.cum.length - 1, Math.round((cur - p.t0) / STEP)));
        p.el.style.strokeDashoffset = String(p.len - p.cum[idx]);
      });
    }
    function targetY() {
      var reach = 0;
      try { reach = (flowEl.hidden && titleEl ? titleEl : gateEls[rg]).getBoundingClientRect().bottom + window.scrollY + 120; } catch (e) {}
      return Math.max(window.scrollY + window.innerHeight * 0.9, reach);
    }
    function tick(ts) {
      ts = ts || performance.now();
      var target = targetY();
      if (target > to + 1) {
        from = cur; to = target; startAt = ts;
        dur = REDUCED ? 0 : Math.min(4000, Math.max(1400, (to - from) / 0.2)); // about 200px a second, 1.4 to 4 seconds
      }
      var k = dur ? Math.min(1, (ts - startAt) / dur) : 1;
      cur = from + (to - from) * (1 - (1 - k) * (1 - k)); // eases out as it arrives
      paint();
      if (k < 1) requestAnimationFrame(tick); else running = false;
    }
    function queue() { paint(); }
    function refresh() { build(); paint(); queue(); }

    document.addEventListener("click", function () { setTimeout(refresh, 80); setTimeout(refresh, 600); setTimeout(refresh, 1500); });
    window.addEventListener("resize", refresh);
    if (window.ResizeObserver) new ResizeObserver(refresh).observe(document.body);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    refresh();
  })();

  if (MODE === "prompt") flowEl.hidden = false;
  sync();
})();
