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

function getTheme(workbenchConfig, mode) {

	let theme

	if (mode === 'normal') theme = workbenchConfig.get('nvimThemeNormal')
	if (mode === 'insert') theme = workbenchConfig.get('nvimThemeInsert')
	if (mode === 'visual') theme = workbenchConfig.get('nvimThemeVisual')
	if (mode === 'replace') theme = workbenchConfig.get('nvimThemeReplace')

	if (!theme) {
		// Give up and return current theme
		
		theme = workbenchConfig.get('colorTheme');
	}
	return theme;
}

function setTheme(workbenchConfig, mode) {
	const currentTheme = getTheme(mode)
	workbenchConfig.update('colorTheme', currentTheme, vscode.ConfigurationTarget.Global)
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const workbenchConfig = getConfiguration('workbench');

	const operationMode = workbenchConfig.get('nvimUiMode')

	const cmds = [
		vscode.commands.registerCommand('nvim-theme.normal', function () {
			operationMode === 'color' 
				? changeColor(workbenchConfig, workbenchConfig.get('nvimColorNormal'))
				: setTheme('normal')
		}),
		vscode.commands.registerCommand('nvim-theme.insert', function () {
			operationMode === 'color' 
				? changeColor(workbenchConfig, workbenchConfig.get('nvimColorInsert'))
				: setTheme('insert')
		}),
		vscode.commands.registerCommand('nvim-theme.visual', function () {
			operationMode === 'color' 
				? changeColor(workbenchConfig, workbenchConfig.get('nvimColorVisual'))
				: setTheme('visual')
		}),
		vscode.commands.registerCommand('nvim-theme.replace', function () {
			operationMode === 'color' 
				? changeColor(workbenchConfig, workbenchConfig.get('nvimColorReplace'))
				: setTheme('replace')
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
