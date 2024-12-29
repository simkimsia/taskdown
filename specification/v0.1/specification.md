# TaskDown Specification

Version: 0.1 (Draft)
December 2024

## 1. Introduction

TaskDown is a simple, human-readable format for describing tasks in plain text. Like Markdown for task management, it aims to be easy for both humans and machines to read and write.

## 2. Core Format

A TaskDown document is a YAML document with a minimal, predictable structure. Each document must be valid YAML and conform to the constraints defined in this specification.

### 2.1 Minimal Example

```yaml
tasks:
  TASK-1:
    title: "Complete project proposal"
    status: "in_progress"
```

### 2.2 Required Fields

Each TaskDown document MUST contain:

- `tasks`: Map
  - MUST contain at least one task entry
  - MUST appear exactly once at the root level
  - Each task entry MUST have a unique ID as its key

Each task entry MUST contain:

- `title`: String
  - Single line of text
  - Length: 1-200 characters
  - MUST NOT contain line breaks

- `status`: String
  - MUST be one of: ["pending", "in_progress", "done", "canceled"]
  - Case-sensitive

### 2.3 Task ID Format

Task IDs MUST:

- Start with an uppercase ASCII letter
- Contain only ASCII letters, numbers, and hyphens
- Match the regular expression: ^[A-Z][A-Z0-9\-]+$
- Be unique within the document

### 2.4 Optional Fields

The following fields MAY be included in a task entry:

- `type`: String
  - If present, MUST be one of: ["task", "epic", "story", "bug"]
  - Case-sensitive

- `description`: String
  - May contain multiple lines
  - UTF-8 encoded

- `created`: String
  - ISO 8601 datetime in UTC
  - Format: YYYY-MM-DDThh:mm:ssZ

- `updated`: String
  - ISO 8601 datetime in UTC
  - Format: YYYY-MM-DDThh:mm:ssZ

- `due`: String
  - ISO 8601 date
  - Format: YYYY-MM-DD

## 3. Storage Format

### 3.1 File Storage

TaskDown content MAY be stored in:

- Standalone YAML files (recommended extension: .taskdown.yaml)
- Embedded in Markdown files using code blocks with the 'taskdown' language identifier

### 3.2 Markdown Embedding

When embedded in Markdown, TaskDown content MUST be wrapped in a code block with the 'taskdown' identifier:

```taskdown
tasks:
  TASK-1:
    title: "Example task"
    status: "pending"
```

## 4. Processing Requirements

### 4.1 Validation Requirements

Implementations MUST:

- Validate YAML syntax
- Validate presence and format of all required fields
- Validate task ID uniqueness and format
- Validate status values against allowed set
- Validate string lengths and formats
- When present, validate type values against allowed set

### 4.2 Processing Rules

Implementations:

- MUST preserve unknown fields when processing
- MUST preserve field order when modifying documents
- MUST maintain UTF-8 encoding
- SHOULD preserve comments when modifying documents

## 5. Format Evolution

The format will evolve based on real-world usage and needs, following these principles:

- Backward compatibility will be maintained where possible
- New fields and features will be optional
- Breaking changes will be considered carefully and announced well in advance

## 6. Future Considerations

The following features are explicitly out of scope for v0.1 but may be addressed in future versions:

- Dependencies and relationships between tasks
- Custom fields and metadata
- Advanced task hierarchies
- Cross-document references
- Task timestamps beyond created/updated/due
- Rich text in descriptions
- Task assignments and ownership
- Priority levels
- Tags and labels
