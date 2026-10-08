# Changelog

## 1.16.1
- Okna zgody (Troll i oba Hardcore) mają teraz „Cancel” jako domyślny przycisk — Enter anuluje, więc nie da się włączyć czegoś przez przypadkowe wciśnięcie Enter.

## 1.16.0
- Czysty powrót z Hardcore: po wyłączeniu zamyka wszystko, co otworzył (waifu, gratulacje, BSOD, terminal hakera, fałszywy Explorer) i przywraca karty, które miałeś otwarte wcześniej — jakbyś w ogóle go nie włączał.
- Dodane ostrzeżenie zdrowotne/epilepsji w oknie zgody na Hardcore i w README.

## 1.15.0
- Dźwięk gra teraz przez system (Windows: ukryty PowerShell MediaPlayer; mac: afplay; Linux: paplay/ffplay) zamiast webview — nie trzeba już nic klikać. Pisk leci w pętli, mem „Gratulacje” gra swój plik. PANIC zatrzymuje. Każde odtworzenie to krótki proces, więc po zamknięciu VS Code dźwięk cichnie sam.

## 1.14.1
- Dźwięk startuje łatwiej: karta beepa jest aktywna i reaguje na dowolną interakcję (klik, ruch myszki, klawisz), nie trzeba celować w zakładkę. (VS Code/Chromium blokuje autoodtwarzanie do pierwszej interakcji — tego nie da się w pełni obejść.)

## 1.14.0
- Dźwięki z plików: pisk w tle gra `media/mcdonalds-beep.mp3`, a mem „Gratulacje” gra `media/congrats.mp3` (zamiast syntezowanego pikania).

## 1.13.0
- Zrzeczenie odpowiedzialności: tryb Troll ma teraz własne okno zgody („OK, at my own risk”), bo edytuje pliki. Hardcore i Troll mówią wprost „use at your own risk”.
- README: sekcja Disclaimer („as is”, bez gwarancji, na własne ryzyko, autor nie odpowiada).
## 1.12.0
- Każdy interwał efektów Hardcore można teraz ustawić w `trollCode.hardcore.*` (w milisekundach). Brak/zła wartość = domyślna. Lista w README.

## 1.11.0
- Hardcore: ruletka układu — co kilka sekund zmienia się jedna opcja z „Customize Layout” (pasek boczny lewo/prawo, pasek aktywności góra/dół/ukryty, wyrównanie panelu, pasek menu). Wszystko wraca po wyjściu z Hardcore.


## 1.10.1
- Pisk McDonalda wierniejszy: wyższy, przeszywający ton ~2,7 kHz i szybkie piknięcia (jak alarm frytkownicy).
- Mem „Gratulacje” ma teraz dźwięk: fanfary + to samo piszczenie.

## 1.10.0
- Hardcore: zapętlony pisk „jak z McDonalda” (syntezowany Web Audio, bez pobierania). Wyłącznik: `trollCode.sound.enabled`.
- Hardcore: wyskakujące memy „Gratulacje, zostałeś wybrany!” z uciekającym przyciskiem.

## 1.9.0
- Hardcore: fałszywa konsola ma 5 wariantów (Hacker, Matrix, Crypto Miner, FBI, DOOM), każdy z własnymi kolorami i tekstami.
- Hardcore: do 100 kopii ikony „Explorer” nawarstwia się w pasku aktywności (30% szansy na sekundę). Znikają po wyjściu z Hardcore.

## 1.8.1
- Wyjście z trybu Troll (zmiana trybu, PANIC, wyłączenie) cofa teraz wszystkie podmienione znaki we wszystkich plikach, których dotknął. Działa też po restarcie VS Code.

## 1.8.0
- Tryb Troll przebudowany na „sneaky”: bez paska statusu, bez powiadomień, bez waifu/trzęsień/chowania panelu i bez skaczącego kursora.
- Troll: podczas pisania po cichu podmienia pojedyncze znaki na bliźniacze, które łamią składnię (średnik, kropka, nawiasy, znaczniki HTML; czasem litera cyrylicka lub hebrajska). To jedyny efekt zmieniający tekst w pliku — cofalny Ctrl+Z, na dysk po zapisie. Ustawienia: `trollCode.sneaky.chance`, `trollCode.sneaky.intervalSeconds`.
- README zaktualizowane: „nigdy nie zmienia plików” dotyczy teraz tylko trybów Legit i Hardcore.

## 1.7.0
- Hardcore: strona „Extension: Troll Code” zamyka się od razu po otwarciu (trudniej dojść do odinstalowania). Wyjście: PANIC albo `code --uninstall-extension`.

## 1.6.1
- Przygotowanie do Marketplace: wydawca `bochenek11`, ikona rozszerzenia, link do repozytorium GitHub.

## 1.6.0
- Hardcore: fałszywy niebieski ekran (BSOD) co ~90 s, który zmienia się w „Żart 🤡” i sam znika po ~12 s. Komenda „Niebieski ekran (BSOD) teraz”.
- Hardcore: fałszywe breakpointy pojawiają się i znikają na losowych linijkach (nigdy podczas debugowania, sprzątane są tylko własne).

## 1.5.1
- Mniej fałszywych plików: 1 co 5 s (zamiast 1–3 co sekundę), maksymalnie 50, atak co ~45 s dorzuca 12.

## 1.5.0
- Hardcore: otwarcie prawdziwego Explorera przerzuca na podróbkę („🤡 Nie ten Explorer.”). Prawdziwe pliki dalej dostępne przez Ctrl+P.
- README: jak dostać się do prawdziwych plików i jak ręcznie schować prawdziwy Explorer.

## 1.4.0
- Włączenie Hardcore wymaga dwóch potwierdzeń: lista efektów („Yes, I know what I'm doing”), a potem „☠️ Last chance!” („☠️ Start HARDCORE”).
- Szybszy start Hardcore: trzęsienie, duchy, motyw i tytuł po 1,5 s, terminal hakera po 4 s, pierwszy atak plików po 6 s.
- README: kroki włączania Hardcore, rozdział „Is It Safe? (FAQ)”, aktualne czasy efektów, nowe porady.

## 1.3.0
- Naprawione pętle: błąd w jednym efekcie nie zatrzymuje go już na zawsze (stąd z czasem działo się coraz mniej).
- Podróbka Explorera ma własną stronę panelu bocznego; podczas ataku cały panel przełącza się na nią.
- Stałe identyfikatory elementów drzewa (koniec błędów „No tree item with id”).
- Hardkor szybszy: częstsze trzęsienia, duchy, terminal, ataki plików i inne.

## 1.2.0
- Uszkodzone pliki pokazują się teraz w drzewie udającym twój projekt (sekcja nazwana jak folder), a nie w płaskiej liście.
- Każdy uszkodzony plik ma losową ikonę w losowym kolorze.

## 1.1.0
- Hardkor: zalew fałszywych uszkodzonych plików w Explorerze i czerwone 💀 na prawdziwych plikach (tylko wygląd).
- Uciekający kursor działa też po kliknięciu myszką, w hardkorze skacze do 3 linijek.
- Zmiany ustawień (kursor, czcionka, motyw…) zapisywane po kolei, żeby VS Code ich nie odrzucał.

## 1.0.1
- Czytelny komunikat zamiast błędu, gdy po aktualizacji VS Code nie zarejestrował jeszcze nowych ustawień.

## 1.0.0
- 😇 Nowy tryb **Legit** (domyślny): tylko lekkie żarty, które nie przeszkadzają w pracy.
- 🤡 Dotychczasowe uciążliwe efekty przeniesione do trybu **Troll**.
- Wybór trybu przez kliknięcie ikony w pasku statusu albo komendę „Wybierz tryb”.
- Nowe README po angielsku: tryby, ostrzeżenia, bezpieczeństwo, ustawienia, prywatność, rozwiązywanie problemów.

## 0.9.0
- Hardkor: cały kod na czerwono (fałszywy błąd na każdej linijce).
- Hardkor: kot Mruczek chodzi po całym edytorze i robi kupę na kodzie.

## 0.8.0
- Hardkor: fałszywe błędy w kodzie i 9999 problemów w panelu Problems.
- Hardkor: kot Mruczek chodzi po pasku statusu i robi kupę (kliknięcie sprząta).

## 0.7.1
- Pliki HTML/CSS/JS zamykane co minutę zamiast co 3 sekundy.

## 0.7.0
- Hardkor: pulsująca i zmieniająca się czcionka, emoji na końcach linijek, „duchy” w kodzie, fałszywy terminal hakera, migające numery linii i minimapa, kursor z ADHD, losowy tytuł okna.
- Wszystkie zmieniane ustawienia są zapamiętywane i przywracane po wyłączeniu.
- Nowa lista efektów = ostrzeżenie pokazuje się ponownie.

## 0.6.0
- Tryb HARDKOR wymaga potwierdzenia: ostrzeżenie (EN) z listą efektów i przyciskiem „Yes, I know what I'm doing”.

## 0.5.0
- 📁 Chowanie panelu bocznego co kilka sekund (hardkor: co 2 s).
- README: jasna informacja, że to żart, co jest bezpieczne i jak wszystko wyłączyć.

## 0.4.0
- Naprawione waifu: obrazek pobierany przez rozszerzenie i wklejany w kartę.
- Zamykacz kart omija karty z waifu.
- Hardkor: ruletka motywów, mnożące się waifu, spam powiadomień, fałszywe straszaki, quizy, mocniejsze trzęsienia.

## 0.3.0
- Tęczowy tekst wbudowany w rozszerzenie — „Not Gay” nie jest już potrzebne.

## 0.2.0
- 🌈 Tryb tęczowy HARDKOR: integracja z „Not Gay”, zamykanie kart co 3 s, częstsze trzęsienia i waifu.
- Trzęsienie ekranu, losowe waifu (SFW), komenda PANIC (Ctrl+Alt+Shift+P).
- Ostrzejsze ustawienia domyślne.

## 0.1.0
- Pierwsza wersja: komentarze, fałszywy pasek postępu, komentarze przy zapisie, żartobliwe podpowiedzi, pyskate Ctrl+Z, uciekający kursor.
