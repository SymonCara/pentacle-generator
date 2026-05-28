from PIL import Image
import numpy as np

def keep_largest_component(path):
    img = Image.open(path).convert('RGBA')
    data = np.array(img)
    
    alpha = data[:, :, 3]
    binary = alpha > 10
    
    h, w = binary.shape
    visited = np.zeros_like(binary, dtype=bool)
    components = []
    
    for y in range(h):
        for x in range(w):
            if binary[y, x] and not visited[y, x]:
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
                            if binary[ny, nx] and not visited[ny, nx]:
                                visited[ny, nx] = True
                                queue.append((ny, nx))
                
                components.append(comp_pixels)
                
    if len(components) <= 1:
        print("Only one component found, skipping.")
        return
        
    print(f"Found {len(components)} components. Sizes: {[len(c) for c in components]}")
    components.sort(key=len, reverse=True)
    
    largest = set(components[0])
    
    cleared = 0
    for y in range(h):
        for x in range(w):
            if binary[y, x] and (y, x) not in largest:
                data[y, x] = [255, 255, 255, 0]
                cleared += 1
                
    img = Image.fromarray(data)
    img.save(path, "PNG")
    print(f"Cleared {cleared} pixels from smaller components in {path}")

keep_largest_component('public/symbols/arrows/inconnu_courbe.png')
