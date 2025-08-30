#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(msg) {
  // Simple timestamped logger
  const ts = new Date().toISOString();
  console.log(`[transcode ${ts}] ${msg}`);
}

function fail(msg, code = 1) {
  console.error(`Error: ${msg}`);
  process.exit(code);
}

async function main() {
  // Default paths within the project
  const projectRoot = path.resolve(__dirname, '..');
  const publicDir = path.resolve(projectRoot, 'public');
  const videosDir = path.resolve(publicDir, 'videos');
  const inputFile = path.resolve(videosDir, 'input.mp4');
  const outputFile = path.resolve(videosDir, 'output.mp4');

  // Allow optional CLI args: input and output
  const [, , inArg, outArg] = process.argv;
  const src = inArg ? path.resolve(process.cwd(), inArg) : inputFile;
  const dst = outArg ? path.resolve(process.cwd(), outArg) : outputFile;

  log(`Using ffmpeg binary at: ${ffmpegPath || 'not found'}`);
  if (!ffmpegPath) {
    fail('ffmpeg-static did not provide a binary path. Ensure ffmpeg-static is installed.');
  }

  if (!fs.existsSync(src)) {
    fail(`Input file not found: ${src}`);
  }

  // Ensure destination directory exists
  fs.mkdirSync(path.dirname(dst), { recursive: true });

  ffmpeg.setFfmpegPath(ffmpegPath);

  log(`Transcoding:\n  input:  ${src}\n  output: ${dst}`);

  // Map original command:
  // ffmpeg -i input.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4
  await new Promise((resolve, reject) => {
    ffmpeg(src)
      .videoCodec('libx264')
      // scale=960:-1
      .videoFilters('scale=960:-1')
      // output options
      .outputOptions([
        '-movflags faststart',
        '-crf 20',
        '-g 1',
        '-pix_fmt yuv420p',
      ])
      .on('start', (cmd) => log(`FFmpeg start: ${cmd}`))
      .on('progress', (p) => {
        if (p.percent != null) {
          log(`Progress: ${p.percent.toFixed(1)}%`);
        }
      })
      .on('error', (err, stdout, stderr) => {
        console.error(stdout);
        console.error(stderr);
        reject(err);
      })
      .on('end', () => {
        log('Transcoding completed successfully.');
        resolve();
      })
      .save(dst);
  });
}

main().catch((e) => {
  fail(e?.message || String(e));
});
