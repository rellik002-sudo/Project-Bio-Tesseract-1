// AI Assistant Engine — Project Bio-Tesseract
// Pure backend intelligent rule-based aerospace flight surgeon & website guide

export const SUGGESTED_QUESTIONS = [
  "What is Project Bio-Tesseract?",
  "How does the 4D Bio-Tesseract work?",
  "How do I check astronaut vitals?",
  "How does the AI Medical Advisor calculate decompression risk?",
  "What should I do if a Critical Alarm triggers?",
  "Who are the crew members and their EVA roles?",
  "What are the life support and suit pressure limits?",
  "Can you simulate an emergency anomaly?"
];

// Comprehensive Knowledge Base & Intent Dictionary
const INTENTS = [
  // ── 4D Bio-Tesseract Resonator ──
  {
    id: "tesseract_4d",
    keywords: ["tesseract", "4d", "hypercube", "so4", "rotation", "stereographic", "orthographic", "resonator", "geometry", "hyperspace", "vectors"],
    reply: `💠 **4D Bio-Tesseract Resonator System**\n\nThe 4D Bio-Tesseract models higher-dimensional spatial bio-resonance projected into 3D and 2D canvas space:\n\n* **Geometry**: 16 4D vertices $(\\pm 1, \\pm 1, \\pm 1, \\pm 1)$ and 32 hyper-vectors calculated in real time.\n* **Mathematical Formulation**: Real-time 4D rotation across four orthogonal planes ($XW, ZW, XY, YZ$) using the $SO(4)$ Lie group rotation matrix.\n* **Biometric Coupling**: The hypercube's vertex dilation and inner energy ring pulse synchronously with the active astronaut's instantaneous heart rate ($\\text{BPM} / 60\\text{ Hz}$).\n* **Interactive Controls**: Switch between Stereographic and Orthographic projections, pause/resume rotation, and modulate angular velocity via the HUD slider.`,
    action: "navigate:tesseract",
    actionLabel: "💠 Open 4D Bio-Tesseract Channel",
    followUps: ["How do I check astronaut vitals?", "How does the AI Medical Advisor calculate decompression risk?", "Can you simulate an emergency anomaly?"]
  },
  // ── Navigation & Site Tour ──
  {
    id: "site_tour",
    keywords: ["tour", "guide", "how to use", "overview", "website", "sections", "where to start", "features", "help me use"],
    reply: `👋 **Welcome to Project Bio-Tesseract!**\n\nI am your **Autonomous Mission AI Guide & Flight Advisor**. Here is how to navigate the platform:\n\n1. **Home / Hero Page**: Overview of mission telemetry, active crew vitals, and the live starfield/comet radar.\n2. **Astronaut Vitals**: Real-time physiological telemetry (ECG, Heart Rate, SpO₂, Blood Pressure, Core Temp, EEG) with 50-point trend sparklines.\n3. **Environmental Factors**: Habitat life-support monitoring (Cabin pressure, O₂, CO₂, radiation, humidity).\n4. **AI Medical Advisor**: Autonomous neural diagnostic scanner with risk indices and countermeasure protocol dispatch.\n5. **Mission Alerts Feed**: Real-time alarm stream with one-click **ACK** acknowledge controls and emergency simulation.\n6. **Anatomical Body Map**: Interactive organ telemetry linking real readings to Brain, Heart, Lungs, Liver, Stomach, and Kidneys.\n\nWhere would you like to go first?`,
    action: "scroll:features",
    actionLabel: "🔍 Explore Platform Features",
    followUps: ["How do I check astronaut vitals?", "What do the organ colors on the Body Map mean?", "Who are the crew members and their EVA roles?"]
  },

  // ── Astronaut Vitals & Telemetry ──
  {
    id: "vitals_guide",
    keywords: ["vital", "vitals", "heart rate", "pulse", "bpm", "spo2", "oxygen saturation", "blood pressure", "temperature", "eeg", "cardiac"],
    reply: `🫀 **Astronaut Vitals Monitoring System**\n\nThe vitals page monitors critical human physiological indicators updated every 2.5 seconds:\n\n* **Heart Rate**: Normal target is **60 – 95 bpm** (Low Warning: 55 bpm, Critical: 130 bpm).\n* **Blood Oxygen (SpO₂)**: Normal target is **95% – 100%** (Critical hypoxia threshold: < 88%).\n* **Breathing Rate**: Nominal **12 – 18 breaths/min**.\n* **Blood Pressure**: Nominal systolic is **110 – 130 mmHg**, diastolic is **70 – 85 mmHg**.\n* **Core Body Temperature**: Regulated at **36.5°C – 37.4°C** via the suit thermal loop.\n* **Brain EEG Activity**: Alpha/beta cortical resonance target **12 – 28 Hz**.\n\nEvery parameter includes a **50-point dynamic SVG sparkline** displaying historical trends for immediate anomaly detection.`,
    action: "navigate:vitals",
    actionLabel: "📊 Open Astronaut Vitals View",
    followUps: ["What do the organ colors on the Body Map mean?", "What are the safe thresholds for heart rate and SpO2?", "How does the AI Medical Advisor calculate decompression risk?"]
  },

  // ── Physiological Body Map ──
  {
    id: "body_map",
    keywords: ["body map", "organ", "organs", "anatomical", "brain", "lungs", "heart", "liver", "stomach", "kidneys", "silhouette", "human body"],
    reply: `🫀 **Physiological Anatomical Body Map**\n\nThe Body Map links real-time biosensor readings directly to 6 vital human organs:\n\n1. **Heart** ➔ Coupled to Heart Rate & Blood Pressure.\n2. **Lungs** ➔ Coupled to SpO₂ & Respiratory Rate.\n3. **Brain** ➔ Coupled to Neuro-Cognitive EEG frequency.\n4. **Liver** ➔ Coupled to Core Metabolic Temperature equilibrium.\n5. **Stomach** ➔ Coupled to Metabolic Caloric Consumption Rate.\n6. **Kidneys** ➔ Coupled to Renal Glomerular Filtration & Hydration.\n\n**Color Legend:**\n* 🟢 **Normal (Green)**: Telemetry within nominal bounds.\n* 🟡 **Warning (Amber)**: Mild stress or physiological elevation.\n* 🔴 **Critical (Red)**: Threshold exceeded (requires countermeasure).\n* ⚪ **Neutral (Slate)**: Sensor awaiting telemetry packet sync.`,
    action: "scroll:body-map-section",
    actionLabel: "🫀 Scroll to Anatomical Body Map",
    followUps: ["How do I check astronaut vitals?", "How does the AI Medical Advisor calculate decompression risk?", "What should I do if a Critical Alarm triggers?"]
  },

  // ── AI Medical Advisor & Countermeasures ──
  {
    id: "medical_advisor",
    keywords: ["medical advisor", "neural scan", "diagnostic", "decompression", "hypoxia", "stress", "countermeasure", "protocol", "hydration", "lcvg", "pre-breathe", "flush"],
    reply: `🧠 **AI Bio-Diagnostic Advisor**\n\nThe Advisor serves as the onboard autonomous flight surgeon during deep-space comms blackouts:\n\n**1. Neural Diagnostic Scanner:**\nClick **⚡ RUN NEURAL SCAN** to synthesize multi-sensor streams (PPG, Galvanic Skin Response, Core Temp, Suit Atmosphere).\n\n**2. Real-Time Risk Matrix:**\n* **Decompression Sickness (DCS) Risk**: Evaluates tissue nitrogen saturation against suit pressure delta (Nominal: < 0.05%).\n* **Acute Hypoxia Risk**: Evaluates $ppO_2$ vs blood oxygen curve (Nominal: 0.00%).\n* **Cognitive Workload Index**: Measures sympathetic nervous system strain.\n\n**3. Countermeasure Protocols (Executable in 1-Click):**\n* 💧 **Hydration Pack Dispense**: Electrolyte micro-injection to combat fluid shifts.\n* ❄️ **LCVG Temp Regulate**: Adjusts Liquid Cooling Garment by ±0.5°C.\n* 💨 **100% Pre-Breathe Flush**: Pure oxygen purge for rapid nitrogen washout.`,
    action: "scroll:medical-advisor-section",
    actionLabel: "🧠 Go to AI Medical Advisor",
    followUps: ["Can you simulate an emergency anomaly?", "What should I do if a Critical Alarm triggers?", "Who are the crew members and their EVA roles?"]
  },

  // ── Mission Alerts & Emergency Procedures ──
  {
    id: "alerts_guide",
    keywords: ["alert", "alerts", "alarm", "alarms", "critical", "caution", "nominal", "ack", "acknowledge", "emergency", "incident", "warning"],
    reply: `🚨 **Mission Alerts & Alarm Procedures**\n\nThe alarm system categorizes all spacecraft & biosensor events into three priority tiers:\n\n* 🔴 **CRITICAL**: Immediate physiological hazard or severe atmospheric divergence (e.g. Tachycardia > 120 bpm, Hypoxia, Sudden Pressure Drop).\n* 🟡 **CAUTION**: Non-critical parameter drift (e.g. Solar radiation elevation, thermal drift).\n* 🟢 **NOMINAL**: Routine telemetry sync (e.g. DSN Goldstone X-band lock confirmed).\n\n**Operational Procedure:**\n1. Review the title, timestamp, and affected subsystem.\n2. Click the **ACK** button to acknowledge receipt and silence recurring audible chimes.\n3. Check the AI Medical Advisor for automated countermeasure recommendations.\n4. You can click **⚠️ TRIGGER SIMULATED ANOMALY** anytime to test incident response protocols!`,
    action: "scroll:mission-alerts-section",
    actionLabel: "🚨 Inspect Mission Alerts Feed",
    followUps: ["Can you simulate an emergency anomaly?", "How does the AI Medical Advisor calculate decompression risk?", "What are the safe thresholds for heart rate and SpO2?"]
  },

  // ── Environmental & Habitat Factors ──
  {
    id: "environmental_guide",
    keywords: ["environment", "environmental", "cabin pressure", "co2", "o2", "radiation", "habitat", "humidity", "atmospheric", "kpa", "ppm"],
    reply: `🌬️ **Habitat & Environmental Life Support System**\n\nContinuous atmospheric and environmental monitoring ensures crew safety inside the module:\n\n* **Cabin Pressure**: Maintained at sea-level nominal **101.3 kPa** (EVA Suit relative delta is **29.6 kPa / 4.3 psi**).\n* **Oxygen (O₂)**: Regulated at **20.9%** (EVA pure O₂ suit: **> 99.0%**).\n* **Carbon Dioxide (CO₂)**: Scrubbed below **0.04% / 400 ppm** via cyclic amine scrubbing beds.\n* **Cabin Temperature**: Regulated between **21.0°C – 23.0°C**.\n* **Relative Humidity**: Maintained at **40% – 50%**.\n* **Cosmic & Gamma Radiation**: Monitored via active dosimeters (Nominal: **< 15.0 µSv/h**).`,
    action: "navigate:environmental",
    actionLabel: "🌬️ Open Environmental Factors View",
    followUps: ["How do I check astronaut vitals?", "What do the organ colors on the Body Map mean?", "What should I do if a Critical Alarm triggers?"]
  },

  // ── Crew Dossiers ──
  {
    id: "crew_guide",
    keywords: ["crew", "astronaut", "astronauts", "sarah vance", "marcus chen", "elena rostova", "david kalu", "commander", "pilot", "specialist", "eva"],
    reply: `👩‍🚀 **Mission Crew Roster (Artemis-VII Expedition)**\n\nFour astronauts are currently deployed on the active mission:\n\n1. **Cmdr. Sarah Vance (SV)**: Mission Commander · EVA-1 Lead (Spacewalk specialist, Heart Rate: ~72 bpm, SpO₂: 98.4%).\n2. **Dr. Marcus Chen (MC)**: Medical Specialist · EVA-2 (Flight Surgeon & Exobiology Lead, Heart Rate: ~78 bpm, SpO₂: 99.0%).\n3. **Eng. Elena Rostova (ER)**: Flight Engineer · Airlock Operations (Life-support fluid loops & habitat robotics, Heart Rate: ~68 bpm, SpO₂: 98.8%).\n4. **Pilot David Kalu (DK)**: Command Pilot · Orbiter (Orbital mechanics & telemetry communications, Heart Rate: ~74 bpm, SpO₂: 98.2%).\n\nEach crew member's biometrics drift naturally every 2.5 seconds to reflect authentic biological telemetry.`,
    action: "scroll:crew-roster-section",
    actionLabel: "👩‍🚀 View Crew Roster",
    followUps: ["How do I check astronaut vitals?", "How does the AI Medical Advisor calculate decompression risk?", "Can you simulate an emergency anomaly?"]
  },

  // ── Anomaly Simulation ──
  {
    id: "simulate_emergency",
    keywords: ["simulate", "simulation", "anomaly", "test emergency", "trigger alarm", "heart attack", "tachycardia", "stress test"],
    reply: `⚠️ **Emergency Anomaly Simulation Protocol**\n\nYou can initiate an instant live emergency drill to test crew telemetry response:\n\n* **Simulated Event**: Acute Tachycardia & Metabolic Stress Inflection.\n* **Telemetry Effect**: Injects a **CRITICAL** alert into the Mission Log, spikes heart rate to **125 bpm**, and shifts Cognitive Stress to **78% [ELEVATED]**.\n* **Resolution**: Use the **ACK** button to acknowledge the alert and the AI Medical Advisor to dispense countermeasures.\n\nClick the button below to trigger the simulation right now!`,
    action: "trigger:anomaly",
    actionLabel: "🚨 Trigger Simulated Anomaly Now",
    followUps: ["What should I do if a Critical Alarm triggers?", "How does the AI Medical Advisor calculate decompression risk?", "How do I check astronaut vitals?"]
  },

  // ── Greeting & Identity ──
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "who are you", "what can you do", "morning", "evening", "greetings", "assist", "help"],
    reply: `👋 **Greetings! I am the Bio-Tesseract Autonomous Mission AI Assistant.**\n\nI am engineered to guide you through the platform, explain real-time astronaut physiological telemetry, monitor environmental conditions, and assist with medical protocols during deep space missions.\n\n**Here are a few quick things you can ask me:**\n* *"How do I check astronaut vitals?"*\n* *"What do the organ colors on the Body Map mean?"*\n* *"How does the AI Medical Advisor work?"*\n* *"What are the normal thresholds for heart rate and SpO2?"*\n* *"Trigger an emergency anomaly simulation"*\n\nHow may I assist your mission today?`,
    followUps: ["How do I check astronaut vitals?", "What do the organ colors on the Body Map mean?", "Who are the crew members and their EVA roles?"]
  }
];

// Fallback intelligent responder
const FALLBACK_RESPONSE = {
  reply: `📡 **Mission Advisory: Telemetry Query Received.**\n\nI didn't find an exact match for that specific query in the flight manual, but here are the core telemetry subsystems I can guide you through:\n\n* **Astronaut Vitals & Trends**: Real-time heart rate, blood pressure, SpO₂, and sparkline graphs.\n* **Physiological Body Map**: Organ mapping (Brain, Heart, Lungs, Liver, Stomach, Kidneys).\n* **AI Medical Advisor**: Autonomous neural scanning, decompression & hypoxia risk matrix, and countermeasure dispatch.\n* **Mission Alerts Log**: Emergency alarms, critical severity feeds, and ACK workflows.\n* **Environmental Factors**: Habitat pressure, O₂, CO₂, radiation, and temperature.\n* **Crew Dossiers**: Biometric profiles of Cmdr. Vance, Dr. Chen, Eng. Rostova, and Pilot Kalu.\n\nTry clicking one of the suggested questions below or ask me about any parameter!`,
  followUps: [
    "How do I check astronaut vitals?",
    "What do the organ colors on the Body Map mean?",
    "How does the AI Medical Advisor calculate decompression risk?",
    "What should I do if a Critical Alarm triggers?"
  ]
};

// NLP Intent Matching Engine
export function processAssistantQuery(userMessage = "") {
  const clean = userMessage.toLowerCase().trim();

  if (!clean) {
    return {
      success: true,
      reply: "Please enter a question or select one of the suggested prompts below to explore the mission telemetry.",
      followUps: SUGGESTED_QUESTIONS.slice(0, 4)
    };
  }

  // Exact / High-confidence pattern scoring
  let bestIntent = null;
  let maxScore = 0;

  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (clean.includes(kw)) {
        // Longer keyword matches earn higher weight
        score += kw.length >= 6 ? 3 : 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent;
    }
  }

  // Threshold: If at least 1 keyword matched
  if (bestIntent && maxScore > 0) {
    return {
      success: true,
      intent: bestIntent.id,
      reply: bestIntent.reply,
      action: bestIntent.action || null,
      actionLabel: bestIntent.actionLabel || null,
      followUps: bestIntent.followUps || SUGGESTED_QUESTIONS.slice(0, 3)
    };
  }

  // Graceful domain fallback
  return {
    success: true,
    intent: "fallback",
    reply: FALLBACK_RESPONSE.reply,
    action: null,
    actionLabel: null,
    followUps: FALLBACK_RESPONSE.followUps
  };
}
