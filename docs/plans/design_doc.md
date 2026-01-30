# OW2 Hero Drafter - Design Document

## 1. Design Philosophy
**Goal:** Create a lightweight, fast, and easy-to-use teammate recommendation tool.
**Aesthetic:** Minimalist "Dark Mode".
- **Primary Color:** Slate Dark (`#0F172A`) - Backgrounds.
- **Accent Color:** Knot Orange (`#FA8112`) - Highlights, active states, important buttons.
- **Style:** Flat design, reduced visual noise. No heavy glassmorphism or complex 3D effects. Focus on readability and standard CSS utility classes (Tailwind).

## 2. User Interface Layout

### 2.1 Main Layout
The application uses a standard dashboard layout:
- **Header:** Simple top bar with "OW2 Hero Drafter" branding.
- **Content Area:** Split into two main columns:
    - **Left (Main):** Hero Selection Grid (approx 70-75% width).
    - **Right (Sidebar):** Recommendations & Stats (approx 25-30% width).

### 2.2 Hero Selection Grid
- **Grouping:** Heroes are grouped by Role (Tank, Damage, Support).
- **Cards:**
    - High-contrast square cards.
    - Hero Portrait + Name.
    - **Interaction:**
        - Click: Toggle selection (add/remove using context or simple toggle logic).
        - Visual Feedback: Orange border for 'Selected'.

### 2.3 Recommendation Sidebar
- **Top Picks:**
    - Ordered list of heroes with the highest Calculated Score.
    - Visuals: Simple list items. Positive scores in Green.
- **Avoid List:**
    - List of heroes with negative scores.
    - Visuals: Negative scores in Red.

## 3. Technical Implementation Details
- **CSS Framework:** Tailwind CSS. Use standard utility classes for spacing, typography, and colors.
- **Responsiveness:** Grid adapts columns based on screen size. Sidebar collapses or moves to bottom on mobile (future consideration, MVP focuses on Desktop/Tablet).
- **Icons:** Lucide React for UI icons (user, filter, etc.).

## 4. Assets
- **Mockup:** `docs/ui/hero_drafter_simple_mockup.png`
