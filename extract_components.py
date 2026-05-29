from PIL import Image
import numpy as np

img = Image.open('full_lame_eau.png').convert('RGB')
data = np.array(img)

# Find connected components without scipy
brightness = data.mean(axis=2)
lines = brightness < 200

def find_components(binary_img):
    h, w = binary_img.shape
    visited = np.zeros_like(binary_img, dtype=bool)
    components = []
    
    for y in range(h):
        for x in range(w):
            if binary_img[y, x] and not visited[y, x]:
                # BFS
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
                
                if len(comp_pixels) > 50: # filter small noise
                    ys = [p[0] for p in comp_pixels]
                    xs = [p[1] for p in comp_pixels]
                    min_y, max_y = min(ys), max(ys)
                    min_x, max_x = min(xs), max(xs)
                    components.append((min_x, max_x, min_y, max_y))
    return components

comps = find_components(lines)
for i, (min_x, max_x, min_y, max_y) in enumerate(comps):
    w = max_x - min_x + 1
    h = max_y - min_y + 1
    if 20 < w < 400 and 20 < h < 400:
        print(f"Object {i+1}: x={min_x}-{max_x} (w={w}), y={min_y}-{max_y} (h={h})")
