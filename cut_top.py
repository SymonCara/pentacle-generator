from PIL import Image
import numpy as np

path = 'public/symbols/arrows/inconnu_courbe.png'
img = Image.open(path).convert('RGBA')
data = np.array(img)

# Clear top 25 rows (the dash starts around y=10)
data[:25, :] = [255, 255, 255, 0]

img = Image.fromarray(data)
img.save(path, "PNG")
print("Top 25 rows cleared.")
