"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const changeColor_1 = require("./features/changeColor");
const vscode = require("vscode");
const extensionConfigHelper = (extensionConfig, value) => extensionConfig.get(value);
const commands = ({ workbenchConfig, colorCustomizationKeys, currentColorCustomizations, extensionConfig }) => [
    vscode.commands.registerCommand('nvim-theme.normal', function () {
        (0, changeColor_1.changeColor)(workbenchConfig, colorCustomizationKeys, currentColorCustomizations, extensionConfigHelper(extensionConfig, 'nvimColorNormal'));
    }),
    vscode.commands.registerCommand('nvim-theme.insert', function () {
        (0, changeColor_1.changeColor)(workbenchConfig, colorCustomizationKeys, currentColorCustomizations, extensionConfigHelper(extensionConfig, 'nvimColorInsert'));
    }),
    vscode.commands.registerCommand('nvim-theme.visual', function () {
        (0, changeColor_1.changeColor)(workbenchConfig, colorCustomizationKeys, currentColorCustomizations, extensionConfigHelper(extensionConfig, 'nvimColorVisual'));
    }),
    vscode.commands.registerCommand('nvim-theme.replace', function () {
        (0, changeColor_1.changeColor)(workbenchConfig, colorCustomizationKeys, currentColorCustomizations, extensionConfigHelper(extensionConfig, 'nvimColorVisual'));
    })
];
exports.commands = commands;
//# sourceMappingURL=commands.js.map