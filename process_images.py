from PIL import Image
import os
import glob

def process_image(path):
    try:
        img = Image.open(path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # item is (R, G, B, A)
            # Most wiki images have a white/off-white background and colored/black lines.
            # We want to make white/light pixels transparent, and dark/colored pixels WHITE.
            
            # Calculate brightness
            brightness = (item[0] + item[1] + item[2]) / 3
            
            # If it's bright (like white background) or transparent
            if brightness > 200 or item[3] < 50:
                newData.append((255, 255, 255, 0)) # Transparent
            else:
                # If it's a line (dark or colored), make it purely white and opaque
                # You can also keep the alpha if it's anti-aliased to keep smooth edges
                # Let's map darkness to opacity: darker = more opaque white
                opacity = int(255 - brightness)
                if opacity < 0: opacity = 0
                newData.append((255, 255, 255, opacity))

        img.putdata(newData)
        img.save(path, "PNG")
        print(f"Processed {path}")
    except Exception as e:
        print(f"Failed {path}: {e}")

if __name__ == "__main__":
    base_dir = r"c:\Users\user\Documents\Bot_atelier_des_sorciers\pentacle-generator\public\symbols"
    emblems = glob.glob(os.path.join(base_dir, "emblems", "*.png"))
    arrows = glob.glob(os.path.join(base_dir, "arrows", "*.png"))
    
    for f in emblems + arrows:
        process_image(f)
