// Client Application Controller — Project Bio-Tesseract (Official Black & Pink Hero Theme)
'use strict';

// ═════════════════════════════════════════════════════════════════════
// 1. STARFIELD & SHOOTING COMETS CANVAS (from HeroView.jsx)
// ═════════════════════════════════════════════════════════════════════
(function initSpaceCanvas() {
  const canvas = document.getElementById('space-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W = (canvas.width = window.innerWidth);
  let H = (canvas.height = window.innerHeight);

  const onResize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initStars();
  };
  window.addEventListener('resize', onResize);

  // Stars
  const NUM_STARS = 160;
  const stars = [];
  const initStars = () => {
    stars.length = 0;
    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.3 + 0.3,
        base: Math.random() * 0.45 + 0.1,
        spd: Math.random() * 0.025 + 0.008,
        off: Math.random() * Math.PI * 2,
      });
    }
  };
  initStars();

  // Comets
  const comets = [];
  const MAX_COMETS = 4;

  const spawnComet = () => {
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
    const side = Math.random() < 0.6 ? 'top' : 'left';
    const len = 90 + Math.random() * 110;
    const spd = 2.5 + Math.random() * 3;
    const x = side === 'top' ? Math.random() * W : -len;
    const y = side === 'top' ? -len : Math.random() * H * 0.6;
    comets.push({
      x,
      y,
      angle,
      spd,
      len,
      op: 0.6 + Math.random() * 0.35,
      w: 1 + Math.random(),
    });
  };

  for (let i = 0; i < MAX_COMETS; i++) {
    setTimeout(spawnComet, i * 1800 + Math.random() * 800);
  }

  const render = (ts) => {
    ctx.clearRect(0, 0, W, H);
    const t = ts * 0.001;

    // Draw Stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const op = s.base + Math.sin(t * s.spd + s.off) * 0.18;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, op))})`;
      ctx.fill();
    }

    // Update & Draw Comets
    for (let i = comets.length - 1; i >= 0; i--) {
      const c = comets[i];
      c.x += Math.cos(c.angle) * c.spd;
      c.y += Math.sin(c.angle) * c.spd;

      if (c.x > W + c.len || c.y > H + c.len) {
        comets.splice(i, 1);
        setTimeout(spawnComet, 2000 + Math.random() * 3000);
        continue;
      }

      const tx = c.x - Math.cos(c.angle) * c.len;
      const ty = c.y - Math.sin(c.angle) * c.len;
      const grad = ctx.createLinearGradient(tx, ty, c.x, c.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.6, `rgba(242, 190, 221, ${c.op * 0.4})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${c.op})`);

      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(c.x, c.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = c.w;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(c.x, c.y, c.w * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${c.op})`;
      ctx.fill();
    }

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
})();

// ═════════════════════════════════════════════════════════════════════
// 2. TYPEWRITER EFFECT (from HeroView.jsx)
// ═════════════════════════════════════════════════════════════════════
(function initTypewriter() {
  const words = ['Astronaut Health.', 'Deep-Space Vitals.', 'Crew Biometrics.'];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const el = document.getElementById('typed-text');
  if (!el) return;

  function tick() {
    const word = words[wordIdx];
    if (!isDeleting) {
      charIdx++;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) {
        setTimeout(() => {
          isDeleting = true;
          tick();
        }, 1800);
        return;
      }
    } else {
      charIdx--;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }
    setTimeout(tick, isDeleting ? 45 : 85);
  }

  tick();
})();

// ═════════════════════════════════════════════════════════════════════
// 3. STATS COUNT-UP ANIMATION (from HeroView.jsx)
// ═════════════════════════════════════════════════════════════════════
(function initStatsCountUp() {
  function animateValue(id, target, suffix = '', duration = 1400) {
    const el = document.getElementById(id);
    if (!el) return;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  setTimeout(() => {
    animateValue('stat-crew', 4, '');
    animateValue('stat-spo2', 98, '%');
    animateValue('stat-hr', 72, '');
    animateValue('stat-days', 14, 'd');
  }, 200);
})();

// ═════════════════════════════════════════════════════════════════════
// 4. CREW LIVE HEART RATE FLUCTUATION (from HeroView.jsx)
// ═════════════════════════════════════════════════════════════════════
(function initCrewPulse() {
  const crewIds = ['SV', 'MC', 'ER', 'DK'];
  setInterval(() => {
    crewIds.forEach(id => {
      const el = document.getElementById(`crew-hr-${id}`);
      if (el) {
        const cur = parseInt(el.textContent, 10) || 72;
        const delta = Math.floor(Math.random() * 3) - 1;
        el.textContent = Math.min(105, Math.max(55, cur + delta));
      }
    });
  }, 2500);
})();

// ═════════════════════════════════════════════════════════════════════
// 5. MISSION AI ASSISTANT CONTROLLER
// ═════════════════════════════════════════════════════════════════════
let aiSuggestionsCache = [];
let aiAssistantInitialized = false;

function toggleAiAssistant() {
  const widget = document.getElementById('ai-assistant-widget');
  if (!widget) return;
  const isClosed = widget.classList.contains('closed');
  if (isClosed) {
    widget.classList.remove('closed');
    widget.setAttribute('aria-hidden', 'false');
    const input = document.getElementById('ai-chat-input');
    if (input) input.focus();
    if (!aiAssistantInitialized) {
      initAiAssistant();
    }
  } else {
    widget.classList.add('closed');
    widget.setAttribute('aria-hidden', 'true');
  }
}

function openAiAssistant() {
  const widget = document.getElementById('ai-assistant-widget');
  if (widget && widget.classList.contains('closed')) toggleAiAssistant();
}

function closeAiAssistant() {
  const widget = document.getElementById('ai-assistant-widget');
  if (widget && !widget.classList.contains('closed')) toggleAiAssistant();
}

async function initAiAssistant() {
  aiAssistantInitialized = true;
  await loadAiSuggestions();
  const msgContainer = document.getElementById('ai-chat-messages');
  if (msgContainer && msgContainer.children.length === 0) {
    renderWelcomeGreeting();
  }
}

function renderWelcomeGreeting() {
  appendAiMessage(
    'assistant',
    'Greetings! I am the **Bio-Tesseract AI Mission Assistant**.\n\nI monitor real-time crew physiological telemetry, evaluate environmental life support parameters, run diagnostic scans, and guide you through mission operations.\n\nSelect a quick mission prompt below or type your query:',
    null,
    null,
    [
      'What is Project Bio-Tesseract?',
      'How to check astronaut vitals?',
      'Who are the crew members and their EVA roles?',
      'What are the life support and suit pressure limits?'
    ]
  );
}

function resetAiChat() {
  const msgContainer = document.getElementById('ai-chat-messages');
  if (msgContainer) msgContainer.innerHTML = '';
  renderWelcomeGreeting();
}

async function loadAiSuggestions() {
  const container = document.getElementById('ai-chips-container');
  if (!container) return;

  try {
    const res = await fetch('/api/assistant/suggestions');
    const data = await res.json();
    if (data.success && Array.isArray(data.suggestions)) {
      aiSuggestionsCache = data.suggestions;
      container.innerHTML = '';
      data.suggestions.forEach(q => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'ai-chip-btn';
        chip.textContent = q;
        chip.onclick = () => sendAiQuery(q);
        container.appendChild(chip);
      });
    }
  } catch (err) {
    console.warn('Could not load AI suggestions:', err);
  }
}

function renderAiMarkdown(text) {
  if (!text) return '';
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  const lines = html.split('\n');
  let result = '';
  let inList = false;

  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
      if (!inList) {
        result += '<ul>';
        inList = true;
      }
      result += `<li>${trimmed.substring(2)}</li>`;
    } else {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      if (trimmed.length > 0) {
        result += `<p>${trimmed}</p>`;
      }
    }
  }
  if (inList) result += '</ul>';
  return result;
}

function appendAiMessage(role, text, action = null, actionLabel = null, followUps = []) {
  const container = document.getElementById('ai-chat-messages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `ai-msg ai-msg-${role}`;

  const bubble = document.createElement('div');
  bubble.className = 'ai-bubble';
  bubble.innerHTML = renderAiMarkdown(text);

  if (action && actionLabel) {
    const actBox = document.createElement('div');
    actBox.className = 'ai-action-container';
    const actBtn = document.createElement('button');
    actBtn.type = 'button';
    actBtn.className = 'ai-msg-action-btn';
    actBtn.innerHTML = `<span>⚡</span> ${actionLabel}`;
    actBtn.onclick = () => executeAssistantAction(action);
    actBox.appendChild(actBtn);
    bubble.appendChild(actBox);
  }

  if (Array.isArray(followUps) && followUps.length > 0) {
    const followBox = document.createElement('div');
    followBox.className = 'ai-msg-followups';
    followUps.forEach(f => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'ai-followup-pill';
      pill.textContent = f;
      pill.onclick = () => sendAiQuery(f);
      followBox.appendChild(pill);
    });
    bubble.appendChild(followBox);
  }

  msgDiv.appendChild(bubble);
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  const container = document.getElementById('ai-chat-messages');
  if (!container) return null;

  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-msg ai-msg-assistant ai-typing-msg';
  typingDiv.id = 'ai-typing-indicator';
  typingDiv.innerHTML = `
    <div class="ai-bubble">
      <div class="ai-typing-indicator">
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
      </div>
    </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById('ai-typing-indicator');
  if (el) el.remove();
}

async function sendAiQuery(queryText) {
  const trimmed = (queryText || '').trim();
  if (!trimmed) return;

  appendAiMessage('user', trimmed);
  showTypingIndicator();

  try {
    const res = await fetch('/api/assistant/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed })
    });
    const data = await res.json();
    removeTypingIndicator();

    if (data.success) {
      appendAiMessage(
        'assistant',
        data.reply,
        data.action,
        data.actionLabel,
        data.followUps
      );
    } else {
      appendAiMessage(
        'assistant',
        'Apologies, telemetry link experienced a glitch. Please re-try your question.',
        null,
        null,
        ['How to check astronaut vitals?', 'What is Project Bio-Tesseract?']
      );
    }
  } catch (err) {
    removeTypingIndicator();
    appendAiMessage('assistant', 'Network glitch: Unable to contact Bio-Tesseract backend.', null, null, []);
  }
}

function handleAiChatSubmit(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('ai-chat-input');
  if (!input) return;
  const text = input.value;
  if (!text || !text.trim()) return;
  input.value = '';
  sendAiQuery(text);
}

function executeAssistantAction(action) {
  if (!action) return;
  const features = document.getElementById('features');
  if (features) features.scrollIntoView({ behavior: 'smooth' });
}

// Global window bindings for inline HTML handlers
window.toggleAiAssistant = toggleAiAssistant;
window.openAiAssistant = openAiAssistant;
window.closeAiAssistant = closeAiAssistant;
window.resetAiChat = resetAiChat;
window.handleAiChatSubmit = handleAiChatSubmit;
window.sendAiQuery = sendAiQuery;
window.executeAssistantAction = executeAssistantAction;
