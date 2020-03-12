class Clock {
  /**
   * Instantiate a new clock
   * @param {HTMLDivElement} el The div element container for the clock
   */
  constructor(el) {
    this.center = document.createElement('div');
    this.ph = document.createElement('div');
    this.pm = document.createElement('div');
    this.ps = document.createElement('div');

    this.initClock(el);

    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    let date = new Date(Date.now());
    let hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds(),
      hAngle = (hour - 3) * Math.PI / 6,
      mAngle = (min - 15) * Math.PI / 30,
      sAngle = (sec - 15) * Math.PI / 30;

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
    clock.style.width = '300px';
    clock.style.height = '300px';

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
    for (let i = 0; i < 12; i++) {
      let d = document.createElement('div');
      d.classList.add('big-dash');

      let angle = (i + 3) * Math.PI / 6,
        dx = (dashContainer.offsetWidth / 2) * (1 - Math.cos(angle)),
        dy = (dashContainer.offsetHeight / 2) * (1 - Math.sin(angle));

      d.style.left = `${dx}px`;
      d.style.top = `${dy}px`;
      d.style.transform = `rotateZ(${angle}rad)`;
      dashContainer.appendChild(d);
    }
  }
}