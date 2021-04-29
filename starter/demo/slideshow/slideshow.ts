interface SlideshowOptions {
  delay?: number;
  speed?: number;
}

export class Slideshow {

  /** Delay between each automatic move */
  delay = 5000;
  /** Speed for one move */
  speed = 1000;
  /** Total of slides */
  total = 0;
  /** Currently displayed slide */
  current = 1;
  /** Reference to the current timer */
  timer = 0;
  /** Main wrapper element of all the slideshow */
  elementMain: HTMLElement;
  /** Wrapper element of all slides */
  elementSlides: HTMLElement;
  /** Pagination element */
  elementPagination: HTMLElement;

  /**
   * Initializes a slideshow
   * @param id Id of the main wrapper element of all the slideshow
   * @param options Delay and speed options
   */
  constructor(id: string, { delay = 5000, speed = 1000 }: SlideshowOptions = {}) {

    this.delay = delay;
    this.speed = speed;

    /* Select HTML elements needed for running the slideshow module */
    this.elementMain = document.getElementById(id) as HTMLElement;
    this.elementSlides = this.elementMain.children[0] as HTMLElement;
    this.elementPagination = this.elementMain.children[1] as HTMLElement;

    /* Automatic dynamic configuration to adapt to all slideshows */
    this.total = this.elementSlides.children.length;

    /* Apply transition effects when moving */
    this.elementSlides.style.transition = `transform ${speed}ms`;
    this.elementSlides.addEventListener('transitionend', this.start.bind(this));

    /* Apply pagination data and listeners */
    Array.from(this.elementPagination.children).forEach((element, index) => {
      (element as HTMLElement).dataset.page = `${index + 1}`;
    });
    this.elementPagination.addEventListener('click', this.onPaginationClick.bind(this));

    /* Launches the first delay */
    this.start();

  }

  /** Launches the automatic delay */
  start(): void {

    /* Stop any current timer to avoid concurrent timers */
    this.stop();

    /* Launches a new timer and then move */
    this.timer = window.setTimeout(() => {
      this.move();
    }, this.delay);

  }

  /** Stops the current timeout */
  stop(): void {

    window.clearTimeout(this.timer);

  }

  /**
   * Move to another slide
   * @param next Position of the destination slide
   */
  move(next = (this.current < this.total) ? (this.current + 1) : 1): void {

    /* Translate the slides container */
    this.elementSlides.style.transform = `translateX(${(next - 1) * -100}%)`;

    /* Update the new current position */
    this.current = next;

    /* The transitionend event (registered in constructor) will relaunch a new timer */

  }

  /** Pagination listener handler */
  onPaginationClick(event: MouseEvent): void {

    /* Stop the automatic delay as the user interacts */
    this.stop();

    /* Retrieves the page number in custom attributes */
    const page = Number.parseInt((event.target as HTMLElement).dataset.page || '1', 10);

    /* Move to the wanted slide */
    this.move(page);

  }

}
