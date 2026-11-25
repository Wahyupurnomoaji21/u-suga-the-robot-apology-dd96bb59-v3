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

function fail(message) {
  throw new Error(`entry gate failed: ${message}`);
}

function countFullStops(line) {
  // Count every '.' in the line, not just sentence-final ones: the gate
  // demands exactly one sentence per line, so a line may hold exactly
  // one full stop in total. Any abbreviation, decimal or extra sentence
  // would add a second '.' and fail the gate.
  return [...line].filter((ch) => ch === ".").length;
}

function validateEntry(lines, text) {
  // Single entry point for every gate check; called before any file write.
  if (text.length < 1 || text.length > 400) {
    fail(`entry is ${text.length} characters, outside the 1-400 gate`);
  }
  if (text.trim().length === 0) {
    fail("entry is only whitespace");
  }
  if (lines.length !== 2) {
    fail(`entry must be exactly 2 lines, got ${lines.length}`);
  }
  for (const [index, line] of lines.entries()) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      fail(`line ${index + 1} is empty`);
    }
    if (!trimmed.endsWith(".")) {
      fail(`line ${index + 1} must end with a full stop`);
    }
    const stops = countFullStops(trimmed);
    if (stops !== 1) {
      fail(
        `line ${index + 1} must contain exactly one full stop, found ${stops}`,
      );
    }
  }
}

const TEXT = `${LINES.join("\n")}\n`;
validateEntry(LINES, TEXT);

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
