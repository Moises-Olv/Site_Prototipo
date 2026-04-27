// SCRIPT UNIVERSAL PARA NAVEGAÇÃO TOTAL - Menu Responsivo com Submenus
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const menuHeader = document.querySelector('.menu-header');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            menuHeader.classList.add('scrolled');
        } else {
            menuHeader.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Remove existing ripples
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect to all buttons
    document.querySelectorAll('.menu-btn, .hero-btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Parallax effect for hero section - FIXED
    const heroSection = document.querySelector('.hero-section');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Only apply parallax to hero section background, not to cards
        if (heroSection && scrolled < window.innerHeight) {
            const parallax = scrolled * 0.3;
            heroSection.style.transform = `translateY(${parallax}px)`;
        }
        
        // Keep cards in their original floating positions during scroll
        // Don't apply scroll-based transform to cards to maintain their animations
    });
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 200);
            });
        }, 300);
    });
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const menuNav = document.getElementById('menuNav');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Função para detectar se é mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Menu Hambúrguer para Mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            menuNav.classList.toggle('active');
        });
    }
    
    // Controle dos dropdowns
    dropdowns.forEach(dropdown => {
        const menuBtn = dropdown.querySelector('.menu-btn');
        
        menuBtn.addEventListener('click', function(e) {
            if (isMobile()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Fechar outros dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('open');
                    }
                });
                
                // Alternar dropdown atual
                dropdown.classList.toggle('open');
            }
        });
    });
    
    // Controle dos submenus - SCRIPT UNIVERSAL PARA NAVEGAÇÃO TOTAL
    const allSubmenuBtns = document.querySelectorAll('.submenu-btn');
    allSubmenuBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Para links reais, NÃO BLOQUEAR NADA - deixar navegar livremente
            if (href && href !== '#') {
                // Apenas marcar como ativo para feedback visual
                allSubmenuBtns.forEach(b => b.classList.remove('active-page'));
                this.classList.add('active-page');
                
                const parentDropdown = this.closest('.dropdown');
                if (parentDropdown) {
                    const parentMenuBtn = parentDropdown.querySelector('.menu-btn');
                    if (parentMenuBtn) {
                        document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active-page'));
                        parentMenuBtn.classList.add('active-page');
                    }
                }
                
                // NÃO USAR preventDefault(), stopPropagation() ou qualquer bloqueio
                // Deixar o navegador fazer a navegação 100% naturalmente
                return;
            }
            
            // Apenas para links # (placeholder)
            e.preventDefault();
            e.stopPropagation();
            
            // Marcar como ativo
            allSubmenuBtns.forEach(b => b.classList.remove('active-page'));
            this.classList.add('active-page');
            
            const parentDropdown = this.closest('.dropdown');
            if (parentDropdown) {
                const parentMenuBtn = parentDropdown.querySelector('.menu-btn');
                if (parentMenuBtn) {
                    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active-page'));
                    parentMenuBtn.classList.add('active-page');
                }
            }
            
            // Fechar menu no mobile
            if (isMobile() && mobileMenuBtn) {
                setTimeout(() => {
                    mobileMenuBtn.classList.remove('active');
                    menuNav.classList.remove('active');
                    dropdowns.forEach(d => d.classList.remove('open'));
                }, 500);
            }
        });
    });
    
    // Fechar menu ao clicar fora (apenas no mobile)
    document.addEventListener('click', function(e) {
        if (isMobile() && mobileMenuBtn && menuNav) {
            if (!menuNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                menuNav.classList.remove('active');
                dropdowns.forEach(d => d.classList.remove('open'));
            }
        }
    });
    
    // Atualizar ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (!isMobile()) {
            // Resetar estados do mobile quando voltar para desktop
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            if (menuNav) menuNav.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('open'));
        }
    });
    
    // Marcar página atual como ativa
    const currentPage = window.location.pathname.split('/').pop();
    const currentSubmenu = document.querySelector(`.submenu-btn[href="${currentPage}"]`);
    if (currentSubmenu) {
        currentSubmenu.classList.add('active-page');
        const parentDropdown = currentSubmenu.closest('.dropdown');
        const parentMenuBtn = parentDropdown.querySelector('.menu-btn');
        parentMenuBtn.classList.add('active-page');
    }
    
    // Funcionalidade de arrastar horizontalmente nos cards
    const cardsContainers = document.querySelectorAll('.cards-container');
    
    cardsContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;
        
        container.addEventListener('mousedown', (e) => {
            // Verificar se não está clicando em um link ou elemento interativo
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) {
                return;
            }
            
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            isDragging = false;
            e.preventDefault();
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
            
            // Se não arrastou significativamente, permite o clique normal
            setTimeout(() => {
                isDragging = false;
            }, 10);
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            
            e.preventDefault();
            isDragging = true;
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Velocidade do arrasto
            container.scrollLeft = scrollLeft - walk;
        });
        
        // Prevenir seleção de texto durante o arrasto
        container.addEventListener('selectstart', (e) => {
            if (isDown) {
                e.preventDefault();
            }
        });
        
        // Suporte a touch para dispositivos móveis
        let touchStartX = 0;
        let touchScrollLeft = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - container.offsetLeft;
            touchScrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - touchStartX) * 2;
            container.scrollLeft = touchScrollLeft - walk;
            e.preventDefault();
        });
        
        container.addEventListener('touchend', () => {
            touchStartX = 0;
        });
    });
    
    // Adicionar efeito de smooth scroll para navegação por teclado
    cardsContainers.forEach(container => {
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        });
    });
});