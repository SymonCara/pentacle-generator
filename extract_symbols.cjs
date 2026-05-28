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

  // Extract bottom symbol (inconnu_triangle)
  await img.clone().extract({ left: 145, top: 345, width: 210, height: 95 })
    .png()
    .toFile('public/symbols/arrows/inconnu_triangle.png');
  console.log('Saved inconnu_triangle.png');

  // Extract left curve (inconnu_courbe)
  await img.clone().extract({ left: 130, top: 170, width: 90, height: 190 })
    .png()
    .toFile('public/symbols/arrows/inconnu_courbe.png');
  console.log('Saved inconnu_courbe.png');
}

main().catch(console.error);
