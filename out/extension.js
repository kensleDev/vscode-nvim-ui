"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const commands_1 = require("./commands");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function getConfiguration(section = '') {
    const activeTextEditor = vscode.window.activeTextEditor;
    const resource = activeTextEditor ? activeTextEditor.document.uri : null;
    return vscode.workspace.getConfiguration(section, resource);
}
function getConfig(workbenchConfig, extensionConfig) {
    const colorCustomizationKeys = workbenchConfig.get('nvimColorCustomizationKeys') ||
        extensionConfig.get('nvimColorCustomizationKeys') ||
        [];
    const currentColorCustomizations = workbenchConfig.get('colorCustomizations') || {};
    return { colorCustomizationKeys, currentColorCustomizations };
}
function activate(context) {
    const extensionConfig = getConfiguration('nvim-ui');
    const workbenchConfig = getConfiguration('workbench');
    const { colorCustomizationKeys, currentColorCustomizations } = getConfig(workbenchConfig, extensionConfig);
    // const operationMode = workbenchConfig.get('nvimUiMode')
    (0, commands_1.commands)({
        extensionConfig,
        workbenchConfig,
        colorCustomizationKeys,
        currentColorCustomizations
    }).forEach((cmd) => context.subscriptions.push(cmd));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map