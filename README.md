# NVim Theme Modifier

Changes theme accents based on current NeoVim mode.

## Features

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

## Requirements

[Neovim + Vscode Extension](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim) - follow full setup before continuing

## Extension Settings

#### In settings.json:

```
    "workbench.nvimColorNormal": "#ffc600",
    "workbench.nvimColorInsert": "#D32F2F",
    "workbench.nvimColorVisual": "#673AB7",
    "workbench.nvimColorReplace": "#C2185B"
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

- Visual mode puts the cursor to the start of the line. Negligable as following command is almost always to move the cursor

## TODO

- search mode

---
