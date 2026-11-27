const menuButton = document.querySelector('[data-menu]');
const navigation = document.querySelector('[data-nav]');

if (menuButton && navigation) {
  const header = menuButton.closest('header');
  const compact = window.matchMedia('(max-width: 900px)');

  function setMenuOpen(open) {
    navigation.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  }

  header.classList.add('menu-ready');
  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') === 'false');
  });
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      menuButton.focus();
      setMenuOpen(false);
    }
  });
  header.addEventListener('focusout', event => {
    if (!header.contains(event.relatedTarget)) setMenuOpen(false);
  });
  compact.addEventListener('change', () => setMenuOpen(false));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());

const inquiry = document.querySelector('[data-inquiry-form]');
if (inquiry) {
  inquiry.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(inquiry);
    const subject = data.get('topic');
    const body = `Name: ${data.get('name')}\nProject: ${subject}\n\n${data.get('message')}`;
    window.location.href = `mailto:contracts@verbaedge.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  inquiry.hidden = false;
}
