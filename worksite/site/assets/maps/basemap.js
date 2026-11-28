async function addAtlasLand(map) {
  const response = await fetch('/assets/maps/land.json');
  if (!response.ok) throw new Error('Corridor geography unavailable');
  map.createPane('geography').style.zIndex = 250;
  map.getPane('geography').style.pointerEvents = 'none';
  return L.geoJSON(await response.json(), {
    renderer: L.svg({pane: 'geography'}), interactive: false, attribution: 'Land: Natural Earth',
    style: {color:'#96b3a7', weight:1, fillColor:'#f2f2df', fillOpacity:1}
  }).addTo(map);
}
