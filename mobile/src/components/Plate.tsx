import React from 'react';
import { View, Text, Image, ImageSourcePropType, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients, shadows } from '../theme/tokens';

export type PlateVariant = 'hero' | 'wide' | 'thumb' | 'sq' | 'card';

export interface PlateProps {
  variant: PlateVariant;
  /** Use the near-black salon plate gradient instead of the standard one. */
  salon?: boolean;
  /** Top-left absolute caption, e.g. "Lot 07". */
  tag?: string;
  /** Bottom-left caption, e.g. "Plate No. 021". */
  plateNo?: string;
  /** Bottom-right small caption, paired with plateNo. */
  ctaLine?: string;
  /** Real photo/render to show instead of the gradient placeholder, when available. */
  source?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}

const DIMENSIONS: Record<PlateVariant, ViewStyle> = {
  hero: { height: 420, marginHorizontal: 24 },
  wide: { height: 230, marginHorizontal: 24 },
  thumb: { width: 74, height: 90 },
  sq: { width: 56, height: 56 },
  card: { width: '100%', aspectRatio: 3 / 4 },
};

const SHADOWS = {
  hero: shadows.hero,
  wide: shadows.card,
  thumb: shadows.thumb,
  sq: shadows.thumb,
  card: shadows.card,
} as const;

function gradientFor(variant: PlateVariant, salon: boolean) {
  if (salon) return gradients.plateSalon;
  if (variant === 'hero' || variant === 'wide') return gradients.plateHero;
  if (variant === 'card') return gradients.card;
  return gradients.plate;
}

/**
 * The image-placeholder box used everywhere in this POC — there are no real
 * product photos, every "photograph" is a gradient plate with optional captions.
 */
export function Plate({ variant, salon = false, tag, plateNo, ctaLine, source, style }: PlateProps) {
  const gradient = gradientFor(variant, salon);
  const hasCaption = Boolean(plateNo || ctaLine);

  return (
    <View style={[styles.base, DIMENSIONS[variant], SHADOWS[variant], style]}>
      {source ? (
        // `absoluteFill` alone (top/left/right/bottom:0) doesn't stretch a
        // replaced element like <img> on web — the browser falls back to its
        // natural pixel size. Explicit 100% width/height forces it to the box.
        <Image
          source={source}
          style={[StyleSheet.absoluteFill, styles.fillImage]}
          resizeMode="cover"
        />
      ) : (
        <LinearGradient
          colors={gradient.colors}
          locations={gradient.locations}
          start={gradient.start}
          end={gradient.end}
          style={StyleSheet.absoluteFill}
        />
      )}
      {tag ? (
        <View style={styles.tagWrap} pointerEvents="none">
          <Text style={styles.tagText} numberOfLines={1}>
            {tag}
          </Text>
        </View>
      ) : null}
      {hasCaption ? (
        <View style={styles.captionBar} pointerEvents="none">
          <View style={styles.scrim} />
          <View style={styles.captionRow}>
            {plateNo ? (
              <Text style={styles.plateNoText} numberOfLines={1}>
                {plateNo}
              </Text>
            ) : (
              <View />
            )}
            {ctaLine ? (
              <Text style={styles.ctaLineText} numberOfLines={1}>
                {ctaLine}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fillImage: {
    width: '100%',
    height: '100%',
  },
  base: {
    borderWidth: 1,
    borderColor: colors.hairline,
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
  },
  tagWrap: { position: 'absolute', top: 14, left: 14 },
  tagText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.creamDim,
  },
  captionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 26,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(6,3,2,0.55)',
  },
  captionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  plateNoText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.creamDim,
  },
  ctaLineText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.cream,
  },
});
