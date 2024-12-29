# Taskdown

Taskdown is a simple, human-readable format for exchanging task data between different task management systems. It aims to be the "markdown of task management" - simple enough for humans to read and write, yet powerful enough for machines to process.

## Status

⚠️ **Draft Specification** - Version 0.1 is under development. Not ready for production use.

## Quick Start

```yaml
version: "0.1"
tasks:
  TASK-1:
    title: "Complete project proposal"
    status: "in_progress"
    type: "task"
    description: "Write up the initial project proposal for review"
```

## Why Taskdown?

Taskdown addresses the fragmentation in task management formats by providing:

- **Simplicity**: Focus on essential task data that all systems share
- **Human Readability**: Uses YAML for clear, easy-to-read formatting
- **Version Control**: Works seamlessly with git and other VCS
- **Tool Integration**: Easy to validate and process programmatically
- **Format Conversion**: Clean mapping to/from existing task systems

## Core Features

- Task hierarchies and dependencies
- Standard status values (pending, in_progress, done, canceled)
- Task types (task, epic, story, bug)
- Markdown embedding support
- Validation tools and schemas

## Getting Started

### Installation

```bash
# Coming soon
pip install taskdown-tools
```

### Validation

```bash
taskdown-validator check task.yml
```

### Format Conversion

```bash
taskdown-convert github-to-taskdown issues.json tasks.yml
```

## Documentation

- [Core Specification](specification/v0.1/specification.md)
- [JSON Schema](schema/v0.1/taskdown-core.yaml)
- [User Guide](docs/guides/quickstart.md)
- [Architecture Decisions](docs/adr/)

## Project Structure

Coming soon

```
taskdown/
├── specification/   # Core Taskdown specification
├── schema/         # JSON Schema definitions
├── implementations/# Reference implementations
├── tools/          # Validation and conversion tools
└── docs/           # Guides and examples
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Areas We Need Help With

- Reference implementations in different languages
- Converters for task management systems
- Documentation and examples
- Testing with real-world task data

## Community

- GitHub Discussions: [Coming soon]
- Matrix Chat: [Coming soon]
- Monthly Community Call: [Schedule coming soon]

## License

Apache License 2.0 - See [LICENSE](LICENSE) for details.

## Project Status & Roadmap

### Current Status

- [x] Initial specification draft
- [ ] Core JSON Schema
- [ ] Reference Python implementation
- [ ] Basic validation tools

### Roadmap

1. **Q1 2025**: Core Format Stabilization
   - Complete reference implementation
   - Basic conversion tools
   - Core documentation

2. **Q2 2025**: Ecosystem Development
   - Additional implementations
   - Integration guides
   - Real-world testing

3. **Q3 2025**: Format Extensions
   - Dependencies
   - Custom fields
   - Advanced metadata

## Security

See [SECURITY.md](SECURITY.md) for reporting security vulnerabilities.