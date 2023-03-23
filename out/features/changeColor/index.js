"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeColor = void 0;
function changeColor(extensionConfig, colorCustomizationKeys, currentColorCustomizations, color) {
    const colorCustomizations = { ...currentColorCustomizations };
    let keys;
    console.log(colorCustomizationKeys);
    if (colorCustomizationKeys) {
        keys = colorCustomizationKeys;
    }
    else {
        keys = [
            'activityBarBadge.background',
            'editorCursor.foreground',
            'inputValidation.errorBorder',
            'panel.border',
            'panelTitle.activeBorder',
            'panelTitle.activeForeground',
            'peekView.border',
            'peekViewTitleLabel.foreground',
            'tab.activeBorder',
            'statusBar.border'
        ];
    }
    keys.forEach((key) => (colorCustomizations[key] = color));
    if (currentColorCustomizations !== colorCustomizations) {
        extensionConfig.update('colorCustomizations', colorCustomizations, true);
    }
}
exports.changeColor = changeColor;
//# sourceMappingURL=index.js.map