(function () {
  let watchElement = document.querySelector('.watch');

  let watch = new Watch(watchElement, {
    smooth: false,
    size: 300,
    showDigits: true,
    theme: 'dark'
  });
})();