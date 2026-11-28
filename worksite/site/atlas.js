(() => {
  const picker = document.querySelector('.at-picker');
  const select = document.getElementById('at-select');
  const panels = Array.from(document.querySelectorAll('.at-panel'));

  function showSelected() {
    const key = location.hash.slice(1);
    const panel = panels.find(item => item.id === key) || panels[0];
    select.value = panel.id;
    for (const item of panels) item.hidden = item !== panel;
  }

  select.addEventListener('change', () => {
    history.pushState(null, '', '#' + select.value);
    showSelected();
  });
  window.addEventListener('hashchange', showSelected);
  window.addEventListener('popstate', showSelected);
  showSelected();
  picker.hidden = false;
})();
