/* ═══════════════════════
   AURUM GRAND — FINAL JS
═══════════════════════ */
var allPages = [
  "home",
  "about",
  "rooms",
  "amenities",
  "dining",
  "offers",
  "gallery",
  "weddings",
  "loyalty",
  "contact",
  "404",
];
var cur = "home",
  bStep = 1,
  addons = 0;

/* ── LOADER ── */
window.addEventListener("load", function () {
  setTimeout(function () {
    var ld = document.getElementById("loader");
    if (ld) {
      ld.classList.add("hide");
      setTimeout(function () {
        ld.style.display = "none";
      }, 700);
    }
    setTimeout(showCookie, 2200);
  }, 1700);
});

/* ── NAVIGATION ── */
function go(p) {
  var tr = document.getElementById("pageTrans");
  if (tr) tr.classList.add("in");
  setTimeout(function () {
    for (var i = 0; i < allPages.length; i++) {
      var el = document.getElementById("page-" + allPages[i]);
      if (el) el.classList.remove("active");
      var nv = document.getElementById("nv-" + allPages[i]);
      if (nv) nv.classList.remove("al");
    }
    var pg = document.getElementById("page-" + p);
    if (pg) pg.classList.add("active");
    var nv = document.getElementById("nv-" + p);
    if (nv) nv.classList.add("al");
    cur = p;
    window.scrollTo({ top: 0, behavior: "instant" });
    updateMobBar(p);
    if (tr) {
      tr.classList.remove("in");
      tr.classList.add("out");
      setTimeout(function () {
        tr.classList.remove("out");
      }, 350);
    }
    updateNav();
    setTimeout(initAnims, 120);

    // Update URL based on current route
    var url = p === 'home' ? '/' : '/' + p;
    window.history.pushState({ page: p }, '', url);
  }, 280);
}

function updateMobBar(p) {
  var items = ["home", "rooms", "dining", "contact"];
  for (var i = 0; i < items.length; i++) {
    var el = document.getElementById("mb-" + items[i]);
    if (el) el.classList.toggle("active", items[i] === p);
  }
}

/* ── NAV / SCROLL ── */
function updateNav() {
  var nav = document.getElementById("nav");
  if (cur === "home" && window.scrollY < 80) {
    nav.className = "t";
  } else {
    nav.className = "s";
  }
}
window.addEventListener("scroll", function () {
  updateNav();
  var prog = document.getElementById("scroll-progress");
  if (prog) {
    var dh = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (dh > 0 ? (window.scrollY / dh) * 100 : 0) + "%";
  }
  var bt = document.getElementById("back-top");
  if (bt) bt.classList.toggle("show", window.scrollY > 400);
});

/* ── MOBILE MENU ── */
function toggleMM() {
  document.getElementById("mm").classList.toggle("open");
}

/* ── TOAST ── */
var _tt;
function notify(title, msg) {
  clearTimeout(_tt);
  document.getElementById("toast-t").textContent = title;
  document.getElementById("toast-m").textContent = msg;
  var t = document.getElementById("toast");
  t.classList.add("show");
  _tt = setTimeout(function () {
    t.classList.remove("show");
  }, 4200);
}

/* ── NEWSLETTER ── */
function subscribeNL() {
  var em = document.getElementById("nl-email");
  if (em && em.value && em.value.indexOf("@") > 0) {
    notify(
      "Subscribed!",
      "Welcome. You will receive our next exclusive offer shortly.",
    );
    em.value = "";
  } else {
    notify("Invalid Email", "Please enter a valid email address.");
  }
}

/* ── COOKIE ── */
function showCookie() {
  if (!sessionStorage.getItem("ck")) {
    var cb = document.getElementById("cookie-banner");
    if (cb) cb.classList.add("show");
  }
}
function closeCookie() {
  sessionStorage.setItem("ck", "1");
  var cb = document.getElementById("cookie-banner");
  if (cb) cb.classList.remove("show");
}

/* ── CHAT ── */
var chatOpen = false;
var chatR_map = {
  "book a room":
    "I would be delighted to help you reserve a room. Rates start from $420 per night. Shall I open the booking form?",
  "dining reservation":
    "We have MIRO for fine dining, TERRA for garden cuisine, and NOIR our rooftop bar. Which would you prefer?",
  "spa & wellness":
    "Our spa offers treatments from 60 to 180 minutes. I can arrange a session for any day of your stay.",
  "local tips":
    "Aurum Grand is minutes from the finest museums and boutiques. Shall I prepare a bespoke local guide?",
};
function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById("chatPanel").classList.toggle("open", chatOpen);
  document.getElementById("chatBadge").style.display = chatOpen
    ? "none"
    : "block";
}
function chatR(msg) {
  _addBubble(msg, "usr");
  document.getElementById("chatChips").style.display = "none";
  setTimeout(function () {
    var r =
      chatR_map[msg.toLowerCase()] ||
      "Thank you. A member of our concierge team will attend to your request shortly.";
    _addBubble(r, "bot");
  }, 700);
}
function _addBubble(text, type) {
  var b = document.createElement("div");
  b.className = "cb " + type;
  b.textContent = text;
  var bd = document.getElementById("chatBody");
  bd.appendChild(b);
  bd.scrollTop = 9999;
}
function sendChat() {
  var inp = document.getElementById("chatInp");
  if (!inp || !inp.value.trim()) return;
  chatR(inp.value);
  inp.value = "";
}

/* ── BOOKING MODAL ── */
function openModal() {
  document.getElementById("bookModal").classList.add("open");
  document.body.style.overflow = "hidden";
  bStep = 1;
  addons = 0;
  var fpao = document.getElementById("fp-ao");
  if (fpao) fpao.textContent = "$0";
  showBStep(1);
}
function closeModal() {
  document.getElementById("bookModal").classList.remove("open");
  document.body.style.overflow = "";
}
function showBStep(n) {
  for (var i = 1; i <= 4; i++) {
    var sp = document.getElementById("sp" + i);
    if (sp) sp.classList.toggle("active", i === n);
    var sn = document.getElementById("sn" + i);
    if (sn) {
      sn.classList.remove("done", "active");
      if (i < n) sn.classList.add("done");
      if (i === n) sn.classList.add("active");
      var sl = sn.nextElementSibling;
      if (sl && sl.classList.contains("stp-l"))
        sl.classList.toggle("active", i === n);
    }
  }
  var bb = document.getElementById("backBtn"),
    nb = document.getElementById("nextBtn");
  if (bb) bb.style.visibility = n > 1 ? "visible" : "hidden";
  if (nb) nb.textContent = n === 4 ? "Confirm Booking" : "Continue";
}
function nextStep() {
  if (bStep < 4) {
    bStep++;
    showBStep(bStep);
  } else {
    closeModal();
    var ref = "AG-" + Math.floor(10000 + Math.random() * 90000);
    setTimeout(function () {
      notify(
        "Booking Confirmed!",
        "Thank you! Ref: " + ref + ". Confirmation sent to your email.",
      );
    }, 300);
    bStep = 1;
  }
}
function prevStep() {
  if (bStep > 1) {
    bStep--;
    showBStep(bStep);
  }
}
function togAddon(el, price) {
  el.classList.toggle("sel");
  if (el.classList.contains("sel")) {
    addons += price;
  } else {
    addons -= price;
  }
  var fpao = document.getElementById("fp-ao");
  if (fpao) fpao.textContent = "$" + addons;
  _updFinal();
}
function updSum() {
  var rt = document.getElementById("rt"),
    ci = document.getElementById("ci"),
    co = document.getElementById("co");
  if (!rt || !ci || !co || !ci.value || !co.value) return;
  var base = parseInt(rt.value) || 420;
  var nights = Math.max(
    1,
    Math.round((new Date(co.value) - new Date(ci.value)) / 86400000),
  );
  var sub = base * nights,
    tax = Math.round(sub * 0.18),
    tot = sub + tax;
  var nm = rt.options[rt.selectedIndex].text.split("—")[0].trim();
  var ids = {
    "os-rm": nm + " x " + nights + " nights",
    "os-p": "$" + sub.toLocaleString(),
    "os-tx": "$" + tax.toLocaleString(),
    "os-tot": "$" + tot.toLocaleString(),
    "fp-rm": nm,
    "fp-p": "$" + sub.toLocaleString(),
    "fp-tx": "$" + tax.toLocaleString(),
  };
  for (var id in ids) {
    var el = document.getElementById(id);
    if (el) el.textContent = ids[id];
  }
  _updFinal();
}
function _updFinal() {
  var ci = document.getElementById("ci"),
    co = document.getElementById("co"),
    rt = document.getElementById("rt"),
    fp = document.getElementById("fp-tot");
  if (!ci || !co || !rt || !fp || !ci.value || !co.value) return;
  var base = parseInt(rt.value) || 420,
    nights = Math.max(
      1,
      Math.round((new Date(co.value) - new Date(ci.value)) / 86400000),
    );
  fp.textContent =
    "$" +
    (
      base * nights +
      Math.round(base * nights * 0.18) +
      addons
    ).toLocaleString();
}

/* ── ROOM DETAIL MODAL ── */
var _rooms = [
  {
    tag: "Deluxe Room",
    name: "Garden View Suite",
    desc: "A serene retreat opening to manicured gardens. The interplay of natural light and handcrafted furnishings creates a space that feels both grand and intimately personal.",
    price: "$420",
    num: "01",
    bg: "linear-gradient(rgba(26,18,8,.35),rgba(26,18,8,.35)),url(https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80&fit=crop) center/cover no-repeat",
    specs: [
      "45 sq m",
      "King Bed",
      "Garden View",
      "Marble Bathroom",
      "Max 2 Guests",
      "Private Balcony",
    ],
  },
  {
    tag: "Junior Suite",
    name: "Forest Canopy Suite",
    desc: "Elevated among the treetops, this suite offers a rare sense of sanctuary. Floor-to-ceiling windows frame a living canvas that changes with every hour.",
    price: "$680",
    num: "02",
    bg: "linear-gradient(rgba(26,18,8,.35),rgba(26,18,8,.35)),url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&fit=crop) center/cover no-repeat",
    specs: [
      "72 sq m",
      "King + Daybed",
      "Forest View",
      "Rainfall Shower",
      "Max 3 Guests",
      "Living Room",
    ],
  },
  {
    tag: "Grand Suite",
    name: "The Aurum Grand Suite",
    desc: "140 square meters where art, architecture, and hospitality converge. The definitive Aurum experience — expansive, considered, and utterly luxurious.",
    price: "$1,200",
    num: "03",
    bg: "linear-gradient(rgba(26,18,8,.35),rgba(26,18,8,.35)),url(https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&fit=crop) center/cover no-repeat",
    specs: [
      "140 sq m",
      "King + Twin",
      "Panoramic View",
      "Butler Service",
      "Max 4 Guests",
      "Private Terrace",
    ],
  },
  {
    tag: "Presidential Suite",
    name: "The Aurum Penthouse",
    desc: "The entire top floor. A private residence in the sky with a dedicated team, private dining, private pool, and views that reshape how you see the world.",
    price: "$2,400",
    num: "04",
    bg: "linear-gradient(rgba(26,18,8,.35),rgba(26,18,8,.35)),url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80&fit=crop) center/cover no-repeat",
    specs: [
      "380 sq m",
      "3 King Bedrooms",
      "360 City View",
      "Private Pool",
      "Max 6 Guests",
      "Dedicated Butler",
    ],
  },
];
function openRoomModal(idx) {
  var r = _rooms[idx];
  document.getElementById("rm-tag").textContent = r.tag;
  document.getElementById("rm-name").textContent = r.name;
  document.getElementById("rm-desc").textContent = r.desc;
  document.getElementById("rm-price").textContent = r.price;
  document.getElementById("rm-hero-num").textContent = r.num;
  document.getElementById("rm-hero-bg").style.background = r.bg;
  var sp = document.getElementById("rm-specs");
  sp.innerHTML = "";
  for (var i = 0; i < r.specs.length; i++)
    sp.innerHTML +=
      '<div class="rm-spec"><div class="rm-spec-dot"></div><span>' +
      r.specs[i] +
      "</span></div>";
  document.getElementById("rm-ci").value = "";
  document.getElementById("rm-co").value = "";
  document.getElementById("rm-total").textContent = "—";
  document.getElementById("room-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeRoomModal() {
  document.getElementById("room-modal").classList.remove("open");
  document.body.style.overflow = "";
}
function calcRoomTotal() {
  var ci = document.getElementById("rm-ci").value,
    co = document.getElementById("rm-co").value;
  var pr = document
    .getElementById("rm-price")
    .textContent.replace("$", "")
    .replace(",", "");
  if (!ci || !co) return;
  var nights = Math.max(
    1,
    Math.round((new Date(co) - new Date(ci)) / 86400000),
  );
  document.getElementById("rm-total").textContent =
    "$" + ((parseInt(pr) || 420) * nights).toLocaleString();
}

/* ── GALLERY LIGHTBOX ── */
var _lbImgs = [
  {
    bg: "url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80&fit=crop) center/cover no-repeat",
    cap: "The Aurum Penthouse — Presidential Suite",
  },
  {
    bg: "url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&fit=crop) center/cover no-repeat",
    cap: "Forest Canopy Suite — Living Area",
  },
  {
    bg: "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&fit=crop) center/cover no-repeat",
    cap: "Infinity Pool — Rooftop Terrace",
  },
  {
    bg: "url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop) center/cover no-repeat",
    cap: "MIRO Restaurant — Fine Dining",
  },
  {
    bg: "url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80&fit=crop) center/cover no-repeat",
    cap: "Aurum Spa — Treatment Suite",
  },
  {
    bg: "url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=80&fit=crop) center/cover no-repeat",
    cap: "Grand Ballroom — Event Space",
  },
  {
    bg: "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80&fit=crop) center/cover no-repeat",
    cap: "TERRA Restaurant — Garden Terrace",
  },
  {
    bg: "url(https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=80&fit=crop) center/cover no-repeat",
    cap: "NOIR Bar — Rooftop at Sunset",
  },
  {
    bg: "url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=85&fit=crop) center/cover no-repeat",
    cap: "Hotel Exterior — Aurum Grand Facade",
  },
];
var _lbCur = 0;
function openLightbox(idx) {
  _lbCur = idx || 0;
  _renderThumbs();
  _updLb();
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
function lbNav(dir) {
  _lbCur = (_lbCur + dir + _lbImgs.length) % _lbImgs.length;
  _updLb();
}
function _updLb() {
  var img = _lbImgs[_lbCur];
  document.getElementById("lb-img-bg").style.background = img.bg;
  document.getElementById("lb-caption").textContent = img.cap;
  document.getElementById("lb-counter").textContent =
    _lbCur + 1 + " of " + _lbImgs.length;
  var ts = document.querySelectorAll(".lb-thumb");
  for (var i = 0; i < ts.length; i++)
    ts[i].classList.toggle("active", i === _lbCur);
}
function _renderThumbs() {
  var wrap = document.getElementById("lb-thumbs");
  wrap.innerHTML = "";
  for (var i = 0; i < _lbImgs.length; i++) {
    var t = document.createElement("div");
    t.className = "lb-thumb" + (i === _lbCur ? " active" : "");
    t.innerHTML =
      '<div class="lb-thumb-bg" style="' +
      _lbImgs[i].bg +
      ';opacity:.65;position:absolute;inset:0"></div>';
    (function (idx) {
      t.addEventListener("click", function () {
        _lbCur = idx;
        _updLb();
      });
    })(i);
    wrap.appendChild(t);
  }
}
document.addEventListener("keydown", function (e) {
  if (!document.getElementById("lightbox").classList.contains("open")) return;
  if (e.key === "ArrowLeft") lbNav(-1);
  if (e.key === "ArrowRight") lbNav(1);
  if (e.key === "Escape") closeLightbox();
});

/* ── FAQ ── */
function tfaq(el) {
  el.parentElement.classList.toggle("open");
}

/* ── FILTERS ── */
function setGF(btn) {
  var p = btn.parentElement,
    bs = p.querySelectorAll(".gf");
  for (var i = 0; i < bs.length; i++) bs[i].classList.remove("active");
  btn.classList.add("active");
  notify("Filter Applied", "Showing: " + btn.textContent.trim());
}

/* ── GIFT CARD ── */
function setGiftAmt(btn, amt) {
  var opts = document.querySelectorAll(".gift-opt");
  for (var i = 0; i < opts.length; i++) opts[i].classList.remove("sel");
  btn.classList.add("sel");
  var el = document.getElementById("gcAmount");
  if (el) el.textContent = amt;
}

/* ── COUNTDOWN ── */
function startTimer() {
  var end = new Date();
  end.setDate(end.getDate() + 12);
  end.setHours(8, 34, 22, 0);
  function tick() {
    var d = end - new Date();
    if (d <= 0) return;
    var days = Math.floor(d / 86400000),
      hrs = Math.floor((d % 86400000) / 3600000),
      mins = Math.floor((d % 3600000) / 60000),
      secs = Math.floor((d % 60000) / 1000);
    var td = document.getElementById("td"),
      th = document.getElementById("th"),
      tm = document.getElementById("tm"),
      ts = document.getElementById("ts");
    if (td) td.textContent = String(days).padStart(2, "0");
    if (th) th.textContent = String(hrs).padStart(2, "0");
    if (tm) tm.textContent = String(mins).padStart(2, "0");
    if (ts) ts.textContent = String(secs).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}
startTimer();

/* ── GLOBAL CLICK ── */
window.addEventListener("click", function (e) {
  if (e.target.id === "bookModal") closeModal();
  if (e.target.id === "room-modal") closeRoomModal();
  if (e.target.id === "lightbox") closeLightbox();
});

/* ── SCROLL ANIMS ── */
function initAnims() {
  var els = document.querySelectorAll(
    "#page-" + cur + " .fu, #page-" + cur + " .fi",
  );
  var obs = new IntersectionObserver(
    function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add("v");
      });
    },
    { threshold: 0.08 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
}

/* ── ROUTE HANDLING ── */
function loadRouteFromURL() {
  var path = window.location.pathname;
  var page = 'home';

  if (path && path !== '/') {
    var cleanPath = path.replace(/^\/+|\/+$/g, '');
    if (allPages.indexOf(cleanPath) !== -1) {
      page = cleanPath;
    } else {
      page = '404';
    }
  }

  cur = page;
  for (var i = 0; i < allPages.length; i++) {
    var el = document.getElementById("page-" + allPages[i]);
    if (el) el.classList.remove("active");
    var nv = document.getElementById("nv-" + allPages[i]);
    if (nv) nv.classList.remove("al");
  }
  var pg = document.getElementById("page-" + page);
  if (pg) pg.classList.add("active");
  var nv = document.getElementById("nv-" + page);
  if (nv) nv.classList.add("al");
  updateMobBar(page);
  updateNav();
  setTimeout(initAnims, 120);
}

window.addEventListener("popstate", function (e) {
  var page = e.state && e.state.page ? e.state.page : 'home';
  cur = page;
  for (var i = 0; i < allPages.length; i++) {
    var el = document.getElementById("page-" + allPages[i]);
    if (el) el.classList.remove("active");
    var nv = document.getElementById("nv-" + allPages[i]);
    if (nv) nv.classList.remove("al");
  }
  var pg = document.getElementById("page-" + page);
  if (pg) pg.classList.add("active");
  var nv = document.getElementById("nv-" + page);
  if (nv) nv.classList.add("al");
  updateMobBar(page);
  window.scrollTo({ top: 0, behavior: "instant" });
  updateNav();
  setTimeout(initAnims, 120);
});

/* ── INIT ── */
window.addEventListener("DOMContentLoaded", function () {
  loadRouteFromURL();
  initAnims();
  updateNav();
  updateMobBar(cur);
  document.querySelectorAll("#page-" + cur + " .fi").forEach(function (el) {
    el.classList.add("v");
  });
});
