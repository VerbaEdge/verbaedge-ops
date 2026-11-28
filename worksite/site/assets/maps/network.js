(async function () {
  const select = document.getElementById('route');
  const detail = document.getElementById('detail');
  const africa = ['east', 'west', 'south', 'central', 'markets'];
  const region = new URLSearchParams(location.search).get('region') || 'global';
  async function read(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Map file unavailable');
    return response.json();
  }
  try {
    const network = await read('network.json');
    const routes = network.routes.filter(r => region === 'global' || r.region === region ||
      (region === 'africa' && africa.includes(r.region)));
    const map = L.map('map', {scrollWheelZoom: window.top === window.self, minZoom: 1, maxZoom: 10});
    await addAtlasLand(map);
    const layer = L.layerGroup().addTo(map);
    select.replaceChildren(new Option('All routes in this view', ''));
    for (const route of routes) select.add(new Option(route.name, route.id));
    function render() {
      layer.clearLayers();
      const selected = routes.filter(r => !select.value || select.value === r.id);
      const nodes = new Set();
      for (const route of selected) {
        const points = route.nodes.map(n => network.points[n]);
        route.nodes.forEach(n => nodes.add(n));
        if (!['gateways','markets'].includes(route.region)) {
          const line = L.polyline(points,{color:'#056b66',weight:4,opacity:.78,dashArray:'8 5'}).addTo(layer);
          line.bindTooltip(route.name);
          line.on('click', () => {select.value=route.id; render();});
        }
      }
      for (const n of nodes) {
        L.circleMarker(network.points[n],{radius:5,color:'#fff',weight:1.5,fillColor:'#124e66',fillOpacity:1})
          .bindTooltip(n).bindPopup(n).addTo(layer);
      }
      if (nodes.size) map.fitBounds([...nodes].map(n => network.points[n]),{padding:[18,18],maxZoom:9});
      else map.setView([16,0],2);
      detail.textContent = select.value ? selected[0].nodes.join(' · ') : 'Select a route to see its gateway sequence. Dashed lines show approximate planning connections.';
    }
    select.addEventListener('change',render);
    render();
  } catch {
    select.disabled = true;
    detail.textContent = 'The map could not load. Open the corridor atlas above for gateway lists and reference maps.';
  }
})();
