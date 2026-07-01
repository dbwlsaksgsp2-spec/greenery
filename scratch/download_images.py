import urllib.request
import os

images = {
    "monstera.jpg": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80",
    "stuckyi.jpg": "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=600&auto=format&fit=crop&q=80",
    "sansevieria.jpg": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&auto=format&fit=crop&q=80",
    "areca_palm.jpg": "https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80",
    "fishbone.jpg": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&auto=format&fit=crop&q=80",
    "orbifolia.jpg": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&auto=format&fit=crop&q=80",
    "pink_princess.jpg": "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=600&auto=format&fit=crop&q=80",
    "scindapsus.jpg": "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=600&auto=format&fit=crop&q=80"
}

dest_dir = "public/images"
os.makedirs(dest_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, url in images.items():
    dest_path = os.path.join(dest_dir, filename)
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(dest_path, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

print("All downloads completed.")
