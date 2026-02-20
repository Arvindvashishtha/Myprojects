# Project Constitution: Test Case Generator (B.L.A.S.T.)

## Data Schemas

### TestCase
```typescript
interface TestCase {
    id: string;
    title: string;
    preconditions: string;
    steps: string[];
    expectedResults: string;
    priority: 'High' | 'Medium' | 'Low';
    testType: string;
    relatedRequirements?: string;
}
```

### AppSettings
```typescript
interface AppSettings {
    apiProvider: 'openai' | 'claude' | 'custom';
    apiKey: string;
    model: string;
    theme: 'light' | 'dark' | 'system';
}
```

## Behavioral Rules
1. **No Data Loss**: Always persist state to LocalStorage before page unload.
2. **Deterministic Outputs**: Prompts must include "JSON mode" or clear formatting instructions to ensure machine-parsable AI output.
3. **Privacy First**: Sensitive data (API Keys) are stored only in local browser memory.

## Architectural Invariants
- **A.N.T. Layer 1 (Base)**: Zustand store and LocalStorage persistence.
- **A.N.T. Layer 2 (Network)**: Services for AI, Document Parsing, and URL Analysis.
- **A.N.T. Layer 3 (Target)**: React Components and specialized Hooks.
