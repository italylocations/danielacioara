/**
 * Upload images to Cloudflare R2 — bucket: danielacioara
 *
 * Usage:
 *   node scripts/upload-to-r2.mjs [folder]
 *
 * Default folder: public/photos-to-upload/
 * Uploads to R2 prefix: portfolio/
 *
 * Required in .env.local:
 *   R2_ENDPOINT          e.g. https://<account_id>.r2.cloudflarestorage.com
 *   R2_ACCESS_KEY_ID
 *   R2_SECRET_ACCESS_KEY
 *   R2_BUCKET            (default: danielacioara)
 */

import { createReadStream, readdirSync, statSync } from "fs";
import { extname, resolve } from "path";
import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";

config({ path: ".env.local" });

const ENDPOINT  = process.env.R2_ENDPOINT;
const ACCESS_KEY = process.env.R2_ACCESS_KEY_ID;
const SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET    = process.env.R2_BUCKET ?? "danielacioara";
const PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";
const R2_PREFIX = "portfolio";

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MIME = {
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

/* ─── Validate env ─────────────────────────────────────────────────────────── */
if (!ENDPOINT || !ACCESS_KEY || !SECRET_KEY) {
  console.error(
    "\n❌  Missing R2 credentials in .env.local\n" +
    "    Required: R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY\n"
  );
  process.exit(1);
}

/* ─── S3 client ────────────────────────────────────────────────────────────── */
const client = new S3Client({
  region: "auto",
  endpoint: ENDPOINT,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
});

/* ─── Resolve source folder ────────────────────────────────────────────────── */
const sourceDir = resolve(process.argv[2] ?? "public/photos-to-upload");

let files;
try {
  files = readdirSync(sourceDir).filter((f) => SUPPORTED.has(extname(f).toLowerCase()));
} catch {
  console.error(`\n❌  Folder not found: ${sourceDir}\n`);
  process.exit(1);
}

if (files.length === 0) {
  console.log(`\n⚠️   No supported images found in: ${sourceDir}\n`);
  process.exit(0);
}

console.log(`\n📂  Source : ${sourceDir}`);
console.log(`🪣  Bucket : ${BUCKET}  →  prefix: ${R2_PREFIX}/`);
console.log(`📸  Found  : ${files.length} image(s)\n`);

/* ─── Upload loop ──────────────────────────────────────────────────────────── */
let uploaded = 0, skipped = 0, failed = 0;

for (const file of files) {
  const key = `${R2_PREFIX}/${file}`;
  const filePath = resolve(sourceDir, file);
  const ext = extname(file).toLowerCase();
  const size = statSync(filePath).size;
  const sizeKb = (size / 1024).toFixed(1);

  // Skip if already exists
  try {
    await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    console.log(`  ⏭  ${file} (${sizeKb} KB) — già presente, skip`);
    skipped++;
    continue;
  } catch (err) {
    const status = err.$metadata?.httpStatusCode;
    if (status !== 404 && err.name !== "NotFound") {
      console.error(`  ❌  ${file} — HEAD error: ${err.message}`);
      failed++;
      continue;
    }
  }

  // Upload
  process.stdout.write(`  ⬆  ${file} (${sizeKb} KB) … `);
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: createReadStream(filePath),
        ContentType: MIME[ext],
        ContentLength: size,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );
    console.log("✓");
    uploaded++;
  } catch (err) {
    console.log(`FAILED — ${err.message}`);
    failed++;
  }
}

/* ─── Summary ──────────────────────────────────────────────────────────────── */
console.log("\n─────────────────────────────────────────");
console.log(`  ✓ Caricati  : ${uploaded}`);
console.log(`  ⏭ Saltati   : ${skipped}`);
if (failed > 0) console.log(`  ✗ Falliti   : ${failed}`);
console.log("─────────────────────────────────────────");

if (uploaded > 0 && PUBLIC_URL) {
  console.log(`\n🔗  URL pubblico:\n    ${PUBLIC_URL}/${R2_PREFIX}/daniela-cioara-makeup-1.jpg\n`);
}
