const storageKey = 'veops-demo-v1';
const defaults = {
  work: [
    {id: 'WO-001', asset: 'Demo Bay Door', task: 'Inspect hinges and seal', priority: 'Routine', status: 'Open'},
    {id: 'WO-002', asset: 'Demo Forklift', task: 'Check defect report', priority: 'Urgent', status: 'Open'},
  ],
  ships: [
    {id: 'DEMO-001', lane: 'Mombasa → Kigali', status: 'Booked (fictional)'},
    {id: 'DEMO-002', lane: 'Los Angeles → Chicago', status: 'Documents pending (fictional)'},
  ],
};
const shipmentStatuses = [
  'Booked (fictional)',
  'Documents pending (fictional)',
  'In transit (fictional)',
  'Delivered (fictional)',
];
const workForm = document.querySelector('#work-form');
const shipmentForm = document.querySelector('#shipment-form');
const workList = document.querySelector('#work-list');
const shipmentList = document.querySelector('#shipment-list');
const reset = document.querySelector('#reset-demo');
const status = document.querySelector('#demo-status');

function hasFields(records, fields) {
  return Array.isArray(records) && records.every(record =>
    record && fields.every(field => typeof record[field] === 'string'));
}

let state = structuredClone(defaults);
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (hasFields(saved?.work, ['id', 'asset', 'task', 'priority', 'status']) &&
      hasFields(saved?.ships, ['id', 'lane', 'status'])) {
    state = saved;
  }
} catch {
  // Start with example records when browser storage cannot be read.
}

function commitDemoChange(message) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    status.textContent = message;
  } catch {
    status.textContent = `${message} Browser storage is unavailable. Changes last until this page closes or reloads.`;
  }
}

function element(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}

function createRow(title, details, label) {
  const box = element('div', '', 'feature demo-record');
  const summary = element('div', '');
  const detail = element('p', details, 'tiny muted');
  const button = element('button', label, 'btn');
  button.type = 'button';
  summary.append(element('strong', title), detail);
  box.append(summary, button);
  return {box, detail, button};
}

function createWorkRow(record) {
  const details = () => `${record.task} · ${record.priority} · ${record.status}`;
  const action = () => record.status === 'Open' ? 'Close demo ticket' : 'Reopen demo ticket';
  const {box, detail, button} = createRow(`${record.id} · ${record.asset}`, details(), action());
  function updateLabel() {
    button.textContent = action();
    button.setAttribute('aria-label', `${action()} ${record.id}`);
  }
  updateLabel();
  button.addEventListener('click', () => {
    record.status = record.status === 'Open' ? 'Closed' : 'Open';
    detail.textContent = details();
    updateLabel();
    commitDemoChange(`Work order ${record.id} is ${record.status.toLowerCase()}.`);
  });
  return box;
}

function createShipmentRow(record) {
  const details = () => `${record.lane} · ${record.status}`;
  const {box, detail, button} = createRow(record.id, details(), 'Next fictional status');
  button.setAttribute('aria-label', `Next fictional status for ${record.id}`);
  button.addEventListener('click', () => {
    const index = shipmentStatuses.indexOf(record.status);
    record.status = shipmentStatuses[(index + 1) % shipmentStatuses.length];
    detail.textContent = details();
    commitDemoChange(`Shipment ${record.id}: ${record.status}.`);
  });
  return box;
}

function renderLists() {
  workList.replaceChildren(...state.work.map(createWorkRow));
  shipmentList.replaceChildren(...state.ships.map(createShipmentRow));
}

workForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(workForm);
  const record = {
    id: `WO-${String(Date.now()).slice(-6)}`,
    asset: data.get('asset'),
    task: data.get('task'),
    priority: data.get('priority'),
    status: 'Open',
  };
  state.work.unshift(record);
  workList.prepend(createWorkRow(record));
  workForm.reset();
  commitDemoChange(`Added work order ${record.id}.`);
});

shipmentForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(shipmentForm);
  const record = {id: data.get('reference'), lane: data.get('lane'), status: shipmentStatuses[0]};
  state.ships.unshift(record);
  shipmentList.prepend(createShipmentRow(record));
  shipmentForm.reset();
  commitDemoChange(`Added fictional shipment ${record.id}.`);
});

reset.addEventListener('click', () => {
  state = structuredClone(defaults);
  renderLists();
  commitDemoChange('Restored the fictional example records.');
});

renderLists();
workForm.hidden = false;
shipmentForm.hidden = false;
reset.hidden = false;
