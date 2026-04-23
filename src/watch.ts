export interface WatchConfig {
  /** Enable smooth second hand movement via millisecond interpolation. Default: `false` */
  smooth?: boolean;
  /** Size of the watch face in pixels. Default: `300` */
  size?: number;
  /** Visual color theme. Default: `'light'` */
  theme?: 'light' | 'dark';
  /** Show numeric hour labels on the watch face. Default: `false` */
  showDigits?: boolean;
}

export class Watch {
  private readonly center: HTMLDivElement;
  private readonly ph: HTMLDivElement;
  private readonly pm: HTMLDivElement;
  private readonly ps: HTMLDivElement;
  private readonly conf: Required<WatchConfig>;
  private watch!: HTMLDivElement;
  private paused = false;

  constructor(conf: WatchConfig = {}) {
    this.conf = {
      smooth: false,
      size: 300,
      theme: 'light',
      showDigits: false,
      ...conf,
    };

    this.center = document.createElement('div');
    this.ph = document.createElement('div');
    this.pm = document.createElement('div');
    this.ps = document.createElement('div');
  }

  /**
   * Initialize and render the watch inside `el`, then start the animation loop.
   * If no element is provided, a new `<div>` is created and appended to `document.body`.
   */
  attach(el?: HTMLElement): void {
    this.watch = this.initWatch(el);
    requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Dynamically update the size of the watch face.
   */
  setSize(size: number): void {
    this.watch.style.width = `${size}px`;
    this.watch.style.height = `${size}px`;

    this.watch.querySelectorAll<HTMLElement>('.digits > *').forEach((e) => {
      e.style.fontSize = `${size / 18}px`;
    });
  }

  /**
   * Pause the animation loop.
   */
  suspend(): void {
    this.paused = true;
  }

  /**
   * Resume the animation loop after it has been suspended.
   */
  resume(): void {
    this.paused = false;
    requestAnimationFrame(this.animate.bind(this));
  }

  private animate(): void {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const ms = now.getMilliseconds();

    const sAngle = ((sec + (this.conf.smooth ? ms / 1000 : 0) - 15) * Math.PI) / 30;
    const mAngle = ((min - 15 + sec / 60) * Math.PI) / 30;
    const hAngle = ((hour - 3 + min / 60) * Math.PI) / 6;

    this.ph.style.transform = `rotateZ(${hAngle}rad)`;
    this.pm.style.transform = `rotateZ(${mAngle}rad)`;
    this.ps.style.transform = `rotateZ(${sAngle}rad)`;

    if (!this.paused) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  private initWatch(el?: HTMLElement): HTMLDivElement {
    let container: HTMLDivElement;

    if (el) {
      container = el as HTMLDivElement;
    } else {
      container = document.createElement('div');
      container.classList.add('watch');
      document.body.appendChild(container);
    }

    if (this.conf.showDigits) {
      const digitContainer = document.createElement('div');
      digitContainer.className = 'digits';

      for (let i = 0; i < 12; i++) {
        const element = document.createElement('div');
        element.innerText = `${i + 1}`;

        const angle = ((i + 4) * Math.PI) / 6;
        const dx = 12 + 38 * (1 - Math.cos(angle));
        const dy = 12 + 38 * (1 - Math.sin(angle));

        element.style.left = `${dx}%`;
        element.style.top = `${dy}%`;
        element.style.fontSize = `${this.conf.size / 18}px`;
        digitContainer.appendChild(element);
      }

      container.appendChild(digitContainer);
    }

    container.classList.add(this.conf.theme);
    container.style.width = `${this.conf.size}px`;
    container.style.height = `${this.conf.size}px`;

    this.center.classList.add('center');
    container.appendChild(this.center);

    this.ph.classList.add('ph');
    container.appendChild(this.ph);

    this.pm.classList.add('pm');
    container.appendChild(this.pm);

    this.ps.classList.add('ps');
    container.appendChild(this.ps);

    const dashContainer = document.createElement('div');
    dashContainer.classList.add('dash-container');
    container.appendChild(dashContainer);

    for (let i = 0; i < 12; i++) {
      const d = document.createElement('div');
      d.classList.add('big-dash');

      const angle = ((i + 3) * Math.PI) / 6;
      const dx = 50 * (1 - Math.cos(angle));
      const dy = 50 * (1 - Math.sin(angle));

      d.style.left = `${dx}%`;
      d.style.top = `${dy - 0.5}%`;
      d.style.transform = `rotateZ(${angle}rad)`;
      dashContainer.appendChild(d);
    }

    for (let i = 0; i < 60; i++) {
      if (i % 5 !== 0) {
        const d = document.createElement('div');
        d.classList.add('small-dash');

        const angle = ((i + 15) * Math.PI) / 30;
        const dx = 50 * (1 - Math.cos(angle));
        const dy = 50 * (1 - Math.sin(angle));

        d.style.left = `${dx}%`;
        d.style.top = `${dy - 0.3}%`;
        d.style.transform = `rotateZ(${angle}rad)`;
        dashContainer.appendChild(d);
      }
    }

    return container;
  }
}
