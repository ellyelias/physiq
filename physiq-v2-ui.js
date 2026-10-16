/* PhysiQ V2 UI adapter: the quick links on the Home panel open a tab by clicking the
   existing tab button, so the app's own tab handler (and everything it triggers) runs as before.
   It reads no student data and changes no state of its own. */
(function () {
  function go(name) {
    var tab = document.querySelector('.tab[data-tab="' + name + '"]');
    if (!tab || tab.offsetParent === null && getComputedStyle(tab).display === 'none') return;
    tab.click();
    try { tab.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) {}
    var bar = document.querySelector('.tabs');
    var top = bar ? bar.getBoundingClientRect().top + window.pageYOffset - 4 : 0;
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-go]');
    if (!b) return;
    e.preventDefault();
    go(b.getAttribute('data-go'));
  });
})();
