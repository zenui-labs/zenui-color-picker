# Changelog

## 1.2.1 (2026-10-07)

- **Package.** `package.json` no longer declares `sideEffects`, so bundlers treat every module, including the
  stylesheet import, as having side effects.
- **README.** New header image with light and dark versions, a variants overview with a picture of all six, badges and
  this changelog.
- **Share images.** New Open Graph and Twitter card image for the demo site, plus a GitHub social preview. They are
  drawn from the real component by `npm run og`.

No API changes.

## 1.2.0 (2026-10-07)

- No runtime dependencies. React is only a peer.
- No global CSS. Styles sit in the `components` cascade layer and only touch `zcp-` classes.
- New look: the wheel is a hue ring around a saturation square, and the format menu is a segmented switch.
- Three new variants (`spectrum`, `sliders`, `swatches`), plus `showHarmony`, `showContrast`, `enableEyeDropper`,
  `getHarmony` and `getContrastRatio`.
- Many fixes. See [Upgrading from 1.1](README.md#upgrading-from-11) for the full list.

## 1.1.0 (2025-09-03)

- Earlier release. See the [GitHub releases](https://github.com/zenui-labs/zenui-color-picker/releases).
