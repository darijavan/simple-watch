//#region src/watch.d.ts
interface WatchConfig {
  /** Enable smooth second hand movement via millisecond interpolation. Default: `false` */
  smooth?: boolean;
  /** Size of the watch face in pixels. Default: `300` */
  size?: number;
  /** Visual color theme. Default: `'light'` */
  theme?: 'light' | 'dark';
  /** Show numeric hour labels on the watch face. Default: `false` */
  showDigits?: boolean;
}
declare class Watch {
  private readonly center;
  private readonly ph;
  private readonly pm;
  private readonly ps;
  private readonly conf;
  private watch;
  private rafId;
  constructor(conf?: WatchConfig);
  /**
   * Initialize and render the watch inside `el`, then start the animation loop.
   * If no element is provided, a new `<div>` is created and appended to `document.body`.
   * Calling `attach()` again while already running is a no-op.
   */
  attach(el?: HTMLElement): void;
  /**
   * Dynamically update the size of the watch face.
   */
  setSize(size: number): void;
  /**
   * Pause the animation loop.
   */
  suspend(): void;
  /**
   * Resume the animation loop after it has been suspended.
   * Calling `resume()` while already running is a no-op.
   */
  resume(): void;
  private animate;
  private initWatch;
}
//#endregion
export { Watch, type WatchConfig };
//# sourceMappingURL=index.d.mts.map