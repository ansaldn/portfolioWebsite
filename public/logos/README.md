# Client logos

Drop one SVG per client into **this folder** (`public/logos/`) and the site picks it up automatically — no code change needed (the `logo` path in `src/data/clients.ts` is already wired). If a file is missing, the UI falls back to a sector-coloured monogram (e.g. `EG`), so the site never breaks.

On the home page these render as a **logo wall**: greyscale and slightly muted at rest, returning to full colour when you hover a tile or its industry.

## Filenames — drop these into `public/logos/`

```
epic-games.svg
on-running.svg
miro.svg
traxent.svg
hitachi-rail.svg
babbel.svg
ki-insurance.svg
lifebit.svg
depop.svg
convatec.svg
paddle.svg
memrise.svg
apple.svg
```

Use the exact name on the left (lower-case, hyphenated, `.svg`). That's it — save the file with that name and it appears.

## Dark mode

A single **full-colour** logo file works in both light and dark mode — each logo sits on its own neutral tile, so contrast is fine either way. You do **not** need two versions for colour logos.

The only exception is a **monochrome** logo (a solid-black or solid-white wordmark), which would disappear in one theme. For those, also add a dark-mode version named `<name>-dark.svg` (e.g. `acme-dark.svg`) and tell me which ones — I'll switch on the automatic theme swap for those specific logos (one line in `clients.ts`).

## Format guidance

- **Official full-colour SVG** straight from the brand's press / brand-assets page is ideal.
- Any aspect ratio is fine — the wall scales each logo to a max height of ~34px and centres it; wide wordmarks and square marks both work.
- Don't worry about greyscale — that's applied with a CSS filter at rest and removed on hover; your file is never altered.

## Trademark note

Brand logos remain the property of their owners. Showing logos of companies you've worked with on a personal portfolio is common practice, but confirm your contracts/NDAs don't restrict naming or displaying a given client (some government, defence-adjacent or M&A engagements do). Use the official file unmodified, and if anyone asks you to remove a logo, just delete the file and the monogram reappears automatically.
