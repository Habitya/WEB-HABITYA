const swiper = new Swiper('.properties-slider', {
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024:{ slidesPerView: 3 }
  }
});
