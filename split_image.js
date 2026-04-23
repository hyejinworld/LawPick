import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function splitImage() {
  const sourceImage = path.join(__dirname, 'lawyers.jpg');
  const outputDir = path.join(__dirname, 'src', 'image');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const image = sharp(sourceImage);
    const metadata = await image.metadata();

    const cols = 6;
    const rows = 5;

    const cellWidth = Math.floor(metadata.width / cols);
    const cellHeight = Math.floor(metadata.height / rows);

    let count = 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const left = col * cellWidth;
        const top = row * cellHeight;

        const outputPath = path.join(outputDir, `lawyer_${count}.jpg`);

        await sharp(sourceImage)
          .extract({ left, top, width: cellWidth, height: cellHeight })
          .toFile(outputPath);
        count++;
      }
    }
    console.log('Done');
  } catch (error) {
    console.error('Error:', error);
  }
}

splitImage();
