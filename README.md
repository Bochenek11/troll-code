# 🤡 Troll Code for VS Code

**Your editor has opinions about your code. And it will share them.**

Troll Code turns VS Code into a prankster. It comments on your code, fakes progress bars, mocks your saves, and in the more extreme modes it shakes the screen, steals your cursor, summons anime waifus and lets a cat poop on your code.

Pick how much chaos you can handle: from a friendly **Legit** mode you can keep on all day, to **Hardcore** mode, which is pure chaos and only starts after you confirm **two separate warnings**.

> 🛡️ **It never edits your files.** Every effect is visual or temporary, and everything can be switched off in one keystroke: **Ctrl+Alt+Shift+P**.

> 🇵🇱 The jokes and messages inside the editor are in **Polish**.

---

## 🎮 Three Modes

Switch modes any time: click the 😇 / 🤡 / 🌈 icon in the status bar, or run **Troll Code: Wybierz tryb** from the Command Palette.

### 😇 Legit Mode (Default)
Light jokes that never get in your way. Safe to keep on while you actually work.

- 💬 Sarcastic comments now and then (about every 10 minutes)
- ⏳ A fake progress bar in the status bar: *"Kompilowanie wymówek… 47%"* ("Compiling excuses… 47%")
- 💾 An occasional comment when you save a file
- 🔵 Blue "hint" underlines with joke messages, which disappear after 30 seconds

Nothing moves, nothing closes, nothing opens. Just vibes.

### 🤡 Troll Mode
Everything from Legit, plus effects that **interrupt your work**:

- 💬 Comments more often (about every 2 minutes)
- ↩️ **Sassy Ctrl+Z**: sometimes answers *"Nie."* ("No.") first, then undoes anyway
- 🏃 **Runaway cursor**: when you move with the arrow keys or click, your cursor sometimes jumps one line up or down (never while you type)
- 📳 **Screen shake** about every 3 minutes
- 💖 **Waifu**: an anime picture (SFW only) opens in a side tab about every 5 minutes
- 📁 **Hiding side bar**: the side bar (Explorer, Extensions…) closes itself every 8 seconds

### ☠️ Hardcore Mode (Opt-In)
For people who want to watch the world burn. **Off by default.** Before it starts, you must accept **two warnings** (see [Turning On Hardcore](#-turning-on-hardcore-step-by-step)).

Everything from Troll Mode, turned up, **plus**:

- 🌈 Rainbow-animated code text
- 🗂️ Saved tabs close **every 3 seconds** (HTML, CSS and JS files every minute; unsaved tabs, terminals and waifus are never closed)
- 🎰 **Theme roulette**: a random color theme every ~3 seconds
- 🔤 **Font chaos**: the font size pulses and the font family keeps changing (Comic Sans, Impact…)
- ❌ **All your code is red**: every line gets a fake error such as *"SyntaxError: brak wiary w siebie"* ("lack of self-confidence"), and the Problems panel shows **9999 problems**
- 🐈 **Mruczek the cat** walks all over your editor and poops 💩 on your code
- 💀 **Corrupted files flood**: a fake copy of your project (same folders and files) fills up with "corrupted" files like `CORRUPTED_game.js` or `NIE_OTWIERAJ_hasla.exe`, each with a random icon and color, and your real files get red 💀 "CORRUPTED" marks. During a file attack the whole side bar switches to this fake Explorer (a second Explorer icon appears in the activity bar while Hardcore is on). Nothing is created or changed on disk: it is only a list and a color
- 🕳️ **Hijacked Explorer**: clicking the real Explorer sends you straight to the fake one (*"🤡 Nie ten Explorer."*, "Wrong Explorer."). Your real files are still one **Ctrl+P** away
- 🟦 **Fake blue screen (BSOD)**: about every 90 seconds the editor fills with a Windows-style *":( Your VS Code ran into a problem… 47%"* screen, which turns into *"Żart 🤡"* ("Just kidding") and closes itself after ~12 seconds
- 🔴 **Fake breakpoints**: red dots pop up on random lines and vanish a few seconds later. They are never added while you are debugging, never placed on a line that already has your breakpoint, and only the extension's own dots are removed
- 🤡 Emoji at the end of every line
- 👻 **Ghost comments** like `// TODO: zmień zawód` ("change careers") appear and fade
- 💀 **Fake hacker terminal**: green Matrix rain, *"Hacking NASA…"*, *"ACCESS GRANTED"*
- 📳 Stronger, more frequent screen shakes (about every 4 seconds)
- 💖 Waifus multiply (up to 4 tabs at once)
- 📢 Notification spam, fake scary progress bars (*"Formatting drive C:…"*) and quizzes
- 🔢 Line numbers and the minimap blink on and off
- ⌨️ ADHD cursor: random shapes and blinking styles
- 🪟 The VS Code window pretends to be another app ("Microsoft Word", "Paint", "Minesweeper"…)
- 📁 The side bar hides every 2 seconds
- 🏃 The cursor jumps 5× more often and up to 3 lines, and Ctrl+Z says "No." half the time

The chaos builds up: a few effects start within seconds, the first file attack comes after about 6 seconds, and the rest kick in over the next minute.

---

## ☠️ Turning On Hardcore: Step by Step

Hardcore never starts by accident. You will see **two confirmation windows** in a row:

**1️⃣ First window: "⚠️ Enable HARDCORE mode?"**
Lists **every effect** Hardcore will do, says that your files are never modified and that your settings will be restored, and tells you how to turn it off.
→ Click **"Yes, I know what I'm doing"** to continue.

**2️⃣ Second window: "☠️ Last chance!"**
A final reminder: save your work first, expect flashing colors and constant movement, and use **Ctrl+Alt+Shift+P** to escape at any time.
→ Click **"☠️ Start HARDCORE"** to begin.

Closing either window or clicking **Cancel** means **nothing happens**. You stay in your current mode.

After both confirmations, a short notice tells you Hardcore is on, along with the panic shortcut.

You will see both windows again:
- every time you turn Hardcore on after turning it off (including via PANIC),
- after an update that adds new Hardcore effects,
- if someone turns it on manually in Settings (`trollCode.rainbowMode.enabled`). Declining switches the setting back off.

---

## ⚠️ IMPORTANT SAFETY WARNING ⚠️

**Hardcore Mode** includes:

- **Rapidly changing colors and flashing** (theme roulette, rainbow animation, blinking UI)
- **Constant movement** (screen shake, pulsing fonts, a walking cat)
- **Sudden pop-ups** (notification spam, fake alarming messages, quizzes)

**NOT RECOMMENDED** for people with:

- Photosensitive epilepsy or seizure disorders
- Anxiety or a strong dislike of sudden interruptions
- Real work to finish before a deadline

### 🛡️ Safety Features

| Feature | What it does |
|---|---|
| 🛑 **Panic button** | **Ctrl+Alt+Shift+P** (Mac: **Cmd+Alt+Shift+P**) turns off *everything* immediately and restores your settings |
| 😇 **Safe default** | Legit Mode is the default. Troll and Hardcore must be chosen on purpose |
| ✋ **Two Hardcore warnings** | First a window listing every effect (**"Yes, I know what I'm doing"**), then a final "Last chance!" window (**"☠️ Start HARDCORE"**). Cancel either one and nothing starts |
| 🔁 **Warnings come back** | Turning Hardcore off resets your consent. An update with new effects asks again too |
| ♻️ **Settings restored** | Theme, font, font size, cursor style, line numbers, minimap and window title are saved before the first change and restored when Hardcore ends, even after a crash (on next start) |
| 💾 **Your work is safe** | Unsaved tabs are never closed. Your files are never modified |

---

## 🔒 What It Will Never Do

- ❌ Modify, add or delete the contents of your files
- ❌ Close tabs with unsaved changes
- ❌ Create, rename or delete files (the "corrupted" files are fake list items and read-only previews)
- ❌ Close or run anything in your real terminals (the hacker terminal is a fake animation that runs no commands)
- ❌ Affect your build: fake errors are only displayed, they do not change how your code compiles or runs
- ❌ Collect data or send telemetry

---

## ✅ Is It Safe? (FAQ)

**Can it break my project or delete my code?**
No. Troll Code never writes to your project files. Everything you see is drawn **on top of** VS Code: colors, underlines, emoji, the cat, the "corrupted" files. Close VS Code and your project is exactly as you left it.

**What about the "corrupted" files and the 💀 marks?**
They are fake. The corrupted files exist only as items in a list inside VS Code, and clicking one opens a read-only preview of random characters. The 💀 next to your real files is only a color and an icon. No file is created, renamed, moved or deleted. `git status` stays clean.

**What about the red errors and the 9999 problems?**
Fake too. They are display-only messages. Your code compiles, runs and lints exactly as before, and they all disappear when you leave Hardcore.

**Will I lose unsaved work when tabs close?**
No. Tabs with unsaved changes are **never** closed, so you never get a "Save changes?" prompt from the extension. Only tabs that are already saved get closed, and they can be reopened normally.

**Does it change my VS Code settings?**
Only in Hardcore, and only these: color theme, font size, font family, cursor style, cursor blinking, line numbers, minimap and window title. Your original values are saved **before** the first change and restored when Hardcore ends (PANIC, mode switch, disable or uninstall). If VS Code crashes during Hardcore, they are restored on the next start. Legit and Troll mode never change your settings.

**Is the hacker terminal real?**
No. It is a fake terminal that only prints animated text. It does not start a shell, runs no commands, and anything you type into it is ignored (it just answers *"Nice try."*). Your real terminals are never closed or touched.

**Can the fake breakpoints stop my program?**
No. Fake breakpoints are only added when **no debug session is running**, so they can't pause anything. They never replace or remove your own breakpoints. If VS Code crashes while some are visible, they are cleaned up on the next start.

**Is the blue screen real?**
No. It's an editor tab that looks like a Windows BSOD. Nothing crashes and nothing restarts. It closes on its own after ~12 seconds, or you can close it like any tab.

**Does it send my code anywhere?**
No. The only internet access is downloading SFW anime pictures for the waifu effect (Troll and Hardcore only). Those requests contain no code, no file names and no personal data. Legit mode makes **no network requests at all**.

**How do I get to my real files during Hardcore?**
Press **Ctrl+P** (Mac: **Cmd+P**) and type a file name. Quick Open always shows your real files. The real Explorer bounces you to the fake one only while Hardcore is on.

Want the fake Explorer to be the *only* one? Right-click the activity bar and untick the real **Explorer**. VS Code doesn't let extensions do this for you. Remember to tick it again afterwards: Troll Code can't restore it.

**How do I stop it right now?**
Press **Ctrl+Alt+Shift+P** (Mac: **Cmd+Alt+Shift+P**). Everything stops at once and your settings come back. You can also click the icon in the status bar and choose **⏸️ Wyłączony** (Off).

**How do I remove it completely?**
Press PANIC first, then uninstall from the Extensions view, or from a terminal:

```bash
code --uninstall-extension bochenek11.troll-code
```

---

## 📦 Installation

### From the VS Code Marketplace
1. Open VS Code
2. Press **Ctrl+P** (Mac: **Cmd+P**)
3. Type `ext install bochenek11.troll-code`
4. Press **Enter**

### From a VSIX File
1. Download the `.vsix` file
2. In VS Code open the Extensions view (**Ctrl+Shift+X**)
3. Click the **…** menu → **Install from VSIX…**
4. Select the file

Or from a terminal:

```bash
code --install-extension troll-code-<version>.vsix
```

---

## 🚀 Quick Start

1. Install the extension. It starts in **Legit Mode** right away.
2. Look at the bottom-right of the status bar: 😇 means Legit.
3. Click it to switch to 🤡 **Troll** or ☠️ **Hardcore**.
4. Want a joke right now? Run **Troll Code: Trolluj mnie teraz**.
5. Had enough? Press **Ctrl+Alt+Shift+P**.

---

## ⌨️ Commands

Open the Command Palette (**Ctrl+Shift+P** / **Cmd+Shift+P**) and type `Troll Code`:

| Command | What it does | Shortcut |
|---|---|---|
| 🛑 **PANIC — wyłącz wszystko** | Turns off everything and restores your settings | **Ctrl+Alt+Shift+P** |
| **Wybierz tryb (Legit / Troll / Hardcore)** | Opens the mode picker | Click the status bar icon |
| **Włącz/wyłącz trolling** | Turns all effects on or off | – |
| **🌈 Tryb tęczowy HARDKOR (włącz/wyłącz)** | Turns Hardcore on (with warning) or off | – |
| **Trolluj mnie teraz** | Shows a joke and a hint right now | – |
| **Trzęsienie ekranu teraz** | Shakes the screen right now | – |
| **Pokaż waifu teraz** | Opens a waifu right now | – |
| **Niebieski ekran (BSOD) teraz** | Shows the fake blue screen right now | – |

---

## ⚙️ Configuration

Open Settings (**Ctrl+,** / **Cmd+,**) and search for `trollCode`.

### Mode

```json
{
  "trollCode.enabled": true,
  "trollCode.mode": "legit",
  "trollCode.rainbowMode.enabled": false
}
```

| Setting | Default | Description |
|---|---|---|
| `trollCode.enabled` | `true` | Master switch for every effect |
| `trollCode.mode` | `"legit"` | `"legit"` (light) or `"troll"` (annoying) |
| `trollCode.rainbowMode.enabled` | `false` | ☠️ Hardcore Mode. Asks for confirmation before starting |

### Legit Effects (all modes)

| Setting | Default | Description |
|---|---|---|
| `trollCode.messages.enabled` | `true` | Random sarcastic comments |
| `trollCode.messages.intervalMinutes` | `2` | Average minutes between comments (Legit uses at least 10) |
| `trollCode.statusBar.enabled` | `true` | Fake progress bar in the status bar |
| `trollCode.onSave.enabled` | `true` | Comments when you save |
| `trollCode.onSave.chance` | `0.4` | Chance of a save comment, 0–1 (Legit uses at most 0.15) |
| `trollCode.fakeWarnings.enabled` | `true` | Blue joke hints that vanish after 30 seconds |

### Troll Effects (Troll Mode only)

| Setting | Default | Description |
|---|---|---|
| `trollCode.sassyUndo.enabled` | `true` | Ctrl+Z sometimes says "No." first |
| `trollCode.cursorJump.enabled` | `true` | Runaway cursor |
| `trollCode.cursorJump.chance` | `0.03` | Chance per cursor move, 0–0.2 |
| `trollCode.shake.enabled` | `true` | Random screen shake |
| `trollCode.shake.intervalMinutes` | `3` | Average minutes between shakes |
| `trollCode.waifu.enabled` | `true` | Random waifu tabs (needs internet) |
| `trollCode.waifu.intervalMinutes` | `5` | Average minutes between waifus |
| `trollCode.hideSidebar.enabled` | `true` | Hides the side bar periodically |
| `trollCode.hideSidebar.intervalSeconds` | `8` | Seconds between hides |

Hardcore Mode uses its own fixed, much faster timings.

---

## 📊 Status Bar

| Item | Where | Looks like | Click |
|---|---|---|---|
| **Mode + fake progress** | Right | `😇 Szukanie średnika… 47%` / `🤡 …` / `🔥 HARDKOR 🔥 …` | Opens the mode picker |
| **Cat counter** (Hardcore) | Left | `🐈 💩×5` | Cleans up the poop |

---

## 🔐 Privacy

- **No telemetry.** Nothing about you or your code is collected or sent anywhere.
- **The only network requests** are for waifu pictures, which are downloaded from these SFW-only public APIs:
  - `nekos.best`
  - `api.waifu.pics`
  - `api.waifu.im`
- No code, file names or personal data are included in those requests.
- Turn waifus off with `trollCode.waifu.enabled: false` (Troll Mode) or by staying in Legit Mode, which makes **no network requests at all**.

---

## 🧰 Troubleshooting

### Hardcore seems quiet at first
- That is on purpose: the chaos builds up. A few effects start within seconds, the first file attack comes after ~6 seconds, and the rest kick in over the next minute.
- The fake Explorer needs a folder to be open in VS Code. With no folder open, there are no corrupted files.

### A new setting or view doesn't work after an update
- Close VS Code completely (all windows) and open it again. **Developer: Reload Window** is not always enough when an update adds new settings or views.

### The waifu tab says "waifu offline"
- Check your internet connection. All three image services were unreachable.
- Firewalls or school/work networks may block these sites.

### My settings did not come back after Hardcore
- Reload VS Code (**Developer: Reload Window**). The extension restores saved settings on start.
- If something is still off, reset these manually in Settings: `workbench.colorTheme`, `editor.fontSize`, `editor.fontFamily`, `editor.cursorStyle`, `editor.cursorBlinking`, `editor.lineNumbers`, `editor.minimap.enabled`, `window.title`.

### I can't see the cat
- The cat is positioned with a CSS trick that VS Code doesn't officially support, so it may look off in some setups. The poop counter in the status bar still works.

### VS Code feels slow in Hardcore
- Hardcore writes to your user settings several times per second (theme, font, cursor…). That is part of the chaos. On slower machines, press **Ctrl+Alt+Shift+P** to stop it.

### I can't reach the Extensions view to uninstall
- Press **Ctrl+Alt+Shift+P** first, or uninstall from a terminal:
  ```bash
  code --uninstall-extension bochenek11.troll-code
  ```

---

## 🐞 Known Issues

- The cat and line emoji use unofficial CSS positioning and may render oddly with some fonts or zoom levels.
- Fonts that are not installed on your system fall back to monospace.
- If you have `settings.json` open during Hardcore, you'll see it change constantly.

---

## 🙏 Credits

The rainbow text effect is based on [Not Gay](https://github.com/saimahendra282/Not-Gay) by Bejawada Sai Mahendra (MIT License).

Waifu images are provided by [nekos.best](https://nekos.best), [waifu.pics](https://waifu.pics) and [waifu.im](https://waifu.im).

## 📄 License

MIT. See the `LICENSE` file included with the extension.

---

Made with 🤡 for programmers who take themselves too seriously.

*Use responsibly. Prank your friends, not your deadlines.*
