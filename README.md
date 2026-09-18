# ichinichi 一日

A daily Japanese conversation practice page for lower‑intermediate to intermediate learners (JLPT N4–N3), built as a single self‑contained HTML artifact you can open on your phone each morning.

Live artifact: https://claude.ai/artifact/8xy11ThDPLFNKDeDdQtEb6

## What it does each day

- Picks one dialogue from a 30‑piece bank, deterministically by date. Every piece is shown once before any repeats.
- Shows the dialogue with furigana (toggleable) and key phrases underlined.
- Reads it aloud with the device's Japanese voice (Web Speech API), line by line or as a whole, at normal or slow speed.
- Hides the English translation behind a tap so you can try listening first.
- Explains three key words in simple Japanese (やさしい日本語) with an English gloss.
- Gives one grammar insight modelled on the section structure of Tae Kim's Guide to Japanese Grammar, with two examples.
- Sets a speaking/writing challenge with a hint and a model answer.
- Shows five useful words a day from a 100-word vocabulary bank, each with a simple-Japanese definition, an example sentence and audio.
- Sets a goal of five pieces a day (today's plus four via "Another one") and keeps a streak. Progress is cached in the browser and synced to the artifact's database, so it survives across devices and browser clean-ups.

When opened inside claude.ai with the `sample` capability granted, two extra buttons appear: **Ask Claude for feedback** on your answer, and **Ask Claude for a fresh one** to generate a brand‑new piece in the same format.

## How new pieces arrive

The page merges its built-in bank with documents in the artifact's shared database (collection `pieces`), so the bank grows without republishing:

- A weekly Routine (Sundays 19:00 UTC) starts a fresh Claude session that writes seven new pieces and 35 new words for the coming week, validates them, and saves them to the `pieces` and `words` collections with the ArtifactData tool.
- The in-page "Ask Claude for a fresh one" button saves the piece it generates to the same collection.
- Each device pins its pick for the day, so a piece that arrives mid-day never swaps out what you're reading.

Piece documents use the shape in `index.html`'s `BANK`. Check one with `node tools/validate-piece.js piece.json` before saving it.

## Source layout

Everything is in `index.html`: styles, markup, the content bank (`BANK`) and the logic. To add a piece, append an object to `BANK` following the existing shape. Furigana uses `漢字[かんじ]` notation and key phrases are wrapped in `«…»`.
