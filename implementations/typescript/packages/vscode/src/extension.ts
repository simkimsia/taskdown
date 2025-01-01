import * as vscode from 'vscode';
import { validate, ValidationResult, ValidationError } from '@taskdown/validator';

export function activate(context: vscode.ExtensionContext) {
    console.log('Taskdown extension is now active!');

    // Register a command that validates the current file
    let disposable = vscode.commands.registerCommand('taskdown.validate', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No file is open');
            return;
        }

        const document = editor.document;
        const text = document.getText();

        try {
            const result: ValidationResult = validate();
            if (result.isValid) {
                vscode.window.showInformationMessage('Taskdown file is valid!');
            } else {
                // Show validation errors
                const diagnostics = result.errors.map((error: ValidationError) => {
                    const range = new vscode.Range(
                        error.location.line - 1,
                        error.location.column,
                        error.location.line - 1,
                        error.location.column + error.location.length
                    );

                    return new vscode.Diagnostic(
                        range,
                        error.message,
                        error.severity === 'error'
                            ? vscode.DiagnosticSeverity.Error
                            : vscode.DiagnosticSeverity.Warning
                    );
                });

                const diagnosticCollection = vscode.languages.createDiagnosticCollection('taskdown');
                diagnosticCollection.set(document.uri, diagnostics);
            }
        } catch (error: unknown) {
            vscode.window.showErrorMessage(`Error validating file: ${error instanceof Error ? error.message : String(error)}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}