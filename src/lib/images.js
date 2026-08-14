/**
 * Central image map.
 *
 * All photography is served straight from Unsplash's CDN (plain <img> tags,
 * so no next/image domain config is needed). Every consuming <img> keeps an
 * onError handler that hides the element and lets the gradient fallback show
 * through, so a rare CDN miss degrades gracefully instead of breaking a card.
 *
 * `u(id, w)` builds a cropped, auto-formatted URL at a given width.
 */
const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  /* ── Landscapes / energy / industry ───────────────────────────── */
  fieldAerial: u("1500382017468-9049fed747ef", 1920), // golden farmland aerial
  forestCanopy: u("1441974231531-c6227db76b6e", 1600), // green forest light
  solarField: u("1509391366360-2e959784a276", 1600), // solar panels
  windTurbines: u("1466611653911-95081537e5b7", 1920), // wind turbines, green hills
  leafMacro: u("1466781783364-36c955e42a7f", 1400), // green leaves macro
  industrialPlant: u("1518709268805-4e9042af9f23", 1600), // industrial facility night
  cropRows: u("1625246333195-78d9c38ad449", 1400), // farmer in field
  foggyValley: u("1470071459604-3b5ec3a7fe05", 1920), // misty forest valley
  greenhouse: u("1416879595882-3373a0480b5b", 1400), // greenhouse rows
  ricePaddy: u("1523741543316-beb7fc7023d8", 1400), // terraced green fields

  /* ── People / team ────────────────────────────────────────────── */
  ceo: u("1560250097-0b93528c311a", 900), // business man, confident
  portraitA: u("1573496359142-b8d87734a5a2", 900), // professional woman
  portraitB: u("1580489944761-15a19d654956", 900), // woman smiling
  portraitC: u("1519085360753-af0119f7cbe7", 900), // young man
  teamMeeting: u("1522071820081-009f0129c71c", 1600), // team collaborating
  engineer: u("1581092918056-0c4c3acd3789", 1400), // engineers on site

  /* ── Contact ──────────────────────────────────────────────────── */
  officeDesk: u("1497215728101-856f4ea42174", 1600), // modern office
};

export default IMG;
