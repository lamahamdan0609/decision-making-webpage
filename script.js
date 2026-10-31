// ==========================================
// 1. STATE VARIABLES
// ==========================================
let currentStep = 1;
let sessionCount = 0;

const userState = {
  name: "",
  energy: "",
  task: "",
  environment: "",
  outcome: ""
};

// ==========================================
// 2. DOM ELEMENT REFERENCES
// ==========================================
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

const nameInput = document.getElementById("username");
const energySelect = document.getElementById("energy-level");
const taskSelect = document.getElementById("task-type");
const envSelect = document.getElementById("environment-pref");

const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const generateBtn = document.getElementById("generate-btn");
const resetBtn = document.getElementById("reset-btn");

const errorStep1 = document.getElementById("error-msg");
const errorStep2 = document.getElementById("error-msg-step2");

// Outcome display elements
const outcomeBadge = document.getElementById("outcome-badge");
const outcomeTitle = document.getElementById("outcome-title");
const outcomeDesc = document.getElementById("outcome-desc");
const timerRec = document.getElementById("timer-rec");
const audioRec = document.getElementById("audio-rec");
const drinkRec = document.getElementById("drink-rec");
const sessionCountDisplay = document.getElementById("session-count");

// ==========================================
// 3. EVENT LISTENERS
// ==========================================

// Move from Step 1 to Step 2
nextBtn.addEventListener("click", () => {
  const enteredName = nameInput.value.trim();
  const selectedEnergy = energySelect.value;

  // Validation using conditional logic
  if (enteredName === "" || selectedEnergy === "") {
    errorStep1.classList.remove("hidden");
    return;
  }

  errorStep1.classList.add("hidden");
  userState.name = enteredName;
  userState.energy = selectedEnergy;

  // Advance state
  currentStep = 2;
  renderStep();
});

// Step 2: Go back to Step 1
backBtn.addEventListener("click", () => {
  currentStep = 1;
  renderStep();
});

// Step 2: Process input and generate outcome
generateBtn.addEventListener("click", () => {
  const selectedTask = taskSelect.value;
  const selectedEnv = envSelect.value;

  if (selectedTask === "" || selectedEnv === "") {
    errorStep2.classList.remove("hidden");
    return;
  }

  errorStep2.classList.add("hidden");
  userState.task = selectedTask;
  userState.environment = selectedEnv;

  // Calculate outcome based on conditional rules
  calculateOutcome();

  // Increment state counter
  sessionCount++;
  sessionCountDisplay.textContent = sessionCount;

  // Advance state to results
  currentStep = 3;
  renderStep();
});

// Step 3: Reset back to Step 1
resetBtn.addEventListener("click", () => {
  resetForm();
  currentStep = 1;
  renderStep();
});

// ==========================================
// 4. CONDITIONAL LOGIC (DECISION ENGINE)
// ==========================================
function calculateOutcome() {
  document.body.className = ""; // clear previous themes

  // Outcome 1: Low Energy -> Recovery & Gentle Focus
  if (userState.energy === "low") {
    userState.outcome = "Cozy Nook Mode";
    document.body.classList.add("theme-cozy");

    outcomeBadge.textContent = "Gentle Pacing";
    outcomeTitle.textContent = `${userState.name}'s Cozy Recovery Space`;
    outcomeDesc.textContent = "Your energy is low, so we are keeping cognitive load minimal. Short intervals with zero pressure.";
    timerRec.textContent = "15-minute bursts (5-minute break)";
    audioRec.textContent = "Soft acoustic rain & fireplace sounds";
    drinkRec.textContent = "Warm chamomile tea or hot chocolate";
  }
  // Outcome 2: High Energy + Coding -> High Intensity Sprint
  else if (userState.energy === "high" && userState.task === "coding") {
    userState.outcome = "Deep Sprint Mode";
    document.body.classList.add("theme-sprint");

    outcomeBadge.textContent = "High Velocity";
    outcomeTitle.textContent = `${userState.name}'s Deep Work Sprint`;
    outcomeDesc.textContent = "High caffeine and high brainpower detected. Eliminate all notifications and enter maximum execution mode.";
    timerRec.textContent = "50-minute Pomodoro block";
    audioRec.textContent = "Fast-tempo Drum & Bass or Synthwave";
    drinkRec.textContent = "Double espresso or cold brew";
  }
  // Outcome 3: Night Vibe OR Creative Task -> Cyber Ambient Flow
  else if (userState.environment === "night" || userState.task === "creative") {
    userState.outcome = "Cyber Midnight Flow";
    document.body.classList.add("theme-cyber");

    outcomeBadge.textContent = "Creative Immersion";
    outcomeTitle.textContent = `${userState.name}'s Midnight Studio`;
    outcomeDesc.textContent = "Designed for deep reflection and creative output under moody, distraction-free lighting.";
    timerRec.textContent = "35-minute open flow session";
    audioRec.textContent = "Dark ambient synth & binaural beats";
    drinkRec.textContent = "Iced matcha or sparkling water with citrus";
  }
  // Outcome 4: Default / Balanced State (Medium energy, library, or reading)
  else {
    userState.outcome = "Balanced Zen Sanctuary";
    document.body.classList.add("theme-zen");

    outcomeBadge.textContent = "Steady State";
    outcomeTitle.textContent = `${userState.name}'s Structured Library`;
    outcomeDesc.textContent = "A steady, balanced setup designed for sustainable long-term focus without burning out.";
    timerRec.textContent = "25-minute standard Pomodoro";
    audioRec.textContent = "Classical piano & library ambient noise";
    drinkRec.textContent = "Green tea or electrolyte water";
  }
}

// ==========================================
// 5. STATE-BASED UI RENDERING
// ==========================================
function renderStep() {
  step1.classList.add("hidden");
  step2.classList.add("hidden");
  step3.classList.add("hidden");

  if (currentStep === 1) {
    step1.classList.remove("hidden");
  } else if (currentStep === 2) {
    step2.classList.remove("hidden");
  } else if (currentStep === 3) {
    step3.classList.remove("hidden");
  }
}

function resetForm() {
  userState.task = "";
  userState.environment = "";
  taskSelect.value = "";
  envSelect.value = "";
  document.body.className = "";
}
