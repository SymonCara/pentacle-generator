const sharp = require('sharp');
const fs = require('fs');

async function main() {
  const url = 'https://static.wikia.nocookie.net/latelier-des-sorciers-manga-kamome-shirahama/images/6/6a/Lame_eau.png/revision/latest?path-prefix=fr';
  
  console.log('Downloading image...');
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  
  const img = sharp(Buffer.from(buffer));
  const metadata = await img.metadata();
  console.log(`Image dimensions: ${metadata.width}x${metadata.height}`);

  // It's a 499x499 image
  await img.clone().extract({ left: 195, top: 350, width: 110, height: 90 })
    .png()
    .toFile('public/symbols/arrows/inconnu_triangle.png');
  console.log('Saved inconnu_triangle.png');

  await img.clone().extract({ left: 130, top: 280, width: 80, height: 90 })
    .png()
    .toFile('public/symbols/arrows/inconnu_courbe.png');
  console.log('Saved inconnu_courbe.png');
}

main().catch(console.error);
