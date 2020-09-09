// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function getConfiguration(section = '') {
	const activeTextEditor = vscode.window.activeTextEditor;
	const resource = activeTextEditor ? activeTextEditor.document.uri : null;
	return vscode.workspace.getConfiguration(section, resource);
}


function changeColor(workbenchConfig, color) {

	const currentColorCustomizations = workbenchConfig.get('colorCustomizations') || {};
	const colorCustomizations = { ...currentColorCustomizations }

	const keys = [
		'activityBarBadge.background',
		'editorCursor.foreground',
		'inputValidation.errorBorder',
		'panel.border',
		"panelTitle.activeBorder",
		'panelTitle.activeForeground',
		'peekView.border',
		'peekViewTitleLabel.foreground',
		'tab.activeBorder',
		'statusBar.border'
	]

	keys.forEach(key => colorCustomizations[key] = color)

	if (currentColorCustomizations !== colorCustomizations) {
      workbenchConfig.update('colorCustomizations', colorCustomizations, true);
    }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const workbenchConfig = getConfiguration('workbench');

	const cmds = [
		vscode.commands.registerCommand('nvim-theme-switcher.normal', function () {
			changeColor(workbenchConfig, workbenchConfig.get('nvimColorNormal'))
		}),
		vscode.commands.registerCommand('nvim-theme-switcher.insert', function () {
			changeColor(workbenchConfig, workbenchConfig.get('nvimColorInsert'))
		}),
		vscode.commands.registerCommand('nvim-theme-switcher.visual', function () {
			changeColor(workbenchConfig, workbenchConfig.get('nvimColorVisual'))
		}),
		vscode.commands.registerCommand('nvim-theme-switcher.replace', function () {
			changeColor(workbenchConfig, workbenchConfig.get('nvimColorReplace'))
		})
	]
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	cmds.forEach(cmd => context.subscriptions.push(cmd))


}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
