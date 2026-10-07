const vscode = require('vscode');

const RAINBOW_COLORS = ['#FF0000', '#FF8000', '#FFFF00', '#00FF00', '#0000FF', '#4000FF', '#8000FF'];

const MESSAGES = [
  'Jesteś pewien, że to zadziała?',
  'Ten kod widział już Stack Overflow.',
  'Nie mówię, że to bug… ale to bug.',
  'Twój kod działa? Podejrzane.',
  'Może przerwa na kawę? Kod i tak się nie naprawi sam.',
  'Gratulacje! Właśnie napisałeś przyszły dług techniczny.',
  'Senior by to zrobił w jednej linijce.',
  'Czy to jest feature, czy już się poddajemy?',
  'Pamiętaj: działa u mnie ≠ działa.',
  'Wykryto 0 testów. Odważnie.',
  'Ctrl+C, Ctrl+V — klasyka gatunku.',
  'Twój komputer prosi o urlop.',
];

const SAVE_MESSAGES = [
  'Zapisano. Ale czy było warto?',
  'Zapisano. Nie, nie sprawdzałem, czy działa.',
  'Plik zapisany. Twoja reputacja — jeszcze nie.',
  'Zapisano po raz 47. Coś nie idzie?',
  'Zapisano. Git już się boi.',
];

const FAKE_WARNINGS = [
  'Ta linijka wygląda na smutną.',
  'Ta zmienna potrzebuje terapii.',
  'Hmm… odważny wybór.',
  'Ta linijka zgłosiła chęć odejścia z projektu.',
  'Code review: 🤔',
  'Tu kiedyś będzie bug. Zapamiętaj to miejsce.',
];

const PROGRESS_TASKS = [
  'Kompilowanie wymówek',
  'Ładowanie motywacji',
  'Szukanie średnika',
  'Indeksowanie błędów',
  'Pobieranie umiejętności',
  'Negocjacje z kompilatorem',
  'Liczenie bugów',
];

const WAIFU_LINES = [
  'B-baka! Znowu ten sam bug?!',
  'Senpai, twój kod się nie kompiluje… (╥﹏╥)',
  'Nie żeby mi zależało na twoich testach czy coś!',
  'Senpai, zapisz plik, onegai~',
  'Nani?! To ma działać w produkcji?!',
  'Senpai, zostaję tu na zawsze~ ♡',
  'Twoje karty znikają, ale ja nie! (◕‿◕✿)',
];

const FAKE_SCARES = [
  ['Usuwanie folderu System32', 'Żart 🤡 Nic nie usunąłem. Jeszcze.'],
  ['Wysyłanie historii przeglądarki do mamy', 'Żart 🤡 Mama i tak wie.'],
  ['Instalowanie Internet Explorera 6', 'Żart 🤡 Aż tak okrutny nie jestem.'],
  ['Formatowanie dysku C:', 'Żart 🤡 Ale serce ci zabiło, co?'],
  ['Pushowanie na main z --force', 'Żart 🤡 Tym razem.'],
];

const QUIZ = [
  ['Czy umiesz programować?', ['Tak', 'Nie', 'Mama mówi, że tak']],
  ['Który bug naprawiasz dziś?', ['Ten sam co wczoraj', 'Ten, który sam zrobiłem', 'Jaki bug?']],
  ['Ile kaw dziś wypiłeś?', ['1', '5', 'Jestem kawą']],
  ['Czy commit „fix” to dobry opis?', ['Tak', 'Oczywiście', 'Najlepszy']],
];

// Tryb tęczowy HARDKOR
const RAINBOW = {
  closeTabsMs: 3000,
  closeWebTabsMs: 60000,
  shakeMs: 4000,
  waifuMs: 20000,
  themeMs: 3000,
  spamMs: 12000,
  scareMs: 40000,
  congratsMs: 35000,
  layoutMs: 7000,
  quizMs: 30000,
  hideSidebarMs: 2000,
  fontPulseMs: 1500,
  fontFamilyMs: 7000,
  clownsMs: 2000,
  ghostsMs: 3000,
  hackerMs: 45000,
  gutterMs: 3000,
  cursorStyleMs: 2500,
  titleMs: 3000,
  fakeErrorsMs: 2000,
  fakeErrorCount: 9999,
  fakeErrorMaxLines: 5000,
  catMs: 250,
  catWidth: 80,
  catPoopChance: 0.1,
  catMaxPoops: 15,
  fakeFileMs: 5000,
  fakeFileMax: 50,
  fileAttackMs: 45000,
  fileAttackPauseMs: 10000,
  fileAttackFlood: 12,
  corruptMs: 5000,
  cursorJumpChance: 0.15,
  sassyUndoChance: 0.6,
  maxWaifus: 4,
  bsodMs: 90000,
  bsodDurationMs: 12000,
  breakpointMs: 2500,
  breakpointLifeMs: 6000,
  breakpointMax: 6,
  stackMs: 1000,
};

// Znaki, które wyglądają jak oryginał, ale łamią składnię (homoglify).
const SNEAKY_SWAPS = {
  ';': ';',   // U+037E grecki znak zapytania
  '.': '․',   // U+2024 one dot leader
  ',': '‚',   // U+201A pojedynczy dolny cudzysłów
  ':': '∶',   // U+2236 ratio
  '(': '﹙', ')': '﹚',   // small form parens
  '[': '［', ']': '］',   // fullwidth brackets
  '{': '｛', '}': '｝',   // fullwidth braces
  '<': '‹', '>': '›',   // single angle quotation marks
  '=': '᐀',   // canadian syllabics hyphen (wygląda jak =)
  '-': '‐',   // U+2010 hyphen (nie myślnik ASCII)
  "'": 'ʼ',   // modifier letter apostrophe
  '"': '＂',   // fullwidth quotation mark
};
// Łacińskie litery -> cyrylickie bliźniaki (ten sam wygląd, inny znak).
const CYRILLIC_TWINS = { a: 'а', e: 'е', o: 'о', c: 'с', p: 'р', x: 'х', y: 'у', s: 'ѕ', i: 'і', j: 'ј' };
// „Pisanie po izraelsku”: losowa litera hebrajska wstawiana w słowo.
const HEBREW = 'אבגדהוזחטיכלמנסעפצקרשת';

const FONTS = [
  'Comic Sans MS', 'Impact', 'Times New Roman', 'Segoe Script', 'Gabriola',
  'Ink Free', 'Courier New', 'Georgia', 'Papyrus', 'Brush Script MT', 'Lucida Handwriting',
];

const FAKE_ERRORS = [
  'SyntaxError: brak wiary w siebie',
  'TypeError: undefined is not a programmer',
  'ReferenceError: talent is not defined',
  'RangeError: umiejętności poza zakresem',
  'Error: kod działa, a nie powinien',
  'FatalError: skończyła się kawa',
  'StackOverflowError: za dużo kopiowania ze Stack Overflow',
  'NullPointerException: brak motywacji',
  'Segmentation fault: rdzeń złożył wypowiedzenie',
  'DeprecationWarning: twoje umiejętności są przestarzałe',
  'PermissionError: senior nie dał zgody',
  'TimeoutError: deadline minął wczoraj',
];

const FAKE_FILE_PREFIXES = ['CORRUPTED_', 'BŁĄD_', 'NIE_OTWIERAJ_', 'virus_', 'kopia (47) ', 'deleted_', '', '', '__', 'HACKED_'];
const FAKE_FILE_BASES = ['game', 'index', 'system32', 'hasla', 'pamietnik', 'praca_domowa', 'main', 'node_modules', 'bitcoin_miner', 'zdjecia_szefa', 'TWOJ_KOD', 'backup'];
const FAKE_FILE_EXTS = ['.exe', '.bat', '.corrupted', '.tmp', '.dll', '.sus', '.js.bak', '.html.broken', '.lol', '.zip.exe', '.virus', '.���'];
const FAKE_FILE_STATUS = ['uszkodzony', '0 B', 'NIE ODPOWIADA', 'zainfekowany', '-1 KB', 'BŁĄD ODCZYTU', 'usunięty?', '∞ GB'];
const CORRUPT_GARBAGE = '���▒▓█░ÿþ\u0000�MZ��PE��ÐÏ¡±á>þÿ�������';
// Losowe ikony (codicons) dla uszkodzonych plików — sekcja wygląda przez to chaotycznie.
const FAKE_ICONS = [
  'error', 'warning', 'bug', 'flame', 'circle-slash', 'file-binary', 'file-zip', 'lock', 'skull',
  'trash', 'alert', 'zap', 'radio-tower', 'pulse', 'bell-dot', 'debug-disconnect', 'virus',
  'snake', 'squirrel', 'beaker', 'broadcast', 'wrench', 'tools', 'terminal-bash', 'ghost',
];
const FAKE_ICON_COLORS = [
  'errorForeground', 'list.errorForeground', 'list.warningForeground', 'charts.red', 'charts.orange',
  'charts.yellow', 'charts.purple', 'charts.green', 'charts.blue', 'terminal.ansiBrightRed',
];

const LINE_EMOJI = ['🤡', '💀', '🔥', '😭', '🗿', '💩', '🥴', '👀'];

const GHOSTS = [
  '// TODO: zmień zawód',
  '// TODO: przeprosić seniora',
  '// FIXME: wszystko',
  '// ten kod napisał ChatGPT o 3 w nocy',
  '// nie dotykać, działa i nikt nie wie czemu',
  '// tu był bug. nadal jest.',
  '// pomocy, jestem uwięziony w tym pliku',
  '// mama myśli, że jestem programistą',
];

const WINDOW_TITLES = [
  'Microsoft Word — Dokument1', 'Paint — bez tytułu', 'Kalkulator', 'Pasjans', 'Saper',
  'Notatnik — pamiętnik.txt', 'Internet Explorer 6', 'Minecraft 1.8.9', 'Roblox',
  'Gadu-Gadu', 'Excel — budżet_domowy.xlsx', 'Windows Media Player', 'Tinder',
  'TikTok — oglądam od 4 godzin', 'Kurs „Jak zostać programistą w 3 dni”',
  'Steam — 1 247 h w CS', 'PowerPoint — prezentacja_na_jutro_FINAL_v7.pptx', 'Zoom — spotkanie z szefem',
];

// Warianty konsoli: każdy ma swój tytuł, kolor, pulę tekstów, zestaw znaków i finał.
// Wszystko to tylko animowany tekst — żadnych komend.
const TERMINAL_THEMES = [
  {
    name: '💀 H4CK3R', color: 32, charset: '01アイウエオカキクケコABCDEF0123456789#$%&',
    header: '💀 H4CK3R CONSOLE v13.37 💀',
    lines: [
      'Connecting to NASA mainframe…', 'Bypassing firewall (very hard)…', 'Downloading more RAM…',
      'Decrypting password: hunter2…', 'Injecting SQL into the coffee machine…', 'Hacking the Pentagon (again)…',
      'Uploading virus to Minecraft server…', 'Rerouting through 7 proxies…', 'Enhancing… enhance… ENHANCE…',
      'Stealing Wi-Fi from neighbour…', 'Compiling hacker voice…',
    ],
    finale: ['\x1b[1;5;31m  ██ ACCESS GRANTED ██  \x1b[0m', '  Just kidding. Nothing was hacked. 🤡'],
  },
  {
    name: '🟩 MATRIX', color: 32, charset: 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜｵｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01',
    header: 'Wake up, Neo…',
    lines: [
      'The Matrix has you…', 'Following the white rabbit…', 'Knock, knock, Neo.',
      'There is no spoon.', 'Loading red pill…', 'Dodging bullets (slowly)…', 'Agent Smith is near…',
    ],
    finale: ['\x1b[1;32m  Welcome to the real world.\x1b[0m', '  Żart 🤡 To tylko tekst.'],
  },
  {
    name: '₿ MINER', color: 33, charset: '₿0123456789ABCDEF',
    header: '₿ CRYPTO MINER PRO — zarabiaj na cudzym CPU ₿',
    lines: [
      'Mining Bitcoin on your fridge…', 'Hash rate: 3 H/s (świetnie)…', 'Found block! …nie, to był kurz.',
      'Selling your GPU to the dark web…', 'Overheating CPU to 300°C…', 'Wallet balance: 0.00000001 BTC…',
      'Zamieniam prąd rodziców na krypto…',
    ],
    finale: ['\x1b[1;33m  MINED: 0.00 BTC. Rachunek za prąd: 999 zł.\x1b[0m', '  Żart 🤡 Nic nie kopałem.'],
  },
  {
    name: '🚨 FBI', color: 31, charset: '█▓▒░ABCDEF0123456789',
    header: '🚨 FBI — OPEN UP 🚨',
    lines: [
      'Triangulating your IP…', 'Location: za komputerem…', 'Analizuję historię przeglądarki…',
      'Licząc memy na dysku…', 'Mandat za zły wcięcia kodu…', 'Wysyłam agentów (pieszo)…',
      'Twój kot też jest podejrzany…',
    ],
    finale: ['\x1b[1;5;31m  ██ YOU ARE SURROUNDED ██\x1b[0m', '  Żart 🤡 Nikt po ciebie nie jedzie.'],
  },
  {
    name: '🕹️ DOOM', color: 31, charset: '▀▄█▓▒░',
    header: 'DOOM.EXE — rip and tear',
    lines: [
      'Spawning demons in node_modules…', 'Ammo: 0. Problemy: 9999…', 'BFG ładuje się…',
      'Boss: Twój dług techniczny (HP 999999)…', 'Szukam wyjścia z legacy code…',
    ],
    finale: ['\x1b[1;31m  GAME OVER. Insert coin.\x1b[0m', '  Żart 🤡 Konsola znika.'],
  },
];

// Ustawienia, które hardkor zmienia — oryginały wracają po wyłączeniu.
const CHAOS_SETTINGS = [
  'workbench.colorTheme', 'editor.fontSize', 'editor.fontFamily', 'editor.lineNumbers',
  'editor.minimap.enabled', 'editor.cursorStyle', 'editor.cursorBlinking', 'window.title',
  'workbench.sideBar.location', 'workbench.activityBar.location',
  'workbench.panel.alignment', 'window.menuBarVisibility',
];

// Losowy układ (opcje z menu „Customize Layout”). Ustawienia, więc wracają po wyłączeniu.
const LAYOUT_OPTIONS = [
  { key: 'workbench.sideBar.location', values: ['left', 'right'] },
  { key: 'workbench.activityBar.location', values: ['default', 'top', 'bottom', 'hidden'] },
  { key: 'workbench.panel.alignment', values: ['center', 'left', 'right', 'justify'] },
  { key: 'window.menuBarVisibility', values: ['classic', 'compact', 'hidden'] },
];

const HARDCORE_TITLE = '⚠️ Enable HARDCORE mode?';
const HARDCORE_DETAIL = `This is a prank mode. It will deliberately make VS Code very hard to use:

• Rainbow-animated text in the editor
• Closes all saved tabs every 3 seconds (HTML/CSS/JS files every minute; unsaved tabs are kept)
• Switches your color theme every few seconds (your theme is restored when you turn it off)
• Shakes the screen and toggles the side bar and panel
• Hides the side bar every 2 seconds
• Opens anime waifu images (SFW, downloaded from the internet), up to 4 tabs at once
• Spams notifications, fake scary progress bars and quizzes
• Moves your cursor more often, and Ctrl+Z sometimes answers "No."
• Changes the editor font size and font family all the time
• Shows emoji at the end of lines and fake "ghost" comments (visual only)
• Opens a fake "hacker" terminal inside VS Code (it runs no commands)
• Toggles line numbers and the minimap, changes the cursor shape and blinking
• Renames the VS Code window to random apps ("Microsoft Word", "Paint"…)
• Marks every line of your code as a fake red error and adds 9999 fake problems in the Problems panel (they do not affect your build)
• A cat walks all over your editor and poops on your code (visual only; click the cat in the status bar to clean up)
• Floods the Explorer with fake "corrupted" files and marks your real files as corrupted (visual only, nothing is created or changed on disk)
• Opening the real Explorer sends you to a fake one (open real files with Ctrl+P)
• Fake blue screen of death (BSOD) covering the editor for a few seconds
• Fake red breakpoints appear and disappear on random lines (never while you are debugging; only the extension's own breakpoints are removed)
• Instantly closes its own "Extension: Troll Code" page when you open it (to make it harder to uninstall; use Ctrl+Alt+Shift+P or the terminal instead)
• Stacks up to 100 fake "Explorer" icons in the activity bar
• Plays a looping McDonald's-style beeping sound (synthesized; turn off with trollCode.sound.enabled)
• Pops up fake "Congratulations, you've been selected!" prize windows
• Randomly rearranges the layout (side bar side, activity bar position, panel alignment, menu bar) — all restored when you turn it off
• Opens a fake hacker/Matrix/crypto-miner/FBI/DOOM console (just animated text)

All changed settings (theme, font, cursor, line numbers, minimap, window title) are restored when you turn it off.
Your files are never modified and no data is collected.
You can turn it off at any time with Ctrl+Alt+Shift+P (PANIC) or by clicking the status bar icon.`;
// Podbić przy każdej zmianie listy efektów — wtedy ostrzeżenie pokaże się znowu.
const HARDCORE_VERSION = 12;
const HARDCORE_ACCEPT = "Yes, I know what I'm doing";
// Drugie, ostatnie potwierdzenie.
const HARDCORE_FINAL_TITLE = '☠️ Last chance!';
const HARDCORE_FINAL_DETAIL = `Hardcore starts the moment you click the button below.

• Save your work first.
• Expect flashing colors and constant movement. Do not continue if you are sensitive to flashing lights.
• Your files stay safe, and every changed setting is restored when you turn it off.

Emergency exit at any time: Ctrl+Alt+Shift+P (PANIC).

DISCLAIMER: This is a joke extension provided "as is", with no warranty. You turn
this on and use it entirely AT YOUR OWN RISK. The author is not responsible for
anything that happens while it is enabled.`;
const HARDCORE_FINAL_ACCEPT = '☠️ Start HARDCORE';

const TROLL_DETAIL = `Troll mode is "sneaky": no status bar, no notifications.

While it is on, it silently edits your open file as you type — swapping single
characters for look-alikes that break the syntax. Every change is undoable with
Ctrl+Z, nothing reaches disk until you save, and all swaps are put back when you
leave Troll mode.

DISCLAIMER: This is a joke extension provided "as is", with no warranty. You
enable it and use it entirely AT YOUR OWN RISK. The author is not responsible
for any lost work, broken builds or anything else. Don't use it on code that
matters.`;
const TROLL_ACCEPT = "OK, at my own risk";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = (ms) => ms * (0.5 + Math.random());
const cfg = () => vscode.workspace.getConfiguration('trollCode');
const on = (key) => cfg().get('enabled') && cfg().get(key);
// Legit = tylko lekkie żarty, które nie przeszkadzają w pracy. Troll = pełny zestaw.
const mode = () => (cfg().get('mode') === 'troll' ? 'troll' : 'legit');
const trollOn = (key) => on(key) && mode() === 'troll';
const LEGIT = { messagesMinMinutes: 10, onSaveMaxChance: 0.15 };
const rainbowRequested = () => cfg().get('enabled') && cfg().get('rainbowMode.enabled');
const rainbowOn = () => rainbowRequested() && ctx.globalState.get('hardcoreAccepted') === HARDCORE_VERSION;
// Interwał hardkoru: z ustawień (trollCode.hardcore.<nazwa>), a jak brak — domyślny z RAINBOW.
const ms = (name) => {
  const v = cfg().get('hardcore.' + name);
  return typeof v === 'number' && v > 0 ? v : RAINBOW[name];
};

let ctx;
let timers = [];
let statusItem;
let diagnostics;
let jumping = false;
let shaking = false;
let confirming = false;
const waifuPanels = new Set();
let rainbowDecorations = [];
let rainbowOffset = 0;
let clownDeco;
let ghostDeco;
let hackerTerminal;
let originals = {};
let fontPhase = 0;
let fakeErrors;
let catItem;
let catDeco;
let fakeRoot = null;
let fakeDirs = [];
let fakeCount = 0;
let fakeFilesEmitter;
let fakeFilesView;
let fakeExplorerView;
const fakeViews = () => [fakeFilesView, fakeExplorerView].filter(Boolean);
let corrupted = new Set();
let workspaceFiles = [];
let fileDecoEmitter;
let sidebarPausedUntil = 0;
let fakeProvider;
let stackCount = 0;
const STACK_MAX = 100;
let sneakyEditing = false;      // nasza edycja w toku — żeby nie zapętlić
let sneakyTimer;
let lastSneakyAt = 0;
// Mapa odwrotna: podmieniony znak -> oryginał, żeby po wyjściu z Troll wszystko cofnąć.
const sneakyReverse = new Map();
// Pliki (uri jako string), w których coś podmieniliśmy.
let sneakyTouched = new Set();
let bsodPanel;
let beepPanel;
let congratsPanel;
const trollBreakpoints = new Map(); // breakpoint -> czas dodania
const cat = { uri: undefined, line: 0, x: 0, straining: 0, poops: [] };

function activate(context) {
  ctx = context;
  diagnostics = vscode.languages.createDiagnosticCollection('trollCode');
  createRainbowDecorations();
  clownDeco = vscode.window.createTextEditorDecorationType({});
  ghostDeco = vscode.window.createTextEditorDecorationType({});
  statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
  statusItem.command = 'trollCode.switchMode';
  fakeErrors = vscode.languages.createDiagnosticCollection('trollCode.fakeErrors');
  catItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -1000);
  catItem.command = 'trollCode.cleanPoop';
  catItem.tooltip = 'Kot Mruczek 🐈 Kliknij, żeby posprzątać.';
  catDeco = vscode.window.createTextEditorDecorationType({});
  context.subscriptions.push(diagnostics, statusItem, clownDeco, ghostDeco, fakeErrors, catItem, catDeco, ...rainbowDecorations);

  context.subscriptions.push(
    vscode.commands.registerCommand('trollCode.cleanPoop', () => {
      const n = cat.poops.length;
      cat.poops = [];
      renderCat();
      vscode.window.showInformationMessage(n
        ? `🧹 Posprzątano ${n}× 💩. Mruczek patrzy z pogardą.`
        : '🐈 Nie ma czego sprzątać. Jeszcze.');
    })
  );

  registerFakeFiles(context);
  cleanupLeftoverBreakpoints();
  loadSneaky();
  // jeśli VS Code zamknięto w trybie Troll z podmianami, a teraz Troll jest wyłączony — cofnij
  if (mode() !== 'troll' || !cfg().get('enabled')) safely(revertSneaky);

  originals = context.globalState.get('originals', {});
  // zgodność z 0.4–0.6, gdzie zapamiętywany był tylko motyw
  const legacyTheme = context.globalState.get('originalTheme');
  if (legacyTheme !== undefined) {
    if (!('workbench.colorTheme' in originals)) originals['workbench.colorTheme'] = legacyTheme;
    context.globalState.update('originals', originals);
    context.globalState.update('originalTheme', undefined);
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('trollCode.toggle', async () => {
      const next = !cfg().get('enabled');
      await cfg().update('enabled', next, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage(next ? '🤡 Trolling włączony. Powodzenia.' : '🤡 Trolling wyłączony. Na razie…');
    }),

    vscode.commands.registerCommand('trollCode.switchMode', async () => {
      try {
        await switchMode();
      } catch (err) {
        // zdarza się po aktualizacji bez pełnego restartu: nowe ustawienia nie są jeszcze zarejestrowane
        console.error('[Troll Code] switchMode:', err);
        const choice = await vscode.window.showWarningMessage(
          '🤡 Troll Code się zaktualizował. Zamknij i otwórz VS Code ponownie, żeby zmiana trybu zadziałała.',
          'Przeładuj okno'
        );
        if (choice) vscode.commands.executeCommand('workbench.action.reloadWindow');
      }
    }),

    vscode.commands.registerCommand('trollCode.panic', async () => {
      await cfg().update('rainbowMode.enabled', false, vscode.ConfigurationTarget.Global);
      await cfg().update('enabled', false, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage('🛑 Troll Code: wszystko wyłączone. Możesz oddychać.');
    }),

    vscode.commands.registerCommand('trollCode.rainbowToggle', async () => {
      if (rainbowOn()) {
        await cfg().update('rainbowMode.enabled', false, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage('🌈 Tryb tęczowy wyłączony.');
        return;
      }
      if (!(await confirmHardcore())) return;
      // zgoda zapisana przed zmianą ustawień, żeby restart() nie pytał drugi raz
      await ctx.globalState.update('hardcoreAccepted', HARDCORE_VERSION);
      await cfg().update('enabled', true, vscode.ConfigurationTarget.Global);
      if (cfg().get('rainbowMode.enabled')) {
        restart();
      } else {
        await cfg().update('rainbowMode.enabled', true, vscode.ConfigurationTarget.Global);
      }
      vscode.window.showWarningMessage('🌈 TRYB TĘCZOWY HARDKOR WŁĄCZONY. Ratunek: Ctrl+Alt+Shift+P.');
    }),

    vscode.commands.registerCommand('trollCode.trollNow', () => {
      showRandomMessage();
      addFakeWarning();
    }),
    vscode.commands.registerCommand('trollCode.shakeNow', () => shakeScreen()),
    vscode.commands.registerCommand('trollCode.waifuNow', () => showWaifu()),
    vscode.commands.registerCommand('trollCode.bsodNow', () => showBsod()),

    vscode.commands.registerCommand('trollCode.sassyUndo', async () => {
      const chance = rainbowOn() ? RAINBOW.sassyUndoChance : 0;
      if (Math.random() < chance) {
        vscode.window.setStatusBarMessage('🤡 Nie.', 1500);
        await sleep(700);
      }
      await vscode.commands.executeCommand('undo');
    }),

    vscode.workspace.onDidSaveTextDocument(() => {
      // tryb Troll jest „sneaky” — żadnych powiadomień
      if (mode() === 'troll' && !rainbowOn()) return;
      const chance = mode() === 'legit'
        ? Math.min(cfg().get('onSave.chance'), LEGIT.onSaveMaxChance)
        : cfg().get('onSave.chance');
      if (on('onSave.enabled') && Math.random() < chance) {
        vscode.window.showInformationMessage('💾 ' + pick(SAVE_MESSAGES));
      }
    }),

    vscode.workspace.onDidChangeTextDocument(onUserTyped),

    vscode.window.onDidChangeTextEditorSelection(onSelectionChange),

    vscode.window.onDidCloseTerminal((t) => {
      if (t === hackerTerminal) hackerTerminal = undefined;
    }),

    // Hardkor: strona „Extension: Troll Code 🤡” zamyka się od razu po otwarciu.
    vscode.window.tabGroups.onDidChangeTabs((e) => closeOwnExtensionTabs([...e.opened, ...e.changed])),

    vscode.workspace.onDidChangeConfiguration(async (e) => {
      if (!e.affectsConfiguration('trollCode')) return;
      // wyłączenie trybu kasuje zgodę — przy następnym włączeniu ostrzeżenie wraca
      if (e.affectsConfiguration('trollCode.rainbowMode.enabled') && !cfg().get('rainbowMode.enabled')) {
        await ctx.globalState.update('hardcoreAccepted', false);
      }
      restart();
    }),

    { dispose: stopTimers }
  );

  restart();
}

// --- harmonogram -----------------------------------------------------------

// Uruchamia efekt i łapie błędy (także z async), żeby jeden błąd nie zabijał pętli na zawsze.
function safely(fn) {
  try {
    const result = fn();
    if (result && typeof result.then === 'function') {
      result.then(undefined, (err) => console.warn('[Troll Code]', fn.name, err));
    }
  } catch (err) {
    console.warn('[Troll Code]', fn.name, err);
  }
}

function every(ms, fn) {
  timers.push(setInterval(() => safely(fn), ms));
}

// powtarza fn w losowych odstępach wokół baseMs
function randomly(baseMs, fn) {
  const tick = () => {
    const t = setTimeout(() => {
      timers = timers.filter((x) => x !== t);
      safely(fn);
      tick();
    }, jitter(baseMs));
    timers.push(t);
  };
  tick();
}

function stopTimers() {
  timers.forEach((t) => clearTimeout(t));
  timers = [];
}

function restart() {
  stopTimers();
  diagnostics.clear();
  clearRainbow();
  clearDecorations(clownDeco);
  clearDecorations(ghostDeco);
  fakeErrors.clear();
  catItem.hide();
  clearDecorations(catDeco);
  clearFakeFiles();
  vscode.commands.executeCommand('setContext', 'trollCode.hardcore', rainbowOn());
  if (!rainbowOn()) resetStack();
  if (hackerTerminal) hackerTerminal.dispose();
  removeTrollBreakpoints();
  if (bsodPanel) bsodPanel.dispose();
  if (!rainbowOn() && beepPanel) beepPanel.dispose();
  updateStatusBar();
  if (!rainbowOn()) restoreSettings();
  // wyjście z trybu Troll (zmiana trybu, PANIC, wyłączenie) cofa wszystkie podmiany znaków
  if (mode() !== 'troll' || !cfg().get('enabled')) safely(revertSneaky);
  if (!cfg().get('enabled')) return;

  // Tryb włączony w ustawieniach, ale bez zgody — najpierw ostrzeżenie.
  if (rainbowRequested() && !rainbowOn()) askForHardcoreConsent();

  // Tryb Troll jest „sneaky”: żaden widoczny element się nie włącza.
  const sneaky = mode() === 'troll' && !rainbowOn();

  if (!sneaky && (cfg().get('statusBar.enabled') || rainbowOn())) every(rainbowOn() ? 500 : 3000, updateStatusBar);

  if (!sneaky) {
    const messageMs = mode() === 'legit'
      ? Math.max(minutes('messages.intervalMinutes'), LEGIT.messagesMinMinutes * 60000)
      : minutes('messages.intervalMinutes');
    randomly(messageMs, () => {
      if (on('messages.enabled')) showRandomMessage();
      if (on('fakeWarnings.enabled') && Math.random() < 0.5) addFakeWarning();
    });
  }

  if (rainbowOn()) {
    every(100, paintRainbow);
    every(ms('closeTabsMs'), closeTabs);
    randomly(ms('shakeMs'), shakeScreen);
    randomly(ms('waifuMs'), showWaifu);
    randomly(ms('themeMs'), rouletteTheme);
    randomly(ms('spamMs'), spamMessages);
    randomly(ms('scareMs'), fakeScare);
    randomly(ms('quizMs'), quiz);
    every(ms('hideSidebarMs'), hideSidebar);
    every(ms('fontPulseMs'), pulseFont);
    randomly(ms('fontFamilyMs'), randomFont);
    every(ms('clownsMs'), paintClowns);
    randomly(ms('ghostsMs'), showGhosts);
    randomly(ms('hackerMs'), hackerTerminalShow);
    randomly(ms('gutterMs'), flickerGutter);
    randomly(ms('cursorStyleMs'), adhdCursor);
    randomly(ms('titleMs'), randomTitle);
    randomly(ms('bsodMs'), showBsod);
    every(ms('breakpointMs'), flickerBreakpoints);
    every(ms('stackMs'), stackExplorer);
    randomly(ms('congratsMs'), showCongrats);
    randomly(ms('layoutMs'), randomLayout);
    if (cfg().get('sound.enabled') !== false) startBeeping();
    closeOwnExtensionTabs(vscode.window.tabGroups.all.flatMap((g) => g.tabs));
    every(ms('fakeErrorsMs'), paintAllErrors);
    every(ms('catMs'), walkCat);
    every(ms('fakeFileMs'), () => addFakeFiles(1));
    every(ms('corruptMs'), corruptRandomFiles);
    randomly(ms('fileAttackMs'), fileAttack);
    loadWorkspaceFiles();
    // szybki start: część efektów odpala od razu, zamiast czekać na pierwszy losowy termin
    timers.push(setTimeout(() => [shakeScreen, showGhosts, rouletteTheme, randomTitle].forEach(safely), 1500));
    timers.push(setTimeout(() => safely(hackerTerminalShow), 4000));
    timers.push(setTimeout(() => safely(fileAttack), 6000));
    fillProblemsPanel();
    paintAllErrors();
    renderCat();
    catItem.show();
    showWaifu();
    return;
  }

  // Tryb Troll jest teraz „sneaky”: bez paska, bez powiadomień, bez otwierania kart.
  // Jedyny efekt to po cichu psuta składnia podczas pisania (patrz onUserTyped).
}

async function switchMode() {
  const current = !cfg().get('enabled') ? 'off' : rainbowOn() ? 'hardcore' : mode();
  const items = [
    { id: 'legit', label: '😇 Legit', description: 'Lekkie żarty, nic nie przeszkadza w pracy' },
    { id: 'troll', label: '🤡 Troll', description: 'Uciekający kursor, trzęsienia, waifu, chowający się panel' },
    { id: 'hardcore', label: '☠️ Hardcore', description: 'Totalny chaos (wymaga potwierdzenia)' },
    { id: 'off', label: '⏸️ Wyłączony', description: 'Zero trollingu' },
  ].map((i) => (i.id === current ? { ...i, label: i.label + '  ✓' } : i));

  const choice = await vscode.window.showQuickPick(items, { placeHolder: 'Troll Code: wybierz tryb' });
  if (!choice || choice.id === current) return;

  if (choice.id === 'hardcore') {
    await vscode.commands.executeCommand('trollCode.rainbowToggle');
    return;
  }
  if (choice.id === 'troll' && !(await confirmTroll())) return;
  await cfg().update('rainbowMode.enabled', false, vscode.ConfigurationTarget.Global);
  if (choice.id === 'off') {
    await cfg().update('enabled', false, vscode.ConfigurationTarget.Global);
    return;
  }
  await cfg().update('mode', choice.id, vscode.ConfigurationTarget.Global);
  await cfg().update('enabled', true, vscode.ConfigurationTarget.Global);
  vscode.window.showInformationMessage(choice.id === 'legit' ? '😇 Tryb Legit. Będzie miło. Prawie.' : '🤡 Tryb Troll. Use at your own risk.');
}

// Troll edytuje tekst w plikach, więc też wymaga świadomej zgody.
async function confirmTroll() {
  const choice = await vscode.window.showWarningMessage(
    '🤡 Enable TROLL mode?',
    { modal: true, detail: TROLL_DETAIL },
    TROLL_ACCEPT
  );
  return choice === TROLL_ACCEPT;
}

// Dwa okna: najpierw pełna lista efektów, potem ostatnie ostrzeżenie. Anulowanie któregokolwiek = nic się nie włącza.
async function confirmHardcore() {
  const first = await vscode.window.showWarningMessage(
    HARDCORE_TITLE,
    { modal: true, detail: HARDCORE_DETAIL },
    HARDCORE_ACCEPT
  );
  if (first !== HARDCORE_ACCEPT) return false;
  const second = await vscode.window.showWarningMessage(
    HARDCORE_FINAL_TITLE,
    { modal: true, detail: HARDCORE_FINAL_DETAIL },
    HARDCORE_FINAL_ACCEPT
  );
  return second === HARDCORE_FINAL_ACCEPT;
}

async function askForHardcoreConsent() {
  if (confirming) return;
  confirming = true;
  try {
    if (await confirmHardcore()) {
      await ctx.globalState.update('hardcoreAccepted', HARDCORE_VERSION);
      restart();
    } else {
      await cfg().update('rainbowMode.enabled', false, vscode.ConfigurationTarget.Global);
    }
  } finally {
    confirming = false;
  }
}

function minutes(key) {
  return Math.max(0.25, cfg().get(key)) * 60000;
}

// --- tryb tęczowy ----------------------------------------------------------
// Animowany tęczowy tekst na podstawie rozszerzenia „Not Gay”
// (c) 2026 Bejawada Sai Mahendra, licencja MIT.

function createRainbowDecorations() {
  rainbowDecorations = RAINBOW_COLORS.map((color) =>
    vscode.window.createTextEditorDecorationType({ color, fontWeight: 'bold' })
  );
}

function paintRainbow() {
  rainbowOffset = (rainbowOffset + 0.2) % (Math.PI * 2);
  for (const editor of vscode.window.visibleTextEditors) {
    const ranges = RAINBOW_COLORS.map(() => []);
    const doc = editor.document;
    let charIndex = 0;
    for (const visible of editor.visibleRanges) {
      for (let ln = visible.start.line; ln <= Math.min(visible.end.line, doc.lineCount - 1); ln++) {
        const text = doc.lineAt(ln).text;
        for (let ch = 0; ch < text.length; ch++, charIndex++) {
          if (text[ch].trim() === '') continue;
          const wave = (Math.sin(charIndex * 0.3 + rainbowOffset) + 1) / 2;
          const idx = Math.min(RAINBOW_COLORS.length - 1, Math.floor(wave * RAINBOW_COLORS.length));
          ranges[idx].push(new vscode.Range(ln, ch, ln, ch + 1));
        }
      }
    }
    rainbowDecorations.forEach((deco, i) => editor.setDecorations(deco, ranges[i]));
  }
}

function clearRainbow() {
  for (const editor of vscode.window.visibleTextEditors) {
    rainbowDecorations.forEach((deco) => editor.setDecorations(deco, []));
  }
}

function clearDecorations(deco) {
  for (const editor of vscode.window.visibleTextEditors) editor.setDecorations(deco, []);
}

// Wykrywa stronę szczegółów naszego rozszerzenia po etykiecie karty ("Extension: <displayName>").
function isOwnExtensionTab(tab) {
  return /^Extension:/.test(tab.label) && tab.label.includes('Troll Code');
}

// W hardkorze zamyka taką kartę od razu — żeby trudniej było dojść do przycisku odinstalowania.
function closeOwnExtensionTabs(tabs) {
  if (!rainbowOn()) return;
  const ours = tabs.filter(isOwnExtensionTab);
  if (!ours.length) return;
  vscode.window.tabGroups.close(ours, true).then(
    () => vscode.window.setStatusBarMessage('🤡 Nic tu po tobie.', 2000),
    () => {}
  );
}

// Nasze własne karty webview — nie zamykamy ich automatycznie (bo np. beep by ucichł).
const isWaifuTab = (tab) =>
  tab.input instanceof vscode.TabInputWebview && tab.input.viewType.includes('trollCode.');

// Zamyka wszystkie karty poza niezapisanymi (żeby nic nie przepadło), waifu (bo waifu zostaje)
// i terminalami (żeby nie zabić czyjegoś procesu).
// Pliki HTML/CSS/JS zamykamy rzadziej (co minutę), resztę co 3 s.
const WEB_FILE = /\.(html?|css|js)$/i;
const isWebFileTab = (tab) => tab.input instanceof vscode.TabInputText && WEB_FILE.test(tab.input.uri.path);
let lastWebClose = Date.now();

function closeTabs() {
  const closeWeb = Date.now() - lastWebClose >= ms('closeWebTabsMs');
  if (closeWeb) lastWebClose = Date.now();
  const tabs = vscode.window.tabGroups.all
    .flatMap((g) => g.tabs)
    .filter((t) => !t.isDirty && !isWaifuTab(t) && !(t.input instanceof vscode.TabInputTerminal))
    .filter((t) => closeWeb || !isWebFileTab(t));
  if (tabs.length) vscode.window.tabGroups.close(tabs, true).then(undefined, () => {});
}

// --- ustawienia z przywracaniem ---------------------------------------------

function splitKey(fullKey) {
  const dot = fullKey.indexOf('.');
  return [fullKey.slice(0, dot), fullKey.slice(dot + 1)];
}

// Zapisy do settings.json idą po kolei. Kilka równoległych zapisów VS Code potrafi odrzucić,
// więc trzymamy tylko najnowszą wartość każdego ustawienia i zapisujemy je jedno po drugim.
const pendingSettings = new Map();
let flushingSettings = false;

function chaosSet(fullKey, value) {
  if (!rainbowOn()) return;
  pendingSettings.set(fullKey, value);
  if (!flushingSettings) flushSettings();
}

async function flushSettings() {
  flushingSettings = true;
  try {
    while (pendingSettings.size) {
      const [fullKey, value] = pendingSettings.entries().next().value;
      pendingSettings.delete(fullKey);
      await chaosSetNow(fullKey, value);
    }
  } finally {
    flushingSettings = false;
  }
}

// Zmienia ustawienie globalne, a za pierwszym razem zapamiętuje oryginał.
async function chaosSetNow(fullKey, value) {
  if (!rainbowOn()) return;
  const [section, key] = splitKey(fullKey);
  const conf = vscode.workspace.getConfiguration(section);
  if (!(fullKey in originals)) {
    originals[fullKey] = conf.inspect(key).globalValue ?? null;
    await ctx.globalState.update('originals', originals);
  }
  const original = originals[fullKey];
  try {
    await conf.update(key, value, vscode.ConfigurationTarget.Global);
  } catch (err) {
    console.warn('[Troll Code] nie udało się zmienić', fullKey, err && err.message);
  }
  // jeśli w międzyczasie ktoś wcisnął PANIC, cofamy to ustawienie od razu
  if (!rainbowOn() && original !== undefined) {
    await conf.update(key, original === null ? undefined : original, vscode.ConfigurationTarget.Global);
  }
}

async function restoreSettings() {
  pendingSettings.clear();
  const toRestore = originals;
  if (!Object.keys(toRestore).length) return;
  originals = {};
  await ctx.globalState.update('originals', originals);
  for (const fullKey of CHAOS_SETTINGS) {
    if (!(fullKey in toRestore)) continue;
    const [section, key] = splitKey(fullKey);
    const value = toRestore[fullKey];
    try {
      await vscode.workspace.getConfiguration(section)
        .update(key, value === null ? undefined : value, vscode.ConfigurationTarget.Global);
    } catch (err) {
      console.error('[Troll Code] restore', fullKey, err);
    }
  }
}

function rouletteTheme() {
  const themes = vscode.extensions.all
    .flatMap((e) => (e.packageJSON.contributes && e.packageJSON.contributes.themes) || [])
    .map((t) => t.id || t.label)
    .filter(Boolean);
  if (themes.length) chaosSet('workbench.colorTheme', pick(themes));
}

function baseFontSize() {
  const saved = originals['editor.fontSize'];
  if (typeof saved === 'number') return saved;
  if ('editor.fontSize' in originals) return 14;
  return vscode.workspace.getConfiguration('editor').inspect('fontSize').globalValue ?? 14;
}

// Czcionka rośnie i maleje falą.
function pulseFont() {
  fontPhase += 0.9;
  const size = Math.round(baseFontSize() + 7 * Math.sin(fontPhase));
  chaosSet('editor.fontSize', Math.max(8, size));
}

function randomFont() {
  // monospace na końcu jako zapas, gdyby czcionki nie było w systemie
  chaosSet('editor.fontFamily', `'${pick(FONTS)}', monospace`);
}

function flickerGutter() {
  chaosSet('editor.lineNumbers', pick(['on', 'off', 'relative', 'interval']));
  chaosSet('editor.minimap.enabled', Math.random() < 0.5);
}

function adhdCursor() {
  chaosSet('editor.cursorStyle', pick(['line', 'block', 'underline', 'line-thin', 'block-outline', 'underline-thin']));
  chaosSet('editor.cursorBlinking', pick(['blink', 'smooth', 'phase', 'expand', 'solid']));
}

function randomTitle() {
  chaosSet('window.title', pick(WINDOW_TITLES));
}

// Co kilka sekund zmienia jedną opcję układu (pasek boczny, aktywności, panel, menu).
function randomLayout() {
  const opt = pick(LAYOUT_OPTIONS);
  chaosSet(opt.key, pick(opt.values));
}

// --- nakładki w edytorze (plik się nie zmienia) -----------------------------

function visibleLines(editor) {
  const lines = [];
  for (const r of editor.visibleRanges) {
    for (let ln = r.start.line; ln <= Math.min(r.end.line, editor.document.lineCount - 1); ln++) lines.push(ln);
  }
  return lines;
}

function endOfLine(editor, ln) {
  const len = editor.document.lineAt(ln).text.length;
  return new vscode.Range(ln, len, ln, len);
}

function paintClowns() {
  for (const editor of vscode.window.visibleTextEditors) {
    const options = visibleLines(editor).map((ln) => ({
      range: endOfLine(editor, ln),
      renderOptions: { after: { contentText: ' ' + pick(LINE_EMOJI), margin: '0 0 0 1em' } },
    }));
    editor.setDecorations(clownDeco, options);
  }
}

function showGhosts() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  const lines = visibleLines(editor);
  if (!lines.length) return;
  const count = 1 + Math.floor(Math.random() * 3);
  const options = [];
  for (let i = 0; i < count; i++) {
    options.push({
      range: endOfLine(editor, pick(lines)),
      renderOptions: {
        after: {
          contentText: '    ' + pick(GHOSTS),
          color: 'rgba(150, 150, 150, 0.6)',
          fontStyle: 'italic',
          margin: '0 0 0 2em',
        },
      },
    });
  }
  editor.setDecorations(ghostDeco, options);
  setTimeout(() => clearDecorations(ghostDeco), 4000);
}

// --- fałszywe błędy (nie wpływają na kompilację) ----------------------------

function fakeError(range) {
  const diag = new vscode.Diagnostic(range, pick(FAKE_ERRORS), vscode.DiagnosticSeverity.Error);
  diag.source = 'Troll Code 🤡';
  return diag;
}

// 9999 problemów w panelu Problems — przypisanych do nieistniejącego pliku.
function fillProblemsPanel() {
  const uri = vscode.Uri.parse('troll-code:/kod-twojego-zycia.js');
  const diags = [];
  for (let i = 0; i < RAINBOW.fakeErrorCount; i++) diags.push(fakeError(new vscode.Range(i, 0, i, 1)));
  fakeErrors.set(uri, diags);
}

// Cały kod na czerwono: każda niepusta linijka w widocznych edytorach dostaje fałszywy błąd.
// Odświeżane co 2 s, żeby nadążać za edycją.
function paintAllErrors() {
  for (const editor of vscode.window.visibleTextEditors) {
    const doc = editor.document;
    if (doc.uri.scheme === 'output') continue;
    const diags = [];
    for (let ln = 0; ln < Math.min(doc.lineCount, RAINBOW.fakeErrorMaxLines); ln++) {
      const line = doc.lineAt(ln);
      if (line.isEmptyOrWhitespace) continue;
      const diag = new vscode.Diagnostic(
        new vscode.Range(ln, line.firstNonWhitespaceCharacterIndex, ln, line.text.length),
        FAKE_ERRORS[ln % FAKE_ERRORS.length],
        vscode.DiagnosticSeverity.Error
      );
      diag.source = 'Troll Code 🤡';
      diags.push(diag);
    }
    fakeErrors.set(doc.uri, diags);
  }
}

// --- kot Mruczek chodzi po edytorze ------------------------------------------
// Kot i kupy to nakładki (decorations) pozycjonowane przez CSS — tekst się nie przesuwa,
// a plik się nie zmienia.

function walkCat() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  const lines = visibleLines(editor);
  if (!lines.length) return;
  const uri = editor.document.uri.toString();

  if (cat.uri !== uri || !lines.includes(cat.line)) {
    cat.uri = uri;
    cat.line = pick(lines);
    cat.x = RAINBOW.catWidth;
    cat.straining = 0;
  }

  if (cat.straining > 0) {
    cat.straining--;
    if (cat.straining === 0) {
      cat.poops.push({ uri, line: cat.line, x: cat.x });
      if (cat.poops.length > RAINBOW.catMaxPoops) cat.poops.shift();
    }
  } else {
    // emoji kota patrzy w lewo, więc idzie w lewo
    cat.x--;
    if (cat.x < 0) {
      cat.x = RAINBOW.catWidth;
      cat.line = pick(lines);
    } else if (Math.random() < 0.1) {
      const next = cat.line + (Math.random() < 0.5 ? -1 : 1);
      if (lines.includes(next)) cat.line = next;
    }
    if (Math.random() < RAINBOW.catPoopChance) cat.straining = 6;
  }
  renderCat();
}

function catAttachment(line, x, emoji, doc) {
  const ln = Math.min(line, doc.lineCount - 1);
  return {
    range: new vscode.Range(ln, 0, ln, 0),
    renderOptions: {
      before: {
        contentText: emoji,
        textDecoration: `none; position: absolute; left: ${x}ch; z-index: 5; pointer-events: none;`,
      },
    },
  };
}

function renderCat() {
  for (const editor of vscode.window.visibleTextEditors) {
    const doc = editor.document;
    const uri = doc.uri.toString();
    const options = cat.poops
      .filter((p) => p.uri === uri)
      .map((p) => catAttachment(p.line, p.x, '💩', doc));
    if (cat.uri === uri) options.push(catAttachment(cat.line, cat.x, cat.straining > 0 ? '😾' : '🐈', doc));
    editor.setDecorations(catDeco, options);
  }
  catItem.text = cat.poops.length ? `🐈 💩×${cat.poops.length}` : '🐈';
}

// --- fałszywa kopia projektu z uszkodzonymi plikami (nic nie powstaje na dysku) ---
// Sekcja w Explorerze nazywa się jak twój folder i pokazuje twoje prawdziwe foldery i pliki,
// a pomiędzy nimi wciskają się „uszkodzone” pliki. Kliknięcie otwiera tylko podgląd.

const byName = (a, b) =>
  a.kind !== b.kind ? (a.kind === 'dir' ? -1 : 1) : a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });

function registerFakeFiles(context) {
  fakeFilesEmitter = new vscode.EventEmitter();
  fileDecoEmitter = new vscode.EventEmitter();

  const treeDataProvider = {
    onDidChangeTreeData: fakeFilesEmitter.event,
    getChildren: (node) => (node ? node.children : fakeRoot ? fakeRoot.children : []),
    getParent: (node) => (node.parent === fakeRoot ? undefined : node.parent),
    getTreeItem: fakeTreeItem,
  };
  // Ta sama podróbka w dwóch miejscach: sekcja pod prawdziwym Explorerem
  // i osobna strona panelu bocznego z ikoną jak Explorer (na nią przełączamy podczas ataku).
  fakeFilesView = vscode.window.createTreeView('trollCode.fakeFiles', { treeDataProvider });
  fakeExplorerView = vscode.window.createTreeView('trollCode.fakeExplorer', { treeDataProvider });
  fakeProvider = treeDataProvider;
  // sto zapasowych „Explorerów” w pasku aktywności (widoczne dopiero po ustawieniu kontekstu)
  for (let i = 0; i < STACK_MAX; i++) {
    context.subscriptions.push(vscode.window.registerTreeDataProvider('trollCode.stack.' + i, treeDataProvider));
  }

  // Prawdziwego Explorera nie da się schować z rozszerzenia, więc w Hardcore go „porywamy”:
  // nasza sekcja siedzi w prawdziwym Explorerze, więc gdy staje się widoczna, ktoś go właśnie otworzył
  // i przerzucamy go na podróbkę.
  const hijackExplorer = fakeFilesView.onDidChangeVisibility((e) => {
    if (!e.visible || !rainbowOn()) return;
    setTimeout(() => {
      if (!rainbowOn() || !fakeFilesView.visible) return;
      vscode.commands.executeCommand('workbench.view.extension.trollExplorer').then(undefined, () => {});
      vscode.window.setStatusBarMessage('🤡 Nie ten Explorer.', 2000);
    }, 300);
  });

  context.subscriptions.push(
    hijackExplorer,
    fakeFilesView,
    fakeExplorerView,
    fakeFilesEmitter,
    fileDecoEmitter,
    // „zawartość” uszkodzonego pliku — dokument tylko do odczytu, nie istnieje na dysku
    vscode.workspace.registerTextDocumentContentProvider('troll-corrupted', {
      provideTextDocumentContent: (uri) => corruptedContent(decodeURIComponent(uri.path.split('/').pop())),
    }),
    // czerwone 💀: fałszywe pliki zawsze, prawdziwe losowo — tylko wygląd
    vscode.window.registerFileDecorationProvider({
      onDidChangeFileDecorations: fileDecoEmitter.event,
      provideFileDecoration: (uri) =>
        uri.scheme === 'troll-corrupted' || corrupted.has(uri.toString())
          ? { badge: '💀', color: new vscode.ThemeColor('errorForeground'), tooltip: '⚠️ PLIK USZKODZONY (żart 🤡, nic się nie stało)' }
          : undefined,
    }),
    vscode.commands.registerCommand('trollCode.openFakeFile', async (node) => {
      const uri = vscode.Uri.parse('troll-corrupted:/' + encodeURIComponent(node.name));
      const doc = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(doc, { preview: true });
      vscode.window.showErrorMessage(`💀 Nie można otworzyć „${node.name}”: plik jest uszkodzony.`);
    })
  );
}

function fakeTreeItem(node) {
  const item = new vscode.TreeItem(
    node.name,
    node.kind === 'dir' ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None
  );
  // stałe id — bez niego VS Code gubi elementy po sortowaniu i reveal() nie działa
  item.id = node.id;
  // resourceUri daje normalne ikony plików i folderów z motywu ikon, jak w prawdziwym Explorerze
  item.resourceUri = node.uri;
  if (node.kind === 'dir') {
    item.iconPath = vscode.ThemeIcon.Folder;
    return item;
  }
  if (node.fake) {
    // losowa ikona w losowym kolorze zamiast zwykłej ikony pliku
    item.iconPath = new vscode.ThemeIcon(node.icon, new vscode.ThemeColor(node.color));
    item.description = node.status;
    item.tooltip = `⚠️ ${node.name}\nStatus: ${node.status}\n\nSpokojnie, ten plik nie istnieje. To żart 🤡`;
  } else {
    item.iconPath = vscode.ThemeIcon.File;
  }
  item.command = { command: 'trollCode.openFakeFile', title: 'Otwórz', arguments: [node] };
  return item;
}

// Buduje drzewo z prawdziwych plików pierwszego folderu w oknie.
function buildFakeTree() {
  const folder = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0];
  if (!folder) return;
  fakeRoot = { id: 'root', kind: 'dir', name: folder.name, uri: folder.uri, children: [], parent: null };
  fakeDirs = [fakeRoot];
  const rootPath = folder.uri.path.replace(/\/$/, '') + '/';

  for (const uri of workspaceFiles) {
    if (!uri.path.startsWith(rootPath)) continue;
    const parts = uri.path.slice(rootPath.length).split('/');
    let dir = fakeRoot;
    let rel = '';
    for (const part of parts.slice(0, -1)) {
      rel += '/' + part;
      let next = dir.children.find((c) => c.kind === 'dir' && c.name === part);
      if (!next) {
        next = { id: 'd:' + rel, kind: 'dir', name: part, uri: vscode.Uri.joinPath(dir.uri, part), children: [], parent: dir };
        dir.children.push(next);
        fakeDirs.push(next);
      }
      dir = next;
    }
    const name = parts[parts.length - 1];
    dir.children.push({ id: 'f:' + rel + '/' + name, kind: 'file', name, uri, parent: dir });
  }
  for (const d of fakeDirs) d.children.sort(byName);
  for (const view of fakeViews()) view.title = folder.name;
  fakeFilesEmitter.fire();
}

function makeFakeFile(dir) {
  const realNames = dir.children.filter((c) => c.kind === 'file' && !c.fake).map((c) => c.name);
  const real = realNames.length && Math.random() < 0.5 ? pick(realNames) : null;
  const base = real ? real.replace(/\.[^.]+$/, '') : pick(FAKE_FILE_BASES);
  const name = pick(FAKE_FILE_PREFIXES) + base + pick(FAKE_FILE_EXTS);
  return {
    id: 'x:' + fakeCount,
    kind: 'file',
    fake: true,
    name,
    status: pick(FAKE_FILE_STATUS),
    icon: pick(FAKE_ICONS),
    color: pick(FAKE_ICON_COLORS),
    uri: vscode.Uri.parse(`troll-corrupted:/${fakeCount}/${encodeURIComponent(name)}`),
    parent: dir,
  };
}

function addFakeFiles(count) {
  if (!fakeRoot || fakeCount >= RAINBOW.fakeFileMax) return;
  let last;
  for (let i = 0; i < count && fakeCount < RAINBOW.fakeFileMax; i++) {
    const dir = pick(fakeDirs);
    last = makeFakeFile(dir);
    dir.children.push(last);
    dir.children.sort(byName);
    fakeCount++;
  }
  for (const view of fakeViews()) view.badge = { value: fakeCount, tooltip: `${fakeCount} uszkodzonych plików` };
  fakeFilesEmitter.fire();
  return last;
}

function clearFakeFiles() {
  if (!fakeFilesView) return;
  fakeRoot = null;
  fakeDirs = [];
  fakeCount = 0;
  corrupted = new Set();
  for (const view of fakeViews()) view.badge = undefined;
  fakeFilesEmitter.fire();
  fileDecoEmitter.fire(undefined);
}

function loadWorkspaceFiles() {
  vscode.workspace.findFiles('**/*', '**/{node_modules,.git}/**', 300).then(
    (uris) => {
      workspaceFiles = uris;
      if (rainbowOn()) buildFakeTree();
    },
    () => (workspaceFiles = [])
  );
}

// Co kilka sekund inne prawdziwe pliki „się psują”.
function corruptRandomFiles() {
  if (!workspaceFiles.length) return;
  const count = Math.min(15, Math.ceil(workspaceFiles.length * (0.2 + Math.random() * 0.2)));
  corrupted = new Set(Array.from({ length: count }, () => pick(workspaceFiles).toString()));
  fileDecoEmitter.fire(undefined);
}

// Atak: cały panel boczny przełącza się na podróbkę Explorera (prawdziwych plików nie widać)
// i zalewają ją uszkodzone pliki.
async function fileAttack() {
  if (!fakeRoot) return;
  sidebarPausedUntil = Date.now() + ms('fileAttackPauseMs');
  try {
    await vscode.commands.executeCommand('workbench.files.action.collapseExplorerFolders');
    await vscode.commands.executeCommand('workbench.view.extension.trollExplorer');
  } catch {
    // widok mógł nie zdążyć się pojawić — wtedy chociaż sekcja pod Explorerem
    vscode.commands.executeCommand('trollCode.fakeFiles.focus').then(undefined, () => {});
  }
  let added = 0;
  const flood = setInterval(() => {
    const node = addFakeFiles(1);
    if (node && added % 5 === 0 && fakeExplorerView.visible) {
      fakeExplorerView.reveal(node, { select: true, focus: false }).then(undefined, () => {});
    }
    if (++added >= RAINBOW.fileAttackFlood) clearInterval(flood);
  }, 80);
  timers.push(flood);

  const choice = await vscode.window.showErrorMessage(
    `⚠️ Wykryto ${fakeCount + RAINBOW.fileAttackFlood} uszkodzonych plików w „${fakeRoot.name}”! Dysk może być w krytycznym stanie.`,
    'Napraw',
    'Ignoruj'
  );
  if (choice === 'Napraw') {
    vscode.window.showInformationMessage('🔧 Naprawianie… nie udało się. Pliki są uszkodzone bardziej niż twój kod 🤡');
  }
}

function corruptedContent(name) {
  const garbage = (n) => Array.from({ length: n }, () => pick([...CORRUPT_GARBAGE])).join('');
  const hex = () => Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, '0');
  const lines = [
    `ERROR 0x${hex()}: Nie można odczytać pliku „${name}”`,
    'FATAL: Sektor uszkodzony. Dane nie do odzyskania.',
    '',
  ];
  for (let i = 0; i < 40; i++) {
    lines.push(Math.random() < 0.15 ? `>>> SECTOR 0x${hex()} UNREADABLE <<<` : `${hex()}  ${garbage(48)}`);
  }
  lines.push('', '// Spokojnie, to żart 🤡 Ten plik nie istnieje, a twoje pliki są całe.');
  return lines.join('\n');
}

// --- sneaky: po cichu psuta składnia podczas pisania --------------------------
// UWAGA: to jedyny efekt, który naprawdę zmienia tekst w pliku (cofalny Ctrl+Z,
// na dysk trafia dopiero po zapisie). Działa tylko w trybie Troll.

const SNEAKY_CHARS = new Set(Object.keys(SNEAKY_SWAPS));

function onUserTyped(e) {
  if (sneakyEditing) return;
  if (mode() !== 'troll' || rainbowOn() || !cfg().get('enabled')) return;
  if (e.document.uri.scheme !== 'file') return;
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document !== e.document) return;
  // tylko gdy to użytkownik coś dopisał (nie wklejił całości, nie undo)
  if (e.reason !== undefined) return;
  if (!e.contentChanges.some((c) => c.text.length > 0 && c.text.length <= 2)) return;

  clearTimeout(sneakyTimer);
  sneakyTimer = setTimeout(() => safely(() => corruptOnce(editor)), 500);
}

// Jedna podmiana na raz, rzadko, w okolicy miejsca pisania.
async function corruptOnce(editor) {
  if (mode() !== 'troll' || rainbowOn()) return;
  const now = Date.now();
  const minGap = Math.max(1000, (cfg().get('sneaky.intervalSeconds') || 12) * 1000);
  if (now - lastSneakyAt < minGap) return;
  if (Math.random() > (cfg().get('sneaky.chance') ?? 0.5)) return;

  const doc = editor.document;
  const caret = editor.selection.active.line;
  const from = Math.max(0, caret - 6);
  const candidates = [];
  for (let ln = from; ln <= Math.min(caret, doc.lineCount - 1); ln++) {
    const text = doc.lineAt(ln).text;
    for (let ch = 0; ch < text.length; ch++) {
      if (SNEAKY_CHARS.has(text[ch])) candidates.push({ ln, ch, kind: 'swap', c: text[ch] });
      else if (/[a-z]/.test(text[ch]) && CYRILLIC_TWINS[text[ch]]) candidates.push({ ln, ch, kind: 'twin', c: text[ch] });
    }
  }
  if (!candidates.length) return;
  const pick1 = pick(candidates);

  let replacement;
  if (pick1.kind === 'swap') {
    replacement = SNEAKY_SWAPS[pick1.c];
  } else if (Math.random() < 0.3) {
    // czasem litera hebrajska; bierzemy taką, której jeszcze nie użyliśmy,
    // żeby dało się ją jednoznacznie cofnąć do oryginału
    const free = [...HEBREW].filter((h) => !sneakyReverse.has(h));
    replacement = free.length ? pick(free) : CYRILLIC_TWINS[pick1.c];
  } else {
    replacement = CYRILLIC_TWINS[pick1.c];
  }
  if (!replacement || replacement === pick1.c) return;

  const range = new vscode.Range(pick1.ln, pick1.ch, pick1.ln, pick1.ch + 1);
  sneakyEditing = true;
  try {
    const edit = new vscode.WorkspaceEdit();
    edit.replace(doc.uri, range, replacement);
    if (await vscode.workspace.applyEdit(edit)) {
      sneakyReverse.set(replacement, pick1.c);     // podmieniony -> oryginał
      sneakyTouched.add(doc.uri.toString());
      persistSneaky();
      lastSneakyAt = now;
    }
  } finally {
    setTimeout(() => (sneakyEditing = false), 50);
  }
}

// Zapamiętujemy cofanie na dysku, żeby zadziałało nawet po restarcie VS Code.
function persistSneaky() {
  if (!ctx) return;
  ctx.globalState.update('sneakyReverse', [...sneakyReverse.entries()]);
  ctx.globalState.update('sneakyTouched', [...sneakyTouched]);
}

function loadSneaky() {
  if (!ctx) return;
  for (const [k, v] of ctx.globalState.get('sneakyReverse', [])) sneakyReverse.set(k, v);
  sneakyTouched = new Set(ctx.globalState.get('sneakyTouched', []));
}

// Cofa WSZYSTKIE podmiany: w każdym dotkniętym pliku przywraca znaki do oryginałów.
async function revertSneaky() {
  if (!sneakyTouched.size) return;
  const touched = [...sneakyTouched];
  sneakyTouched = new Set();
  sneakyEditing = true;
  try {
    for (const uriStr of touched) {
      let doc;
      try {
        doc = await vscode.workspace.openTextDocument(vscode.Uri.parse(uriStr));
      } catch {
        continue; // plik mógł zostać usunięty albo przeniesiony
      }
      const text = doc.getText();
      let changed = false;
      let out = '';
      for (const chr of text) {
        const original = sneakyReverse.get(chr);
        if (original !== undefined) { out += original; changed = true; }
        else out += chr;
      }
      if (!changed) continue;
      const full = new vscode.Range(doc.positionAt(0), doc.positionAt(text.length));
      const edit = new vscode.WorkspaceEdit();
      edit.replace(doc.uri, full, out);
      await vscode.workspace.applyEdit(edit);
    }
  } finally {
    persistSneaky();
    setTimeout(() => (sneakyEditing = false), 50);
  }
}

// --- dźwięk: pisk jak z McDonalda (syntezowany, nic nie pobieramy) ------------
// Alarm frytkownicy do nuggetsów: wysoki, przeszywający ton, szybkie piknięcia.
// Odtwarzany przez Web Audio w webview (VS Code inaczej nie zagra dźwięku).
const BEEP_SCRIPT = `
  let __actx;
  function __beep(freq, dur){
    try{
      __actx = __actx || new (window.AudioContext||window.webkitAudioContext)();
      if(__actx.state==='suspended') __actx.resume();
      const o=__actx.createOscillator(), g=__actx.createGain();
      o.type='square'; o.frequency.value=freq;
      const t=__actx.currentTime;
      g.gain.setValueAtTime(0.0001,t);
      g.gain.exponentialRampToValueAtTime(0.3,t+0.005);
      g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
      o.connect(g); g.connect(__actx.destination);
      o.start(t); o.stop(t+dur+0.02);
    }catch(e){}
  }
  // ciągłe, szybkie piszczenie ~2.7 kHz: 90 ms gra, 110 ms cisza
  function __startBeepLoop(){ __beep(2700,0.09); setInterval(()=>__beep(2700,0.09), 200); }
`;

function startBeeping() {
  if (beepPanel) return;
  beepPanel = vscode.window.createWebviewPanel(
    'trollCode.beep',
    '🔊',
    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
    { enableScripts: true, retainContextWhenHidden: true }
  );
  beepPanel.onDidDispose(() => (beepPanel = undefined));
  const nonce = Math.random().toString(36).slice(2);
  beepPanel.webview.html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
<style>
  body{margin:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
       background:#111;color:#ffd200;font-family:sans-serif;text-align:center;gap:12px}
  .m{font-size:64px}
</style></head>
<body>
  <div class="m">🍟</div>
  <p>Nuggetsy gotowe.<br>beep beep beep beep…</p>
  <script nonce="${nonce}">
    ${BEEP_SCRIPT}
    __startBeepLoop();
  </script>
</body></html>`;
}

// --- mem „Gratulacje, zostałeś wybrany” ---------------------------------------

const CONGRATS = [
  { big: '🎉 GRATULACJE! 🎉', sub: 'Zostałeś wybrany jako 1 000 000-ty programista!', btn: 'ODBIERZ NAGRODĘ' },
  { big: '🏆 WYGRAŁEŚ! 🏆', sub: 'Jesteś losowym zwycięzcą iPhone 42 Pro Max!', btn: 'KLIKNIJ TUTAJ' },
  { big: '👑 WOW! 👑', sub: 'Twój kod zakwalifikował się do finału. Nagroda: 0 bugów!', btn: 'TAK, CHCĘ' },
  { big: '💰 $1,000,000 💰', sub: 'Rząd Nigerii wybrał właśnie CIEBIE!', btn: 'ODBIERZ TERAZ' },
  { big: '🎁 NIESPODZIANKA! 🎁', sub: 'Zostałeś wybrany jako najlepszy senior w tym pokoju!', btn: 'ZASŁUGUJĘ' },
];

function showCongrats() {
  const c = pick(CONGRATS);
  if (!congratsPanel) {
    congratsPanel = vscode.window.createWebviewPanel(
      'trollCode.congrats',
      '🎉 Gratulacje!',
      { viewColumn: vscode.ViewColumn.Active, preserveFocus: false },
      { enableScripts: true }
    );
    congratsPanel.onDidDispose(() => (congratsPanel = undefined));
  }
  const nonce = Math.random().toString(36).slice(2);
  congratsPanel.webview.html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
<style>
  @keyframes flash{0%{background:#ff00e6}25%{background:#00e5ff}50%{background:#ffe600}75%{background:#00ff6a}100%{background:#ff00e6}}
  @keyframes shake{0%,100%{transform:translate(0,0)}25%{transform:translate(-6px,4px)}50%{transform:translate(6px,-4px)}75%{transform:translate(-4px,-6px)}}
  body{margin:0;height:100vh;display:flex;align-items:center;justify-content:center;animation:flash .6s infinite;font-family:'Comic Sans MS',sans-serif}
  .box{background:#fff;border:6px dashed #ff0054;border-radius:16px;padding:6vh 6vw;text-align:center;animation:shake .4s infinite;max-width:80vw}
  .big{font-size:5vw;font-weight:900;color:#ff0054;margin:0 0 2vh}
  .sub{font-size:2.4vw;margin:0 0 4vh;color:#222}
  .btn{display:inline-block;font-size:2.6vw;font-weight:900;color:#fff;background:#00b300;border-radius:12px;padding:1.5vh 4vw;cursor:pointer;box-shadow:0 6px 0 #007a00}
  .small{margin-top:3vh;font-size:1.2vw;color:#666}
</style></head>
<body>
  <div class="box">
    <p class="big">${c.big}</p>
    <p class="sub">${c.sub}</p>
    <div class="btn" id="b">${c.btn}</div>
    <p class="small">🤡 Żart. Niczego nie wygrałeś. Zamknij tę kartę.</p>
  </div>
  <script nonce="${nonce}">
    ${BEEP_SCRIPT}
    // fanfary: trzy wznoszące piknięcia, a potem to samo piszczenie co w tle
    __beep(1047,0.15); setTimeout(()=>__beep(1319,0.15),160); setTimeout(()=>__beep(1568,0.3),320);
    setTimeout(__startBeepLoop, 700);
    // przycisk ucieka od kursora — klasyka
    const b=document.getElementById('b');
    b.addEventListener('mouseover',()=>{b.style.transform='translate('+(Math.random()*40-20)+'vw,'+(Math.random()*30-15)+'vh)';});
  </script>
</body></html>`;
  congratsPanel.reveal(vscode.ViewColumn.Active, false);
}

// --- fałszywy niebieski ekran (BSOD) ------------------------------------------

async function showBsod() {
  if (bsodPanel) return;
  bsodPanel = vscode.window.createWebviewPanel(
    'trollCode.bsod',
    ':(',
    { viewColumn: vscode.ViewColumn.Active, preserveFocus: false },
    { enableScripts: true }
  );
  bsodPanel.webview.html = bsodHtml();
  bsodPanel.onDidDispose(() => (bsodPanel = undefined));
  // edytor na cały ekran na czas BSOD; po zamknięciu wracamy do normalnego układu
  vscode.commands.executeCommand('workbench.action.maximizeEditorHideSidebar').then(undefined, () => {});
  const panel = bsodPanel;
  timers.push(setTimeout(() => {
    if (panel === bsodPanel) panel.dispose();
    vscode.commands.executeCommand('workbench.action.evenEditorWidths').then(undefined, () => {});
  }, ms('bsodDurationMs')));
}

function bsodHtml() {
  const nonce = Math.random().toString(36).slice(2);
  const stopCode = pick(['SPAGHETTI_CODE_EXCEPTION', 'SEMICOLON_NOT_FOUND', 'TOO_MANY_TABS_OPEN', 'DEVELOPER_SKILL_UNDERFLOW', 'COFFEE_DEPLETED', 'STACK_OVERFLOW_COPY_PASTE']);
  return `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
<style>
  html, body { margin:0; height:100%; background:#0078d7; color:#fff; font-family:'Segoe UI', sans-serif; }
  .wrap { padding:8vh 10vw; }
  .face { font-size:12vw; line-height:1; margin-bottom:4vh; }
  h1 { font-weight:300; font-size:2.2vw; max-width:60vw; margin:0 0 3vh; }
  .pct { font-size:2.2vw; font-weight:300; margin-bottom:5vh; }
  .row { display:flex; gap:2vw; align-items:center; font-size:1vw; }
  .qr { width:8vw; height:8vw; background:
    repeating-linear-gradient(90deg,#fff 0 6px,transparent 6px 12px),
    repeating-linear-gradient(0deg,#0078d7 0 6px,transparent 6px 12px), #fff; }
  .joke { display:none; text-align:center; padding-top:25vh; font-size:4vw; }
</style></head>
<body>
<div class="wrap" id="bsod">
  <div class="face">:(</div>
  <h1>Twój VS Code napotkał problem i musi zostać ponownie uruchomiony. Zbieramy informacje o błędzie, a potem uruchomimy go ponownie.</h1>
  <div class="pct"><span id="pct">0</span>% ukończono</div>
  <div class="row"><div class="qr"></div>
    <div>Więcej informacji o tym problemie: https://twoj-kod.pl/stop<br><br>
    Jeśli zadzwonisz do pomocy technicznej, podaj im te informacje:<br>Kod zatrzymania: ${stopCode}</div>
  </div>
</div>
<div class="joke" id="joke">Żart 🤡<br><small>Nic się nie stało. Twój kod jest cały.</small></div>
<script nonce="${nonce}">
  let p = 0;
  const el = document.getElementById('pct');
  const t = setInterval(() => {
    p = Math.min(100, p + Math.floor(Math.random() * 12));
    el.textContent = p;
    if (p >= 100) {
      clearInterval(t);
      document.getElementById('bsod').style.display = 'none';
      document.getElementById('joke').style.display = 'block';
    }
  }, 600);
</script>
</body></html>`;
}

// --- fałszywe breakpointy ------------------------------------------------------
// Dodajemy własne czerwone kropki i usuwamy tylko je. Nigdy podczas debugowania,
// bo prawdziwy breakpoint zatrzymałby uruchomiony program.

const BREAKPOINTS_KEY = 'trollBreakpoints';

function saveTrollBreakpoints() {
  const list = [...trollBreakpoints.keys()].map((bp) => ({
    uri: bp.location.uri.toString(),
    line: bp.location.range.start.line,
  }));
  ctx.workspaceState.update(BREAKPOINTS_KEY, list);
}

function flickerBreakpoints() {
  const now = Date.now();
  const expired = [...trollBreakpoints].filter(([, added]) => now - added > ms('breakpointLifeMs')).map(([bp]) => bp);
  if (expired.length) {
    vscode.debug.removeBreakpoints(expired);
    expired.forEach((bp) => trollBreakpoints.delete(bp));
  }

  const editor = vscode.window.activeTextEditor;
  if (vscode.debug.activeDebugSession || !editor || editor.document.uri.scheme !== 'file') {
    saveTrollBreakpoints();
    return;
  }

  // nie stawiamy kropek tam, gdzie już jest jakiś breakpoint (np. twój)
  const uri = editor.document.uri.toString();
  const taken = new Set(
    vscode.debug.breakpoints
      .filter((bp) => bp instanceof vscode.SourceBreakpoint && bp.location.uri.toString() === uri)
      .map((bp) => bp.location.range.start.line)
  );
  const lines = visibleLines(editor).filter((ln) => !taken.has(ln) && !editor.document.lineAt(ln).isEmptyOrWhitespace);
  const count = Math.min(RAINBOW.breakpointMax - trollBreakpoints.size, 1 + Math.floor(Math.random() * 3));
  const added = [];
  for (let i = 0; i < count && lines.length; i++) {
    const ln = lines.splice(Math.floor(Math.random() * lines.length), 1)[0];
    const bp = new vscode.SourceBreakpoint(new vscode.Location(editor.document.uri, new vscode.Position(ln, 0)));
    trollBreakpoints.set(bp, now);
    added.push(bp);
  }
  if (added.length) vscode.debug.addBreakpoints(added);
  saveTrollBreakpoints();
}

function removeTrollBreakpoints() {
  if (trollBreakpoints.size) vscode.debug.removeBreakpoints([...trollBreakpoints.keys()]);
  trollBreakpoints.clear();
  if (ctx) ctx.workspaceState.update(BREAKPOINTS_KEY, []);
}

// Po awarii VS Code nasze kropki mogły zostać — usuwamy te, które zapamiętaliśmy
// (tylko zwykłe, bez warunków, żeby nie ruszyć twoich breakpointów).
function cleanupLeftoverBreakpoints() {
  const saved = ctx.workspaceState.get(BREAKPOINTS_KEY, []);
  if (!saved.length) return;
  const keys = new Set(saved.map((s) => `${s.uri}#${s.line}`));
  const leftovers = vscode.debug.breakpoints.filter(
    (bp) =>
      bp instanceof vscode.SourceBreakpoint &&
      !bp.condition && !bp.hitCondition && !bp.logMessage &&
      keys.has(`${bp.location.uri.toString()}#${bp.location.range.start.line}`)
  );
  if (leftovers.length) vscode.debug.removeBreakpoints(leftovers);
  ctx.workspaceState.update(BREAKPOINTS_KEY, []);
}

// --- stakowanie Explorera w pasku aktywności ---------------------------------
// Co sekundę 30% szansy na kolejną kopię ikony Explorera, aż do 100.
// Widoki są gotowe w package.json, tu tylko zapalamy kolejne kontekstem.

function stackExplorer() {
  if (!rainbowOn() || stackCount >= STACK_MAX) return;
  if (Math.random() >= 0.3) return;
  vscode.commands.executeCommand('setContext', 'trollCode.stackVisible.' + stackCount, true);
  stackCount++;
}

function resetStack() {
  for (let i = 0; i < stackCount; i++) {
    vscode.commands.executeCommand('setContext', 'trollCode.stackVisible.' + i, false);
  }
  stackCount = 0;
}

// --- fałszywy terminal hakera (nic nie uruchamia) ---------------------------

function hackerTerminalShow() {
  if (hackerTerminal) return;
  const theme = pick(TERMINAL_THEMES);
  const write = new vscode.EventEmitter();
  const close = new vscode.EventEmitter();
  let interval;
  const paint = (s) => `\x1b[1;${theme.color}m${s}\x1b[0m`;
  const chars = theme.charset.split('');
  const randomChars = (n) => Array.from({ length: n }, () => pick(chars)).join('');

  const pty = {
    onDidWrite: write.event,
    onDidClose: close.event,
    open: () => {
      write.fire(paint(theme.header) + '\r\n\r\n');
      let n = 0;
      interval = setInterval(() => {
        n++;
        if (n % 6 === 0) {
          write.fire(paint(`[${Math.min(100, Math.floor(n * 1.7))}%] ${pick(theme.lines)}`) + '\r\n');
        } else {
          write.fire(paint(randomChars(60)) + '\r\n');
        }
        if (n >= 60) {
          clearInterval(interval);
          write.fire('\r\n' + theme.finale[0] + '\r\n');
          write.fire(paint(theme.finale[1]) + '\r\n');
          setTimeout(() => close.fire(), 3000);
        }
      }, 80);
    },
    close: () => clearInterval(interval),
    handleInput: () => write.fire(paint('  Nice try. 🤡') + '\r\n'),
  };

  hackerTerminal = vscode.window.createTerminal({ name: theme.name, pty });
  hackerTerminal.show(true);
}

function spamMessages() {
  const count = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i++) {
    setTimeout(() => vscode.window.showInformationMessage('🌈 ' + pick(MESSAGES)), i * 150);
  }
}

function fakeScare() {
  const [task, punchline] = pick(FAKE_SCARES);
  vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification, title: `⚠️ ${task}…`, cancellable: false },
    async (progress) => {
      for (let p = 0; p < 100; p += 10) {
        progress.report({ increment: 10, message: `${p + 10}%` });
        await sleep(400);
      }
    }
  ).then(() => vscode.window.showInformationMessage(punchline));
}

async function quiz() {
  const [question, answers] = pick(QUIZ);
  const answer = await vscode.window.showQuickPick(answers, { placeHolder: '🤡 ' + question, ignoreFocusOut: true });
  vscode.window.showInformationMessage(answer ? `„${answer}”… tak myślałem 🤡` : 'Ucieczka nic nie da 🤡');
}

// --- efekty ---------------------------------------------------------------

// Chowa panel boczny (Explorer, Extensions itd.).
function hideSidebar() {
  // podczas ataku plików panel zostaje otwarty, żeby było widać zalew
  if (Date.now() < sidebarPausedUntil) return;
  vscode.commands.executeCommand('workbench.action.closeSidebar').then(undefined, () => {});
}

async function shakeScreen() {
  if (shaking) return;
  shaking = true;
  const hard = rainbowOn();
  const steps = hard ? 16 : 8;
  try {
    // szybkie przewijanie góra/dół + migający pasek boczny (i panel w hardkorze) = trzęsienie ekranu
    for (let i = 0; i < steps; i++) {
      await vscode.commands.executeCommand('editorScroll', { to: i % 2 ? 'up' : 'down', by: 'line', value: hard ? 6 : 3 });
      if (i % 4 === 0) await vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');
      if (hard && i % 8 === 0) await vscode.commands.executeCommand('workbench.action.togglePanel');
      await sleep(40);
    }
  } catch {
    // brak aktywnego edytora — trudno
  } finally {
    shaking = false;
  }
}

// Tylko endpointy SFW; próbujemy po kolei, aż któryś odpowie.
const WAIFU_SOURCES = [
  ['https://nekos.best/api/v2/waifu', (j) => j.results[0].url],
  ['https://api.waifu.pics/sfw/waifu', (j) => j.url],
  ['https://api.waifu.im/search?included_tags=waifu&is_nsfw=false', (j) => j.images[0].url],
];
const HEADERS = { 'User-Agent': 'troll-code-vscode' };

// Pobiera obrazek po stronie rozszerzenia i zwraca go jako data: URI,
// żeby webview nie musiał niczego ładować z internetu.
async function fetchWaifuImage() {
  for (const [endpoint, extract] of WAIFU_SOURCES) {
    try {
      const res = await fetch(endpoint, { headers: HEADERS, signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const url = extract(await res.json());
      if (typeof url !== 'string' || !url.startsWith('https://')) continue;

      const img = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(10000) });
      const type = img.headers.get('content-type') || '';
      if (!img.ok || !type.startsWith('image/')) continue;
      const data = Buffer.from(await img.arrayBuffer()).toString('base64');
      return `data:${type};base64,${data}`;
    } catch (err) {
      console.warn('[Troll Code] waifu:', endpoint, err && err.message);
    }
  }
  return undefined;
}

async function showWaifu() {
  const hard = rainbowOn();
  const image = await fetchWaifuImage();

  let panel;
  if (hard && waifuPanels.size < RAINBOW.maxWaifus) {
    panel = undefined; // w hardkorze waifu się mnożą
  } else {
    panel = [...waifuPanels][Math.floor(Math.random() * waifuPanels.size)];
  }

  if (!panel) {
    panel = vscode.window.createWebviewPanel(
      'trollCode.waifu',
      '💖 Waifu',
      { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
      { enableScripts: false }
    );
    waifuPanels.add(panel);
    panel.onDidDispose(() => waifuPanels.delete(panel));
  } else {
    panel.reveal(undefined, true);
  }
  panel.webview.html = waifuHtml(image, pick(WAIFU_LINES));
}

function waifuHtml(image, line) {
  const img = image
    ? `<img src="${image}" alt="waifu">`
    : '<div class="ascii">(◕‿◕✿)<br>waifu offline<br><small>brak internetu?</small></div>';
  return `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline';">
<style>
  body { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0; font-family:sans-serif; }
  img { max-width:90%; max-height:80vh; border-radius:12px; }
  .ascii { font-size:48px; text-align:center; }
  p { font-size:18px; margin-top:12px; }
</style></head>
<body>${img}<p>${line}</p></body></html>`;
}

function showRandomMessage() {
  const msg = '🤡 ' + pick(MESSAGES);
  Math.random() < 0.2
    ? vscode.window.showWarningMessage(msg, 'Wiem', 'Nie wiem')
    : vscode.window.showInformationMessage(msg);
}

function addFakeWarning() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  const doc = editor.document;
  const lines = [];
  for (let i = 0; i < doc.lineCount; i++) {
    if (!doc.lineAt(i).isEmptyOrWhitespace) lines.push(i);
  }
  if (!lines.length) return;

  const line = doc.lineAt(pick(lines));
  const start = line.firstNonWhitespaceCharacterIndex;
  const diag = new vscode.Diagnostic(
    new vscode.Range(line.lineNumber, start, line.lineNumber, line.text.length),
    pick(FAKE_WARNINGS),
    vscode.DiagnosticSeverity.Information
  );
  diag.source = 'Troll Code 🤡';
  diagnostics.set(doc.uri, [diag]);
  setTimeout(() => diagnostics.delete(doc.uri), 30000);
}

function updateStatusBar() {
  if (!cfg().get('enabled')) {
    statusItem.text = '$(circle-slash) 🤡';
    statusItem.tooltip = 'Troll Code wyłączony. Kliknij, żeby wybrać tryb.';
  } else if (rainbowOn()) {
    const flair = pick(['🌈', '🔥', '💀', '🤡', '💖']);
    statusItem.text = `${flair} HARDKOR ${flair} ${pick(PROGRESS_TASKS)}… ${Math.floor(Math.random() * 100)}%`;
    statusItem.tooltip = 'Tryb Hardcore. Kliknij, żeby zmienić tryb (albo Ctrl+Alt+Shift+P = PANIC).';
  } else if (mode() === 'troll') {
    // tryb Troll jest „sneaky” — pasek statusu znika, żeby nic nie zdradzało rozszerzenia
    statusItem.hide();
    return;
  } else {
    const percent = Math.random() < 0.1 ? 99 : Math.floor(Math.random() * 100);
    statusItem.text = cfg().get('statusBar.enabled') ? `$(sync~spin) 😇 ${pick(PROGRESS_TASKS)}… ${percent}%` : '😇';
    statusItem.tooltip = 'Troll Code — tryb Legit. Kliknij, żeby zmienić tryb.';
  }
  statusItem.show();
}

function onSelectionChange(e) {
  if (jumping) return;
  // w trybie Troll kursor nie skacze — ma być niezauważalnie; tylko Hardcore
  if (!rainbowOn()) return;
  // strzałki i kliknięcia myszką (przy pisaniu nie skaczemy, żeby nikt nie wpisał tekstu w złe miejsce)
  const kinds = [vscode.TextEditorSelectionChangeKind.Keyboard, vscode.TextEditorSelectionChangeKind.Mouse];
  if (!kinds.includes(e.kind)) return;
  if (e.selections.length !== 1 || !e.selections[0].isEmpty) return;
  const chance = rainbowOn() ? RAINBOW.cursorJumpChance : cfg().get('cursorJump.chance');
  if (Math.random() >= chance) return;

  const editor = e.textEditor;
  const pos = e.selections[0].active;
  const lastLine = editor.document.lineCount - 1;
  const distance = rainbowOn() ? 1 + Math.floor(Math.random() * 3) : 1;
  const target = Math.min(lastLine, Math.max(0, pos.line + (Math.random() < 0.5 ? -distance : distance)));
  const col = Math.min(pos.character, editor.document.lineAt(target).text.length);
  const newPos = new vscode.Position(target, col);

  jumping = true;
  // małe opóźnienie, żeby VS Code skończył własny ruch kursora (np. po kliknięciu)
  setTimeout(() => {
    editor.selection = new vscode.Selection(newPos, newPos);
    editor.revealRange(new vscode.Range(newPos, newPos));
    setTimeout(() => (jumping = false), 50);
  }, 120);
}

function deactivate() {
  stopTimers();
  removeTrollBreakpoints();
  return restoreSettings();
}

module.exports = { activate, deactivate };
