# Coding Standards and Rules

## 1. Architecture: Controller-View Separation

We follow a strict separation of concerns using the Controller-View pattern.

### Rules
- **View Components (`*Screen.tsx`, `*View.tsx`)**:
    - Must ONLY contain UI rendering logic.
    - Must NOT contain business logic or direct state management (useState, useEffect, etc., unless purely for UI animation/local ephemeral state).
    - Must interact with logic via a custom controller hook.
    - Naming convention: `[ComponentName]Screen.tsx` or `[ComponentName].tsx`.
- **Controllers (`*Controller.ts`)**:
    - Must contain all business logic, state management, and side effects.
    - Must return a single object containing all state and event handlers needed by the view.
    - Naming convention: `use[ComponentName]Controller` (hook) inside `[ComponentName]Controller.ts`.

### Example
```tsx
// MyComponentController.ts
export const useMyComponentController = () => {
    const [count, setCount] = useState(0);
    const increment = useCallback(() => setCount(c => c + 1), []);
    return { count, increment };
};

// MyComponent.tsx
import { useMyComponentController } from './MyComponentController';

export const MyComponent = () => {
    const { count, increment } = useMyComponentController();
    return <button onClick={increment}>{count}</button>;
};
```

## 2. Performance Optimization

### Rules
- **Event Handlers**: All functions exposed by controllers (e.g., event handlers passed to components) MUST be wrapped in `useCallback` to prevent unnecessary re-renders of child components.
- **Derived State**: Use `useMemo` for expensive calculations or derived state that depends on props or state.

### Example
```tsx
// Bad
const handleClick = () => {
    doSomething();
};

// Good
const handleClick = useCallback(() => {
    doSomething();
}, [doSomething]);
```
