import './style.scss';

class SliderComponent extends HTMLElement {
  constructor() {
    super();

    this.slides = Array.from(this.querySelectorAll('.slide-item'));
    this.slidesTemplate = this.slides.map((slide) => slide);

    this.min = 1;
    this.max = this.slides.length;

    this.nextControl = this.querySelector(
      '.slider-controls .slider-control-next'
    );
    this.previousControl = this.querySelector(
      '.slider-controls .slider-control-prev'
    );
    this.handleNext = this.goNext.bind(this);
    this.handlePrev = this.goPrev.bind(this);

    this.controls();
  }

  controls() {
    this.nextControl.addEventListener('click', this.handleNext);
    this.previousControl.addEventListener('click', this.handlePrev);
  }

  goNext() {
    const currentSlide = this.querySelector('[data-slide-active=true]');
    const currentIndex = +currentSlide.dataset.slide;
    let activeIndex = currentIndex + 1 > this.max ? this.min : currentIndex + 1;
    let prevIndex = activeIndex - 1 < this.min ? this.max : activeIndex - 1;
    let nextIndex = activeIndex + 1 > this.max ? this.min : activeIndex + 1;
    this.render(activeIndex, prevIndex, nextIndex);
  }

  goPrev() {
    const currentSlide = this.querySelector('[data-slide-active=true]');
    const currentIndex = +currentSlide.dataset.slide;
    let activeIndex = currentIndex - 1 < this.min ? this.max : currentIndex - 1;
    let prevIndex = activeIndex - 1 < this.min ? this.max : activeIndex - 1;
    let nextIndex = activeIndex + 1 > this.max ? this.min : activeIndex + 1;

    this.render(activeIndex, prevIndex, nextIndex);
  }

  render(activeIndex, prevIndex, nextIndex) {
    this.slides.forEach((slide) => {
      if (+slide.getAttribute('data-slide') !== activeIndex)
        slide.setAttribute('data-slide-active', 'false');
    });

    this.querySelector(`.slide-item[data-slide="${activeIndex}"]`).setAttribute(
      'data-slide-active',
      'true'
    );
    this.querySelector(`.slide-item[data-slide="${prevIndex}"]`).setAttribute(
      'data-slide-active',
      'previous'
    );
    this.querySelector(`.slide-item[data-slide="${nextIndex}"]`).setAttribute(
      'data-slide-active',
      'next'
    );
  }
}

customElements.define('slider-component', SliderComponent);
