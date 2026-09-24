/**
 * JUNIOR VENTURA - PERSONAL TRAINER
 * Interações, Simulador de Treino e Integração com WhatsApp Oficial
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuração Oficial de Contato
  const WHATSAPP_NUMBER = '558491412646'; // +55 84 9141-2646
  const DEFAULT_MESSAGE = 'Olá, Junior! Vi sua página e gostaria de saber mais sobre o treinamento personalizado.';

  /**
   * 1. Header scroll effect
   */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /**
   * 2. Mobile navigation toggle
   */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /**
   * 3. FAQ Accordion
   */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 30 + 'px';
      }
    });
  });

  /**
   * 4. Interactive Routine Simulator / Calculator
   */
  const calcState = {
    goal: 'emagrecimento',
    frequency: '3-dias',
    time: '45-min'
  };

  const goalNames = {
    'emagrecimento': 'Emagrecimento Acelerado',
    'hipertrofia': 'Hipertrofia & Ganho Muscular',
    'completo': 'Transformação Total (Secar + Massa Magra)'
  };

  const freqNames = {
    '3-dias': '3 dias na semana',
    '4-dias': '4 dias na semana',
    '5-dias': '5 dias na semana'
  };

  const timeNames = {
    '35-min': '35 a 45 minutos por sessão',
    '50-min': '45 a 60 minutos por sessão'
  };

  const planDescriptions = {
    'emagrecimento': 'Protocolo metabólico de alta eficiência com preservação de massa muscular magra, priorizando densidade de treino para máxima queima sem perda de tempo.',
    'hipertrofia': 'Periodização de sobrecarga progressiva com foco em grupos musculares estratégicos, garantindo volume ótimo de estímulo mesmo em dias concorridos.',
    'completo': 'Estratégia híbrida periodizada: aceleração metabólica aliada a estímulos precisos de hipertrofia para transformar sua composição corporal sem dietas restritivas extremas.'
  };

  function updateCalculator() {
    const titleEl = document.getElementById('calcResultPlan');
    const descEl = document.getElementById('calcResultDesc');
    const ctaBtn = document.getElementById('calcCtaBtn');

    if (!titleEl || !descEl || !ctaBtn) return;

    const goalLabel = goalNames[calcState.goal];
    const freqLabel = freqNames[calcState.frequency];
    const timeLabel = timeNames[calcState.time];

    titleEl.textContent = `${goalLabel} • ${freqLabel}`;
    descEl.textContent = `${planDescriptions[calcState.goal]} Sessões estimadas em ${timeLabel}, perfeitamente encaixadas na sua rotina.`;

    const customMsg = `Olá, Junior! Simulei meu treino no seu site: meu foco é ${goalLabel}, com disponibilidade de ${freqLabel} (${timeLabel}). Gostaria de começar minha transformação!`;
    ctaBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMsg)}`;
  }

  // Bind option clicks
  const optionButtons = document.querySelectorAll('.calc-option-btn');
  optionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = btn.getAttribute('data-type');
      const val = btn.getAttribute('data-value');

      if (!type || !val) return;

      // Unselect siblings
      const siblings = btn.parentElement.querySelectorAll('.calc-option-btn');
      siblings.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      calcState[type] = val;
      updateCalculator();
    });
  });

  // Initial call
  updateCalculator();

  /**
   * 5. Smooth scroll for internal links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  console.log('Junior Ventura Landing Page initialized successfully.');
});
