import { z } from 'zod';

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

export type ValidationError = {
  code: string;
  message: string;
  location: {
    line: number;
    column: number;
    length: number;
  };
  severity: 'error' | 'warning';
  source: string;
};

export type ValidationOptions = {
  strict?: boolean; // Enforce all rules or just core rules
  customRules?: ValidationRule[];
};

export type ValidationRule = {
  code: string;
  validate: (doc: TaskdownDocument) => ValidationError[];
};

// Core schema types
export const TaskStatus = z.enum(['pending', 'in_progress', 'done', 'canceled']);
export const TaskType = z.enum(['task', 'epic', 'story', 'bug']);

export const Task = z.object({
  title: z.string().min(1).max(200),
  status: TaskStatus,
  type: TaskType.optional(),
  description: z.string().optional(),
  created: z.string().datetime().optional(),
  updated: z.string().datetime().optional(),
  due: z.string().datetime().optional(),
});

export const TaskRelationship = z.object({
  blocks: z.array(z.string()).optional(),
  blocked_by: z.array(z.string()).optional(),
  part_of: z.string().optional(),
  relates_to: z.array(z.string()).optional(),
});

export const TaskdownDocument = z.object({
  version: z.string(),
  tasks: z.record(z.string(), Task),
  relationships: z.record(z.string(), TaskRelationship).optional(),
});

export type TaskdownDocument = z.infer<typeof TaskdownDocument>;