# DEPRICATION NOTICE

After careful consideration, I have decided to deprecate the vscode-nvim-ui plugin. This decision follows the discovery of more efficient solutions and a shift in my development focus.

For details on this decision and alternative solutions, please refer to [Issue #14](https://github.com/kensleDev/vscode-nvim-ui/issues/14). I recommend the Apc Customize UI++ extension as a superior alternative for enhanced functionality.

If the extension is working for you then feel free to continue but there will be no futher development. As pointed out in the mentioned issue, Apc Customize UI++ hooks into the Electron window where this extension is simply inserting lines into settings.json which can cause issues with other plugins that have similar functionality [such as this issue with Peacock](https://github.com/kensleDev/vscode-nvim-ui/issues/6)

Thank you to everyone who has used the extension and for your support and understanding.

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
    "nvim-ui.nvimColorNormal": "#ffc600",
    "nvim-ui.nvimColorInsert": "#D32F2F",
    "nvim-ui.nvimColorVisual": "#673AB7",
    "nvim-ui.nvimColorReplace": "#000"
```

By default the extension only changes the color of cursor. To change the color of other elements, add it's name to workbench.nvimColorCustomizationKeys in setings.json.

For example, if you would like the active tab highlight and cursor to change color, enter the following in settings.json:

```
    "nvim-ui.nvimColorCustomizationKeys":  ["tab.activeBorder", "editorCursor.foreground"],
```

These are some of the settings you can use with this plugin: 

```
activityBarBadge.background
editorCursor.foreground
inputValidation.errorBorder
panel.border
panelTitle.activeBorder
panelTitle.activeForeground
peekView.border
peekViewTitleLabel.foreground
tab.activeBorder
statusBar.border
statusBar.background
activityBar.background
```

This plugin should work with any ui setting, the above have been tested. 

### In Neovim config

This will need adding to you init.vim or init.lua, it tells neovim to send a command to vscode changing the color in a hacky way

Make sure to restart VSCode after adding

#### init.lua

```
vim.api.nvim_exec([[
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
        autocmd ModeChanged [vV\x16]*:* call VSCodeNotify('nvim-theme.normal')
    augroup END
]], false)
```

#### init.vim

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
    autocmd ModeChanged [vV\x16]*:* call VSCodeNotify('nvim-theme.normal')
augroup END
```

\*\* WARNING: The plugin will add / override any keys that are passed in for customization in settings.json. If uninstalling the extension you will need to remove these from your settings.json

```
"workbench.colorCustomizations": {
    ...keys
}
```
