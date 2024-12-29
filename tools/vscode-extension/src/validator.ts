// src/extension/validator.ts
import * as vscode from 'vscode';
import { TaskdownValidator, ValidationError } from '../validator';

export class VSCodeTaskdownValidator {
  private validator: TaskdownValidator;
  private diagnosticCollection: vscode.DiagnosticCollection;

  constructor(context: vscode.ExtensionContext) {
    this.validator = new TaskdownValidator();
    this.diagnosticCollection = vscode.languages.createDiagnosticCollection('taskdown');
    context.subscriptions.push(this.diagnosticCollection);
  }

  async validateDocument(document: vscode.TextDocument): Promise<void> {
    // Only validate markdown files
    if (document.languageId !== 'markdown') {
      return;
    }

    const text = document.getText();
    const taskdownBlocks = this.findTaskdownBlocks(text);
    const diagnostics: vscode.Diagnostic[] = [];

    for (const block of taskdownBlocks) {
      const result = await this.validator.validateString(block.content);

      if (!result.isValid) {
        diagnostics.push(...this.convertToDiagnostics(result.errors, block.start));
      }
    }

    this.diagnosticCollection.set(document.uri, diagnostics);
  }

  private findTaskdownBlocks(text: string): Array<{ content: string, start: number }> {
    const blocks: Array<{ content: string, start: number }> = [];
    const regex = /```taskdown\n([\s\S]*?)```/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      blocks.push({
        content: match[1],
        start: match.index + '```taskdown\n'.length,
      });
    }

    return blocks;
  }

  private convertToDiagnostics(errors: ValidationError[], blockStart: number): vscode.Diagnostic[] {
    return errors.map(error => {
      // Convert error location to VS Code position
      const range = new vscode.Range(
        error.location.line + blockStart,
        error.location.column,
        error.location.line + blockStart,
        error.location.column + error.location.length
      );

      const diagnostic = new vscode.Diagnostic(
        range,
        error.message,
        error.severity === 'error'
          ? vscode.DiagnosticSeverity.Error
          : vscode.DiagnosticSeverity.Warning
      );

      diagnostic.code = error.code;
      diagnostic.source = 'taskdown';

      return diagnostic;
    });
  }
}