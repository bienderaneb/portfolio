// portfolio.js - Version Optimisée

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation
    initPortfolio();
});

function initPortfolio() {
    // Navigation
    initMenu();
    
    // Compétences
    initSkills();
    
    // Projets
    initProjects();
    
    // Formulaire contact
    initForm();
    
    // Animations
    initAnimations();
    
    // Mettre à jour l'année
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// ===== NAVIGATION =====
function initMenu() {
    const menuBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuBtn || !navMenu) return;
    
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuBtn.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Fermer au clic sur lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== COMPÉTENCES =====
function initSkills() {
    document.querySelectorAll('.mastery-value.editable').forEach(element => {
        // Charger depuis localStorage
        const tech = element.dataset.tech;
        const saved = localStorage.getItem(`skill-${tech}`);
        
        if (saved) {
            element.textContent = `${saved}%`;
            const bar = element.closest('.mastery-item').querySelector('.mastery-fill');
            bar.style.width = `${saved}%`;
        }
        
        // Éditer au clic
        element.addEventListener('click', () => editSkill(element));
    });
}

function editSkill(element) {
    const current = parseInt(element.textContent);
    const tech = element.dataset.tech;
    
    const newValue = prompt(`Niveau ${tech.toUpperCase()} (0-100) :`, current);
    
    if (newValue >= 0 && newValue <= 100) {
        element.textContent = `${newValue}%`;
        
        const bar = element.closest('.mastery-item').querySelector('.mastery-fill');
        bar.style.width = `${newValue}%`;
        
        localStorage.setItem(`skill-${tech}`, newValue);
        
        showToast(`✅ ${tech.toUpperCase()} : ${newValue}%`, 'success');
    }
}

// ===== PROJETS =====
function initProjects() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}

// ===== FORMULAIRE =====
function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validation simple
        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        
        if (!name || !email) {
            showToast('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Simulation d'envoi
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        // Attendre 2 secondes
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Succès
        showToast('✅ Message envoyé !', 'success');
        form.reset();
        
        // Réinitialiser le bouton
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Barre de progression
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scroll = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scroll}%`;
        });
    }
    
    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

// ===== NOTIFICATIONS =====
function showToast(message, type = 'info') {
    // Créer le toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Afficher
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== CSS DYNAMIQUE MINIMAL =====
const style = document.createElement('style');
style.textContent = `
    /* Toast */
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s;
        z-index: 1000;
    }
    
    .toast.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .toast.success { background: #10b981; }
    .toast.error { background: #ef4444; }
    .toast.info { background: #3b82f6; }
    
    .toast i { font-size: 18px; }
    
    /* Animation */
    .animate {
        animation: fadeIn 0.8s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* Scroll progress */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #7c3aed);
        z-index: 9999;
    }
    
    /* Responsive menu */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 20px;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ===== FONCTIONS UTILES GLOBALES =====
window.copyEmail = () => {
    navigator.clipboard.writeText('contact@lenamartin.dev');
    showToast('📧 Email copié !', 'success');
};

window.downloadCV = () => {
    showToast('📄 CV téléchargé !', 'success');
    // window.open('assets/cv.pdf', '_blank');
};