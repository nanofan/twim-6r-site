document.body.classList.add("is-enhanced");

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setPressedState(nodes, activeIndex) {
  nodes.forEach((node, index) => {
    const isActive = index === activeIndex;
    node.classList.toggle("is-active", isActive);
    node.setAttribute("aria-pressed", String(isActive));
  });
}

const timerSteps = [
  {
    name: "Recognize",
    cue: "Notice the exact moment attention drifts away.",
    color: "rgba(245, 184, 95, 0.95)",
    glow: "radial-gradient(circle, rgba(245, 184, 95, 0.24), transparent 70%)"
  },
  {
    name: "Release",
    cue: "Stop feeding the distraction and let the hook go slack.",
    color: "rgba(239, 154, 104, 0.95)",
    glow: "radial-gradient(circle, rgba(239, 154, 104, 0.24), transparent 70%)"
  },
  {
    name: "Relax",
    cue: "Soften the body right where the tightening is happening.",
    color: "rgba(216, 103, 99, 0.95)",
    glow: "radial-gradient(circle, rgba(216, 103, 99, 0.26), transparent 70%)"
  },
  {
    name: "Re-Smile",
    cue: "Let friendliness brighten the face, eyes, and chest again.",
    color: "rgba(47, 122, 124, 0.95)",
    glow: "radial-gradient(circle, rgba(47, 122, 124, 0.26), transparent 70%)"
  },
  {
    name: "Return",
    cue: "Come back to metta, feeling it instead of merely naming it.",
    color: "rgba(95, 156, 149, 0.95)",
    glow: "radial-gradient(circle, rgba(95, 156, 149, 0.24), transparent 70%)"
  },
  {
    name: "Repeat",
    cue: "Use the next wandering moment as the next clean repetition.",
    color: "rgba(142, 169, 143, 0.95)",
    glow: "radial-gradient(circle, rgba(142, 169, 143, 0.24), transparent 70%)"
  }
];

const paceButtons = [...document.querySelectorAll(".pace-button")];
const bellToggle = document.getElementById("bellToggle");
const timerRing = document.getElementById("timerRing");
const timerGlow = document.getElementById("timerGlow");
const timerCurrentStep = document.getElementById("timerCurrentStep");
const timerCurrentCue = document.getElementById("timerCurrentCue");
const timerStepSeconds = document.getElementById("timerStepSeconds");
const timerLoopNote = document.getElementById("timerLoopNote");
const timerToggle = document.getElementById("timerToggle");
const timerReset = document.getElementById("timerReset");
const timerStatePill = document.getElementById("timerStatePill");
const timerStepItems = [...document.querySelectorAll(".timer-step-item")];

const timerState = {
  duration: 10,
  running: false,
  elapsedMs: 0,
  startStamp: 0,
  rafId: null,
  activeStep: 0,
  bellEnabled: true,
  audioContext: null
};

function getTimerLabel(duration) {
  if (duration === 3) {
    return "3-second steps";
  }
  if (duration === 10) {
    return "10-second steps";
  }
  if (duration === 20) {
    return "20-second steps";
  }
  return `${duration}-second steps`;
}

function getCycleMs() {
  return timerState.duration * timerSteps.length * 1000;
}

function getStepMs() {
  return timerState.duration * 1000;
}

function getNormalizedElapsed(elapsedMs) {
  return elapsedMs % getCycleMs();
}

function getStepIndex(elapsedMs) {
  return Math.floor(getNormalizedElapsed(elapsedMs) / getStepMs()) % timerSteps.length;
}

function ensureAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  if (!timerState.audioContext) {
    timerState.audioContext = new AudioContextClass();
  }

  if (timerState.audioContext.state === "suspended") {
    timerState.audioContext.resume();
  }

  return timerState.audioContext;
}

function playBell(intensity = 1) {
  if (!timerState.bellEnabled) {
    return;
  }

  const context = ensureAudioContext();
  if (!context) {
    return;
  }

  const now = context.currentTime + 0.02;
  const master = context.createGain();
  master.connect(context.destination);
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.14 * intensity, now + 0.03);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 2.3);

  [
    { frequency: 523.25, decay: 2.25, gain: 1 },
    { frequency: 783.99, decay: 1.85, gain: 0.42 },
    { frequency: 1046.5, decay: 1.3, gain: 0.18 }
  ].forEach((partial) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(partial.frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(partial.frequency * 0.995, now + partial.decay);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.13 * partial.gain * intensity, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + partial.decay);

    oscillator.connect(gainNode);
    gainNode.connect(master);
    oscillator.start(now);
    oscillator.stop(now + partial.decay + 0.05);
  });
}

function syncTimerButtons() {
  setPressedState(
    paceButtons,
    paceButtons.findIndex((button) => Number(button.dataset.duration) === timerState.duration)
  );

  if (bellToggle) {
    bellToggle.textContent = timerState.bellEnabled ? "Bell On" : "Bell Off";
    bellToggle.setAttribute("aria-pressed", String(timerState.bellEnabled));
    bellToggle.classList.toggle("is-active", timerState.bellEnabled);
  }

  if (timerToggle) {
    if (timerState.running) {
      timerToggle.textContent = "Pause";
    } else if (timerState.elapsedMs > 0) {
      timerToggle.textContent = "Resume";
    } else {
      timerToggle.textContent = "Start";
    }
  }
}

function renderTimer() {
  if (!timerRing || !timerGlow || !timerCurrentStep || !timerCurrentCue || !timerStepSeconds || !timerLoopNote) {
    return;
  }

  const cycleMs = getCycleMs();
  const stepMs = getStepMs();
  const normalized = getNormalizedElapsed(timerState.elapsedMs);
  const stepIndex = getStepIndex(timerState.elapsedMs);
  const withinStep = normalized % stepMs;
  const remaining = Math.max(1, Math.ceil((stepMs - withinStep) / 1000));
  const rotation = (normalized / cycleMs) * 360;
  const activeStep = timerSteps[stepIndex];
  const fullCircuitSeconds = Math.round(cycleMs / 1000);

  timerState.activeStep = stepIndex;

  timerRing.style.setProperty("--rotation", `${rotation}deg`);
  timerRing.style.setProperty("--progress-angle", `${rotation}deg`);
  timerRing.style.setProperty("--timer-accent", activeStep.color);
  timerGlow.style.background = activeStep.glow;
  timerCurrentStep.textContent = activeStep.name;
  timerCurrentCue.textContent = activeStep.cue;
  timerStepSeconds.textContent = String(remaining);
  timerLoopNote.textContent = `${getTimerLabel(timerState.duration)}. ${fullCircuitSeconds}-second full circuit.`;

  if (timerStatePill) {
    if (timerState.running) {
      timerStatePill.textContent = "Running";
    } else if (timerState.elapsedMs > 0) {
      timerStatePill.textContent = "Paused";
    } else {
      timerStatePill.textContent = "Ready";
    }
  }

  timerStepItems.forEach((item, index) => {
    item.classList.toggle("is-active", index === stepIndex);
  });

  syncTimerButtons();
}

function stopAnimationLoop() {
  if (timerState.rafId !== null) {
    window.cancelAnimationFrame(timerState.rafId);
    timerState.rafId = null;
  }
}

function tick(now) {
  if (!timerState.running) {
    stopAnimationLoop();
    return;
  }

  const previousStep = timerState.activeStep;
  timerState.elapsedMs = now - timerState.startStamp;

  renderTimer();

  if (timerState.activeStep !== previousStep) {
    playBell(0.85);
  }

  timerState.rafId = window.requestAnimationFrame(tick);
}

function startTimer() {
  if (timerState.running) {
    return;
  }

  ensureAudioContext();
  timerState.running = true;
  timerState.startStamp = performance.now() - timerState.elapsedMs;
  syncTimerButtons();

  if (timerState.elapsedMs === 0) {
    playBell(0.72);
  }

  if (timerState.rafId === null) {
    timerState.rafId = window.requestAnimationFrame(tick);
  }

  renderTimer();
}

function pauseTimer() {
  if (!timerState.running) {
    return;
  }

  timerState.elapsedMs = performance.now() - timerState.startStamp;
  timerState.running = false;
  stopAnimationLoop();
  renderTimer();
}

function resetTimer() {
  timerState.elapsedMs = 0;
  timerState.running = false;
  timerState.activeStep = 0;
  stopAnimationLoop();
  renderTimer();
}

if (timerToggle) {
  timerToggle.addEventListener("click", () => {
    if (timerState.running) {
      pauseTimer();
    } else {
      startTimer();
    }
  });
}

if (timerReset) {
  timerReset.addEventListener("click", () => {
    resetTimer();
  });
}

if (bellToggle) {
  bellToggle.addEventListener("click", () => {
    timerState.bellEnabled = !timerState.bellEnabled;
    if (timerState.bellEnabled) {
      ensureAudioContext();
      playBell(0.55);
    }
    syncTimerButtons();
  });
}

paceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const wasRunning = timerState.running;
    timerState.duration = Number(button.dataset.duration);
    resetTimer();

    if (wasRunning) {
      startTimer();
    }
  });
});

renderTimer();

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
