document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menu-toggle');
  const closeSidebar = document.getElementById('close-sidebar');
  const toggleSlider = document.getElementById('toggle-slider');

  // Tema claro/escuro
  if (
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  }

  window.toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleSlider?.classList.toggle('translate-x-8', isDark);
  };

  if (document.documentElement.classList.contains('dark')) {
    toggleSlider?.classList.add('translate-x-8');
  } else {
    toggleSlider?.classList.remove('translate-x-8');
  }

  // Controle do menu lateral
  const openSidebar = () => {
    sidebar.classList.remove('-translate-x-full');
  };

  const closeSidebarFn = () => {
    sidebar.classList.add('-translate-x-full');
  };

  menuToggle?.addEventListener('click', openSidebar);
  closeSidebar?.addEventListener('click', closeSidebarFn);

  // Inicializa com menu fechado
  sidebar.classList.add('-translate-x-full');
  menuToggle.classList.remove('hidden');
});
