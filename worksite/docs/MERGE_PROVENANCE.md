# Source merge and provenance — verbaedge-ops

- **Review repository:** `VerbaEdge/verbaedge-ops`. The legacy archive came from the logistics site.
- **Root GitHub Pages:** The existing root site and `CNAME` are preserved. The checked-in `CNAME` specifies `ops.verbaedge.com`; live domain configuration was outside this review.
- **Worksite staging:** Serve the build from `worksite/dist/` on an isolated preview host. Canonical metadata uses the intended `ops.verbaedge.com` hostname.
- **Refreshed website source:** November 26 two-site starter project, `02_VerbaEdge_Ops`.
- **Legacy public site snapshot:** November 17 VerbaEdge relaunch archive, `logistics`.
- **Legacy paths added without conflict:** 8.
- **Collisions archived in documentation:** 2: index.html, demo/index.html.
- **Old published root content:** This bundle does not overwrite it. Install the entire `worksite/` subdirectory only.
- **Private sources:** Original private source ZIPs and source documents are deliberately excluded from publication.
- **Caveat:** The November 17 archive is a source snapshot, not a complete git clone of the current GitHub repository. Use the sync procedure to merge into a fresh clone; never replace the repository root wholesale.
