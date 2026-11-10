// The app's windows, drawn in the page — not screenshots — so they show nobody's real
// library: invented artists, albums and channels, with generated covers and portraits,
// shuffled on every visit. Built to match the Mac app's Crate, picture picker and Home.
(function () {
  // ---- invented catalogue -------------------------------------------------------------
  var ARTISTS = ["Velvet Static", "Nova Reyes", "The Quiet Engines", "Saltwater Radio", "Juniper Vale",
    "Midnight Telefon", "Kite & Cartograph", "Ari Calder", "Lumen Park", "Static Bloom",
    "Marigold Avenue", "The Low Orbit", "Harbor Coil", "Sable Fontaine", "Echo Ridge", "Paper Comets"];
  var ALBUMS = ["Afterglow Season", "Signal Fires", "Paper Satellites", "Blue Hour Tapes", "Northbound",
    "Soft Machinery", "Glasshouse", "Wild Frequencies", "Sleepwalk City", "Tidal Memory", "Golden Static",
    "Night Swim", "Small Fires", "Coastline Echoes", "Halflight", "Neon Orchard", "Slow Satellites",
    "Weather Systems", "Lantern Days", "Velour"];
  var CHANNELS = ["Studio Lumen", "Field Notes Daily", "The Synth Bench", "Quiet Kitchen",
    "Trail Running Weekly", "Retro Console Lab", "Night Drive Sessions", "Paper & Ink"];
  var VIDEOS = ["Building a modular synth from scratch", "Ten-minute weeknight noodles", "A full day in the mountains",
    "Live session: rooftop at sunset", "Restoring a 1989 handheld", "How I sketch every morning",
    "Lo-fi beats to study to", "The quietest trail in the park", "Tour diary, part three"];
  var PALETTES = [["#FF7A59", "#FFC46B", "#2B1B3D"], ["#5B8CFF", "#B79CFF", "#12122A"], ["#34D399", "#0EA5E9", "#0B1F2A"],
    ["#F472B6", "#FB923C", "#2A1020"], ["#FDE68A", "#F59E0B", "#3B2A0A"], ["#A78BFA", "#22D3EE", "#101828"],
    ["#E5E7EB", "#9CA3AF", "#111827"], ["#F87171", "#7C3AED", "#1A1026"], ["#86EFAC", "#FDE047", "#132A13"],
    ["#93C5FD", "#F0ABFC", "#1E1B4B"]];

  var seed = Math.floor(Math.random() * 1e9);
  function rand() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }
  function pick(list) { return list[Math.floor(rand() * list.length)]; }
  function shuffled(list) { var a = list.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function svg(body) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' + body + "</svg>"); }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  // ---- generated artwork --------------------------------------------------------------
  // Each style dealt out in turn from a shuffled deck, so a row is never all stripes.
  var deck = [];
  function nextKind() { if (!deck.length) deck = shuffled([0, 1, 2, 3, 4]); return deck.pop(); }
  var palettes = [];
  function nextPalette() { if (!palettes.length) palettes = shuffled(PALETTES); return palettes.pop(); }
  function cover() {
    var p = nextPalette(), a = p[0], b = p[1], g = p[2], id = "g" + Math.floor(rand() * 1e6), kind = nextKind();
    var defs = '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs>';
    var art;
    if (kind === 0) { // a sun over a sea
      var y = 40 + rand() * 20, lines = "";
      for (var i = 0; i < 6; i++) lines += '<rect x="0" y="' + (62 + i * 6) + '" width="100" height="' + (1.2 + i * 0.5) + '" fill="' + g + '" opacity=".75"/>';
      art = '<rect width="100" height="100" fill="url(#' + id + ')"/><circle cx="' + (30 + rand() * 40) + '" cy="' + y + '" r="' + (16 + rand() * 12) + '" fill="' + g + '" opacity=".85"/>' + lines;
    } else if (kind === 1) { // diagonal bands
      var bands = "";
      for (var k = -4; k < 8; k++) bands += '<rect x="' + (k * 16) + '" y="-20" width="7" height="160" fill="' + g + '" opacity="' + (0.15 + rand() * 0.5).toFixed(2) + '" transform="rotate(' + (25 + rand() * 10) + ' 50 50)"/>';
      art = '<rect width="100" height="100" fill="url(#' + id + ')"/>' + bands;
    } else if (kind === 2) { // rings
      var rings = "";
      for (var r = 46; r > 4; r -= 7) rings += '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="' + (r % 14 ? a : g) + '" stroke-width="3.2" opacity=".9"/>';
      art = '<rect width="100" height="100" fill="' + g + '"/>' + rings + '<circle cx="50" cy="50" r="5" fill="' + b + '"/>';
    } else if (kind === 3) { // a grid of dots
      var dots = "";
      for (var x = 0; x < 6; x++) for (var yy = 0; yy < 6; yy++) dots += '<circle cx="' + (12 + x * 15.2) + '" cy="' + (12 + yy * 15.2) + '" r="' + (1.5 + rand() * 5.5).toFixed(1) + '" fill="' + (rand() > .5 ? a : b) + '"/>';
      art = '<rect width="100" height="100" fill="' + g + '"/>' + dots;
    } else { // soft shapes
      art = '<rect width="100" height="100" fill="' + g + '"/><circle cx="' + (20 + rand() * 30) + '" cy="' + (20 + rand() * 30) + '" r="38" fill="' + a + '" opacity=".85"/><rect x="' + (35 + rand() * 20) + '" y="' + (40 + rand() * 20) + '" width="60" height="60" rx="8" fill="' + b + '" opacity=".8"/>';
    }
    return svg(defs + art);
  }

  // A moody studio portrait: a silhouette, rim-lit in a colour, on a dark ground.
  function portrait() {
    var p = pick(PALETTES), rim = p[rand() > .5 ? 0 : 1], ground = p[2], id = "p" + Math.floor(rand() * 1e6);
    var hx = 42 + rand() * 16, tilt = (rand() - .5) * 10;
    return svg('<defs><radialGradient id="' + id + '" cx="' + (0.3 + rand() * 0.4) + '" cy=".3" r=".9"><stop offset="0" stop-color="' + rim + '" stop-opacity=".55"/><stop offset=".55" stop-color="' + ground + '"/><stop offset="1" stop-color="#050506"/></radialGradient></defs>' +
      '<rect width="100" height="100" fill="url(#' + id + ')"/>' +
      '<g transform="rotate(' + tilt.toFixed(1) + ' ' + hx + ' 60)"><circle cx="' + hx + '" cy="40" r="15" fill="#0A0A0D" stroke="' + rim + '" stroke-opacity=".55" stroke-width="1.4"/>' +
      '<path d="M' + (hx - 34) + ' 104 C' + (hx - 30) + ' 70 ' + (hx - 14) + ' 60 ' + hx + ' 60 C' + (hx + 14) + ' 60 ' + (hx + 30) + ' 70 ' + (hx + 34) + ' 104 Z" fill="#0A0A0D" stroke="' + rim + '" stroke-opacity=".45" stroke-width="1.4"/></g>');
  }

  function thumbnail() {
    var p = pick(PALETTES), id = "t" + Math.floor(rand() * 1e6);
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + p[0] + '"/><stop offset="1" stop-color="' + p[2] + '"/></linearGradient></defs><rect width="160" height="90" fill="url(#' + id + ')"/><circle cx="' + (40 + rand() * 80) + '" cy="' + (30 + rand() * 30) + '" r="' + (14 + rand() * 18) + '" fill="' + p[1] + '" opacity=".7"/><path d="M0 90 L' + (40 + rand() * 40) + ' ' + (40 + rand() * 20) + ' L' + (90 + rand() * 30) + ' 70 L160 ' + (45 + rand() * 20) + ' L160 90Z" fill="' + p[2] + '" opacity=".8"/></svg>');
  }

  // ---- the window chrome ----------------------------------------------------------------
  var css = '\
.mock{--m-ink:#F4F3F8;--m-ink2:rgba(244,243,248,.58);--m-ink3:rgba(244,243,248,.34);--m-line:rgba(255,255,255,.09);\
  position:relative;aspect-ratio:16/10;background:radial-gradient(ellipse 70% 60% at 85% 100%,rgba(120,90,60,.16),transparent 60%),radial-gradient(ellipse 60% 70% at 10% 60%,rgba(80,80,90,.22),transparent 60%),#0B0B0E;\
  color:var(--m-ink);font:500 12px/1.3 Inter,-apple-system,sans-serif;overflow:hidden;container-type:inline-size;text-align:left}\
.mock *{box-sizing:border-box}\
.m-bar{height:5.2cqw;max-height:30px;display:flex;align-items:center;gap:.7cqw;padding:0 1.6cqw}\
.m-bar i{width:1.1cqw;height:1.1cqw;max-width:12px;max-height:12px;border-radius:50%;background:#3a3a40;display:block}\
.m-body{padding:0 2.4cqw}\
.m-top{display:flex;align-items:flex-start;justify-content:space-between;gap:2cqw}\
.m-title{font-weight:800;font-size:3.1cqw;letter-spacing:-.02em;line-height:1}\
.m-cap{color:var(--m-ink2);font-size:1.15cqw;margin-top:.5cqw}\
.m-nav{display:flex;gap:.8cqw;align-items:center}\
.m-seg{display:flex;gap:.2cqw;padding:.25cqw;border:1px solid var(--m-line);border-radius:.8cqw;background:rgba(255,255,255,.04);height:3.2cqw;align-items:stretch}\
.m-seg span{display:flex;align-items:center;gap:.4cqw;padding:0 1cqw;border-radius:.6cqw;font-size:1.15cqw;color:var(--m-ink2)}\
.m-seg span.on{background:rgba(255,255,255,.12);color:#B79CFF;font-weight:600}\
.m-sq{width:3.2cqw;height:3.2cqw;border:1px solid var(--m-line);border-radius:.8cqw;background:rgba(255,255,255,.04);display:grid;place-items:center}\
.m-sq svg,.m-seg svg,.m-field svg{width:1.25cqw;height:1.25cqw;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round}\
.m-row{display:flex;gap:1cqw;align-items:center;margin:1.6cqw 0 1.8cqw}\
.m-field{flex:0 1 34cqw;height:2.9cqw;border:1px solid var(--m-line);border-radius:.7cqw;background:rgba(255,255,255,.04);display:flex;align-items:center;gap:.6cqw;padding:0 .9cqw;color:var(--m-ink3);font-size:1.1cqw}\
.m-row .m-seg{height:2.9cqw}.m-row .m-sq{width:2.9cqw;height:2.9cqw}\
.m-spacer{flex:1}\
.m-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1.7cqw 1.5cqw}\
.m-tile img{width:100%;aspect-ratio:1;border-radius:1cqw;display:block;box-shadow:0 1.2cqw 2.4cqw rgba(0,0,0,.45)}\
.m-tile b{display:block;font-size:1.12cqw;margin-top:.7cqw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
.m-tile small{display:block;font-size:.98cqw;color:var(--m-ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
.m-foot{position:absolute;left:0;right:0;bottom:0;height:2.6cqw;border-top:1px solid var(--m-line);display:flex;align-items:center;justify-content:space-between;padding:0 1.6cqw;color:var(--m-ink3);font-size:.95cqw;background:rgba(0,0,0,.25)}\
.m-dim{position:absolute;inset:5.2cqw 0 0;background:rgba(0,0,0,.55)}\
.m-panel{position:absolute;left:50%;top:13%;transform:translateX(-50%);width:56cqw;background:#1A1A1F;border:1px solid var(--m-line);border-radius:1.4cqw;padding:1.6cqw;box-shadow:0 3cqw 8cqw rgba(0,0,0,.6)}\
.m-ph{display:flex;align-items:center;gap:1cqw}.m-ph b{font-size:1.3cqw;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
.m-btn{border:1px solid var(--m-line);border-radius:.7cqw;padding:.55cqw 1cqw;font-size:1.05cqw;background:rgba(255,255,255,.06);white-space:nowrap}\
.m-btn.pri{background:linear-gradient(135deg,#C3A8FF,#9C7CFF);color:#0B0B0F;border-color:transparent;font-weight:700}\
.m-pr{display:flex;gap:.8cqw;margin:1.3cqw 0}\
.m-pr .m-field{flex:1}\
.m-label{font-size:1cqw;color:var(--m-ink2);font-weight:600;margin-bottom:.8cqw}\
.m-pgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2cqw 1cqw}\
.m-pgrid img{width:100%;aspect-ratio:1;border-radius:.9cqw;display:block;border:1px solid var(--m-line)}\
.m-pgrid .on img{outline:.3cqw solid #B79CFF;outline-offset:-.1cqw}\
.m-pgrid small{display:block;font-size:.9cqw;color:var(--m-ink2);margin-top:.4cqw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
.m-pgrid .on small{color:#B79CFF}\
.m-card{border:1px solid var(--m-line);background:rgba(255,255,255,.04);border-radius:1.6cqw;padding:1.8cqw}\
.m-ch{display:flex;align-items:center;gap:1.2cqw;padding:1cqw 0;border-top:1px solid var(--m-line)}\
.m-ch:first-of-type{border-top:0}\
.m-ch img.av{width:4cqw;height:4cqw;border-radius:50%}\
.m-ch div{flex:1;min-width:0}.m-ch b{display:block;font-size:1.3cqw}.m-ch small{display:block;font-size:1.05cqw;color:var(--m-ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
.m-ch img.th{width:10.5cqw;aspect-ratio:16/9;border-radius:.7cqw}\
.m-two{display:grid;grid-template-columns:1fr 1fr;gap:0 2.4cqw}\
.mock[data-mock=watch]{aspect-ratio:16/8.4}\
';
  var style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);

  var ICON = {
    home: '<svg viewBox="0 0 24 24"><path d="M3 11 12 4l9 7v9h-6v-6H9v6H3Z"/></svg>',
    crate: '<svg viewBox="0 0 24 24"><path d="M4 6h10M4 11h10M4 16h6M18 4v11a3 3 0 1 1-3-3h3"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
    folder: '<svg viewBox="0 0 24 24"><path d="M3 6h6l2 2h10v11H3Z"/></svg>',
    refresh: '<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5"/></svg>'
  };
  function nav(on) {
    function s(k, label, icon) { return '<span class="' + (on === k ? "on" : "") + '">' + icon + label + "</span>"; }
    return '<div class="m-nav"><div class="m-seg">' + s("home", "Home", ICON.home) + s("crate", "Crate", ICON.crate) + s("settings", "Settings", ICON.gear) + '</div><div class="m-sq">' + ICON.search + "</div></div>";
  }
  function chrome(inner, on, title, caption) {
    return '<div class="m-bar"><i></i><i></i><i></i></div><div class="m-body"><div class="m-top"><div><div class="m-title">' + title + '</div><div class="m-cap">' + caption + "</div></div>" + nav(on) + "</div>" + inner + '</div><div class="m-foot"><span>Downloads</span><span>Version 2.6</span></div>';
  }
  function counts(artists, albums) {
    var songs = albums * (8 + Math.floor(rand() * 6));
    return artists + " artists · " + albums + " albums · " + songs + " songs · " + (songs * 9.4 / 1000).toFixed(1) + " GB";
  }
  function pageRow(onAlbums) {
    return '<div class="m-row"><div class="m-field">' + ICON.search + 'Search your crate</div><div class="m-seg"><span class="' + (onAlbums ? "" : "on") + '">Artists</span><span class="' + (onAlbums ? "on" : "") + '">Albums</span></div><div class="m-spacer"></div><div class="m-sq">' + ICON.folder + '</div><div class="m-sq">' + ICON.refresh + "</div></div>";
  }

  // ---- the three windows ------------------------------------------------------------------
  function albums(el) {
    var names = shuffled(ARTISTS), titles = shuffled(ALBUMS), tiles = "";
    for (var i = 0; i < 12; i++) tiles += '<div class="m-tile"><img alt="" src="' + cover() + '"><b>' + esc(titles[i]) + "</b><small>" + esc(names[i % 7]) + "</small></div>";
    el.innerHTML = chrome(pageRow(true) + '<div class="m-grid">' + tiles + "</div>", "crate", "Crate", counts(7 + Math.floor(rand() * 20), 12 + Math.floor(rand() * 40)));
  }

  function picker(el) {
    var names = shuffled(ARTISTS), who = names[0], tiles = "";
    for (var i = 0; i < 6; i++) tiles += '<div class="m-tile"><img alt="" src="' + portrait() + '"><b>' + esc(names[i]) + "</b><small>" + (1 + Math.floor(rand() * 4)) + " albums</small></div>";
    var sources = ["Apple Music · " + who, "TheAudioDB", "TheAudioDB fan art", "YouTube Music · " + who, "YouTube · " + who, "Deezer · " + who, "Wikipedia", "TheAudioDB fan art"];
    var chosen = Math.floor(rand() * 4), photos = "";
    for (var k = 0; k < 8; k++) photos += '<div class="' + (k === chosen ? "on" : "") + '"><img alt="" src="' + portrait() + '"><small>' + esc(sources[k]) + "</small></div>";
    el.innerHTML = chrome(pageRow(false) + '<div class="m-grid">' + tiles + "</div>", "crate", "Crate", counts(6 + Math.floor(rand() * 20), 14 + Math.floor(rand() * 40))) +
      '<div class="m-dim"></div><div class="m-panel"><div class="m-ph"><b>Picture for ' + esc(who) + '</b><span class="m-btn">Automatic</span><span class="m-btn">Choose File…</span></div>' +
      '<div class="m-pr"><div class="m-field">' + ICON.search + '<span style="color:var(--m-ink)">' + esc(who) + '</span></div><span class="m-btn pri">Search</span></div>' +
      '<div class="m-label">Photos</div><div class="m-pgrid">' + photos + "</div></div>";
  }

  function watch(el) {
    var chans = shuffled(CHANNELS), vids = shuffled(VIDEOS), rows = "";
    for (var i = 0; i < 6; i++) rows += '<div class="m-ch"><img class="av" alt="" src="' + cover() + '"><div><b>' + esc(chans[i]) + "</b><small>" + esc(vids[i]) + '</small></div><img class="th" alt="" src="' + thumbnail() + '"></div>';
    var half = rows.split('<div class="m-ch">').slice(1).map(function (r) { return '<div class="m-ch">' + r; });
    el.innerHTML = chrome('<div style="height:1.8cqw"></div><div class="m-card"><div class="m-top" style="align-items:center;margin-bottom:1.2cqw"><div style="font-weight:700;font-size:1.5cqw">Watch <span style="color:var(--m-ink3);font-weight:500">' + (20 + Math.floor(rand() * 40)) + '</span></div><span style="color:#B79CFF;font-size:1.1cqw;font-weight:600">Show All</span></div>' +
      '<div class="m-seg" style="display:inline-flex;margin-bottom:1cqw"><span class="on">Channels</span><span>Saved Videos</span></div>' +
      '<div class="m-two"><div>' + half.slice(0, 3).join("") + "</div><div>" + half.slice(3).join("") + "</div></div></div>", "home", "Home", (40 + Math.floor(rand() * 400)) + " songs · " + (8 + Math.floor(rand() * 30)) + " albums · " + (6 + Math.floor(rand() * 40)) + " channels");
  }

  var make = { albums: albums, picker: picker, watch: watch };
  document.querySelectorAll(".mock[data-mock]").forEach(function (el) { (make[el.dataset.mock] || function () {})(el); });
})();
