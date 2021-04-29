class MySlideshow extends HTMLElement {

  /** Delay between each automatic move */
  delay: number;
  /** Speed for one move */
  speed: number;
  /** Total of slides */
  total: number;
  /** Currently displayed slide */
  current = 1;
  /** Reference to the current timer */
  timer = 0;
  /** Main wrapper element of all the slideshow */
  main: HTMLElement;
  /** Wrapper element of all slides */
  slides: HTMLElement;
  /** Pagination element */
  pagination: HTMLElement;

  /** Initializes a slideshow */
  constructor() {

    super();

    /* Get delay and speed options from data attributes */
    const { delay = '5000', speed = '1000' } = this.dataset;
    this.delay = parseInt(delay, 10);
    this.speed = parseInt(speed, 10);

    /* Automatic dynamic configuration to adapt to all slideshows */
    this.total = this.children.length;

    /* Insert content and styles into a encapsulated DOM */
    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <style>
      .slideshow {
        width: 412px;
        overflow: hidden;
      }
      .slides {
        display: flex;
      }
      .pagination {
        display: flex;
        justify-content: center;
        list-style: none;
        margin: 5px 0 0 0;
        padding-left: 0;
      }
      .pagination>li {
        cursor: pointer;
        padding: 0 10px;
      }
      </style>
      <div class="slideshow">
        <div class="slides">
          <slot></slot>
        </div>
        <ul class="pagination">
          ${Array.from(this.children).map((_, index) => `<li data-page="${index + 1}">${index + 1}</li>`).join('')}
        </ul>
      </div>
        `;

    /* Select HTML elements needed for running the slideshow module */
    this.main = shadowRoot.querySelector('.slideshow') as HTMLElement;
    this.slides = this.main.children[0] as HTMLElement;
    this.pagination = this.main.children[1] as HTMLElement;

    /* Apply transition effects when moving */
    this.slides.style.transition = `transform ${this.speed}ms`;
    this.slides.addEventListener('transitionend', this.start.bind(this));

    this.pagination.addEventListener('click', this.onPaginationClick.bind(this));

    this.start();

  }

  /** Launches the automatic delay */
  start(): void {

    /* Stop any current timer to avoid concurrent timers */
    this.stop();

    /* Launches a new timer and then move */
    this.timer = window.setTimeout(this.move.bind(this), this.delay);

  }

  /** Stops the current timeout */
  stop(): void {

    window.clearTimeout(this.timer);

  }

  /**
   * Move to another slide
   * @param next Position of the destination slide
   */
  move(next = (this.current < this.total) ? this.current + 1 : 1): void {

    /* Translate the slides container */
    this.slides.style.transform = `translateX(${(1 - next) * 100}%)`;

    /* Update the new current position */
    this.current = next;

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

/* Register a new custom element */
customElements.define('my-slideshow', MySlideshow);
