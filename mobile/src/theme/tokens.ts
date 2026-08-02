/**
 * RSN One design tokens — transcribed 1:1 from RSN-One-Figma-Mockups.html (:root CSS vars).
 * Eight colors, no more. Brass is the only accent in the app. Corner radius is 0 everywhere.
 */

export const colors = {
  walnut: '#2a1a16', // bg primary
  walnutDeep: '#190f0c', // bg deepest, nav
  cream: '#ede4d3', // text primary
  creamDim: '#a89a80', // text muted
  hairline: '#4a3129', // 1px borders
  brass: '#c98f7f', // accent
  roseDeep: '#9c5d52', // accent dark
  roseGlow: '#e0a596', // accent light
} as const;

// expo-linear-gradient has no radial support — these are directional approximations
// of the CSS radial/linear gradients, tuned to preserve the same light-to-dark mood.
export const gradients = {
  screen: {
    colors: ['#35211a', colors.walnut, colors.walnutDeep] as const,
    locations: [0, 0.45, 1] as const,
    start: { x: 0.2, y: 0 },
    end: { x: 0.75, y: 1 },
  },
  screenSalon: {
    colors: ['#201310', '#110a07', '#060302'] as const,
    locations: [0, 0.48, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  plateHero: {
    colors: ['#3d2620', '#241713', '#150d0a'] as const,
    locations: [0, 0.55, 1] as const,
    start: { x: 0.1, y: 0 },
    end: { x: 0.75, y: 1 },
  },
  plate: {
    colors: ['#3d281f', '#1c110c', '#150d0a'] as const,
    locations: [0, 0.6, 1] as const,
    start: { x: 0.05, y: 0 },
    end: { x: 0.75, y: 1 },
  },
  card: {
    colors: ['#3d281f', '#211410', '#160e0a'] as const,
    locations: [0, 0.55, 1] as const,
    start: { x: 0.05, y: 0 },
    end: { x: 0.75, y: 1 },
  },
  plateSalon: {
    colors: ['#241511', '#100908', '#070403'] as const,
    locations: [0, 0.6, 1] as const,
    start: { x: 0.05, y: 0 },
    end: { x: 0.75, y: 1 },
  },
  cta: {
    colors: [colors.roseGlow, colors.brass, colors.roseDeep] as const,
    locations: [0, 0.42, 1] as const,
    start: { x: 0.15, y: 0 },
    end: { x: 0.85, y: 1 },
  },
  ctaPress: {
    colors: [colors.brass, colors.roseDeep, '#7e4a40'] as const,
    locations: [0, 0.55, 1] as const,
    start: { x: 0.15, y: 0 },
    end: { x: 0.85, y: 1 },
  },
  panel: {
    colors: ['rgba(61,40,31,0.55)', 'rgba(28,17,12,0.30)'] as const,
    start: { x: 0.1, y: 0 },
    end: { x: 0.8, y: 1 },
  },
  sheet: {
    colors: ['#26160f', colors.walnutDeep] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  chip: {
    colors: ['rgba(61,40,31,0.30)', 'transparent'] as const,
    start: { x: 0.15, y: 0 },
    end: { x: 0.85, y: 1 },
  },
  ghostButton: {
    colors: ['rgba(61,40,31,0.35)', 'rgba(61,40,31,0.05)'] as const,
    start: { x: 0.15, y: 0 },
    end: { x: 0.85, y: 1 },
  },
  secondaryButton: {
    colors: ['rgba(201,143,127,0.10)', 'rgba(201,143,127,0.02)'] as const,
    start: { x: 0.15, y: 0 },
    end: { x: 0.85, y: 1 },
  },
  secondaryButtonPressed: {
    colors: ['rgba(201,143,127,0.22)', 'rgba(156,93,82,0.10)'] as const,
    start: { x: 0.15, y: 0 },
    end: { x: 0.85, y: 1 },
  },
} as const;

// Approximations of the CSS box-shadow effect/* styles — RN has no inset shadow,
// so only the outer drop shadow half of each pairing is represented.
export const shadows = {
  hero: { shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.4, shadowRadius: 40, elevation: 14 },
  card: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 8 },
  thumb: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 },
  cta: { shadowColor: colors.brass, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.28, shadowRadius: 20, elevation: 6 },
  sheet: { shadowColor: '#000', shadowOffset: { width: 0, height: -12 }, shadowOpacity: 0.6, shadowRadius: 30, elevation: 20 },
  panel: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 4 },
} as const;

export const fonts = {
  displayLight: 'CormorantGaramond_300Light',
  displayLightItalic: 'CormorantGaramond_300Light_Italic',
  displayRegular: 'CormorantGaramond_400Regular',
  displayMedium: 'CormorantGaramond_500Medium',
  bodyRegular: 'EBGaramond_400Regular',
  bodyRegularItalic: 'EBGaramond_400Regular_Italic',
  bodyMedium: 'EBGaramond_500Medium',
  bodyMediumItalic: 'EBGaramond_500Medium_Italic',
} as const;

// text/* styles — Cormorant Garamond for display, EB Garamond for body.
export const type = {
  heroH1: { fontFamily: fonts.displayLight, fontSize: 44, lineHeight: 48, letterSpacing: 0.4, color: colors.cream },
  displayMd: { fontFamily: fonts.displayLight, fontSize: 32, lineHeight: 36, letterSpacing: 0.3, color: colors.cream },
  sectionH2: { fontFamily: fonts.displayRegular, fontSize: 22, lineHeight: 26, letterSpacing: 0.3, color: colors.cream },
  itemTitle: { fontFamily: fonts.bodyMedium, fontSize: 17, lineHeight: 22, color: colors.cream },
  body: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 24, color: colors.cream },
  bodyDim: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 24, color: colors.creamDim },
  captionItalic: { fontFamily: fonts.bodyRegularItalic, fontSize: 12, lineHeight: 18, color: colors.creamDim },
  eyebrow: { fontFamily: fonts.bodyRegular, fontSize: 11, letterSpacing: 2.4, textTransform: 'uppercase', color: colors.brass },
  plateNo: { fontFamily: fonts.bodyRegular, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.creamDim },
  lotNumber: { fontFamily: fonts.displayRegular, fontSize: 13, color: colors.brass },
  button: { fontFamily: fonts.bodyMedium, fontSize: 12, letterSpacing: 1.7, textTransform: 'uppercase', color: colors.cream },
  navMicro: { fontFamily: fonts.bodyRegular, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: colors.creamDim },
  price: { fontFamily: fonts.bodyRegular, fontSize: 14, letterSpacing: 0.4, color: colors.brass },
  sub: { fontFamily: fonts.bodyRegularItalic, fontSize: 15, lineHeight: 24, color: colors.creamDim },
  note: { fontFamily: fonts.bodyRegularItalic, fontSize: 13, lineHeight: 21, color: colors.creamDim },
  micro: { fontFamily: fonts.bodyRegular, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: colors.creamDim },
} as const;

// space/* scale — side margin is always 24; radius is always 0.
export const space = { s1: 4, s2: 8, s3: 12, s4: 16, s5: 20, s6: 24, s7: 32, s8: 44, s9: 56 } as const;

export const radius = 0;
