# UMD Libraries — Springshare Customizations

Custom UMD Libraries Design System (UMD Lib) front-end customizations for the
University of Maryland Libraries' Springshare products. These files re-skin the
hosted Springshare interfaces to match the UMD Libraries brand and design system.

Currently scoped to three products:

| Product        | Coverage                                        |
| -------------- | ----------------------------------------------- |
| **LibCal**     | Full interface (calendar, events, hours, etc.)  |
| **LibGuides**  | Header, footer, and chat widget only            |
| **LibAnswers** | Header, footer, and chat widget only            |

## Repository structure

```
General/                 Shared assets used by all three products
  base.css               Base design-system elements (typography, color tokens, fonts, layout/spacing utilities)
  component.css          Styling for the header, footer, and the floating chat widget launcher
  component.js           Builds and controls the chat widget launcher (injected into the footer)

LibCal/                  Full LibCal interface customization
  custom.html            <link>/<script> tags to paste into Custom JS/CSS
  header.html            UMD-branded header markup
  footer.html            UMD-branded footer markup
  libcal-base.css        LibCal-specific base resets
  libcal.css             LibCal interface overrides (calendar, events, hours, event detail, etc.)
  libcal.js              LibCal-specific DOM tweaks (headings, list/card view redirect, inline-style cleanup)

LibGuides/               Header / footer / chat widget only
  custom.html            <link>/<script> tags to paste into Custom JS/CSS
  header.html            UMD-branded header markup
  footer.html            UMD-branded footer markup

LibAnswers/              Header / footer / chat widget only
  custom.html            <link>/<script> tags to paste into Custom JS/CSS
  header.html            UMD-branded header markup
  footer.html            UMD-branded footer markup
  ChatWidget/            Styling/content for the LibAnswers chat widget itself
    chatwidget.css       Widget appearance
    offline-text.html    Fallback links/message shown when chat is offline
```

## How the pieces fit together

- **`General/base.css`** provides the foundational design-system layer — fonts,
  color tokens (CSS custom properties), typography, and spacing/layout utility
  classes — that the header, footer, and product overrides all build on.
- **`General/component.css`** styles the shared **header**, **footer**, and the
  floating **chat widget** launcher.
- **`General/component.js`** injects the "Chat With Us!" launcher into the
  footer (`#umd-lib-footer`), toggles the chat iframe open/closed, and polls
  LibAnswers for live/offline status to update the widget accordingly.

The `header.html` / `footer.html` files are the brand markup pasted into each
product's header/footer customization area. LibCal additionally loads
`libcal-base.css`, `libcal.css`, and `libcal.js` to restyle the full interface.

## Deployment

All shared assets are hosted on the Springshare CDN and referenced by URL, e.g.:

```
https://d2jv02qf7xgjwx.cloudfront.net/sites/1504/include/base.css
```

Files are uploaded in LibGuides under **Look & Feel → Custom JS/CSS → Upload
Customization Files**. The `custom.html` in each product folder contains the
`<link>` / `<script>` tags to paste into that product's **Custom JS/CSS** code
section.

> **Note:** If any hosted file is re-uploaded, update the corresponding links in
> the `custom.html` files accordingly.
