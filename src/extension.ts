// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands } from './commands';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function getConfiguration(section = '') {
  const activeTextEditor = vscode.window.activeTextEditor;
  const resource = activeTextEditor ? activeTextEditor.document.uri : null;
  return vscode.workspace.getConfiguration(section, resource);
}

function getConfig(
  workbenchConfig: vscode.WorkspaceConfiguration,
  extensionConfig: vscode.WorkspaceConfiguration
) {
  const colorCustomizationKeys =
    workbenchConfig.get<string[]>('nvimColorCustomizationKeys') ||
    extensionConfig.get<string[]>('nvimColorCustomizationKeys') ||
    [];

  const currentColorCustomizations =
    workbenchConfig.get<Record<string, string>>('colorCustomizations') || {};

  return { colorCustomizationKeys, currentColorCustomizations };
}

export function activate(context: vscode.ExtensionContext) {
  const extensionConfig = getConfiguration('nvim-ui');
  const workbenchConfig = getConfiguration('workbench');

  const { colorCustomizationKeys, currentColorCustomizations } = getConfig(
    workbenchConfig,
    extensionConfig
  );

  // const operationMode = workbenchConfig.get('nvimUiMode')

  commands({
    extensionConfig,
    workbenchConfig,
    colorCustomizationKeys,
    currentColorCustomizations
  }).forEach((cmd) => context.subscriptions.push(cmd));
}

// this method is called when your extension is deactivated
export function deactivate() {}
