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

    const sliderImages = document.querySelector('.slider__images');
    const sliderArrows = document.querySelector('.slider__arrows');
    const sliderDots = document.querySelector('.dots');

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

    function activateArrows() {
        const arrowleft = sliderArrows.querySelector('.slider__arrow.left');
        const arrowRight = sliderArrows.querySelector('.slider__arrow.right');

        arrowleft.addEventListener('click', prevSlide);
        arrowRight.addEventListener('click', nextSlide);
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
    }

    initImages();
    activateArrows();
}

const sliderOptions = {
    dots: true,
    titles: true,
    autoplay: true,
    autoplayInterval: 5000,
    stylesBtn: true,
    fixedSize: false,
};

document.addEventListener('DOMContentLoaded', function () {
    initSlider(sliderOptions, images);
});
