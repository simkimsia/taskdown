import yaml from 'js-yaml';
import { ValidationResult, ValidationError, ValidationOptions, TaskdownDocument } from './types';

export class TaskdownValidator {
  private options: ValidationOptions;
  private static readonly TASK_ID_PATTERN = /^[A-Z][A-Z0-9\-]+$/;

  constructor(options: ValidationOptions = {}) {
    this.options = {
      strict: false,
      customRules: [],
      ...options,
    };
  }

  async validateString(content: string): Promise<ValidationResult> {
    try {
      // Parse YAML
      const doc = yaml.load(content) as Record<string, unknown>;
      return await this.validateDocument(doc);
    } catch (e) {
      if (e instanceof yaml.YAMLException) {
        return {
          isValid: false,
          errors: [{
            code: 'INVALID_YAML',
            message: e.message,
            location: {
              line: e.mark?.line ?? 0,
              column: e.mark?.column ?? 0,
              length: 1,
            },
            severity: 'error',
            source: 'yaml',
          }],
        };
      }
      throw e;
    }
  }

  async validateDocument(doc: Record<string, unknown>): Promise<ValidationResult> {
    const errors: ValidationError[] = [];

    // Schema validation
    const schemaResult = TaskdownDocument.safeParse(doc);
    if (!schemaResult.success) {
      errors.push(...this.formatZodErrors(schemaResult.error));
    }

    // If schema is valid, perform additional validations
    if (schemaResult.success) {
      const taskdown = schemaResult.data;

      // Validate task IDs
      errors.push(...this.validateTaskIds(taskdown));

      // Validate relationships
      if (taskdown.relationships) {
        errors.push(...this.validateRelationships(taskdown));
      }

      // Run custom rules
      for (const rule of this.options.customRules ?? []) {
        errors.push(...rule.validate(taskdown));
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private validateTaskIds(doc: TaskdownDocument): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const [taskId, _] of Object.entries(doc.tasks)) {
      if (!TaskdownValidator.TASK_ID_PATTERN.test(taskId)) {
        errors.push({
          code: 'INVALID_TASK_ID',
          message: `Task ID "${taskId}" must match pattern ${TaskdownValidator.TASK_ID_PATTERN}`,
          location: { line: 0, column: 0, length: taskId.length },
          severity: 'error',
          source: 'task-id',
        });
      }
    }

    return errors;
  }

  private validateRelationships(doc: TaskdownDocument): ValidationError[] {
    const errors: ValidationError[] = [];
    const taskIds = new Set(Object.keys(doc.tasks));

    for (const [taskId, rels] of Object.entries(doc.relationships ?? {})) {
      // Check source task exists
      if (!taskIds.has(taskId)) {
        errors.push({
          code: 'UNKNOWN_TASK_ID',
          message: `Relationship references unknown task "${taskId}"`,
          location: { line: 0, column: 0, length: taskId.length },
          severity: 'error',
          source: 'relationships',
        });
      }

      // Check referenced tasks exist
      for (const targetId of [...(rels.blocks ?? []), ...(rels.blocked_by ?? []), ...(rels.relates_to ?? [])]) {
        if (!taskIds.has(targetId)) {
          errors.push({
            code: 'UNKNOWN_TASK_ID',
            message: `Relationship references unknown task "${targetId}"`,
            location: { line: 0, column: 0, length: targetId.length },
            severity: 'error',
            source: 'relationships',
          });
        }
      }

      // Check part_of references
      if (rels.part_of && !taskIds.has(rels.part_of)) {
        errors.push({
          code: 'UNKNOWN_TASK_ID',
          message: `Part-of references unknown task "${rels.part_of}"`,
          location: { line: 0, column: 0, length: rels.part_of.length },
          severity: 'error',
          source: 'relationships',
        });
      }
    }

    return errors;
  }

  private formatZodErrors(error: z.ZodError): ValidationError[] {
    return error.errors.map(err => ({
      code: 'SCHEMA_ERROR',
      message: err.message,
      location: { line: 0, column: 0, length: 1 }, // Zod doesn't provide locations
      severity: 'error',
      source: 'schema',
    }));
  }
}