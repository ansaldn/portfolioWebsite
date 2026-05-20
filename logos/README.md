# Client logos

Drop one SVG (or PNG) per client into this folder and the site picks them up automatically. No code change needed beyond the `logo` path in `src/data/clients.ts`, which is already wired.

## Expected filenames

The site looks for these paths (already referenced in `src/data/clients.ts`):

```
/logos/epic-games.svg
/logos/hitachi-rail.svg
/logos/babbel.svg
/logos/ki-insurance.svg
/logos/lifebit.svg
/logos/depop.svg
/logos/convatec.svg
/logos/paddle.svg
/logos/memrise.svg
/logos/apple.svg
```

If any file is missing, the UI **automatically falls back to a sector-coloured monogram** (e.g. `EG` for Epic Games). The site never breaks.

## Where to source brand-safe logos

[Simple Icons](https://simpleicons.org) is the standard repository for monochrome brand SVGs and is **CC0 licensed** (no attribution required). Most of the brands above have entries — search by name, click the badge, "Copy SVG" or download. Save to this folder using the filenames above.

Brands typically available on Simple Icons:

- Apple → `apple.svg`
- Epic Games → `epicgames.svg` → rename to `epic-games.svg`
- Hitachi → `hitachi.svg` → rename to `hitachi-rail.svg`
- Babbel → `babbel.svg`
- Depop → `depop.svg`
- Paddle → `paddle.svg`
- Memrise → may not be available — happy with the monogram fallback

For private companies that aren't on Simple Icons (Ki Insurance, Lifebit, Convatec), grab the SVG from the company's brand / press page if they publish one, or leave the file out and the monogram will render.

## Format guidance

- **Monochrome SVG using `currentColor`** is ideal — the CSS automatically tints them to the sector colour so the whole carousel feels cohesive. All Simple Icons fit this format.
- **Full-colour SVGs or PNGs** also work — they'll be displayed as-is without re-tinting.
- Square aspect ratio (1:1) — the component renders them inside a `56×56` box on the home carousel, scaled with `object-fit: contain`.

## Trademark note

Brand logos remain the property of their respective owners. Showing logos of companies you've worked for as part of a personal portfolio is industry-standard practice (LinkedIn does this natively), but if a former employer asks you to remove a specific logo, delete the file from this folder and the monogram will reappear automatically.
