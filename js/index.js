(function () {
  let watchElement = document.querySelector(".watch");

  let watch = new Watch({
    smooth: false,
    size: 300,
    showDigits: true,
    theme: "dark",
  });

  // Attach the Watch object to the DOM element
  watch.attach(watchElement);
})();