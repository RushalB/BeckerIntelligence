# BHR Web — UI Kit

High-fidelity recreation of the **Becker's Hospital Review** website. Click "Subscribe" or any article card in `index.html` to exercise interactions.

## Files
- `index.html` — interactive demo (homepage + article view, live subscribe flow).
- `SiteSwitcher.jsx` — top thin bar linking sibling Becker's properties.
- `Header.jsx` — masthead (logo, search, Subscribe) + primary section nav.
- `ArticleCard.jsx` — feature + standard article cards, plus compact "Most Read" rows.
- `EventAndCTA.jsx` — navy event card, offering tile, newsletter capture block.
- `Footer.jsx` — dense 4-column footer + floating "Subscribe Today" pill.
- `kit.css` — UI-kit-scoped styles. Depends on `../../colors_and_type.css`.

## Fidelity notes
- Headline text, section labels, nav items, and event copy were taken verbatim from the live Becker's Hospital Review homepage (current as of build).
- Article photography replaced with navy gradient / pink-solid placeholders until real imagery is provided.
- No Figma/codebase was attached, so interaction chrome (search results, auth, paid-subscriber gating) is stubbed as toasts.
