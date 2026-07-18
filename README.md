TIMER_ — run it on your phone (install as an app)
Your phone's Chrome can't open a normal folder (Android has no folder picker for web apps), so on the phone TIMER_ now saves its data privately on the device instead. Everything still works — you just import the sound once and use Export to back your data up. On a computer it still uses your shared database folder as before; the app detects which one automatically.
The files (keep all 5 together in one folder)
index.html — the app
manifest.webmanifest, sw.js — make it installable + offline
icon-192.png, icon-512.png — the app icon
Step 1 — put the files online (one time, free, ~5 min)
A phone app has to load from a real https://… link, not a file. Easiest host is GitHub Pages:
Make a free account at github.com.
Click New repository → name it timer → choose Public → Create repository.
Add file → Upload files → drag in all 5 files → Commit changes.
Settings → Pages (left menu).
Under Source pick Deploy from a branch, branch main, folder / (root), Save.
Wait ~1 minute, refresh — it shows your link: https://YOUR-NAME.github.io/timer/
Step 2 — install it on the phone
Open that link in Chrome on your phone.
Tap ⋮ (top-right) → Add to Home screen → Install.
Open TIMER_ from your home screen (full-screen, works offline).
Step 3 — first-time setup inside the app
Tap start (top bar). Status shows ✓ on-device — your data store is ready.
Tap ⋯ → ♪ import timer sound and pick your timer_sound.wav. (Do this once.)
If you skip it, the timer just uses a built-in beep.
Add tasks and go.
Step 4 — back up your data (do this occasionally)
Because the phone store is private (not a visible folder), keep a backup:
Tap ⋯ → ⭳ export / back up data → three CSV files download to your Downloads folder.
To move data to another device (or restore): ⋯ → ⭱ restore data from CSV files and pick them.
On a computer (optional)
Open the link in Chrome/Edge → click the install icon in the address bar. There, connect opens your real database folder and it uses the TIMER subfolder inside it, like before. You can also just open index.html (or TIMER_.html) straight from disk — it runs, it only can't be installed.
Honest limits (still true even installed)
The sound/timer keep going while the app is open or minimised, with lock-screen controls — but not after the app is force-closed / killed. No web app can do that on Android.
The notification can't show a live countdown or a scrollable list of upcoming tasks with their own buttons — that needs a genuinely native app.
Updating later
When I send a new index.html, re-upload it, and change const CACHE = "timer_-v1" in sw.js to -v2 (then -v3…) so your phone loads the new version instead of the cached one.
