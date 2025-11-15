Seesaw Simulation
A simple interactive seesaw simulation built with HTML, CSS and JavaScript.
Users can drop weights on either side of the seesaw, see tilt angle, weights on each side and recent actions log.

🎯 Features
Drop random weights (1–10 kg) onto a seesaw plank by clicking.
Visual objects scaled by weight for intuitive size difference.
Real‑time calculation of left weight, right weight, and tilt angle.
Persistent state: objects and log saved in localStorage and restored on page reload.
Recent actions log displayed (up to 5 entries) for quick review.
Reset button clears the seesaw and log.

🧮 How It Works
A random next weight is generated and displayed.
User clicks on the plank:
Position of click is determined relative to plank center.
Weight is dropped left or right accordingly.
A new object is rendered, sized proportionally to the weight.
objects array is updated, torque calculations run, and UI is updated.
Tilt angle is computed as:
angleTarget = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, (rightTorque - leftTorque) / TORQUE_DIVIDER));
This ensures the seesaw doesn’t tilt beyond defined limits.
State (objects, log) is saved to localStorage so refresh retains the current scenario.
On loading the page, previous state is restored: objects re‑rendered, UI updated, log restored.

🧩 Key Constants & Configuration
MIN_SIZE, MAX_SIZE → controls the visual size range of weight objects.
MAX_ANGLE → limit for how far the seesaw can tilt.
TORQUE_DIVIDER → scale factor for the torque → angle conversion.
These values are defined as constants at the top of script.js and can be adjusted to tweak behavior.

🚀 Getting Started
Clone the repository and open index.html in your browser (no build required).
git clone https://github.com/HighFiveBoss/seesaw-simulation.git
cd seesaw-simulation
open index.html

🧠 Thought Process & Design Decisions
Simulation Approach: I wanted the seesaw to behave realistically based on torque physics. Each weight affects the tilt angle proportionally to its distance from the center.
Visual Scaling: Objects representing weights are scaled between MIN_SIZE and MAX_SIZE so that heavier weights appear larger, making the interface intuitive.
Persistent State: I chose to save the objects array and the log in localStorage so that users can refresh the page without losing progress.
UI Decisions: Displaying stats for left weight, right weight, next weight, and tilt angle allows users to understand the seesaw dynamics immediately. Log section ensures clarity on recent interactions.
Constants & Config: Defining constants (MAX_ANGLE, TORQUE_DIVIDER, etc.) at the top allows easy tweaking of physics behavior without digging into the core logic.

⚖️ Trade-offs & Limitations
The physics is simplified: we calculate torque in a linear way and clamp tilt angle instead of simulating real angular acceleration and friction.
Objects cannot be removed individually once placed; only a full reset is possible.
The UI is desktop-optimized; touch support for mobile devices is limited.
Only the last 5 log entries are shown to keep the interface clean, which may hide older actions.

🤖 AI Assistance
Debugging: AI helped identify and solve the initial log update bug and guided step-by-step troubleshooting.
UI / Code Clarity: AI suggestions were used to improve readability of JS code, structure constants, and scale object sizes proportionally.

✅ Possible Enhancements
Add animations to weight dropping for extra visual polish.
Allow removing weights (click on object) to demonstrate dynamic interaction.
Add UI to adjust constants (like MIN_SIZE, MAX_SIZE, MAX_ANGLE) in real‑time for experimentation.
Add mobile touch support for dropping weights.
