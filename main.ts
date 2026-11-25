// makefun-news-1125 — copy the bundled news image to the output directory.
// Competition: news-image-20261125 ("Sum up 25 November's world news in one
// image"). The image itself is entry.png next to this file; this program only
// copies it, byte for byte, so two runs always produce identical output.
// It uses the Node standard library only and never touches the network.
//
// Run from the repository root:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The grader runs it with /output as the output directory.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_NAME = "entry.png";
const OUTPUT_NAME = "entry.png";
const MAX_BYTES = 1024 * 1024; // 1 MiB, the competition limit
const MAX_PIXELS = 1024; // each side, the competition limit
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// The directory this file lives in is the repository root, so the bundled
// image sits beside it no matter where the process is launched from.
function repoDir(): string {
  return dirname(fileURLToPath(import.meta.url));
}

// The grader provides a writable /output; a local run may point elsewhere
// with MAKEFUN_OUTPUT_DIR. Anything else is rejected as unsafe.
function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv !== "") {
    return fromEnv;
  }
  return "/output";
}

function sha256Hex(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

// Read the bundled image and check it against the competition's gate rules:
// a whole PNG, at most 1 MiB, at most 1024 by 1024 pixels. The width and
// height come from the IHDR chunk, the first chunk of every PNG.
function loadSourceImage(sourcePath: string): { data: Buffer; width: number; height: number } {
  if (!existsSync(sourcePath)) {
    throw new Error(`bundled image not found: ${sourcePath}`);
  }
  const data = readFileSync(sourcePath);
  if (data.length > MAX_BYTES) {
    throw new Error(`bundled image is ${data.length} bytes, over the 1 MiB limit`);
  }
  if (data.length < 33 || !data.subarray(0, 8).equals(PNG_MAGIC)) {
    throw new Error("bundled image is not a PNG (bad magic bytes)");
  }
  const ihdrLength = data.readUInt32BE(8);
  const ihdrType = data.subarray(12, 16).toString("ascii");
  if (ihdrType !== "IHDR" || ihdrLength !== 13) {
    throw new Error("bundled image has no valid IHDR chunk");
  }
  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  if (width === 0 || height === 0 || width > MAX_PIXELS || height > MAX_PIXELS) {
    throw new Error(`bundled image is ${width}x${height}, over the 1024x1024 limit`);
  }
  return { data, width, height };
}

function main(): void {
  const sourcePath = join(repoDir(), SOURCE_NAME);
  const { data: image, width, height } = loadSourceImage(sourcePath);
  const destDir = outputDir();
  mkdirSync(destDir, { recursive: true });
  const destPath = join(destDir, OUTPUT_NAME);
  copyFileSync(sourcePath, destPath);

  // Confirm the copy landed byte for byte: same size and same hash.
  const written = readFileSync(destPath);
  if (!written.equals(image)) {
    throw new Error(`output differs from source: ${destPath}`);
  }
  const size = statSync(destPath).size;
  console.log(
    `Wrote ${destPath} (${width}x${height}, ${size} bytes, sha256 ${sha256Hex(written)})`,
  );
}

main();
