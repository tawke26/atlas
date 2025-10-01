# Adding Photos to Thinker Profiles

## Recommended Sources for Photos

### 1. Wikimedia Commons (Free, Public Domain)
- URL: https://commons.wikimedia.org
- Search for the person's name
- Look for files licensed as "Public Domain" or "CC-BY" or "CC-BY-SA"
- Right-click → Copy image address
- Use the direct image URL

### 2. Official Websites
Many thinkers have official photos on their:
- University faculty pages
- Personal websites
- Think tank/organization pages

### 3. Photo Format
Add the `photo` field to each thinker JSON:

```json
{
  "id": "zeynep-tufekci",
  "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/x/xx/Name.jpg/400px-Name.jpg",
  ...
}
```

## Quick Photo URLs for Our Thinkers

I'll provide placeholder photo URLs using reliable sources. You can update these with better images later.

For now, I recommend:
1. Using their official university/organization photos
2. Wikimedia Commons for public figures
3. 400px width images work best
4. Always ensure proper attribution if required

## Example Implementations

**Zeynep Tufekci**: UNC faculty page or her website
**Kate Raworth**: Oxford faculty page  
**Martha Nussbaum**: University of Chicago faculty page
**Daniel Dennett**: Tufts faculty page
**Yuval Noah Harari**: Official website

## For MVP:
You can initially leave photos optional (the UI will handle missing photos gracefully).
Add them gradually as you find good quality, properly licensed images.

