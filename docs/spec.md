### `spec.md` for Overwatch 2 Recommendation Engine

This specification outlines a frontend-only web application that calculates the best hero picks based on teammate synergies and enemy counters using a weighted JSON dataset.

---

```markdown
# Project Spec: OW2 Hero Drafter (Frontend-Only)

## 1. Project Overview
A lightweight, real-time recommendation tool for Overwatch 2. Users select current teammates and enemies to receive a ranked list of the best Heroes to pick for each role (Tank, DPS, Support).

## 2. Technical Stack
* **Framework:** React 19 + Vite (for rapid development and hot-reloading).
* **Language:** TypeScript (to strictly type the Hero JSON schema).
* **State Management:** Zustand (to manage the active draft state).
* **Styling:** Tailwind CSS + Shadcn UI (for a clean, dark-themed gaming interface).
* **Deployment:** Vercel or GitHub Pages.

---

## 3. Project Structure (Controller-View Pattern)

The application follows a **Controller-View separation pattern** for clean architecture and testability.

### File Organization
```
src/
├── screens/
│   └── HeroDrafter/
│       ├── HeroDrafterController.ts   # Logic & state management
│       ├── HeroDrafterScreen.tsx      # UI rendering
│       └── index.ts                   # Public exports
├── components/
│   └── HeroCard/
│       ├── HeroCardController.ts
│       ├── HeroCardView.tsx
│       └── index.ts
└── hooks/
    └── useController.ts               # Generic controller hook
```

### Controller Responsibilities
- State management (local state, Zustand store interactions)
- Business logic (score calculations, filtering)
- Event handlers (click handlers, form submissions)
- Side effects (data fetching, subscriptions)

### View Responsibilities
- UI rendering only
- Receives all data and callbacks from controller via `useController`
- No direct state management or business logic

### Usage Pattern
```tsx
// HeroDrafterController.ts
export const useHeroDrafterController = () => {
  const [selectedTeammates, setSelectedTeammates] = useState<Hero[]>([]);
  const [selectedEnemies, setSelectedEnemies] = useState<Hero[]>([]);
  
  const topPicks = useMemo(() => calculateTopPicks(...), []);
  
  const handleAddToTeam = (hero: Hero) => { ... };
  
  return { selectedTeammates, selectedEnemies, topPicks, handleAddToTeam };
};

// HeroDrafterScreen.tsx
export const HeroDrafterScreen = () => {
  const controller = useHeroDrafterController();
  
  return (
    <div>
      <HeroGrid onSelect={controller.handleAddToTeam} />
      <Sidebar topPicks={controller.topPicks} />
    </div>
  );
};
```

---

## 4. Data Schema (`hero-config.json`)
The application relies on a static JSON configuration. Each hero object follows this structure:

```json
{
  "hero": "HeroName",
  "role": "tank | dps | support",
  "counter": { "{{HeroName}}": number }, // Range -5 to 5
  "play_with": { "{{HeroName}}": number } // Range -5 to 5
}

```

---

## 5. Logic (The Engine)

The **Viability Score ()** for any hero () is calculated as the sum of Synergy and Counter-utility:

Where:

*  = Currently selected teammates.
*  = Currently selected enemies.

### Scoring Example:

If picking **Kiriko**:

* **Teammate is Genji:** `play_with` is +5.
* **Enemy is Roadhog:** `counter` is +5 (cleansing hook/anti).
* **Total Score:** 10 (Highly Recommended).

---

## 6. UI/UX Requirements

### 6.1 Hero Selection Grid

* Display all 45 heroes with icons.
* Filter by role: **Tank**, **DPS**, **Support**.
* Clicking a hero opens a context menu: **"Add to My Team"** or **"Add to Enemy Team"**.

### 6.2 The Recommendation Engine (Live Sidebar)

* **Top Picks:** Display top 3 heroes per role with the highest .
* **Avoid List:** Display heroes with a score  (labeled "Heavily Countered").
* **Visual Indicators:** * Positive scores: Green text/glow.
* Negative scores: Red text/glow.



### 6.3 Themes & Branding

* **Primary Accent:** `#FA8112` (Knot Orange).
* **Background:** `#0F172A` (Slate Dark) to contrast with the game UI.

---