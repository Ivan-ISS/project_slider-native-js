const images = [
    {
        url: 'https://www.t-r-n.ru/files/modification-images/7a/1f/d5/01/39973_tmb940.jpg',
        title: 'Subaru XV спереди',
    },
    {
        url: 'https://www.t-r-n.ru/files/modification-images/ae/07/52/58/39972_tmb940.jpg',
        title: 'Subaru XV сбоку',
    },
    {
        url: 'https://www.t-r-n.ru/files/modification-images/1d/c4/32/16/39974_tmb940.jpg',
        title: 'Subaru XV сзади',
    },
    {
        url: 'https://www.t-r-n.ru/files/modification-images/59/93/d6/2a/39662_tmb940.jpg',
        title: 'Stinger спереди',
    },
    {
        url: 'https://www.t-r-n.ru/files/modification-images/31/2d/be/c0/39663_tmb940.jpg',
        title: 'Stinger сзади',
    },
];

function initSlider(options, slides) {
    if (!slides || !slides.length) return;

    options = options || {
        dots: false,
        titles: false,
        autoplay: false,
        autoplayInterval: 5000,
        fixedSize: false,
    };

    const sliderImages = document.querySelector('.slider__images');
    const sliderArrows = document.querySelector('.slider__arrows');
    const sliderDots = document.querySelector('.slider__dots');
    const sliderTitles = document.querySelector('.slider__titles');

    function setTitles(num) {
        if (!slides[num].title) return;
        sliderTitles.innerText = slides[num].title;
    }

    function initImages() {
        slides.forEach((slide, index) => {
            const imgDiv = `
                <div
                    class="
                        slider__img-container
                        n${index}
                        ${index === 0 ? 'active' : ''}
                        ${options.fixedSize ? 'fixed' : ''}
                    "
                    data-index=${index}
                >
                    <img class="slider__img" src=${slide.url} alt=${slide.title}/>
                </div>
            `;
            sliderImages.innerHTML += imgDiv;
        });
    }

    function initDots() {
        slides.forEach((_, index) => {
            const dotDiv = `
                <div
                    class="slider__dot n${index} ${index === 0 ? 'active' : ''}"
                    data-index=${index}
                ></div>
            `;
            sliderDots.innerHTML += dotDiv;
        });
    }

    function activateDots() {
        const dots = sliderDots.querySelectorAll('.slider__dot');
        dots.forEach((dot) => {
            dot.addEventListener('click', function () {
                moveSlider(this.dataset.index);
            });
        });
    }

    function activateArrows() {
        const arrowleft = sliderArrows.querySelector('.slider__arrow.left');
        const arrowRight = sliderArrows.querySelector('.slider__arrow.right');

        arrowleft.addEventListener('click', prevSlide);
        arrowRight.addEventListener('click', nextSlide);
    }

    function activateAutoplay() {
        setInterval(nextSlide, options.autoplayInterval);
    }

    function nextSlide() {
        const currentNum = +sliderImages.querySelector('.active').dataset.index;
        let nextNum = currentNum === slides.length - 1 ? 0 : currentNum + 1;
        moveSlider(nextNum);
    }

    function prevSlide() {
        const currentNum = +sliderImages.querySelector('.active').dataset.index;
        let nextNum = currentNum === 0 ? slides.length - 1 : currentNum - 1;
        moveSlider(nextNum);
    }

    function moveSlider(nextNum) {
        sliderImages.querySelector('.active').classList.remove('active');
        sliderImages.querySelector('.n' + nextNum).classList.add('active');

        if (options.dots) {
            sliderDots.querySelector('.active').classList.remove('active');
            sliderDots.querySelector('.n' + nextNum).classList.add('active');
        }

        if (options.titles) setTitles(nextNum);
    }

    initImages();
    activateArrows();

    if (options.dots) {
        initDots();
        activateDots();
    }

    if (options.titles) {
        setTitles(0);
    }

    if (options.autoplay) {
        activateAutoplay();
    }
}

const sliderOptions = {
    dots: true,
    titles: true,
    autoplay: true,
    autoplayInterval: 5000,
    fixedSize: false,
};

document.addEventListener('DOMContentLoaded', function () {
    initSlider(sliderOptions, images);
});
