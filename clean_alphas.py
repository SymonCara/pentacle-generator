import glob
from PIL import Image

def clean_image(f):
    img = Image.open(f).convert("RGBA")
    datas = img.getdata()
    newData = []
    cleaned = 0
    for item in datas:
        # if alpha is less than a threshold, make it fully transparent
        # 120 seems like a safe threshold to remove faint ghost boxes while keeping thick lines
        if item[3] > 0 and item[3] < 120:
            newData.append((255, 255, 255, 0))
            cleaned += 1
        else:
            newData.append(item)
    
    if cleaned > 0:
        img.putdata(newData)
        img.save(f, "PNG")
        print(f"Cleaned {cleaned} ghost pixels in {f}")

for f in glob.glob('public/symbols/*/*.png'):
    clean_image(f)
