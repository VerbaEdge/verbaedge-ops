# Image and UI design provenance

The visual baseline is the supplied 17 November 2026 VerbaEdge relaunch archive. The worksite includes the VerbaEdge logo in SVG and PNG formats and the inherited `legacy-africa-corridors.png` illustration. The illustration's creator and reuse rights are unverified. The worksite uses the Inter/system font stack with navy, blue, and teal.

## Homepage illustrations

OpenAI ImageGen generated both fictional scenes on November 27, 2026 from text prompts. Neither generation used the removed Unsplash photo as an input. Each image has descriptive alternative text, a visible AI-generated caption, and source credit on the legal page. The site serves compressed WebP derivatives. The original PNGs were retained in the generation workspace and contain embedded provenance metadata.

| Site asset | Subject | Original PNG SHA-256 |
| --- | --- | --- |
| `site/assets/home/warehouse.webp` | Distribution warehouse aisle with blue shelving and unbranded cartons | `e5bb13c6f4e3577cd49319e58d38a23c74ebc3cc05774f682ce81f4d0ad38cf0` |
| `site/assets/home/maintenance.webp` | Industrial pump and motor in a mechanical room | `34a356db2d4f4961aec9a0fe4724e20c32f80609753a41fdfb1d11c742c4cd9b` |

## Removed photographs

The imported homepage referenced two illustrative photos by Unsplash CDN key. On November 27, 2026, the review environment returned HTTP 403 for both CDN references and the license page. Photographer credits, photo-specific license terms, and any applicable releases are unverified. Verify each item before reusing either photograph. [Unsplash license](https://unsplash.com/license)

- Warehouse image, `photo-1586528116311-ad8dd3c8310d`. [Original CDN reference](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d)
- Construction image, `photo-1504307651254-35680f356dfd`. [Original CDN reference](https://images.unsplash.com/photo-1504307651254-35680f356dfd)

For any photo approved for use, record its source page, creator, license, required credit, and any applicable person or property releases. Caption stock photos as illustrative when their context could suggest VerbaEdge personnel, facilities, or projects.

Design direction: warm and cinematic editorial storytelling inspired by strong contemporary consumer site UX including Sunrun's broad design approach—large headings, imagery, mobile-first service cards, prominent CTAs. NO copied Sunrun layout, copyrighted text, assets, source code, or proprietary styles.

Interactive maps use Folium and Leaflet with OpenStreetMap data and CARTO tiles. Their in-map credits identify both providers. The offline overview PNGs were rendered with Matplotlib Basemap and show approximate geographic context. [OpenStreetMap attribution](https://www.openstreetmap.org/copyright) · [CARTO attribution](https://carto.com/attributions)
