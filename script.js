  // ---- abstract animated backdrop: Vanta.js NET ----
  (function(){
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = document.getElementById('vanta-bg');

    if (reduceMotion || typeof VANTA === 'undefined'){
      el.style.background = '#12141a';
      return;
    }

    VANTA.NET({
      el: el,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x7dd3fc,
      backgroundColor: 0x12141a,
      points: 9.00,
      maxDistance: 22.00,
      spacing: 17.00,
      showDots: false
    });
  })();

  // ---- hero name letter-in animation ----
  const nameEl = document.getElementById('brandName');
  const NAME = "Vince Portfolio";
  NAME.split("").forEach((ch, i) => {
    const span = document.createElement('span');
    span.textContent = ch;
    span.style.animationDelay = (i * 0.06) + "s";
    nameEl.appendChild(span);
  });
  requestAnimationFrame(() => {
    document.getElementById('brand').style.opacity = 1;
  });

  // ---- tab switching with animated panel transition ----
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.panel');

  function activate(target){
    buttons.forEach(b => b.classList.toggle('active', b.dataset.target === target));
    panels.forEach(p => {
      if (p.id === target){
        p.classList.add('current');
        p.classList.remove('enter');
        void p.offsetWidth; // restart animation
        p.classList.add('enter');
      } else {
        p.classList.remove('current', 'enter');
      }
    });
    if (target === 'skill') animateSkills();
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => activate(btn.dataset.target));
  });

  // ---- hide top navigation while scrolling down ----
  const tabs = document.getElementById('tabs');
  let previousScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0 || currentScrollY < previousScrollY){
      tabs.classList.remove('nav-hidden');
    } else if (currentScrollY > previousScrollY){
      tabs.classList.add('nav-hidden');
    }

    previousScrollY = currentScrollY;
  }, { passive:true });

  // ---- skill bar fill, triggered on tab open ----
  let skillsAnimated = false;
  function animateSkills(){
    if (skillsAnimated) return;
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(fill => {
      const pct = fill.dataset.pct;
      requestAnimationFrame(() => { fill.style.width = pct + "%"; });
    });
  }

  // ---- animated cursor ring ----
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mousePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!reduceMotion && mousePointer){
    const cursorRing = document.createElement('span');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorRing);

    document.addEventListener('pointermove', event => {
      cursorRing.style.left = event.clientX + 'px';
      cursorRing.style.top = event.clientY + 'px';
      cursorRing.classList.add('visible');
    });

    document.querySelectorAll('a, button').forEach(control => {
      control.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
      control.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });
  }

  // ---- click feedback ----
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.addEventListener('click', event => {
      const ripple = document.createElement('span');
      ripple.className = 'click-ripple';
      ripple.style.left = event.clientX + 'px';
      ripple.style.top = event.clientY + 'px';
      document.body.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once:true });
    });
  }

  // ---- AI agent chatbox ----
  const chatWidget = document.getElementById('chatWidget');
  const chatToggle = document.getElementById('chatToggle');
  const chatClose = document.getElementById('chatClose');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const quickPills = document.querySelectorAll('.quick-pill');

  function appendMessage(role, text){
    const wrapper = document.createElement('div');
    wrapper.className = 'message ' + role;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    chatBody.appendChild(wrapper);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function generateReply(message){
    const text = message.toLowerCase();

    if (text.includes('experience') || text.includes('worked') || text.includes('career')){
      return "Vince has experience in administrative support, customer service, finance assistance, and basic programming. His background includes roles in food retail, distribution, gaming support, and junior programming.";
    }

    if (text.includes('skill') || text.includes('abilities') || text.includes('excel')){
      return "He is strong in data entry, records management, Microsoft Excel, customer service, cashiering, inventory support, and basic troubleshooting. He is also adaptable and willing to learn new tools and processes.";
    }

    if (text.includes('contact') || text.includes('email') || text.includes('hire') || text.includes('available')){
      return "You can reach Vince through his email, esposo.johnvincento@gmail.com, or connect with him through his LinkedIn and GitHub profiles shown on this page.";
    }

    if (text.includes('hello') || text.includes('hi')){
      return "Hi there! I can help answer questions about Vince's portfolio, experience, skills, and contact details.";
    }

    return "I can help with Vince's work experience, skills, and contact information. You can also ask about his background in administration, finance, customer service, or programming.";
  }

  function toggleChat(forceOpen){
    if (typeof forceOpen === 'boolean') {
      chatWidget.classList.toggle('chat-collapsed', !forceOpen);
      chatToggle.setAttribute('aria-expanded', String(forceOpen));
      return;
    }

    const shouldOpen = chatWidget.classList.contains('chat-collapsed');
    chatWidget.classList.toggle('chat-collapsed', !shouldOpen);
    chatToggle.setAttribute('aria-expanded', String(shouldOpen));
  }

  chatToggle.addEventListener('click', () => toggleChat());
  chatClose.addEventListener('click', () => toggleChat(false));

  quickPills.forEach(button => {
    button.addEventListener('click', () => {
      const message = button.dataset.message;
      appendMessage('user', message);
      appendMessage('ai', generateReply(message));
      chatInput.focus();
    });
  });

  chatForm.addEventListener('submit', event => {
    event.preventDefault();
    const value = chatInput.value.trim();

    if (!value){
      chatInput.focus();
      return;
    }

    appendMessage('user', value);
    appendMessage('ai', generateReply(value));
    chatInput.value = '';
    chatInput.focus();
  });
