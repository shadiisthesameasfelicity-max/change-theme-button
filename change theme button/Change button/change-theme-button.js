let ctrl = null;
let config = { theme: 'dark' };

const toggle = document.querySelector('.toggle');

function updateTheme() {
  document.documentElement.dataset.theme = config.theme;
}

function setPressed(isLight) {
  toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
}

const handleToggle = () => {
  const currentlyDark = toggle.getAttribute('aria-pressed') === 'false';
  const isLight = currentlyDark;
  setPressed(isLight);
  config.theme = isLight ? 'light' : 'dark';
  updateTheme();
  if (ctrl) {
    try { ctrl.refresh(); } catch (e) {}
  }
};

toggle.addEventListener('click', handleToggle);

(async () => {
  try {
    const { Pane } = await import('https://cdn.skypack.dev/tweakpane@4.0.4');
    ctrl = new Pane({ title: 'Config', expanded: true });
    ctrl.addBinding(config, 'theme', {
      label: 'Theme',
      options: { System: 'system', Light: 'light', Dark: 'dark' }
    }).on('change', () => {
      setPressed(config.theme === 'light');
      updateTheme();
    });
    ctrl.on('change', updateTheme);
    updateTheme();
  } catch (err) {
    console.warn('Tweakpane not available. Toggle still works.');
    updateTheme();
  }
})();