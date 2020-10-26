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

\*\* WARNING: The plugin will add / override the following keys in settings.json - workbench.colorCustomizations:

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

### In settings.json:

You can change the colors to match the theme you use:

```
    "workbench.nvimColorNormal": "#ffc600",
    "workbench.nvimColorInsert": "#D32F2F",
    "workbench.nvimColorVisual": "#673AB7",
```

### In Vscode Vimrc:

This will need adding to you rvimrc, it tells neovim to send a command to vscode changing the color in a hacky way (can't find a better way, no AUTOCMDS for visual, replace etc,,,)

Make sure to restart VSCode after adding this config

```
" THEME CHANGER

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


function! SetCursorLineNrColorVisual()
    set updatetime=0
    call VSCodeNotify('nvim-theme.visual')
endfunction

vnoremap <silent> <expr> <SID>SetCursorLineNrColorVisual SetCursorLineNrColorVisual()
nnoremap <silent> <script> v v<SID>SetCursorLineNrColorVisual
nnoremap <silent> <script> V V<SID>SetCursorLineNrColorVisual
nnoremap <silent> <script> <C-v> <C-v><SID>SetCursorLineNrColorVisual

function! SetCursorLineNrColorVisual()
    set updatetime=0
    call VSCodeNotify('nvim-theme.visual')
endfunction

vnoremap <silent> <expr> <SID>SetCursorLineNrColorVisual SetCursorLineNrColorVisual()
nnoremap <silent> <script> v v<SID>SetCursorLineNrColorVisual
nnoremap <silent> <script> V V<SID>SetCursorLineNrColorVisual
nnoremap <silent> <script> <C-v> <C-v><SID>SetCursorLineNrColorVisual


augroup CursorLineNrColorSwap
    autocmd!
    autocmd InsertEnter * call SetCursorLineNrColorInsert(v:insertmode)
    autocmd InsertLeave * call VSCodeNotify('nvim-theme.normal')
    autocmd CursorHold * call VSCodeNotify('nvim-theme.normal')
augroup END

```

# Known Issues

- Visual mode puts the cursor to the start of the line. Negligable as following command is almost always to move the cursor

# TODO

- search mode
- replace mode

---
