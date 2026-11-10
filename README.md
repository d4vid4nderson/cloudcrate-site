# cloudcrate.app

The Cloud Crate showcase site: plain HTML, no build step, hosted on GitHub Pages.

- `index.html`: the page.
- `assets/intro.mp4`: the opening animation, rendered from the approved brand reveal by
  `python3 tools/make-site-intro.py && swift tools/render-site-intro.swift`. A video, because
  the reveal run live in a browser was choppy.
- `mock.js`: the app's windows drawn in the page, with invented artists, albums and channels
  and generated artwork, shuffled each visit, so no real library or album art is shown.
- `CNAME`: the custom domain. `.nojekyll`: lets GitHub Pages serve `.well-known/`.
- `.well-known/discord`: Discord's domain-verification code, once Discord gives it.

A showcase only: no public download (family installs stay on the private OTA page).
