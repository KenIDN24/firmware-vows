import { writeFileSync, mkdirSync } from "node:fs";

const LINE =
  "I vow to love you at every version, including the buggy one, and to never run a silent update on my patience without telling you first \u2014 for better or for beta.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Judge-brief guard: it must read as a robot's own wedding vow — machine
// vocabulary (version / buggy / update) and a wedding-vow frame ("I vow").
const machineWords = ["version", "buggy", "update", "beta"];
const hasMachineVoice = machineWords.some((w) => LINE.toLowerCase().includes(w));
if (!hasMachineVoice) throw new Error("vow lacks machine voice");
if (!/^I vow\b/.test(LINE)) throw new Error("vow must open with 'I vow'");
if (!LINE.endsWith("for better or for beta.")) {
  throw new Error("vow must land its punch on the final words");
}

// Runtime guard: sealed gate 1-200 chars, single line, single sentence.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length ${LINE.length} outside 1-200`);
}
if (/\n|\r/.test(LINE)) throw new Error("entry must be a single line");
if (LINE.trim() !== LINE) throw new Error("entry must not have leading/trailing whitespace");
if (LINE.endsWith(".")) {
  const sentences = LINE.split(".").filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) throw new Error("entry must be a single sentence");
}

writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(`entry ok: ${LINE.length} chars, 1 line`);
