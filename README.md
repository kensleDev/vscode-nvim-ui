# NeoVim Ui Modifier

Changes theme accents based on current NeoVim mode.


![Alt Text](assets/nvim4.gif)

Currently works for the following modes:

- Normal
- Insert
- Visual

Set the color for each mode to match your theme in settings.json (see below)

Also see the [Blog Article](https://dev.to/julian_e_yak_win_andi/vscode-neovim-theme-modifier-51gg)

# Requirements

You will need the NeoVim VScode extension installed for this to work - [Neovim Extension](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim) - follow full setup before continuing

# Config
### In settings.json:

You can change the colors to match the theme you use:

```
    "workbench.nvimColorNormal": "#ffc600",
    "workbench.nvimColorInsert": "#D32F2F",
    "workbench.nvimColorVisual": "#673AB7",
    "workbench.nvimColorReplace": "#000"
```

By default the extension only changes the color of status bar. To change the color of other elements, add it's name to workbench.nvimColorCustomizationKeys in setings.json.

For example, if you would like the status bar and cursor to change color, enter the following:

```
    "workbench.nvimColorCustomizationKeys":  ["statusBar.background", "editorCursor.foreground"],
```

Here are some other elements you may wish to change:

"activityBarBadge.background"
"editorCursor.foreground"
"inputValidation.errorBorder"
"panel.border"
"panelTitle.activeBorder"
"panelTitle.activeForeground"
"peekView.border"
"peekViewTitleLabel.foreground"
"tab.activeBorder"
"statusBar.border"

### In Vscode Vimrc:

This will need adding to you rvimrc, it tells neovim to send a command to vscode changing the color in a hacky way

Make sure to restart VSCode after adding this config

```
" THEME CHANGER
function! SetCursorLineNrColorInsert(mode)
    " Insert mode: blue
    if a:mode == "i"
        call VSCodeNotify('nvim-theme.insert')

    " Replace mode: red
    elseif a:mode == "r"
        call VSCodeNotify('nvim-theme.replace')
    endif
endfunction

augroup CursorLineNrColorSwap
    autocmd!
    autocmd ModeChanged *:[vV\x16]* call VSCodeNotify('nvim-theme.visual')
    autocmd ModeChanged *:[R]* call VSCodeNotify('nvim-theme.replace')
    autocmd InsertEnter * call SetCursorLineNrColorInsert(v:insertmode)
    autocmd InsertLeave * call VSCodeNotify('nvim-theme.normal')
    autocmd CursorHold * call VSCodeNotify('nvim-theme.normal')
augroup END

```

\*\* WARNING: The plugin will add / override any keys that are passed in for customization in settings.json 

```
"workbench.colorCustomizations": {
    "activityBarBadge.background": "#ffc600",
    "editorCursor.foreground": "#ffc600",
    "inputValidation.errorBorder": "#ffc600",
    "panel.border": "#ffc600",
    "panelTitle.activeBorder": "#ffc600",
    "panelTitle.activeForeground": "#ffc600",
    "peekView.border": "#ffc600",
    "peekViewTitleLabel.foreground": "#ffc600",
    "tab.activeBorder": "#ffc600",
    "statusBar.border": "#ffc600"
}
```


# TODO

- search mode

---


# Change log

17/03 - Merged in changes from Jonathan Simon to fix issue with the cusor jumping back to the start of the line when entering visual mode
17/03 - Updated extension.js to allow the user to set nvimColorCustomizationKeys in settings.json. Updated README.