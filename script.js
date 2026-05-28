const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".nav-menu");

// Abre/Fecha menu ao clicar no hamburguer
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Fecha o menu ao clicar em qualquer link
document.querySelectorAll(".nav-menu li a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

const track = document.querySelector('#carouselTrack');
const nextBtn = document.querySelector('#nextBtn');
const prevBtn = document.querySelector('#prevBtn');

let index = 0;

function updateCarousel() {
    const cardWidth = document.querySelector('.tournament-card').offsetWidth + 20; // Largura + Gap
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    const totalCards = document.querySelectorAll('.tournament-card').length;
    const cardsVisible = window.innerWidth > 1100 ? 4 : (window.innerWidth > 768 ? 2 : 1);

    if (index < totalCards - cardsVisible) {
        index++;
    } else {
        index = 0; // Volta ao início (loop)
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
    }
    updateCarousel();
});

// Ajusta o carrossel caso o usuário mude o tamanho da tela (resize)
window.addEventListener('resize', updateCarousel);