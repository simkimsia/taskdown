# TypeScript Implementation Guide

## Directory Structure

The TypeScript implementation follows a core/adapters pattern with separate npm package definitions:

```markdown
taskdown/
├── implementations/
│   └── typescript/
│       ├── src/
│       │   ├── core/              # Core implementation
│       │   │   ├── types.ts
│       │   │   ├── validator.ts
│       │   │   └── index.ts
│       │   └── adapters/          # Platform-specific implementations
│       │       └── vscode/
│       │           └── validator.ts
│       │
│       └── packages/              # NPM package definitions
│           ├── validator/         # @taskdown/validator
│           │   ├── package.json
│           │   └── index.ts       # Re-exports from ../../src/core
│           │
│           └── vscode/           # @taskdown/vscode
│               ├── package.json
│               └── index.ts       # Re-exports from ../../src/adapters/vscode
```

## Architecture Decision Record

### Context

We need to implement the Taskdown validator in TypeScript with support for different platforms/frameworks while also making it available as npm packages.

### Decision

We've chosen a hybrid approach that:

1. Organizes the implementation code using a core/adapters pattern
2. Separately defines npm packages that re-export the implementation code

### Rationale

#### Core/Adapters Pattern

- **Core**: Contains framework-agnostic validation logic
- **Adapters**: Platform-specific implementations (e.g., VS Code integration)
- Maintains clear separation of concerns
- Matches pattern used in other language implementations (e.g., Python)
- Makes the codebase easier to understand and maintain

#### Separate Package Definitions

- Allows publishing to npm as `@taskdown/validator` and `@taskdown/vscode`
- Keeps package.json files separate from implementation logic
- Enables different versioning/metadata for each package
- Re-exports implementation code without duplicating it

### Benefits

1. Clear separation between core logic and platform adaptations
2. Consistent with other language implementations
3. Easy to add new platform adapters
4. Clean npm package structure
5. Single source of truth for implementation code

### Implementation Notes

1. Core Validator:

- Framework-agnostic TypeScript implementation
- Uses Zod for schema validation
- Supports custom validation rules
- Provides detailed error information

2. VS Code Integration:

- Implements VS Code specific functionality
- Converts validation errors to VS Code diagnostics
- Shows errors in the Problems panel
- Highlights errors inline in documents

### Usage

To use in a project:

```typescript
// Using core validator
import { TaskdownValidator } from '@taskdown/validator';

// Using VS Code extension
import { VSCodeTaskdownValidator } from '@taskdown/vscode';
```

### Adding New Adapters

To add support for a new platform:

1. Create new adapter directory:

   ```
   src/adapters/new-platform/
   ```

2. Create package definition:

   ```
   packages/new-platform/
   ```

3. Implement the adapter using core validator
4. Re-export through the package index.ts
