#!/usr/bin/env node
// Checks one Ichinichi piece (JSON file) for shape and furigana coverage.
// Usage: node tools/validate-piece.js piece.json
const fs = require("fs");
const p = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const K = /[㐀-鿿々]/, bad = [];
const chk = (s, w) => {
  if (typeof s !== "string") return bad.push(w + " not a string");
  const t = s.replace(/([㐀-鿿々ヶ]+)\[[^\]]+\]/g, "");
  if (K.test(t)) bad.push(w + ": kanji without furigana: " + t.match(/[㐀-鿿々]+/g).join(","));
  if ((s.match(/«/g) || []).length !== (s.match(/»/g) || []).length) bad.push(w + ": unbalanced «»");
};
if (!["N4", "N3"].includes(p.lv)) bad.push("lv");
if (!Array.isArray(p.spk) || p.spk.length !== 2) bad.push("spk");
if (!(Array.isArray(p.lines) && p.lines.length >= 4 && p.lines.length <= 5)) bad.push("lines count");
(p.lines || []).forEach((l, i) => { if (!["A", "B"].includes(l[0]) || l.length !== 3 || !l[2]) bad.push("line " + i); chk(l[1], "line " + i); });
if (!Array.isArray(p.words) || p.words.length !== 3) bad.push("words count");
(p.words || []).forEach((w, i) => { if (w.length !== 4 || !w[3]) bad.push("word " + i); chk(w[0], "word " + i); chk(w[2], "word def " + i); });
chk(p.gram.p, "gram.p"); chk(p.gram.ja, "gram.ja");
if (!p.gram.en || !/^Tae Kim/.test(p.gram.ref || "")) bad.push("gram.en/ref");
if (!Array.isArray(p.gram.ex) || p.gram.ex.length !== 2) bad.push("ex count");
(p.gram.ex || []).forEach((e, i) => chk(e[0], "ex " + i));
["ja", "hint", "model"].forEach(k => chk(p.task[k], "task." + k));
if (!p.task.en) bad.push("task.en");
console.log(bad.length ? "FAIL " + bad.join("; ") : "OK");
process.exit(bad.length ? 1 : 0);
