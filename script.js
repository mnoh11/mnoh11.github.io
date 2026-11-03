/* ==========================================================================
   PORTFOLIO BTS SIO - NOHLAN MENICUCCI
   Script d'interactivité, Modales Projets, Scroll Spy, Toast & Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    initScrollSpy();
    initBackToTop();
    initScrollReveal();
    initKeyboardShortcuts();
});

/* --- Navbar Scroll Effect --- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > 350) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });
}

/* --- Mobile Menu Navigation --- */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Fermer le menu lors du clic sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Fermer lors du clic à l'extérieur
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

/* --- Scroll Spy (Lien actif dans la navbar) --- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });
}

/* --- Back To Top --- */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* --- Micro-Animations d'apparition au scroll --- */
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);
    const animatedCards = document.querySelectorAll('.glass-card, .timeline-item, .stat-box');

    animatedCards.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

/* --- Fiches Détaillées BTS - Données & Modales --- */
const projectsData = {
    filmManager: {
        badge: "Situation Professionnelle BTS SIO (Bloc 3)",
        title: "Gestionnaire de Films & Séries",
        image: "project_film_manager.jpg",
        context: "Projet d'application web réalisé dans le cadre de la formation BTS SIO. L'objectif était de développer un outil autonome de gestion d'une médiathèque de films sans framework lourd, en exploitant la puissance du JavaScript moderne et du DOM.",
        objectives: [
            "Concevoir une interface utilisateur responsive, fluide et accessible.",
            "Implémenter la validation stricte et instantanée des champs de formulaire.",
            "Assurer la manipulation dynamique des éléments du DOM (ajout, édition, suppression).",
            "Sauvegarder et restaurer l'état de la collection via l'API LocalStorage."
        ],
        technologies: ["HTML5 Sémantique", "CSS3 / Flexbox / Grid", "JavaScript ES6 (Vanilla)", "DOM API", "LocalStorage"],
        competencesBTS: [
            "B3.1 : Participer à la conception et au développement d'une solution applicative.",
            "B3.2 : Assurer la maintenance adaptative et corrective d'une application.",
            "B3.3 : Garantir la validation et la conformité des données manipulées."
        ],
        livrables: "Code source versionné, application opérationnelle, documentation d'architecture technique."
    },
    networkLab: {
        badge: "Atelier Pratique & Infrastructure (Bloc 1 & 2)",
        title: "Atelier d'Infrastructure Réseau & Services",
        image: "project_network_lab.jpg",
        context: "Mise en place d'un environnement réseau simulant l'infrastructure d'une PME avec segmentation par sous-réseaux, attribution automatique d'adresses et mise en œuvre de services d'infrastructure fondamentaux.",
        objectives: [
            "Calculer et structurer un plan d'adressage IPv4 optimisé (masques CIDR/VLSM).",
            "Configurer des serveurs DHCP et des zones de résolution de noms DNS.",
            "Déployer des accès d'administration sécurisés à distance via SSH / PuTTY.",
            "Tester et valider l'étanchéité et la connectivité réseau (Ping, Traceroute, analyse de trames)."
        ],
        technologies: ["Cisco Packet Tracer", "Linux Debian Server", "Protocoles TCP/IP, DHCP, DNS, SSH", "Docker", "PuTTY"],
        competencesBTS: [
            "B1.1 : Gérer le patrimoine informatique et déployer des services réseau.",
            "B1.2 : Répondre aux incidents et assister les utilisateurs.",
            "B2.1 : Administrer et sécuriser les réseaux et équipements d'interconnexion."
        ],
        livrables: "Topologie réseau documentée, fiches d'adressage, scripts de configuration des services."
    },
    portfolioProject: {
        badge: "Projet Personnel & Épreuve E4 / E6",
        title: "Portfolio Numérique Professionnel BTS SIO",
        image: "project_veille.jpg",
        context: "Création d'un portfolio en ligne servant de vitrine professionnelle pour l'examen du BTS SIO ainsi que pour la recherche de stage et d'alternance en entreprise.",
        objectives: [
            "Présenter de façon claire et hiérarchisée l'ensemble du parcours, des compétences et des stages.",
            "Adopter une charte graphique contemporaine (Dark Slate, Glassmorphism, typographie moderne).",
            "Intégrer les éléments requis par le référentiel BTS (fiches de projets, démarche de veille technologique).",
            "Garantir une parfaite compatibilité mobile (responsive design) et des performances optimales."
        ],
        technologies: ["HTML5", "CSS3 avancé (Custom Properties, Backdrop Filter)", "JavaScript ES6", "Git & GitHub"],
        competencesBTS: [
            "B1.3 : Développer la présence en ligne de l'organisation et soigner son identité numérique.",
            "B1.4 : Organiser son développement professionnel et capitaliser ses acquis."
        ],
        livrables: "Site web hébergé et responsive, CV PDF téléchargeable, fiches de synthèse prêtes pour le jury."
    }
};

function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <span class="modal-header-badge">${data.badge}</span>
        <h2 class="modal-title">${data.title}</h2>
        
        <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 22px; max-height: 240px;">
            <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <h3 class="modal-section-title">Contexte & Enjeux</h3>
        <p class="modal-text">${data.context}</p>

        <h3 class="modal-section-title">Objectifs Réalisés</h3>
        <ul class="modal-list">
            ${data.objectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>

        <h3 class="modal-section-title">Compétences BTS SIO Mobilisées</h3>
        <ul class="modal-list">
            ${data.competencesBTS.map(comp => `<li><strong>${comp.split(':')[0]} :</strong> ${comp.split(':')[1] || ''}</li>`).join('')}
        </ul>

        <h3 class="modal-section-title">Environnement Technologique</h3>
        <div class="skill-tags" style="margin-top: 10px; margin-bottom: 16px;">
            ${data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>

        <h3 class="modal-section-title">Livrables Associés</h3>
        <p class="modal-text" style="color: var(--accent-emerald); font-weight: 500;">
            ✓ ${data.livrables}
        </p>
    `;

    const modal = document.getElementById('projectModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function handleModalBackdropClick(event) {
    if (event.target.id === 'projectModal') {
        closeProjectModal();
    }
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

/* --- Copie dans le presse-papiers avec Toast --- */
function copyText(textToCopy, feedbackMsg) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(feedbackMsg);
        }).catch(() => {
            fallbackCopy(textToCopy, feedbackMsg);
        });
    } else {
        fallbackCopy(textToCopy, feedbackMsg);
    }
}

function fallbackCopy(textToCopy, feedbackMsg) {
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        showToast(feedbackMsg);
    } catch (err) {
        showToast('Impossible de copier automatiquement');
    }
    document.body.removeChild(tempInput);
}

function showToast(message) {
    const toast = document.getElementById('toastNotice');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* --- Formulaire de Contact --- */
function handleContactSubmit(e) {
    e.preventDefault();

    const nom = document.getElementById('contactNom').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const sujet = document.getElementById('contactSujet').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const feedback = document.getElementById('formSuccessFeedback');

    if (!nom || !email || !sujet || !message) {
        showToast('Veuillez remplir tous les champs obligatoires');
        return;
    }

    // Afficher message de validation
    feedback.classList.add('show');
    showToast('Message préparé avec succès !');

    // Génération du lien mailto
    const mailtoLink = `mailto:nohlanmenicucci@gmail.com?subject=${encodeURIComponent(`[Contact Portfolio] ${sujet}`)}&body=${encodeURIComponent(`Nom : ${nom}\nEmail : ${email}\n\nMessage :\n${message}`)}`;

    setTimeout(() => {
        window.location.href = mailtoLink;
    }, 1200);

    setTimeout(() => {
        document.getElementById('contactForm').reset();
        feedback.classList.remove('show');
    }, 4000);
}
