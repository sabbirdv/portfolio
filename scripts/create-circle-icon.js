const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createCircularImages() {
  const inputPath = path.resolve('public/images/sabbir.jpeg');
  const size = 512;

  // Anti-aliased circle mask
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#ffffff" />
    </svg>`
  );

  // Generate 512x512 circular PNG
  const circular512 = await sharp(inputPath)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png({ quality: 100 })
    .toBuffer();

  fs.writeFileSync('public/images/sabbir-circle.png', circular512);
  fs.writeFileSync('src/app/icon.png', circular512);

  // Also create apple-icon.png (180x180)
  const circular180 = await sharp(circular512)
    .resize(180, 180)
    .png()
    .toBuffer();
  fs.writeFileSync('src/app/apple-icon.png', circular180);

  // Also create webp version
  const circularWebp = await sharp(circular512)
    .webp({ quality: 90 })
    .toBuffer();
  fs.writeFileSync('public/images/sabbir-circle.webp', circularWebp);

  // Now create multi-size favicon.ico containing 16, 32, 48, 64
  const sizes = [16, 32, 48, 64];
  const pngBuffers = [];
  for (const s of sizes) {
    const buf = await sharp(circular512).resize(s, s).png().toBuffer();
    pngBuffers.push({ size: s, buffer: buf });
  }

  // Build ICO header + directory + data
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  let offset = 6 + count * 16;
  const dirEntries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 0); // Width
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // Image data size
    entry.writeUInt32LE(offset, 12); // Offset of image data
    dirEntries.push(entry);
    offset += item.buffer.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...dirEntries,
    ...pngBuffers.map(p => p.buffer)
  ]);

  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);

  console.log('Successfully generated circular favicons and icons!');
}

createCircularImages().catch(console.error);
