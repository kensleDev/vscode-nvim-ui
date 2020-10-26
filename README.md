# NVim Ui

Automatically changes themes based on the currrent Neo Vim mode.

I like how with VSCode Vim you could change the status bar based on the current mode so this is an attempt to recreate that for NeoVim.

## Features

There are 2 Modes:

- Theme mode: Change whole theme on mode change
- Color mode: Change UI accent colors

When swapping the whole theme it has the desired effect it can be a bit much on the eyes. This is why I prefer color mode as its much more subtle but if you want more fine grained control you can make variations of the same theme as I have done [HERE](LINk) for Wes Bos's [Colbalt2](https://github.com/wesbos/cobalt2-vscode)

\*\* WARNING: When using color mode it will add / override the following keys in settings.josn - workbench.colorCustomizations:

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

## Requirements

[Neovim + Vscode Extension](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim) - follow full setup before continuing

## Extension Settings

#### In settings.json:

```
    "workbench.nvimUiMode": "color|theme",

    // Color Mode
    "workbench.nvimColorNormal": "#ffc600",
    "workbench.nvimColorInsert": "#D32F2F",
    "workbench.nvimColorVisual": "#673AB7",
    "workbench.nvimColorReplace": "#C2185B"

    // Theme Mode
    "workbench.nvimThemeNormal": "Cobalt2",
    "workbench.nvimThemeInsert": "Cobalt2-Insert",
    "workbench.nvimThemeVisual": "Cobalt2-Visual",
    "workbench.nvimThemeReplace": "Cobalt2-Replace",

```

#### In Vscode Vimrc:

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

## Known Issues

When using Theme mode - Fonts change when swapping themes - happens very quickly but I use [Victor Mono](https://rubjo.github.io/victor-mono/) - with ligitures and they flash on and off. Dont think this can be avioded.

## TODO

- search mode

---
