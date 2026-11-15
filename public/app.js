// Client Application Controller — Project Bio-Tesseract (Deep Space Dashboard & AI Assistant)
'use strict';

// ═════════════════════════════════════════════════════════════════════
// 1. STATE & CREW TELEMETRY DEFINITION
// ═════════════════════════════════════════════════════════════════════
const INITIAL_CREW = [
  { id: 'AST-01', name: 'Cmdr. Sarah Vance', role: 'Mission Commander (EVA-1)', initials: 'SV', hr: 72, spo2: 98.4, bpSys: 118, bpDia: 76, suitP: 4.3, o2: 94, stress: 18, status: 'Nominal' },
  { id: 'AST-02', name: 'Dr. Marcus Chen', role: 'Medical Specialist (EVA-2)', initials: 'MC', hr: 78, spo2: 99.0, bpSys: 122, bpDia: 80, suitP: 4.3, o2: 91, stress: 24, status: 'Nominal' },
  { id: 'AST-03', name: 'Eng. Elena Rostova', role: 'Flight Engineer (Airlock)', initials: 'ER', hr: 68, spo2: 98.8, bpSys: 115, bpDia: 74, suitP: 14.7, o2: 98, stress: 15, status: 'Nominal' },
  { id: 'AST-04', name: 'Pilot David Kalu', role: 'Command Pilot (Orbiter)', initials: 'DK', hr: 74, spo2: 98.2, bpSys: 120, bpDia: 78, suitP: 14.7, o2: 96, stress: 20, status: 'Nominal' }
];

let crew = [...INITIAL_CREW];
let activeAstronautId = 'AST-01';
let activeTab = 'overview';
let isAlarmActive = false;
let audioEnabled = true;

let missionAlerts = [
  { id: 'ALT-101', severity: 'NOMINAL', title: 'DSN Goldstone X-band lock confirmed', subsystem: 'Comms', time: '14:28:02', acknowledged: true },
  { id: 'ALT-102', severity: 'NOMINAL', title: 'EMU-X Suit telemetry sync complete', subsystem: 'PLSS', time: '14:27:40', acknowledged: true },
  { id: 'ALT-103', severity: 'CAUTION', title: 'Solar particle event flux elevation (low risk)', subsystem: 'Radiation', time: '14:25:15', acknowledged: false },
  { id: 'ALT-104', severity: 'NOMINAL', title: '4D Bio-Tesseract hypercube resonance calibrated', subsystem: 'Bio-Core', time: '14:20:00', acknowledged: true }
];

function getActiveAstronaut() {
  return crew.find(c => c.id === activeAstronautId) || crew[0];
}

// ═════════════════════════════════════════════════════════════════════
// 2. MISSION ELAPSED TIME & AUDIO TOGGLE
// ═════════════════════════════════════════════════════════════════════
function initMissionClock() {
  const metEl = document.getElementById('nav-met-time');
  function tickClock() {
    const baseSec = Math.floor((Date.now() / 1000) % 86400);
    const hrs = String(Math.floor(baseSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((baseSec % 3600) / 60)).padStart(2, '0');
    const secs = String(baseSec % 60).padStart(2, '0');
    if (metEl) metEl.textContent = `MET +042:${hrs}:${mins}:${secs}`;
  }
  tickClock();
  setInterval(tickClock, 1000);
}

function toggleAudio() {
  audioEnabled = !audioEnabled;
  const label = document.getElementById('label-audio');
  if (label) {
    label.textContent = audioEnabled ? '🔊 HUD AUDIO' : '🔇 MUTED';
  }
}

// ═════════════════════════════════════════════════════════════════════
// 3. ASTRONAUT PROFILE & ROSTER CONTROLLER
// ═════════════════════════════════════════════════════════════════════
function handleSelectAstronaut(astId) {
  activeAstronautId = astId;
  const sel = document.getElementById('astronaut-selector');
  if (sel && sel.value !== astId) sel.value = astId;

  updateProfileCard();
  updateAdvisorCard();
  renderCrewRoster();
}

function updateProfileCard() {
  const ast = getActiveAstronaut();
  const avatar = document.getElementById('profile-avatar');
  const nameEl = document.getElementById('profile-name');
  const roleEl = document.getElementById('profile-role');
  const o2Val = document.getElementById('profile-o2-val');
  const o2Bar = document.getElementById('profile-o2-bar');
  const batVal = document.getElementById('profile-bat-val');
  const batBar = document.getElementById('profile-bat-bar');

  if (avatar) avatar.textContent = ast.initials;
  if (nameEl) nameEl.textContent = ast.name;
  if (roleEl) roleEl.textContent = ast.role;
  if (o2Val) o2Val.textContent = `${ast.o2}%`;
  if (o2Bar) o2Bar.style.width = `${ast.o2}%`;
  if (batVal) batVal.textContent = '88.5% (6.2h)';
  if (batBar) batBar.style.width = '88.5%';

  // Update ECG display metrics
  const ecgHr = document.getElementById('ecg-hr-display');
  const ecgSpo2 = document.getElementById('ecg-spo2-display');
  const ecgBp = document.getElementById('ecg-bp-display');
  if (ecgHr) ecgHr.innerHTML = `${ast.hr} <span class="metric-unit">BPM</span>`;
  if (ecgSpo2) ecgSpo2.textContent = `${ast.spo2}%`;
  if (ecgBp) ecgBp.innerHTML = `${ast.bpSys}/${ast.bpDia} <span class="metric-unit">mmHg</span>`;

  // Update Life Support Gauges
  const lsSuitP = document.getElementById('ls-suit-p-val');
  const lsSuitBar = document.getElementById('ls-suit-p-bar');
  const lsO2Pri = document.getElementById('ls-o2-pri-val');
  const lsO2Bar = document.getElementById('ls-o2-pri-bar');
  if (lsSuitP) lsSuitP.textContent = ast.suitP.toFixed(1);
  if (lsSuitBar) lsSuitBar.style.width = `${(ast.suitP / 5.0) * 100}%`;
  if (lsO2Pri) lsO2Pri.textContent = `${ast.o2}%`;
  if (lsO2Bar) lsO2Bar.style.width = `${ast.o2}%`;

  // Tesseract overlay update
  const tFreq = document.getElementById('tesseract-freq-val');
  const tStress = document.getElementById('tesseract-stress-val');
  if (tFreq) tFreq.textContent = `${(ast.hr / 60).toFixed(2)} Hz`;
  if (tStress) {
    tStress.textContent = `${ast.stress}%`;
    tStress.className = ast.stress > 50 ? 'color-crimson' : 'color-emerald';
  }
}

function renderCrewRoster() {
  const container = document.getElementById('crew-roster-grid');
  if (!container) return;
  container.innerHTML = '';

  crew.forEach(member => {
    const isSelected = member.id === activeAstronautId;
    const card = document.createElement('div');
    card.className = `crew-card ${isSelected ? 'active' : ''}`;
    card.onclick = () => handleSelectAstronaut(member.id);

    card.innerHTML = `
      <div class="crew-card-top">
        <div class="font-orbitron crew-card-name">${member.name}</div>
        <span class="status-dot ${member.status === 'Nominal' ? 'nominal' : 'warning'}"></span>
      </div>
      <div class="font-mono crew-card-role">${member.role}</div>
      <div class="crew-card-metrics">
        <div><span class="crew-metric-dim">HR: </span><strong class="color-white">${member.hr} BPM</strong></div>
        <div><span class="crew-metric-dim">SpO₂: </span><strong class="color-emerald">${member.spo2}%</strong></div>
        <div><span class="crew-metric-dim">Suit P: </span><strong class="color-cyan">${member.suitP} psi</strong></div>
        <div><span class="crew-metric-dim">O₂ Level: </span><strong class="color-white">${member.o2}%</strong></div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ═════════════════════════════════════════════════════════════════════
// 4. LIVE BIOMETRIC DRIFT ENGINE
// ═════════════════════════════════════════════════════════════════════
function initBiometricDrift() {
  setInterval(() => {
    crew = crew.map(ast => {
      if (ast.status === 'Warning' || isAlarmActive) {
        return ast; // Keep elevated during drill
      }
      const hrDelta = Math.floor(Math.random() * 3) - 1;
      const newHr = Math.min(108, Math.max(60, ast.hr + hrDelta));
      const newSpo2 = +(Math.min(99.8, Math.max(97.2, ast.spo2 + (Math.random() * 0.2 - 0.1)))).toFixed(1);
      return {
        ...ast,
        hr: newHr,
        spo2: newSpo2
      };
    });

    updateProfileCard();
    renderCrewRoster();
  }, 2500);
}

// ═════════════════════════════════════════════════════════════════════
// 5. 4D BIO-TESSERACT RESONATOR (SO(4) HYPERCUBE ENGINE)
// ═════════════════════════════════════════════════════════════════════
let tesseractCanvas, tesseractCtx;
let tesseractRotating = true;
let tesseractMode = 'stereographic';
let tesseractSpeed = 0.015;
let tesseractAnimId;

// 16 Vertices of a 4D Hypercube: (±1, ±1, ±1, ±1)
const vertices4D = [];
for (let x = -1; x <= 1; x += 2) {
  for (let y = -1; y <= 1; y += 2) {
    for (let z = -1; z <= 1; z += 2) {
      for (let w = -1; w <= 1; w += 2) {
        vertices4D.push([x, y, z, w]);
      }
    }
  }
}

// 32 Edges connecting vertices with Hamming distance of 1
const tesseractEdges = [];
for (let i = 0; i < 16; i++) {
  for (let j = i + 1; j < 16; j++) {
    let diff = 0;
    for (let k = 0; k < 4; k++) {
      if (vertices4D[i][k] !== vertices4D[j][k]) diff++;
    }
    if (diff === 1) tesseractEdges.push([i, j]);
  }
}

let angleXY = 0, angleXZ = 0, angleXW = 0, angleYZ = 0, angleYW = 0, angleZW = 0;

function rotate4D(v) {
  let [x, y, z, w] = v;

  // XW rotation
  const cosXW = Math.cos(angleXW), sinXW = Math.sin(angleXW);
  const x1 = x * cosXW - w * sinXW;
  const w1 = x * sinXW + w * cosXW;
  x = x1; w = w1;

  // ZW rotation
  const cosZW = Math.cos(angleZW), sinZW = Math.sin(angleZW);
  const z1 = z * cosZW - w * sinZW;
  const w2 = z * sinZW + w * cosZW;
  z = z1; w = w2;

  // XY rotation
  const cosXY = Math.cos(angleXY), sinXY = Math.sin(angleXY);
  const x2 = x * cosXY - y * sinXY;
  const y1 = x * sinXY + y * cosXY;
  x = x2; y = y1;

  // YZ rotation
  const cosYZ = Math.cos(angleYZ), sinYZ = Math.sin(angleYZ);
  const y2 = y * cosYZ - z * sinYZ;
  const z2 = y * sinYZ + z * cosYZ;
  y = y2; z = z2;

  return [x, y, z, w];
}

function project4D(v, width, height, pulseFactor) {
  let [x, y, z, w] = v;
  const scale = 1.0 + (pulseFactor * 0.1);
  x *= scale; y *= scale; z *= scale; w *= scale;

  const distance4D = 2.5;
  const distance3D = 3.5;

  let factor4D = tesseractMode === 'stereographic' ? 1 / (distance4D - w) : 0.5;
  const x3D = x * factor4D;
  const y3D = y * factor4D;
  const z3D = z * factor4D;

  const factor3D = 1 / (distance3D - z3D);
  const x2D = x3D * factor3D * (width * 0.9) + width / 2;
  const y2D = y3D * factor3D * (height * 0.9) + height / 2;

  return { x: x2D, y: y2D, depth: z3D + w, wVal: w };
}

function initTesseractResonator() {
  tesseractCanvas = document.getElementById('tesseract-canvas');
  if (!tesseractCanvas) return;
  tesseractCtx = tesseractCanvas.getContext('2d');

  function render(time) {
    if (!tesseractCtx) return;
    const width = tesseractCanvas.width;
    const height = tesseractCanvas.height;

    tesseractCtx.clearRect(0, 0, width, height);

    const ast = getActiveAstronaut();
    const pulseSpeed = (ast.hr / 60) * 2 * Math.PI;
    const pulseFactor = Math.sin((time / 1000) * pulseSpeed) * 0.5 + 0.5;

    if (tesseractRotating) {
      angleXW += tesseractSpeed * 0.8;
      angleZW += tesseractSpeed * 0.6;
      angleXY += tesseractSpeed * 0.4;
      angleYZ += tesseractSpeed * 0.3;
    }

    const projected = vertices4D.map(v => {
      const rotated = rotate4D(v);
      return project4D(rotated, width, height, pulseFactor);
    });

    // Edges
    tesseractEdges.forEach(([i, j]) => {
      const p1 = projected[i];
      const p2 = projected[j];
      const avgDepth = (p1.depth + p2.depth) / 2;
      const alpha = Math.max(0.2, Math.min(0.9, (avgDepth + 1.5) / 3));

      tesseractCtx.beginPath();
      tesseractCtx.moveTo(p1.x, p1.y);
      tesseractCtx.lineTo(p2.x, p2.y);

      if (ast.stress > 50 || isAlarmActive) {
        tesseractCtx.strokeStyle = `rgba(255, 42, 85, ${alpha})`;
        tesseractCtx.lineWidth = 2.0;
      } else {
        tesseractCtx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
        tesseractCtx.lineWidth = 1.6;
      }
      tesseractCtx.stroke();
    });

    // Vertices
    projected.forEach(p => {
      const radius = 3.5 + Math.max(0, (p.wVal + 1) * 2.5) + (pulseFactor * 2);
      tesseractCtx.beginPath();
      tesseractCtx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      tesseractCtx.fillStyle = ast.stress > 50 || isAlarmActive ? 'rgba(255, 42, 85, 0.8)' : 'rgba(0, 240, 255, 0.85)';
      tesseractCtx.fill();

      tesseractCtx.beginPath();
      tesseractCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      tesseractCtx.fillStyle = '#ffffff';
      tesseractCtx.fill();
    });

    // Central Energy Ring
    tesseractCtx.beginPath();
    tesseractCtx.arc(width / 2, height / 2, 60 + pulseFactor * 10, 0, Math.PI * 2);
    tesseractCtx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    tesseractCtx.setLineDash([4, 6]);
    tesseractCtx.stroke();
    tesseractCtx.setLineDash([]);

    tesseractAnimId = requestAnimationFrame(render);
  }

  tesseractAnimId = requestAnimationFrame(render);
}

function toggleTesseractRotation() {
  tesseractRotating = !tesseractRotating;
  const btn = document.getElementById('btn-toggle-tesseract');
  if (btn) btn.textContent = tesseractRotating ? '⏸ PAUSE 4D' : '▶ RESUME 4D';
}

function toggleTesseractProjection() {
  tesseractMode = tesseractMode === 'stereographic' ? 'orthographic' : 'stereographic';
  const btn = document.getElementById('btn-toggle-projection');
  const overlay = document.getElementById('tesseract-proj-mode-val');
  if (btn) btn.textContent = `MODE: ${tesseractMode.slice(0, 6).toUpperCase()}`;
  if (overlay) overlay.textContent = tesseractMode.toUpperCase();
}

function setTesseractSpeed(val) {
  tesseractSpeed = parseFloat(val);
}

// ═════════════════════════════════════════════════════════════════════
// 6. REAL-TIME ECG & PPG OSCILLOSCOPE ENGINE
// ═════════════════════════════════════════════════════════════════════
let ecgCanvas, ecgCtx;
let currentLead = 'LEAD-II';
let sweepSpeed = 2.5;
let ecgPoints = [];
let currentEcgX = 0;
let ecgStartTime = performance.now();
let ecgAnimId;

function getEcgSample(t, heartRate) {
  const period = 60 / heartRate;
  const norm = (t % period) / period;
  let sample = 0;

  // P Wave
  if (norm > 0.1 && norm < 0.2) {
    sample = Math.sin(((norm - 0.1) / 0.1) * Math.PI) * 12;
  }
  // Q Wave
  else if (norm >= 0.22 && norm < 0.25) {
    sample = -10;
  }
  // R Peak
  else if (norm >= 0.25 && norm < 0.28) {
    sample = Math.sin(((norm - 0.25) / 0.03) * Math.PI) * 75;
  }
  // S Wave
  else if (norm >= 0.28 && norm < 0.31) {
    sample = -20;
  }
  // T Wave
  else if (norm >= 0.42 && norm < 0.6) {
    sample = Math.sin(((norm - 0.42) / 0.18) * Math.PI) * 22;
  }
  // Baseline Noise
  sample += (Math.random() - 0.5) * 2;

  return sample;
}

function initEcgOscilloscope() {
  ecgCanvas = document.getElementById('ecg-canvas');
  if (!ecgCanvas) return;
  ecgCtx = ecgCanvas.getContext('2d');

  const width = ecgCanvas.width;
  const height = ecgCanvas.height;
  ecgPoints = new Array(width).fill(height / 2);
  currentEcgX = 0;
  ecgStartTime = performance.now();

  function drawGrid() {
    ecgCtx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ecgCtx.lineWidth = 1;

    for (let x = 0; x < width; x += 20) {
      ecgCtx.beginPath(); ecgCtx.moveTo(x, 0); ecgCtx.lineTo(x, height); ecgCtx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ecgCtx.beginPath(); ecgCtx.moveTo(0, y); ecgCtx.lineTo(width, y); ecgCtx.stroke();
    }

    ecgCtx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
    for (let x = 0; x < width; x += 100) {
      ecgCtx.beginPath(); ecgCtx.moveTo(x, 0); ecgCtx.lineTo(x, height); ecgCtx.stroke();
    }
    for (let y = 0; y < height; y += 100) {
      ecgCtx.beginPath(); ecgCtx.moveTo(0, y); ecgCtx.lineTo(width, y); ecgCtx.stroke();
    }
  }

  function render() {
    if (!ecgCtx) return;
    const now = performance.now();
    const elapsed = (now - ecgStartTime) / 1000;
    const ast = getActiveAstronaut();

    const raw = getEcgSample(elapsed, ast.hr);
    const baselineY = height / 2;
    const yVal = baselineY - raw;

    for (let i = 0; i < Math.ceil(sweepSpeed); i++) {
      ecgPoints[currentEcgX] = yVal;
      currentEcgX = (currentEcgX + 1) % width;
    }

    ecgCtx.fillStyle = 'rgba(7, 12, 24, 0.95)';
    ecgCtx.fillRect(0, 0, width, height);

    drawGrid();

    // Waveform
    ecgCtx.beginPath();
    ecgCtx.strokeStyle = ast.stress > 50 || isAlarmActive ? '#ff2a55' : '#00ff88';
    ecgCtx.lineWidth = 2.2;
    ecgCtx.lineJoin = 'round';
    ecgCtx.shadowColor = ecgCtx.strokeStyle;
    ecgCtx.shadowBlur = 8;

    for (let x = 0; x < width; x++) {
      if (Math.abs(x - currentEcgX) < 12) continue;
      if (x === 0 || Math.abs(x - currentEcgX) === 12) {
        ecgCtx.moveTo(x, ecgPoints[x]);
      } else {
        ecgCtx.lineTo(x, ecgPoints[x]);
      }
    }
    ecgCtx.stroke();
    ecgCtx.shadowBlur = 0;

    // Sweep Cursor Line
    ecgCtx.beginPath();
    ecgCtx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
    ecgCtx.lineWidth = 2;
    ecgCtx.moveTo(currentEcgX, 0);
    ecgCtx.lineTo(currentEcgX, height);
    ecgCtx.stroke();

    // Sweep Tip Dot
    ecgCtx.beginPath();
    ecgCtx.arc(currentEcgX, ecgPoints[currentEcgX], 4, 0, Math.PI * 2);
    ecgCtx.fillStyle = '#00f0ff';
    ecgCtx.shadowColor = '#00f0ff';
    ecgCtx.shadowBlur = 10;
    ecgCtx.fill();
    ecgCtx.shadowBlur = 0;

    ecgAnimId = requestAnimationFrame(render);
  }

  ecgAnimId = requestAnimationFrame(render);
}

function setEcgLead(lead) {
  currentLead = lead;
  const badge = document.getElementById('ecg-lead-badge');
  if (badge) badge.textContent = lead;
}

// ═════════════════════════════════════════════════════════════════════
// 7. AI BIO-DIAGNOSTIC ADVISOR & COUNTERMEASURES
// ═════════════════════════════════════════════════════════════════════
function updateAdvisorCard() {
  const ast = getActiveAstronaut();
  const nameEl = document.getElementById('advisor-target-name');
  const stressEl = document.getElementById('advisor-stress-val');
  if (nameEl) nameEl.textContent = `BIO-ASSESSMENT FOR ${ast.name.toUpperCase()}`;
  if (stressEl) {
    stressEl.innerHTML = `${ast.stress}% <span class="risk-unit">[${ast.stress > 40 ? 'ELEVATED' : 'NORMAL'}]</span>`;
    stressEl.className = `font-orbitron risk-val ${ast.stress > 40 ? 'color-amber' : 'color-cyan'}`;
  }
}

function runNeuralDiagnosticScan() {
  const btn = document.getElementById('btn-run-neural-scan');
  const narrative = document.getElementById('advisor-narrative-text');
  const badge = document.getElementById('advisor-classification-badge');

  if (btn) {
    btn.disabled = true;
    btn.textContent = '🔄 SCANNING SENSORS...';
  }
  if (narrative) {
    narrative.innerHTML = '<span class="color-cyan">Synthesizing real-time telemetry from PPG, Galvanic Skin Response (GSR), Core Temp, and Suit Atmospheric sensors...</span>';
  }

  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.textContent = '⚡ RUN NEURAL SCAN';
    }
    const ast = getActiveAstronaut();
    if (badge) {
      badge.textContent = ast.stress > 50 ? 'ELEVATED SYMPATHETIC TONE' : 'STABLE CLASSIFICATION';
      badge.className = `cyber-badge ${ast.stress > 50 ? 'cyber-badge-crimson' : 'cyber-badge-emerald'}`;
    }
    if (narrative) {
      narrative.textContent = ast.stress > 50
        ? `Autonomic markers detect acute tachycardic excursion in ${ast.name}. Suggest immediate hydration bolus and LCVG temperature reduction.`
        : `All autonomic nervous system markers indicate optimal physiological adaptation to microgravity for ${ast.name}. Cardiac output and hemodynamic stability remain within acceptable EVA mission thresholds.`;
    }
  }, 1200);
}

function dispatchProtocol(type) {
  const box = document.getElementById('protocol-feedback-box');
  if (!box) return;
  box.style.display = 'block';
  box.innerHTML = `✓ Protocol <strong>${type.toUpperCase()}</strong> command transmitted to EMU-X Life Support Controller at ${new Date().toTimeString().slice(0, 8)}.`;
}

// ═════════════════════════════════════════════════════════════════════
// 8. MISSION ALERTS & ANOMALY SIMULATION
// ═════════════════════════════════════════════════════════════════════
async function loadAlerts() {
  const feedList = document.getElementById('alerts-feed-list');
  const countBadge = document.getElementById('alerts-count-badge');

  try {
    const res = await fetch('/api/alerts');
    const data = await res.json();
    if (data.success && Array.isArray(data.alerts)) {
      missionAlerts = data.alerts;
    }
  } catch (err) {
    // Fall back to local array
  }

  if (countBadge) countBadge.textContent = `${missionAlerts.length} EVENTS`;

  if (feedList) {
    feedList.innerHTML = '';
    missionAlerts.forEach(alert => {
      let badgeClass = 'cyber-badge-cyan';
      if (alert.severity === 'CRITICAL') badgeClass = 'cyber-badge-crimson';
      if (alert.severity === 'CAUTION') badgeClass = 'cyber-badge-amber';
      if (alert.severity === 'NOMINAL') badgeClass = 'cyber-badge-emerald';

      const row = document.createElement('div');
      row.className = 'alert-item-row';
      row.innerHTML = `
        <div class="alert-item-left">
          <span class="cyber-badge ${badgeClass}">${alert.severity}</span>
          <div>
            <div class="alert-item-title">${alert.title}</div>
            <div class="font-mono alert-item-meta">${alert.time} • ${alert.subsystem}</div>
          </div>
        </div>
        ${!alert.acknowledged ? `<button class="btn-ack" onclick="acknowledgeAlert('${alert.id}')">ACK</button>` : `<span class="font-mono" style="font-size:0.68rem; color:var(--text-muted);">ACK'D</span>`}
      `;
      feedList.appendChild(row);
    });
  }
}

async function acknowledgeAlert(alertId) {
  try {
    await fetch('/api/alerts/ack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: alertId })
    });
  } catch (err) {}
  missionAlerts = missionAlerts.map(a => a.id === alertId ? { ...a, acknowledged: true } : a);
  loadAlerts();
}

async function toggleSimAlarm() {
  isAlarmActive = !isAlarmActive;
  const label = document.getElementById('label-alarm');
  const ribbonBadge = document.getElementById('ribbon-badge');

  if (isAlarmActive) {
    if (label) label.textContent = '⚠️ ALARM ACTIVE';
    if (ribbonBadge) {
      ribbonBadge.className = 'cyber-badge cyber-badge-crimson';
      ribbonBadge.textContent = 'CRITICAL DRILL';
    }

    try {
      await fetch('/api/alerts/simulate', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    } catch (e) {}

    const newAlert = {
      id: `ALT-${Date.now()}`,
      severity: 'CRITICAL',
      title: 'SIMULATED TACHYCARDIA & METABOLIC ELEVATION',
      subsystem: 'Cardio-Bio',
      time: new Date().toTimeString().slice(0, 8),
      acknowledged: false
    };
    missionAlerts.unshift(newAlert);

    crew = crew.map(a => a.id === activeAstronautId ? { ...a, hr: 125, stress: 78, status: 'Warning' } : a);
  } else {
    if (label) label.textContent = '🚨 SIM ANOMALY';
    if (ribbonBadge) {
      ribbonBadge.className = 'cyber-badge cyber-badge-emerald';
      ribbonBadge.textContent = 'STABLE ORBIT';
    }
    crew = crew.map(a => a.id === activeAstronautId ? { ...a, hr: 72, stress: 18, status: 'Nominal' } : a);
  }

  updateProfileCard();
  updateAdvisorCard();
  renderCrewRoster();
  loadAlerts();
}

// ═════════════════════════════════════════════════════════════════════
// 9. SIDEBAR NAVIGATION CHANNEL SWITCHER
// ═════════════════════════════════════════════════════════════════════
function switchTab(tabId) {
  activeTab = tabId;

  document.querySelectorAll('.channel-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) {
    targetView.classList.add('active');

    // Populate dedicated channel views if empty
    if (tabId === 'tesseract') {
      targetView.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div class="hud-panel" style="padding:20px;">
            <h2 class="font-orbitron" style="font-size:1.1rem; color:#fff; margin-bottom:12px;">4D BIO-TESSERACT HYPERCUBE RESONATOR (FULL CHANNEL)</h2>
            <p class="font-mono" style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:16px;">
              Direct mathematical mapping of 4-dimensional spatial bio-resonance coupled to cardiac pulse vectors.
            </p>
            <div class="tesseract-canvas-wrapper" style="min-height:500px;">
              <canvas id="tesseract-canvas-dedicated" width="720" height="500"></canvas>
            </div>
          </div>
        </div>
      `;
      // Draw copy to dedicated canvas
      const dCanvas = document.getElementById('tesseract-canvas-dedicated');
      if (dCanvas && tesseractCanvas) {
        const dCtx = dCanvas.getContext('2d');
        dCtx.drawImage(tesseractCanvas, 0, 0, 720, 500);
      }
    } else if (tabId === 'ecg') {
      targetView.innerHTML = `
        <div class="hud-panel" style="padding:20px;">
          <h2 class="font-orbitron" style="font-size:1.1rem; color:#fff; margin-bottom:12px;">HIGH-RESOLUTION ELECTROCARDIOGRAM OSCILLOSCOPE</h2>
          <div class="ecg-canvas-wrapper" style="min-height:360px;">
            <canvas id="ecg-canvas-dedicated" width="900" height="360"></canvas>
          </div>
        </div>
      `;
    } else if (tabId === 'lifesupport') {
      targetView.innerHTML = `
        <div class="hud-panel" style="padding:20px;">
          <h2 class="font-orbitron" style="font-size:1.1rem; color:#fff; margin-bottom:12px;">EMU-X SUIT LIFE SUPPORT COMPREHENSIVE STATUS</h2>
          <div class="lifesupport-grid" style="margin-top:16px;">
            <div class="gauge-card"><div class="gauge-card-num color-cyan">4.3 psi</div><div class="font-mono">SUIT INTERNAL PURE O2</div></div>
            <div class="gauge-card"><div class="gauge-card-num color-emerald">37.1 °C</div><div class="font-mono">CORE BODY TEMPERATURE</div></div>
            <div class="gauge-card"><div class="gauge-card-num color-white">94% / 100%</div><div class="font-mono">PRIMARY & SOP O2 TANKS</div></div>
            <div class="gauge-card"><div class="gauge-card-num color-violet">0.18 mmHg</div><div class="font-mono">CO2 PARTIAL PRESSURE</div></div>
          </div>
        </div>
      `;
    } else if (tabId === 'ai-doc') {
      targetView.innerHTML = `
        <div class="hud-panel" style="padding:20px;">
          <h2 class="font-orbitron" style="font-size:1.1rem; color:#fff; margin-bottom:12px;">AI BIO-DIAGNOSTIC NEURAL SCANNER</h2>
          <p class="advisor-narrative">Autonomous synthesis across multi-parameter sensor arrays. Zero external dependencies.</p>
          <button class="hud-btn hud-btn-emerald" onclick="runNeuralDiagnosticScan()">⚡ RUN NEURAL SCAN</button>
        </div>
      `;
    } else if (tabId === 'crew') {
      targetView.innerHTML = `
        <div class="hud-panel" style="padding:20px;">
          <h2 class="font-orbitron" style="font-size:1.1rem; color:#fff; margin-bottom:12px;">CREW SQUAD BIOMETRIC ROSTER (4/4 ACTIVE)</h2>
          <div id="crew-roster-dedicated" class="crew-roster-grid" style="margin-top:16px;"></div>
        </div>
      `;
      const ded = document.getElementById('crew-roster-dedicated');
      if (ded) {
        crew.forEach(m => {
          const c = document.createElement('div');
          c.className = 'crew-card';
          c.innerHTML = `
            <div class="crew-card-name">${m.name}</div>
            <div class="crew-card-role font-mono">${m.role}</div>
            <div class="color-emerald">HR: ${m.hr} BPM | SpO2: ${m.spo2}%</div>
          `;
          ded.appendChild(c);
        });
      }
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ═════════════════════════════════════════════════════════════════════
// 10. MISSION AI ASSISTANT CONTROLLER
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
    'navigate:tesseract',
    '💠 Explore 4D Bio-Tesseract Resonator',
    [
      'What is Project Bio-Tesseract?',
      'How to check astronaut vitals?',
      'How does the 4D Tesseract work?',
      'Simulate an anomaly drill'
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
        chip.className = 'ai-chip-btn font-mono';
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
    actBtn.className = 'ai-msg-action-btn font-orbitron';
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
      pill.className = 'ai-followup-pill font-mono';
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

  if (action === 'trigger:anomaly') {
    toggleSimAlarm();
  } else if (action === 'navigate:tesseract' || action.includes('tesseract')) {
    switchTab('tesseract');
  } else if (action === 'navigate:vitals' || action.includes('vitals') || action.includes('ecg')) {
    switchTab('ecg');
  } else if (action.includes('lifesupport') || action.includes('environmental')) {
    switchTab('lifesupport');
  } else if (action.includes('medical') || action.includes('advisor')) {
    switchTab('ai-doc');
  } else if (action.includes('crew')) {
    switchTab('crew');
  } else {
    switchTab('overview');
  }
}

// ═════════════════════════════════════════════════════════════════════
// 11. INITIALIZATION ON DOM READY
// ═════════════════════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  initMissionClock();
  updateProfileCard();
  updateAdvisorCard();
  renderCrewRoster();
  initBiometricDrift();
  initTesseractResonator();
  initEcgOscilloscope();
  loadAlerts();
  initAiAssistant();
});

// Global window bindings for inline HTML handlers
window.handleSelectAstronaut = handleSelectAstronaut;
window.toggleAudio = toggleAudio;
window.toggleSimAlarm = toggleSimAlarm;
window.toggleTesseractRotation = toggleTesseractRotation;
window.toggleTesseractProjection = toggleTesseractProjection;
window.setTesseractSpeed = setTesseractSpeed;
window.setEcgLead = setEcgLead;
window.runNeuralDiagnosticScan = runNeuralDiagnosticScan;
window.dispatchProtocol = dispatchProtocol;
window.acknowledgeAlert = acknowledgeAlert;
window.switchTab = switchTab;
window.toggleAiAssistant = toggleAiAssistant;
window.openAiAssistant = openAiAssistant;
window.closeAiAssistant = closeAiAssistant;
window.resetAiChat = resetAiChat;
window.handleAiChatSubmit = handleAiChatSubmit;
window.sendAiQuery = sendAiQuery;
window.executeAssistantAction = executeAssistantAction;
