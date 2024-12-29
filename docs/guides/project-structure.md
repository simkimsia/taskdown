# Taskdown Project Structure

This document provides an overview of the Taskdown project's directory structure and organization.

## Overview

```md
taskdown/
├── README.md                  # Project overview and quick start
├── CONTRIBUTING.md           # Contribution guidelines
├── LICENSE                   # Apache 2.0 license
└── [directories detailed below]
```

## Core Components

### Specification (`specification/`)

Contains the formal Taskdown format specification.

```md
specification/
├── v0.1/
│   ├── specification.md  # Core specification document
│   └── examples/         # Example Taskdown files
└── README.md            # Version history and status
```

### Schema (`schema/`)

JSON Schema definitions for format validation.

```md
schema/
└── v0.1/
    ├── taskdown-core.yaml # JSON Schema for validation
    └── examples/          # Schema examples
```

### Implementations (`implementations/`)

Language-specific implementations of the Taskdown format.

#### TypeScript Implementation

```md
implementations/typescript/
├── package.json         # Node.js package configuration
├── tsconfig.json       # TypeScript configuration
├── jest.config.js      # Test configuration
├── README.md           # TypeScript package documentation
├── src/               # Source directory
│   ├── index.ts       # Main entry point
│   ├── core/          # Core functionality
│   │   ├── converter.ts
│   │   ├── types.ts
│   │   └── validator.ts
│   └── converters/    # Format converters
│       ├── github.ts
│       └── jira.ts
├── test/              # Test directory
│   ├── core/
│   │   ├── converter.test.ts
│   │   └── validator.test.ts
│   └── converters/
│       ├── github.test.ts
│       └── jira.test.ts
└── dist/              # Compiled JavaScript
    ├── cjs/          # CommonJS format
    └── esm/          # ES Modules format
```

#### Python Implementation

```md
implementations/python/
├── setup.py           # Package setup configuration
├── README.md          # Python package documentation
├── taskdown/          # Main package directory
│   ├── __init__.py
│   ├── core/         # Core functionality
│   │   ├── __init__.py
│   │   ├── converter.py
│   │   ├── types.py
│   │   └── validator.py
│   └── converters/   # Format converters
│       ├── __init__.py
│       ├── github.py
│       └── jira.py
└── tests/            # Test directory
    ├── __init__.py
    ├── test_core/
    │   ├── test_converter.py
    │   └── test_validator.py
    └── test_converters/
        ├── test_github.py
        └── test_jira.py
```

### Tools (`tools/`)

Web-based tools for working with Taskdown.

```md
tools/
├── validator/         # Online validator tool
│   ├── index.html
│   └── validator.js
└── converters/       # Web-based conversion tools
    ├── index.html
    └── converter.js
```

### Documentation (`docs/`)

Project documentation and guides.

```md
docs/
├── adr/              # Architecture Decision Records
│   └── 001-core-format.md
├── guides/           # User and developer guides
│   ├── quickstart.md
│   └── validation.md
└── examples/         # Usage examples
    ├── github-import.md
    └── jira-export.md
```

### Website (`website/`)

Project website source code.

```md
website/
├── content/
└── README.md
```

## Best Practices

1. **File Organization**
   - Keep related files together in their respective directories
   - Use clear, descriptive file names
   - Maintain consistent naming conventions across the project

2. **Documentation**
   - Each major component should have its own README.md
   - Keep documentation close to the code it describes
   - Update documentation when making structural changes

3. **Testing**
   - Mirror the source directory structure in test directories
   - Keep test files alongside the code they test
   - Name test files consistently (e.g., `*.test.ts`, `test_*.py`)

4. **Version Control**
   - Include appropriate .gitignore files in each language directory
   - Don't commit build artifacts or dependency directories
   - Keep large binary files out of the repository

## Common Tasks

Here are some common tasks and where they should be placed:

- New converter implementation: `implementations/<language>/converters/`
- Format specification updates: `specification/v0.1/`
- Documentation improvements: `docs/guides/` or respective README files
- Tool development: `tools/<tool-name>/`
- Website updates: `website/content/`
