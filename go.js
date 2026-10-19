// Boba Bash card redirect. card.html only needs elements with these ids: t (title), s (subtitle), bar, n (footer).
// 1. read the card number from the URL   2. show the logo for map.s ms
// 3. ask the dashboard live where to go (also counts the tap), fall back to map.json   4. redirect
(function () {
  var base = document.currentScript.src.replace(/go\.js.*$/, '');
  var seg = location.pathname.replace(/\/+$/, '').split('/').pop();
  var id = /^\d{1,5}$/.test(seg) ? Number(seg) : null;
  var $ = function (x) { return document.getElementById(x) || document.createElement('span'); };
  var t0 = Date.now();
  if (id) $('n').textContent = 'CARD ' + id;

  var MSG = {
    missing: ['No card here.', 'This number isn\'t one of ours.'],
    inactive: ['Not live yet.', 'This card hasn\'t been handed out. Find an organiser at the desk.'],
    disabled: ['Switched off.', 'This card has been turned off by the organisers.'],
    down: ['Can\'t reach it right now.', 'Try again in a minute.']
  };

  function wait(ms) { return new Promise(function (r) { setTimeout(r, Math.max(0, ms)); }); }
  function getJson(url, ms) {
    var c = new AbortController();
    var t = setTimeout(function () { c.abort(); }, ms);
    return fetch(url, { cache: 'no-store', signal: c.signal }).then(function (r) {
      clearTimeout(t);
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }

  (async function () {
    var map = null, dest = null;
    try { map = await getJson(base + 'map.json?t=' + Date.now(), 4000); } catch (e) {}
    var ms = map && isFinite(map.s) ? map.s : 5000;

    var bar = $('bar');
    bar.style.transition = 'width ' + ms + 'ms linear';
    requestAnimationFrame(function () { requestAnimationFrame(function () { bar.style.width = '100%'; }); });

    if (id && map && /^https:\/\//.test(map.live || '')) {
      try { dest = await getJson(map.live.replace(/\/$/, '') + '/api/go/' + id, 2500); } catch (e) {}
    }
    if (!dest && id && map) dest = (map.cards && map.cards[id]) || { k: 'missing' };
    if (!dest) dest = { k: id ? 'down' : 'missing' };
    if (dest.m) $('s').textContent = dest.m; // the owner's own splash line

    await wait(ms - (Date.now() - t0));

    if (dest.k === 'go' && /^https?:\/\//i.test(dest.u || '')) {
      var host = '';
      try { host = new URL(dest.u).hostname.replace(/^www\./, ''); } catch (e) {}
      $('t').textContent = 'Taking you to your destination';
      var a = document.createElement('a');
      a.href = dest.u; a.rel = 'noreferrer'; a.textContent = host;
      $('s').textContent = ''; $('s').appendChild(a);
      setTimeout(function () { location.replace(dest.u); }, 350);
    } else {
      var m = MSG[dest.k] || MSG.down;
      $('t').textContent = m[0];
      $('s').textContent = m[1];
      if (bar.parentNode) bar.parentNode.style.visibility = 'hidden';
    }
  })();
})();
