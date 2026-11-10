# cloudcrate.app

The Cloud Crate showcase site: plain HTML, no build step, hosted on GitHub Pages.

- `index.html`: the page.
- `intro.html`: the opening animation, generated from the approved brand reveal by
  `python3 tools/make-site-intro.py` (re-run if `brand/motion/cloudcrate-reveal.html` changes).
- `CNAME`: the custom domain. `.nojekyll`: lets GitHub Pages serve `.well-known/`.
- `.well-known/discord`: Discord's domain-verification code, once Discord gives it.

A showcase only: no public download (family installs stay on the private OTA page).
