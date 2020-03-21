class Clock {
  /**
   * Instantiate a new clock
   * @param {HTMLDivElement} el The div element container for the clock
   * @param {{ smooth: boolean, size: number, theme: string, showDigits: boolean }} conf Configuration for the clock
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

    this.initClock(el);

    requestAnimationFrame(this.animate.bind(this));
  }

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

    requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * 
   * @param {HTMLDivElement} clock The clock DOM element
   */
  initClock(clock) {
    if (this.conf.showDigits) {
      let digitContainer = document.createElement('div');
      digitContainer.className = "digits";

      for (let i = 0; i < 12; i++) {
        let digit = `${i + 1}`,
          element = document.createElement('div');
        element.innerText = digit;

        let angle = (i + 3) * Math.PI / 6,
          dx = 5 + 40 * (1 - Math.cos(angle)),
          dy = 5 + 40 * (1 - Math.sin(angle));

        element.style.left = `${dx}%`;
        element.style.top = `${dy - 0.5}%`;
        digitContainer.appendChild(element);
      }

      clock.appendChild(digitContainer);
    }

    clock.classList.add(this.conf.theme || 'light');

    clock.style.width = `${this.conf.size || 300}px`;
    clock.style.height = `${this.conf.size || 300}px`;

    /* Center point */
    this.center.classList.add('center');
    clock.appendChild(this.center);

    /* Pointer for hours */
    this.ph.classList.add('ph');
    clock.appendChild(this.ph);

    /* Pointer for minutes */
    this.pm.classList.add('pm');
    clock.appendChild(this.pm);

    /* Pointer for seconds */
    this.ps.classList.add('ps');
    clock.appendChild(this.ps);

    /* Dashes */
    let dashContainer = document.createElement('div');
    dashContainer.classList.add('dash-container');
    clock.appendChild(dashContainer);

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
  }
}