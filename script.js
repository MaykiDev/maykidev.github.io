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

// Scroll suave para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();

        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - headerHeight - 10,
                behavior: 'smooth'
            });
        }
    });
});

// Header compacto ao rolar a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================================
// CARROSSEL DE TORNEIOS
// ============================================================
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

// ============================================================
// GALERIA - Lightbox
// ============================================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;

        // Cria lightbox
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox-overlay');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Animação de entrada
        requestAnimationFrame(() => {
            lightbox.classList.add('lightbox-active');
        });

        // Fecha ao clicar no overlay ou no botão
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                lightbox.classList.remove('lightbox-active');
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            }
        });

        // Fecha com ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                lightbox.classList.remove('lightbox-active');
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    });
});

// ============================================================
// ANIMAÇÕES DE ENTRADA AO SCROLL (Intersection Observer)
// ============================================================
const animateOnScroll = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa seções e cards
    document.querySelectorAll('.gallery-item, .manager-card, .manager-img-frame').forEach(el => {
        el.classList.add('animate-target');
        observer.observe(el);
    });
};

// Inicia animações quando o DOM estiver pronto
animateOnScroll();

// ============================================================
// FORMULÁRIO DE CONTATO (WHATSAPP REDIRECT)
// ============================================================
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('formName').value;
        const email = document.getElementById('formEmail').value;
        const telefone = document.getElementById('formPhone').value;
        const modalidade = document.getElementById('formModality').value;
        const torneio = document.getElementById('formTournament').value;
        const atletas = document.getElementById('formAthletes').value;
        const mensagem = document.getElementById('formMessage').value;

        let textoWhatsApp = `Olá, vim pelo site e gostaria de mais informações!\n\n`;
        textoWhatsApp += `*Nome:* ${nome}\n`;
        textoWhatsApp += `*E-mail:* ${email}\n`;
        textoWhatsApp += `*Telefone:* ${telefone}\n`;
        textoWhatsApp += `*Modalidade:* ${modalidade}\n`;
        textoWhatsApp += `*Torneio:* ${torneio}\n`;
        if (atletas) textoWhatsApp += `*Nº de Atletas:* ${atletas}\n`;
        if (mensagem) textoWhatsApp += `*Mensagem:* ${mensagem}\n`;

        const numeroWhatsApp = "551126797709"; // Número da Sportz
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;
        
        window.open(url, '_blank');
    });
}

// ============================================================
// FAQ ACCORDION LOGIC
// ============================================================
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        if (question.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});