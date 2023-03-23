// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands } from './commands';

import { changeColor } from './features/changeColor';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function getConfiguration(section = "") {
  const activeTextEditor = vscode.window.activeTextEditor;
  const resource = activeTextEditor ? activeTextEditor.document.uri : null;
  return vscode.workspace.getConfiguration(section, resource);
}


function activate(context: vscode.ExtensionContext) {
  const extensionConfig = getConfiguration("nvim-ui");
  const workbenchConfig = getConfiguration("workbench");

  const colorCustomizationKeys =
    workbenchConfig.get("nvimColorCustomizationKeys") || extensionConfig.get("nvimColorCustomizationKeys") || null;

  const currentColorCustomizations =
    workbenchConfig.get("colorCustomizations") || {};

  // const operationMode = workbenchConfig.get('nvimUiMode')

  commands({ extensionConfig, workbenchConfig, colorCustomizationKeys, currentColorCustomizations }).forEach((cmd) => context.subscriptions.push(cmd));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate,
};
