(async () => {
  const cards = document.querySelector('#corridor-cards');
  const filter = document.querySelector('#region-filter');
  const status = document.querySelector('#route-count');
  status.textContent = 'Loading planning scenarios…';

  let scenarios;
  try {
    const response = await fetch('/corridors.json');
    if (!response.ok) throw new Error('Corridor data request failed');
    scenarios = await response.json();
    if (!Array.isArray(scenarios)) throw new Error('Invalid corridor data');
  } catch {
    status.textContent = 'Planning scenarios could not load. Refresh to retry, or use the reference maps below.';
    return;
  }

  const regions = [...new Set(scenarios.map(scenario => scenario.region))].sort();
  for (const region of regions) {
    filter.add(new Option(region, region));
  }

  function render() {
    const selected = scenarios.filter(scenario => !filter.value || scenario.region === filter.value);
    const results = document.createDocumentFragment();
    for (const scenario of selected) {
      const card = document.createElement('article');
      card.className = 'card';

      const region = document.createElement('span');
      region.className = 'kicker';
      region.textContent = scenario.region;
      const heading = document.createElement('h3');
      heading.textContent = scenario.name;
      const waypoints = document.createElement('p');
      waypoints.textContent = scenario.waypoints;
      const evidence = document.createElement('p');
      evidence.className = 'tiny';
      evidence.textContent = scenario.evidence;
      const limitation = document.createElement('p');
      limitation.className = 'tiny muted';
      limitation.textContent = 'Caution: ' + scenario.limitation;
      const source = document.createElement('a');
      source.className = 'more';
      source.href = scenario.source;
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      source.textContent = 'Reference source ↗';
      source.setAttribute('aria-label', `Reference source for ${scenario.name} (opens in a new tab)`);

      card.append(region, heading, waypoints, evidence, limitation, source);
      results.append(card);
    }
    cards.replaceChildren(results);
    status.textContent = `${selected.length} planning ${selected.length === 1 ? 'scenario' : 'scenarios'}. Data is not live routing.`;
  }

  filter.addEventListener('change', render);
  filter.disabled = false;
  render();
})();
