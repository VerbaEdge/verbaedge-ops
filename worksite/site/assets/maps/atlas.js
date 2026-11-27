function finishAtlas(tileLayer, overlays) {
  tileLayer.once('tileload', () => document.documentElement.classList.add('atlas-ready'));

  for (const group of Object.values(overlays)) {
    group.eachLayer(marker => {
      let openedWithKeyboard = false;
      const label = new DOMParser().parseFromString(marker.getTooltip().getContent(), 'text/html').body.textContent.trim();

      function makeMarkerFocusable() {
        const pin = marker.getElement();
        pin.setAttribute('tabindex', '0');
        pin.setAttribute('role', 'button');
        pin.setAttribute('aria-label', label);
        pin.onkeydown = event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openedWithKeyboard = true;
            marker.openPopup();
          }
        };
      }

      marker.on('popupopen', ({ popup }) => {
        if (!openedWithKeyboard) return;
        const panel = popup.getElement();
        panel.tabIndex = -1;
        panel.setAttribute('role', 'group');
        panel.setAttribute('aria-label', label);
        panel.onkeydown = event => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            marker.closePopup();
          }
        };
        panel.focus();
      });
      marker.on('popupclose', () => {
        if (!openedWithKeyboard) return;
        openedWithKeyboard = false;
        const pin = marker.getElement();
        if (pin?.isConnected) pin.focus();
      });

      marker.on('add', makeMarkerFocusable);
      if (marker.getElement()) makeMarkerFocusable();
    });
  }
}
