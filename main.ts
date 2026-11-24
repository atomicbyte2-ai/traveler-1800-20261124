import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One sentence (143 characters) explaining the modern internet to a
// traveler who has just stepped out of the year 1800. Only words and
// ideas an 1800 person could grasp: no "internet", no "computer",
// no "phone", no "electricity" — just a glass box, books, letters,
// songs, and a blink.
const LINE =
  "One small glass box now holds all the books, letters, and songs the world has ever made, and it answers any question in less time than a blink.";

if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} characters, over the 200 limit`);
}
if (!LINE.endsWith(".")) {
  throw new Error("entry must be a single sentence ending with a period");
}
// Exactly one sentence: no other sentence-ending period inside the line.
if (LINE.slice(0, -1).includes(".")) {
  throw new Error("entry must be a single sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${LINE.length}-character entry to ${join(outDir, "entry.txt")}`);
