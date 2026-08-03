import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BrandMark } from './BrandMark';
import { colors, fonts } from '../theme/tokens';

export interface TopBarIcon {
  /** Plain text glyph, e.g. "⚲", "♡", "☰". */
  glyph: string;
  active?: boolean;
  onPress?: () => void;
}

export type TopBarVariant = 'default' | 'sub';

export interface TopBarProps {
  variant?: TopBarVariant;
  /** Screen title — used by the "sub" variant, centered. */
  title?: string;
  /** Back handler — used by the "sub" variant. */
  onBack?: () => void;
  /** Drop the bottom hairline (used above hero imagery etc). */
  quiet?: boolean;
  /** Row of glyph icons — used by the "default" variant. */
  icons?: TopBarIcon[];
  /** Optional right-side text action for the "sub" variant, replacing the spacer. */
  rightLabel?: string;
  onRightPress?: () => void;
  /** Show the wordmark instead of the text title on the "sub" variant. */
  brandTitle?: boolean;
}

/**
 * The house top bar. "default" shows the RSN One wordmark with a row of icon
 * glyphs; "sub" shows a back arrow, a centered title, and an optional right action.
 */
export function TopBar({
  variant = 'default',
  title,
  onBack,
  quiet = false,
  icons = [],
  rightLabel,
  onRightPress,
  brandTitle = false,
}: TopBarProps) {
  return (
    <View style={[styles.bar, variant === 'default' && styles.barBranded, quiet && styles.barQuiet]}>
      {variant === 'default' ? (
        <>
          <BrandMark width={96} />
          <View style={styles.icons}>
            {icons.map((icon, index) => (
              <Pressable key={index} onPress={icon.onPress} hitSlop={8}>
                <Text style={[styles.iconGlyph, icon.active && styles.iconGlyphActive]}>
                  {icon.glyph}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
      ) : (
        <>
          <Pressable onPress={onBack} hitSlop={8} style={styles.back}>
            <Text style={styles.backGlyph}>←</Text>
          </Pressable>
          {brandTitle ? (
            <View style={styles.brandTitle}>
              <BrandMark width={88} />
            </View>
          ) : (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
          {rightLabel ? (
            <Pressable onPress={onRightPress} hitSlop={8} style={styles.rightAction}>
              <Text style={styles.rightActionText} numberOfLines={1}>
                {rightLabel}
              </Text>
            </Pressable>
          ) : (
            <View style={styles.spacer} />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  // The wordmark stands taller than the old text mark, so the branded bar
  // gives back some of its padding to keep the header from crowding content.
  barBranded: { paddingTop: 4, paddingBottom: 14 },
  barQuiet: { borderBottomWidth: 0 },
  icons: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  iconGlyph: { fontSize: 15, color: colors.creamDim },
  iconGlyphActive: { color: colors.brass },
  back: { width: 40 },
  backGlyph: { fontSize: 16, color: colors.creamDim },
  title: {
    flex: 1,
    fontFamily: fonts.displayMedium,
    fontSize: 17,
    letterSpacing: 1.7,
    color: colors.cream,
    textAlign: 'center',
  },
  brandTitle: { flex: 1, alignItems: 'center' },
  spacer: { width: 40 },
  rightAction: { width: 40, alignItems: 'flex-end' },
  rightActionText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: colors.brass,
  },
});
