class Watch {
  /**
   * Instantiate a new watch
   * @param {HTMLDivElement} el The div element container for the watch
   * @param {{ smooth: boolean, size: number, theme: string, showDigits: boolean }} conf Configuration for the watch
   */
  constructor(el, conf = {
    smooth: false,
    size: 300,
    theme: 'light',
    showDigits: false
  }) {
    this.center = document.createElement('div');
    this.ph = document.createElement('div');
    this.pm = document.createElement('div');
    this.ps = document.createElement('div');

    this.conf = conf;

    this.paused = false;

    this.watch = this.initwatch(el);

    requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Recursive-like method for animating the watch's pointers. DO NOT CALL EXPLICITPLY
   */
  animate() {
    let date = new Date(Date.now());
    let hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds(),
      ms = date.getMilliseconds(),
      sAngle = (sec + (this.conf.smooth ? ms / 1000 : 0) - 15) * Math.PI / 30,
      mAngle = (min - 15 + sec / 60) * Math.PI / 30,
      hAngle = (hour - 3 + min / 60) * Math.PI / 6;

    this.ph.style.transform = `rotateZ(${hAngle}rad)`;
    this.pm.style.transform = `rotateZ(${mAngle}rad)`;
    this.ps.style.transform = `rotateZ(${sAngle}rad)`;

    if (!this.paused) requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Method for initializing the watch DOM element. THIS SHOULD BE A PRIVATE METHOD OF THE WATCH CLASS AND CALLED IMPLICITLY WITHIN THE CONSTRUCTOR. DO NOT CALL EXPLICITLY
   * @param {HTMLDivElement} watch The watch DOM element. The method will create new element if this parameter is not provided
   * @returns {HTMLDivElement} The watch's container element
   */
  initwatch(watch) {
    if (!watch) {
      watch = document.querySelector('div');
      watch.classList.add('watch');
      document.body.appendChild(watch);
    }

    if (this.conf.showDigits) {
      let digitContainer = document.createElement('div');
      digitContainer.className = "digits";

      for (let i = 0; i < 12; i++) {
        let digit = `${i + 1}`,
          element = document.createElement('div');
        element.innerText = digit;

        let angle = (i + 4) * Math.PI / 6,
          dx = 12 + 38 * (1 - Math.cos(angle)),
          dy = 12 + 38 * (1 - Math.sin(angle));

        element.style.left = `${dx}%`;
        element.style.top = `${dy}%`;
        element.style.fontSize = `${(this.conf.size || 300) / 18}px`;
        digitContainer.appendChild(element);
      }

      watch.appendChild(digitContainer);
    }

    watch.classList.add(this.conf.theme || 'light');

    watch.style.width = `${this.conf.size || 300}px`;
    watch.style.height = `${this.conf.size || 300}px`;

    /* Center point */
    this.center.classList.add('center');
    watch.appendChild(this.center);

    /* Pointer for hours */
    this.ph.classList.add('ph');
    watch.appendChild(this.ph);

    /* Pointer for minutes */
    this.pm.classList.add('pm');
    watch.appendChild(this.pm);

    /* Pointer for seconds */
    this.ps.classList.add('ps');
    watch.appendChild(this.ps);

    /* Dashes */
    let dashContainer = document.createElement('div');
    dashContainer.classList.add('dash-container');
    watch.appendChild(dashContainer);

    /* Dashes for hours indicator */
    for (let i = 0; i < 12; i++) {
      let d = document.createElement('div');
      d.classList.add('big-dash');

      let angle = (i + 3) * Math.PI / 6,
        dx = 50 * (1 - Math.cos(angle)),
        dy = 50 * (1 - Math.sin(angle));

      d.style.left = `${dx}%`;
      d.style.top = `${dy - 0.5}%`;
      d.style.transform = `rotateZ(${angle}rad)`;
      dashContainer.appendChild(d);
    }

    /* Dashes for min indicator */
    for (let i = 0; i < 60; i++) {
      if (i % 5) {
        let d = document.createElement('div');
        d.classList.add('small-dash');

        let angle = (i + 15) * Math.PI / 30,
          dx = 50 * (1 - Math.cos(angle)),
          dy = 50 * (1 - Math.sin(angle));

        d.style.left = `${dx}%`;
        d.style.top = `${dy - 0.3}%`;
        d.style.transform = `rotateZ(${angle}rad)`;
        dashContainer.appendChild(d);
      }
    }

    return watch;
  }

  /**
   * Set the size of the watch to a new value
   * @param {number} size The watch's new size
   */
  setSize(size) {
    this.watch.style.width = `${size}px`;
    this.watch.style.height = `${size}px`;

    this.watch.querySelectorAll('.digits>*').forEach(e => e.style.fontSize = `${size / 18}px`);
  }

  /**
   * Suspend the flow
   */
  suspend() {
    this.paused = true;
  }

  /**
   * Resume the watch's animation
   */
  resume() {
    this.paused = false;
    this.animate();
  }
}