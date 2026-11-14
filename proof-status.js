/* Proofreading status per text row (After the Flood IEC review site).
   Rule (owner decision, 14 Nov 2026): a SAFETY or CHECK row is done when two reviewers
   say Correct; any other row when one reviewer says Correct. A proposed correction is done
   only when a second reviewer proposes the same Nepali (Agree). Disagreement = decide.
   The latest check of each reviewer (by email) counts. Shared by index.html and the Luna sync. */
(function (g) {
  function computeStatus(entries, rows) {
    var need = {}, by = {}, out = {};
    rows.forEach(function (r) { need[r.id] = (r.type === 'safety' || r.type === 'check') ? 2 : 1; });
    entries.filter(function (e) { return e.kind === 'proof' && need[e.row]; })
      .sort(function (a, b) { return (a.clientTime || '') < (b.clientTime || '') ? -1 : 1; })
      .forEach(function (e) { (by[e.row] = by[e.row] || {})[(e.email || '').trim().toLowerCase()] = e; });
    Object.keys(by).forEach(function (id) {
      var L = Object.keys(by[id]).map(function (k) { return by[id][k]; });
      var ok = L.filter(function (e) { return e.verdict === 'ok'; }).length, cnt = {}, ch = 0;
      L.forEach(function (e) { if (e.verdict === 'change') { var t = (e.text || '').trim(); if (t) { cnt[t] = (cnt[t] || 0) + 1; ch++; } } });
      var texts = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; }), top = texts[0], s;
      if (ch && texts.length === 1 && cnt[top] >= 2 && !ok) s = 'done';
      else if (ch && (ok || texts.length > 1)) s = 'decide';
      else if (ch) s = 'sugg';
      else s = ok >= need[id] ? 'done' : 'part';
      var o = { s: s, n: L.length, need: need[id] };
      if (top) o.prop = top;
      out[id] = o;
    });
    return out;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = computeStatus; else g.computeStatus = computeStatus;
})(this);
