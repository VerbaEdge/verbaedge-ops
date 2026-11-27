# VerbaEdge Ops worksite

Static staging source for the proposed VerbaEdge Ops trade name of **VerbaEdge Systems LLC**. The worksite uses plain HTML, CSS and JavaScript with no package dependencies.

Run commands from `worksite/`:

```bash
node --version           # Node 20+
npm run dev              # local preview on port 3000
npm run check            # run tests and build dist/
```

The worksite is designed to be served from the root of a staging host using `worksite/dist/`. Its canonical URLs identify the intended host, `ops.verbaedge.com`. This staging source is separate from the existing GitHub Pages website at the repository root. See [source provenance](docs/MERGE_PROVENANCE.md) and [release gates](docs/LEGAL_RELEASE_GATES.md).

The maintenance and shipment workflows in `/demo/` use fictional data and browser-local storage. The relocated [shipment checklist](site/legacy/freight-demo/index.html) and [invoice reference demo](site/billing/demo/index.html) retain their original fictional examples. Corridor maps depict approximate locations for reference. They require third-party resources for the interactive basemap.

See [AGENTS.md](AGENTS.md) for worksite rules and [image rights](docs/IMAGE_RIGHTS_AND_DESIGN.md) for attribution and release requirements.
