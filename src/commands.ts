import { changeColor } from "./features/changeColor";

import * as vscode from 'vscode';

// The command has been defined in the package.json file
// Now provide the implementation of the command with  registerCommand
// The commandId parameter must match the command field in package.json

interface CommandArgs {
    workbenchConfig: vscode.WorkspaceConfiguration
    colorCustomizationKeys: string[]
    currentColorCustomizations: Record<string, string>
    extensionConfig: vscode.WorkspaceConfiguration
}

export const commands = ({ workbenchConfig, colorCustomizationKeys, currentColorCustomizations, extensionConfig }: CommandArgs) => [
    vscode.commands.registerCommand("nvim-theme.normal", function () {
        changeColor(
            workbenchConfig,
            colorCustomizationKeys,
            currentColorCustomizations,
            extensionConfig.get("nvimColorNormal")
        );
    }),
    vscode.commands.registerCommand("nvim-theme.insert", function () {
        changeColor(
            workbenchConfig,
            colorCustomizationKeys,
            currentColorCustomizations,
            extensionConfig.get("nvimColorInsert")
        );
    }),
    vscode.commands.registerCommand("nvim-theme.visual", function () {
        changeColor(
            workbenchConfig,
            colorCustomizationKeys,
            currentColorCustomizations,
            extensionConfig.get("nvimColorVisual")
        );
    }),
    vscode.commands.registerCommand("nvim-theme.replace", function () {
        changeColor(
            workbenchConfig,
            colorCustomizationKeys,
            currentColorCustomizations,
            extensionConfig.get("nvimColorReplace")
        );
    }),
];