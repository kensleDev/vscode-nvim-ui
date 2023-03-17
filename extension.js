// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function getConfiguration(section = "") {
  const activeTextEditor = vscode.window.activeTextEditor;
  const resource = activeTextEditor ? activeTextEditor.document.uri : null;
  return vscode.workspace.getConfiguration(section, resource);
}

function changeColor(extensionConfig, colorCustomizationKeys, currentColorCustomizations, color) {
  const colorCustomizations = { ...currentColorCustomizations };

  let keys;  
  console.log(colorCustomizationKeys);
  if (colorCustomizationKeys) {
    keys = colorCustomizationKeys;   
  } else {
    keys = [
      "activityBarBadge.background",
      "editorCursor.foreground",
      "inputValidation.errorBorder",
      "panel.border",
      "panelTitle.activeBorder",
      "panelTitle.activeForeground",
      "peekView.border",
      "peekViewTitleLabel.foreground",
      "tab.activeBorder",
      "statusBar.border",
    ];     
  }

  keys.forEach((key) => (colorCustomizations[key] = color));

  if (currentColorCustomizations !== colorCustomizations) {
    extensionConfig.update("colorCustomizations", colorCustomizations, true);
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const extensionConfig = getConfiguration("nvim-ui");
  const workbenchConfig = getConfiguration("workbench");
  const colorCustomizationKeys = extensionConfig.get("nvimColorCustomizationKeys") || null;
  const currentColorCustomizations = workbenchConfig.get("colorCustomizations") || {}; 
  // const operationMode = workbenchConfig.get('nvimUiMode')

  const cmds = [
    vscode.commands.registerCommand("nvim-theme.normal", function () {
      changeColor(workbenchConfig, colorCustomizationKeys, currentColorCustomizations, extensionConfig.get("nvimColorNormal"));
    }),
    vscode.commands.registerCommand("nvim-theme.insert", function () {
      changeColor(workbenchConfig, colorCustomizationKeys, currentColorCustomizations, extensionConfig.get("nvimColorInsert"));
    }),
    vscode.commands.registerCommand("nvim-theme.visual", function () {
      changeColor(workbenchConfig, colorCustomizationKeys, currentColorCustomizations, extensionConfig.get("nvimColorVisual"));
    }),
    vscode.commands.registerCommand("nvim-theme.replace", function () {
      changeColor(workbenchConfig, colorCustomizationKeys, currentColorCustomizations, extensionConfig.get("nvimColorReplace"));
    }),
  ];
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  cmds.forEach((cmd) => context.subscriptions.push(cmd));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
