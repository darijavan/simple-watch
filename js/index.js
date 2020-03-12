(function () {
  let clockElement = document.querySelector('.clock');

  let clock = new Clock(clockElement, {
    smooth: false,
    size: 600,
  });
})();