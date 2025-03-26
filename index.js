var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    loop: true,
    autoplay: {
        delay: 3000,
    },
    breakpoints: {
        // when window width is <= 768px
        768: {
            slidesPerView: 5,
            spaceBetween: 10
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault(); // Impede a adição do hash na URL

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
});