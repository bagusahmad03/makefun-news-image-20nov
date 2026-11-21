// news-image-20261120 entry (Node 22, standard library only).
// The poster is the entry.png beside this file: a 1024x1024 newspaper
// front page summing up Friday 20 November 2026 in twelve stories,
// drawn from the day's reporting and rendered to PNG in-session.
// The program copies it to the grader's output directory, checking
// first that it is a PNG of the size the gate accepts.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const size = statSync(source).size;
if (size > 1024 * 1024) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB gate limit`);
}
// The gate takes a whole PNG or JPEG: refuse a corrupt render rather
// than silently submitting bytes the judge cannot read.
const head = readFileSync(source).subarray(0, 8);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!head.equals(pngMagic)) {
  throw new Error('entry.png is not a PNG file');
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(source, join(outDir, 'entry.png'));
