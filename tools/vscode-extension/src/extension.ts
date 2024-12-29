// src/extension.ts
import * as vscode from 'vscode';
import { VSCodeTaskdownValidator } from './validator';

export function activate(context: vscode.ExtensionContext) {
    console.log('Taskdown extension is now active');

    // Initialize validator
    const validator = new VSCodeTaskdownValidator(context);

    // Register commands
    const disposables = [
        // Validate current document command
        vscode.commands.registerCommand('taskdown.validateDocument', () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                validator.validateDocument(editor.document);
            }
        }),
    ];

    // Set up document validation triggers
    disposables.push(
        // Validate when a text document is opened
        vscode.workspace.onDidOpenTextDocument(doc => {
            if (doc.languageId === 'markdown') {
                validator.validateDocument(doc);
            }
        }),

        // Validate when a text document is saved
        vscode.workspace.onDidSaveTextDocument(doc => {
            if (doc.languageId === 'markdown') {
                validator.validateDocument(doc);
            }
        }),

        // Optionally validate on changes (with debounce)
        vscode.workspace.onDidChangeTextDocument(event => {
            if (event.document.languageId === 'markdown') {
                const debounceTime = 500; // milliseconds
                clearTimeout(validateTimeout);
                validateTimeout = setTimeout(() => {
                    validator.validateDocument(event.document);
                }, debounceTime);
            }
        })
    );

    // Add all disposables to context subscriptions
    context.subscriptions.push(...disposables);
}

let validateTimeout: NodeJS.Timeout;

// This method is called when extension is deactivated
export function deactivate() {
    // Clean up any resources if needed
    clearTimeout(validateTimeout);
}