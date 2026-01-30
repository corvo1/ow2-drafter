# CR: One Hero Can Be Both Teammate and Enemy

## CR Summary

Allow a single hero to be selected as **both** a teammate and an enemy simultaneously. Currently, the system enforces mutual exclusivity — selecting a hero for one team automatically removes them from the other.

---

## Impact Map

### Affected Components

| Component | File | Impact Level |
|-----------|------|--------------|
| **HeroDrafterController** | [HeroDrafterController.ts](file:///c:/workspace/ow2-draft/src/screens/HeroDrafter/HeroDrafterController.ts) | 🔴 High |
| **HeroCardController** | [HeroCardController.ts](file:///c:/workspace/ow2-draft/src/components/HeroCard/HeroCardController.ts) | 🟡 Medium |
| **HeroCardView** | [HeroCardView.tsx](file:///c:/workspace/ow2-draft/src/components/HeroCard/HeroCardView.tsx) | 🟡 Medium |
| **spec.md** | [spec.md](file:///c:/workspace/ow2-draft/docs/spec.md) | 🟢 Low |

### Breaking Changes

> [!IMPORTANT]
> **No Breaking API Changes** — This is an internal behavior change. No external APIs or data schemas are affected.

---

## Proposed Changes

### State Management

#### [MODIFY] [HeroDrafterController.ts](file:///c:/workspace/ow2-draft/src/screens/HeroDrafter/HeroDrafterController.ts)

**Current behavior (L18-L32):**
```typescript
const toggleHero = (hero: Hero, team: 'yours' | 'enemy') => {
  if (team === 'yours') {
    setYourTeam(prev => { /* toggle logic */ });
    setEnemyTeam(prev => prev.filter(h => h.hero !== hero.hero)); // ❌ Removes from enemy
  } else {
    setEnemyTeam(prev => { /* toggle logic */ });
    setYourTeam(prev => prev.filter(h => h.hero !== hero.hero)); // ❌ Removes from your team
  }
};
```

**Proposed change:**
- Remove lines that auto-remove hero from the opposite team
- Each team toggle is now independent

```diff
const toggleHero = (hero: Hero, team: 'yours' | 'enemy') => {
  if (team === 'yours') {
    setYourTeam(prev => {
      if (prev.find(h => h.hero === hero.hero)) return prev.filter(h => h.hero !== hero.hero);
      return [...prev, hero];
    });
-   setEnemyTeam(prev => prev.filter(h => h.hero !== hero.hero));
  } else {
    setEnemyTeam(prev => {
      if (prev.find(h => h.hero === hero.hero)) return prev.filter(h => h.hero !== hero.hero);
      return [...prev, hero];
    });
-   setYourTeam(prev => prev.filter(h => h.hero !== hero.hero));
  }
};
```

---

### UI Components

#### [MODIFY] [HeroCardController.ts](file:///c:/workspace/ow2-draft/src/components/HeroCard/HeroCardController.ts)

**Current behavior (L12):**
```typescript
const selectionState = isTeammate ? 'teammate' : isEnemy ? 'enemy' : 'none';
```

**Proposed change:**
- Add a new state `'both'` when hero is selected for both teams

```diff
-const selectionState = isTeammate ? 'teammate' : isEnemy ? 'enemy' : 'none';
+const selectionState: 'none' | 'teammate' | 'enemy' | 'both' = 
+  isTeammate && isEnemy ? 'both' : isTeammate ? 'teammate' : isEnemy ? 'enemy' : 'none';
```

---

#### [MODIFY] [HeroCardView.tsx](file:///c:/workspace/ow2-draft/src/components/HeroCard/HeroCardView.tsx)

**Current visual states (L23-27):**
- `none`: Default slate border
- `teammate`: Orange border + glow
- `enemy`: Red border + glow

**Proposed change:**
- Add `'both'` state with a split indicator (purple/gradient combining orange + red)

```diff
 selectionState === 'teammate' && "bg-slate-800 border-orange-500 shadow-[0_0_10px_rgba(250,129,18,0.3)]",
-selectionState === 'enemy' && "bg-red-950/30 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
+selectionState === 'enemy' && "bg-red-950/30 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]",
+selectionState === 'both' && "bg-purple-950/40 border-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.4)]"
```

**New badge for dual-selection (L43-49):**
- Display both icons (User + Skull) overlapping or side-by-side

---

## User Review Required

> [!NOTE]
> **Design Decision:** Should the "both" state use:
> - **Option A:** Purple theme (mix of orange + red)
> - **Option B:** Split gradient (left=orange, right=red)
> - **Option C:** Custom icon only (no color blend)

---

## Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| UI Confusion | 🟡 Medium | Clear visual distinction for "both" state + tooltip explanation |
| Score Calculation | 🟢 Low | No change needed — `calculateScore()` already handles both team arrays independently |
| Performance | 🟢 Low | No additional computations required |

**Estimated Complexity:** **Small (S) — ~2 hours of dev time, no migration needed**

---

## Verification Plan

### Manual Testing

Since the project has no automated tests, verification will be manual:

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Test dual-selection:**
   - Left-click a hero (e.g., Genji) → verify orange border + header shows "Your Team (1/5)"
   - Right-click same hero (Genji) → verify purple border + header shows both counts
   - Confirm hero appears in both team counts

3. **Test toggle behavior:**
   - Left-click the dual-selected hero → verify it's removed from "Your Team" only
   - Hero should now show red border (enemy only)

4. **Verify recommendations:**
   - Select Genji as both teammate and enemy
   - Add another hero to enemy team (e.g., Roadhog)
   - Verify recommendation scores update correctly

5. **Test edge cases:**
   - Deselect hero from both teams individually
   - Verify header counts are accurate
