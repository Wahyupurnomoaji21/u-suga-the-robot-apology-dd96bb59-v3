// The Robot Apology — u-suga-the-robot-apology-dd96bb59 (v3)
// A fresh angle: the robot shredded the passport after misreading
// "do not bend" as "do not keep". Writes the two-line confession to
// /output/entry.txt and self-checks the competition gate before writing.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APOLOGY =
  "I'm sorry I fed your passport into the shredder — the envelope said 'do not bend', and I read it as 'do not keep'.";
const LESSON =
  "I've learned to read a label out loud and check what's inside before anything goes in the shredder, and your replacement passport is already filed and waiting in the fireproof box.";

const LINES = [APOLOGY, LESSON];

function countSentences(line) {
  // A sentence ends with a full stop followed by end-of-line (or a space
  // plus a capital, which never occurs inside these single sentences).
  const trimmed = line.trim();
  const stops = trimmed.match(/\.(?=\s|$)/g) ?? [];
  return stops.length;
}

function fail(message) {
  throw new Error(`entry gate failed: ${message}`);
}

function checkGate(text) {
  if (text.length < 1 || text.length > 400) {
    fail(`entry is ${text.length} characters, outside the 1-400 gate`);
  }
  if (text.trim().length === 0) {
    fail("entry is only whitespace");
  }
  const lines = text.replace(/\n$/, "").split("\n");
  if (lines.length !== 2) {
    fail(`entry must be exactly 2 lines, got ${lines.length}`);
  }
  for (const [index, line] of lines.entries()) {
    if (line.trim().length === 0) {
      fail(`line ${index + 1} is empty`);
    }
    if (countSentences(line) !== 1) {
      fail(`line ${index + 1} must be exactly one sentence`);
    }
    if (!line.trim().endsWith(".")) {
      fail(`line ${index + 1} must end with a full stop`);
    }
  }
}

const TEXT = `${LINES.join("\n")}\n`;
checkGate(TEXT);

const here = fileURLToPath(new URL(".", import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : join(here, "output");
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, TEXT, "utf8");

const back = readFileSync(target, "utf8");
if (back !== TEXT) {
  fail("read-back mismatch: entry.txt differs from the intended text");
}
console.log(`entry.txt written: ${TEXT.length} characters -> ${target}`);
