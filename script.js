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

const phraseModes = {
  peaceful: {
    focus: "May I be peaceful and at ease.",
    body: "Let the words touch the heart once or twice, then rest in the warm tone they create.",
    tip: "If the phrase feels flat, remember one real moment of kindness before you say it again."
  },
  safe: {
    focus: "May I be safe and steady.",
    body: "Use it to evoke grounded warmth, not a demand to feel instantly perfect or calm.",
    tip: "Feel the body settle downward while the phrase is in the background."
  },
  gentle: {
    focus: "May my mind be gentle.",
    body: "This one works well when the sit has become harsh, effortful, or full of self-judgment.",
    tip: "The phrase is doing its job if the system softens, even slightly."
  },
  open: {
    focus: "May my heart stay open.",
    body: "Use it lightly and let openness feel more important than exact wording.",
    tip: "If emotion is strong, keep the phrase simple and stay with the spaciousness it opens."
  }
};

const phraseButtons = [...document.querySelectorAll(".phrase-button")];
const phraseFocus = document.getElementById("phraseFocus");
const phraseBody = document.getElementById("phraseBody");
const phraseTip = document.getElementById("phraseTip");

if (phraseButtons.length && phraseFocus && phraseBody && phraseTip) {
  function updatePhrase(modeKey) {
    const content = phraseModes[modeKey];
    phraseFocus.textContent = content.focus;
    phraseBody.textContent = content.body;
    phraseTip.textContent = content.tip;

    setPressedState(
      phraseButtons,
      phraseButtons.findIndex((button) => button.dataset.phrase === modeKey)
    );
  }

  phraseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updatePhrase(button.dataset.phrase);
    });
  });

  updatePhrase("peaceful");
}

const scenarios = {
  planning: {
    summary: "You notice the mind rehearsing the next task instead of staying with goodwill.",
    steps: [
      {
        title: "Recognize",
        body: "Catch the moment attention has wandered. The point is not to scold yourself, only to see clearly that you are no longer with the meditation object.",
        prompt: "In practice: the mind is busy building tomorrow's schedule instead of radiating metta.",
        metrics: { tension: 82, warmth: 24, clarity: 31 }
      },
      {
        title: "Release",
        body: "Let the planning loop sit there without feeding it. You do not have to finish the thought in order to leave it.",
        prompt: "In practice: you stop negotiating with the to-do list and allow it to fade on its own.",
        metrics: { tension: 66, warmth: 30, clarity: 44 }
      },
      {
        title: "Relax",
        body: "Soften the forehead, jaw, chest, and belly. Distraction comes with a contraction, and that contraction can be dissolved.",
        prompt: "In practice: the body unbraces and the nervous system stops leaning into the loop.",
        metrics: { tension: 39, warmth: 43, clarity: 59 }
      },
      {
        title: "Re-Smile",
        body: "Let the slight smile return to the face, eyes, and heart. This reintroduces brightness instead of gritting your way back.",
        prompt: "In practice: the mood changes from effortful correction to kind re-entry.",
        metrics: { tension: 28, warmth: 66, clarity: 68 }
      },
      {
        title: "Return",
        body: "Come back to the sincere wish for well-being, first feeling it rather than merely saying it.",
        prompt: "In practice: attention rests again with the warm tone of metta.",
        metrics: { tension: 18, warmth: 74, clarity: 82 }
      },
      {
        title: "Repeat",
        body: "When the next distraction appears, the process starts again. Repetition is the training, not a sign that anything is going wrong.",
        prompt: "In practice: every new wandering moment becomes another clean rep of the method.",
        metrics: { tension: 15, warmth: 78, clarity: 86 }
      }
    ]
  },
  "self-doubt": {
    summary: "A voice appears saying you are doing the meditation badly or not feeling enough.",
    steps: [
      {
        title: "Recognize",
        body: "Notice the self-judging story as just another distraction. TWIM does not ask you to believe it or argue with it.",
        prompt: "In practice: the mind says, 'This is not working,' and you simply see that as a thought.",
        metrics: { tension: 79, warmth: 18, clarity: 28 }
      },
      {
        title: "Release",
        body: "Set the commentary down without trying to win the argument. Let the judgment be there without becoming its audience.",
        prompt: "In practice: the inner critic loses fuel because attention stops feeding it.",
        metrics: { tension: 63, warmth: 26, clarity: 41 }
      },
      {
        title: "Relax",
        body: "Feel where the doubt has tightened the body and soften there. This is the part that changes the whole experience.",
        prompt: "In practice: chest, throat, and belly loosen enough for breathing to feel easy again.",
        metrics: { tension: 36, warmth: 39, clarity: 57 }
      },
      {
        title: "Re-Smile",
        body: "Bring back a little friendliness. The smile says the sit is not a courtroom and you do not need to punish yourself into presence.",
        prompt: "In practice: the mood turns warmer and less defensive.",
        metrics: { tension: 27, warmth: 63, clarity: 66 }
      },
      {
        title: "Return",
        body: "Resume the wish for well-being. The meditation succeeds whenever that intention is genuinely re-established.",
        prompt: "In practice: instead of rating the sit, you come back to kindness.",
        metrics: { tension: 19, warmth: 76, clarity: 81 }
      },
      {
        title: "Repeat",
        body: "If doubt returns, you simply 6R it again. The repetition gradually teaches the mind not to build identity around each thought.",
        prompt: "In practice: you stop making every wobble personal.",
        metrics: { tension: 16, warmth: 79, clarity: 84 }
      }
    ]
  },
  irritation: {
    summary: "A memory, sound, or person sets off aversion and the body hardens around it.",
    steps: [
      {
        title: "Recognize",
        body: "See irritation as a state the mind has entered, not as a command you must obey.",
        prompt: "In practice: annoyance has replaced goodwill as the thing filling attention.",
        metrics: { tension: 84, warmth: 16, clarity: 29 }
      },
      {
        title: "Release",
        body: "Stop rehearsing the case against the person or situation. Release the push, even if only a little at first.",
        prompt: "In practice: the mind no longer keeps adding fresh evidence to the grievance.",
        metrics: { tension: 68, warmth: 24, clarity: 40 }
      },
      {
        title: "Relax",
        body: "Feel the heat and rigidity in the body, then soften around it. This is where aversion loses its grip.",
        prompt: "In practice: the jaw unclenches and the chest opens instead of bracing.",
        metrics: { tension: 42, warmth: 37, clarity: 58 }
      },
      {
        title: "Re-Smile",
        body: "A small smile brings the heart back online. You are not pretending nothing happened; you are refusing to keep tightening around it.",
        prompt: "In practice: kindness becomes available again.",
        metrics: { tension: 30, warmth: 61, clarity: 67 }
      },
      {
        title: "Return",
        body: "Go back to radiating metta. Sometimes the return is first toward yourself so the system can stabilize.",
        prompt: "In practice: goodwill becomes the home base again.",
        metrics: { tension: 21, warmth: 72, clarity: 79 }
      },
      {
        title: "Repeat",
        body: "Each flare-up is another chance to unwind the habit of contraction. That is daily-life TWIM in action.",
        prompt: "In practice: the same trigger starts landing with less force over time.",
        metrics: { tension: 18, warmth: 76, clarity: 83 }
      }
    ]
  },
  restlessness: {
    summary: "The body wants stimulation, movement, or a quick escape from stillness.",
    steps: [
      {
        title: "Recognize",
        body: "Notice the urge to move, check, or chase something. Restlessness becomes workable the moment it is clearly seen.",
        prompt: "In practice: the mind is no longer with metta and wants anything else instead.",
        metrics: { tension: 76, warmth: 21, clarity: 33 }
      },
      {
        title: "Release",
        body: "Drop the immediate obedience to the urge. You do not have to scratch every itch of attention.",
        prompt: "In practice: the impulse is allowed to be present without taking over the session.",
        metrics: { tension: 60, warmth: 28, clarity: 45 }
      },
      {
        title: "Relax",
        body: "Loosen the legs, shoulders, breath, and mental pushing. Restlessness is usually braided together with subtle strain.",
        prompt: "In practice: the body stops leaning forward into the next thing.",
        metrics: { tension: 35, warmth: 40, clarity: 57 }
      },
      {
        title: "Re-Smile",
        body: "The small smile adds ease and helps keep the practice from turning severe.",
        prompt: "In practice: you feel less trapped and more willing to stay.",
        metrics: { tension: 24, warmth: 62, clarity: 68 }
      },
      {
        title: "Return",
        body: "Come back to the wish for well-being, letting it become more interesting than the urge itself.",
        prompt: "In practice: attention re-roots in warmth rather than novelty.",
        metrics: { tension: 17, warmth: 73, clarity: 80 }
      },
      {
        title: "Repeat",
        body: "Restlessness often comes in waves. Meeting each one the same way is how the nervous system learns a new pattern.",
        prompt: "In practice: staying becomes simpler because you have a method instead of a battle.",
        metrics: { tension: 14, warmth: 77, clarity: 84 }
      }
    ]
  }
};

const scenarioButtons = [...document.querySelectorAll(".scenario-button")];
const stepButtons = [...document.querySelectorAll(".step-button")];
const scenarioSummary = document.getElementById("scenarioSummary");
const ringMetric = document.getElementById("ringMetric");
const stateRing = document.getElementById("stateRing");
const tensionBar = document.getElementById("tensionBar");
const warmthBar = document.getElementById("warmthBar");
const clarityBar = document.getElementById("clarityBar");
const tensionValue = document.getElementById("tensionValue");
const warmthValue = document.getElementById("warmthValue");
const clarityValue = document.getElementById("clarityValue");
const stepCount = document.getElementById("stepCount");
const stepTitle = document.getElementById("stepTitle");
const stepBody = document.getElementById("stepBody");
const stepPrompt = document.getElementById("stepPrompt");
const prevStep = document.getElementById("prevStep");
const nextStep = document.getElementById("nextStep");

let currentScenario = "planning";
let currentStep = 0;

function updateLab() {
  if (!scenarioSummary || !ringMetric || !stateRing || !tensionBar || !warmthBar || !clarityBar) {
    return;
  }

  const scenario = scenarios[currentScenario];
  const detail = scenario.steps[currentStep];

  const scenarioIndex = scenarioButtons.findIndex((button) => button.dataset.scenario === currentScenario);
  setPressedState(scenarioButtons, scenarioIndex);
  setPressedState(stepButtons, currentStep);

  scenarioSummary.textContent = scenario.summary;
  stepCount.textContent = `Step ${currentStep + 1} of 6`;
  stepTitle.textContent = detail.title;
  stepBody.textContent = detail.body;
  stepPrompt.textContent = detail.prompt;

  const { tension, warmth, clarity } = detail.metrics;
  ringMetric.textContent = `${tension}%`;
  stateRing.style.setProperty("--ring-value", tension);
  tensionBar.style.width = `${tension}%`;
  warmthBar.style.width = `${warmth}%`;
  clarityBar.style.width = `${clarity}%`;
  tensionValue.textContent = String(tension);
  warmthValue.textContent = String(warmth);
  clarityValue.textContent = String(clarity);
}

function goToStep(stepIndex) {
  currentStep = (stepIndex + 6) % 6;
  updateLab();
}

scenarioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentScenario = button.dataset.scenario;
    currentStep = 0;
    updateLab();
  });
});

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    goToStep(Number(button.dataset.step));
  });
});

if (prevStep && nextStep) {
  prevStep.addEventListener("click", () => goToStep(currentStep - 1));
  nextStep.addEventListener("click", () => goToStep(currentStep + 1));
}

updateLab();

const relaxModes = {
  planning: {
    defaultGrip: 78,
    note: "The body is leaning into the future. Relax the eyes, forehead, and solar plexus.",
    stages: {
      tight: {
        headline: "Still hooked",
        cue: "Planning feels urgent because the whole body is pitched forward.",
        result: "Relax does not argue with the future. It takes your body out of the sprint posture."
      },
      easing: {
        headline: "Softening the knot",
        cue: "The plan is still there, but it has less authority once the body loosens.",
        result: "The moment the push relaxes, the thought stops sounding like an emergency."
      },
      opening: {
        headline: "Opening around it",
        cue: "There is enough softness now for the thought to pass through without taking over.",
        result: "You are not suppressing the thought. You are removing the body pressure that props it up."
      },
      clear: {
        headline: "The pressure is gone",
        cue: "This is the quiet that appears when forward-drive is no longer being fed.",
        result: "Now it is easy to return to metta without strain."
      }
    }
  },
  replay: {
    defaultGrip: 84,
    note: "The mind is replaying the past. Relax the jaw, throat, and chest wall.",
    stages: {
      tight: {
        headline: "Caught in replay",
        cue: "The body is braced as if the old moment is still happening now.",
        result: "Relax takes the re-enactment out of your muscles, not just out of the story."
      },
      easing: {
        headline: "The replay is thinning",
        cue: "The memory is still visible, but it is not gripping the body the same way.",
        result: "Once the brace softens, the scene stops looping with the same force."
      },
      opening: {
        headline: "Space around the memory",
        cue: "The nervous system is no longer signing up for another round.",
        result: "This is how a sticky replay starts losing traction."
      },
      clear: {
        headline: "The loop lets go",
        cue: "There is room now for warmth, breath, and the present moment again.",
        result: "Return becomes natural when the body stops acting like the memory is live."
      }
    }
  },
  fear: {
    defaultGrip: 80,
    note: "Fear contracts the belly and throat first. Relax there before trying to think differently.",
    stages: {
      tight: {
        headline: "Fear is driving",
        cue: "The thought feels huge because the body is already signaling danger.",
        result: "Relax lowers the alarm signal so the thought can shrink back to its actual size."
      },
      easing: {
        headline: "The alarm is dropping",
        cue: "The thought is still present, but it is no longer backed by the same physical charge.",
        result: "As the body softens, the mind stops treating the image like a command."
      },
      opening: {
        headline: "More room than fear",
        cue: "You can feel the breath again. That means the thought has less control.",
        result: "This is the point where calm starts to outnumber the fear pulse."
      },
      clear: {
        headline: "Fear has lost its fuel",
        cue: "Without the contraction, the thought cannot keep itself inflated.",
        result: "Return to goodwill from here and the system resets cleanly."
      }
    }
  },
  craving: {
    defaultGrip: 74,
    note: "Craving leans into the object. Relax the mouth, chest, and hands first.",
    stages: {
      tight: {
        headline: "Pulled forward",
        cue: "The body wants the object right now, which is why the thought feels magnetic.",
        result: "Relax interrupts the reaching posture that keeps the wanting alive."
      },
      easing: {
        headline: "The pull is weakening",
        cue: "You can feel the wanting without becoming the wanting.",
        result: "As the body loosens, the promise inside the thought gets thinner."
      },
      opening: {
        headline: "The hook is almost out",
        cue: "There is enough space now to choose instead of lunge.",
        result: "This is the shift from compulsion back to steadiness."
      },
      clear: {
        headline: "Nothing to chase",
        cue: "Without the body leaning, the thought has nothing to drag forward.",
        result: "Goodwill and calm return on their own when the chase relaxes."
      }
    }
  }
};

const relaxModeButtons = [...document.querySelectorAll(".relax-mode")];
const gripSlider = document.getElementById("gripSlider");
const gripValue = document.getElementById("gripValue");
const relaxNote = document.getElementById("relaxNote");
const relaxPulse = document.getElementById("relaxPulse");
const relaxReset = document.getElementById("relaxReset");
const relaxStage = document.getElementById("relaxStage");
const relaxHeadline = document.getElementById("relaxHeadline");
const relaxCue = document.getElementById("relaxCue");
const noiseBar = document.getElementById("noiseBar");
const softnessBar = document.getElementById("softnessBar");
const spaceBar = document.getElementById("spaceBar");
const noiseValue = document.getElementById("noiseValue");
const softnessValue = document.getElementById("softnessValue");
const spaceValue = document.getElementById("spaceValue");
const relaxResult = document.getElementById("relaxResult");

let currentRelaxMode = "planning";

function getRelaxStage(grip) {
  if (grip >= 70) {
    return "tight";
  }
  if (grip >= 40) {
    return "easing";
  }
  if (grip >= 15) {
    return "opening";
  }
  return "clear";
}

function syncRelax() {
  if (!gripSlider || !gripValue || !relaxNote || !relaxStage) {
    return;
  }

  const grip = Number(gripSlider.value);
  const mode = relaxModes[currentRelaxMode];
  const stageKey = getRelaxStage(grip);
  const stage = mode.stages[stageKey];
  const softness = Math.round(16 + (100 - grip) * 0.84);
  const space = Math.round(22 + (100 - grip) * 0.78);
  const noise = grip;

  setPressedState(
    relaxModeButtons,
    relaxModeButtons.findIndex((button) => button.dataset.mode === currentRelaxMode)
  );

  gripValue.textContent = String(grip);
  relaxNote.textContent = mode.note;
  relaxHeadline.textContent = stage.headline;
  relaxCue.textContent = stage.cue;
  relaxResult.textContent = stage.result;
  noiseValue.textContent = String(noise);
  softnessValue.textContent = String(Math.min(softness, 100));
  spaceValue.textContent = String(Math.min(space, 100));
  noiseBar.style.width = `${noise}%`;
  softnessBar.style.width = `${Math.min(softness, 100)}%`;
  spaceBar.style.width = `${Math.min(space, 100)}%`;
  relaxStage.style.setProperty("--grip-scale", (grip / 100).toFixed(2));
}

relaxModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentRelaxMode = button.dataset.mode;
    gripSlider.value = String(relaxModes[currentRelaxMode].defaultGrip);
    syncRelax();
  });
});

if (gripSlider) {
  gripSlider.addEventListener("input", syncRelax);
}

if (relaxPulse) {
  relaxPulse.addEventListener("click", () => {
    const nextGrip = Math.max(0, Number(gripSlider.value) - 12);
    gripSlider.value = String(nextGrip);
    syncRelax();
  });
}

if (relaxReset) {
  relaxReset.addEventListener("click", () => {
    gripSlider.value = String(relaxModes[currentRelaxMode].defaultGrip);
    syncRelax();
  });
}

syncRelax();

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
