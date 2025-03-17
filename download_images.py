import os
import requests
from pathlib import Path

# Create images directory if it doesn't exist
Path("images").mkdir(exist_ok=True)

# Dictionary of image URLs and their target filenames
images = {
    # Profile image - Professional headshot
    "profile.jpg": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    
    # Project images - Modern tech/development related
    "project1.jpg": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",  # AI Dashboard
    "project2.jpg": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",  # Mobile App
    "project3.jpg": "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",  # E-commerce Platform
    "project4.jpg": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",  # Data Analytics
    "project5.jpg": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",  # Blockchain Platform
    "project6.jpg": "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80",  # IoT Solution
    
    # Background images - Abstract and modern
    "hero-bg.jpg": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    "about-bg.jpg": "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&q=80"
}

def download_image(url, filename):
    filepath = os.path.join("images", filename)
    
    # Skip if file already exists
    if os.path.exists(filepath):
        print(f"Skipping {filename} - already exists")
        return
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        with open(filepath, "wb") as f:
            f.write(response.content)
        print(f"Downloaded {filename}")
        
    except Exception as e:
        print(f"Error downloading {filename}: {str(e)}")

# Download all images
for filename, url in images.items():
    download_image(url, filename)

print("Download complete!") 