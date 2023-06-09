export function changeColor(
  workbenchConfig: any,
  colorCustomizationKeys: string[],
  currentColorCustomizations: Record<string, string>,
  color: string
) {
  const colorCustomizations = { ...currentColorCustomizations };

  let keys;
  console.log(colorCustomizationKeys);
  if (colorCustomizationKeys) {
    keys = colorCustomizationKeys;
  } else {
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
    workbenchConfig.update('colorCustomizations', colorCustomizations, true);
  }
}
