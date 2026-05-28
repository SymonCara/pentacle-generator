from PIL import Image
import numpy as np

img = Image.open('full_lame_eau.png').convert('RGBA')
data = np.array(img)

brightness = data[:, :, :3].mean(axis=2)
# 220 to catch more of the anti-aliased edges
lines = brightness < 220

def find_components(binary_img):
    h, w = binary_img.shape
    visited = np.zeros_like(binary_img, dtype=bool)
    components = []
    
    for y in range(h):
        for x in range(w):
            if binary_img[y, x] and not visited[y, x]:
                comp_pixels = []
                queue = [(y, x)]
                visited[y, x] = True
                
                head = 0
                while head < len(queue):
                    cy, cx = queue[head]
                    head += 1
                    comp_pixels.append((cy, cx))
                    
                    for dy, dx in [(-1,0), (1,0), (0,-1), (0,1), (-1,-1), (-1,1), (1,-1), (1,1)]:
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < h and 0 <= nx < w:
                            if binary_img[ny, nx] and not visited[ny, nx]:
                                visited[ny, nx] = True
                                queue.append((ny, nx))
                
                if len(comp_pixels) > 50:
                    components.append(comp_pixels)
    return components

comps = find_components(lines)

for i, comp in enumerate(comps):
    ys = [p[0] for p in comp]
    xs = [p[1] for p in comp]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    w = max_x - min_x + 1
    h = max_y - min_y + 1
    
    # Left curve
    if 120 < min_x < 150 and 160 < min_y < 190 and h > 150:
        print(f"Found left curve: Object {i}")
        out_data = np.zeros((h + 20, w + 20, 4), dtype=np.uint8)
        
        other_comps_set = set()
        for j, c in enumerate(comps):
            if j != i:
                other_comps_set.update(c)
                
        # also add pure white to other_comps so we don't copy white background
        
        for y, x in comp:
            for dy in range(-3, 4):
                for dx in range(-3, 4):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < data.shape[0] and 0 <= nx < data.shape[1]:
                        if (ny, nx) not in other_comps_set:
                            pixel = data[ny, nx]
                            # Make white background transparent
                            # The original image has white bg (255, 255, 255)
                            if pixel[0] > 240 and pixel[1] > 240 and pixel[2] > 240:
                                continue
                            
                            out_y = ny - min_y + 10
                            out_x = nx - min_x + 10
                            if 0 <= out_y < out_data.shape[0] and 0 <= out_x < out_data.shape[1]:
                                out_data[out_y, out_x] = pixel
                                
        # Convert all non-fully transparent pixels to burgundy to ensure solid color if needed,
        # but process_images.py will handle making it black.
        # Actually process_images preserves alpha, so we just need alpha!
        # The source image doesn't have alpha, it has white background.
        # We need to convert white-ish to transparent.
        for oy in range(out_data.shape[0]):
            for ox in range(out_data.shape[1]):
                if out_data[oy, ox, 3] > 0: # if we copied a pixel
                    # calculate darkness
                    r, g, b = out_data[oy, ox, :3]
                    avg = (int(r)+int(g)+int(b))/3
                    # alpha based on darkness: black=255, white=0
                    alpha = max(0, min(255, 255 - int(avg)))
                    # color it solid black for the base image
                    out_data[oy, ox] = [0, 0, 0, alpha]
                                
        out_img = Image.fromarray(out_data)
        out_img.save('public/symbols/arrows/inconnu_courbe.png')
        print("Saved cleanly extracted and alpha-processed inconnu_courbe.png")
