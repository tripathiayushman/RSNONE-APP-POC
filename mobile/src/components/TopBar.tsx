import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BrandMark } from './BrandMark';
import { Icon, IconName } from './Icon';
import { colors, fonts } from '../theme/tokens';

export interface TopBarIcon {
  /** House icon name — see components/Icon.tsx. */
  icon?: IconName;
  /** Short text action ("Skip") for the rare bar that needs a word, not a mark. */
  label?: string;
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
  /** Optional right-side action for the "sub" variant, replacing the spacer. */
  rightIcon?: IconName;
  rightActive?: boolean;
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
  rightIcon,
  rightActive = false,
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
            {icons.map((item, index) => (
              <Pressable
                key={index}
                onPress={item.onPress}
                hitSlop={10}
                style={styles.iconHit}
                accessibilityRole="button"
              >
                {item.icon ? (
                  <Icon
                    name={item.icon}
                    size={19}
                    color={item.active ? colors.brass : colors.creamDim}
                  />
                ) : (
                  <Text style={[styles.iconLabel, item.active && styles.iconGlyphActive]}>
                    {item.label}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>
        </>
      ) : (
        <>
          <Pressable
            onPress={onBack}
            hitSlop={12}
            style={styles.back}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <Icon name="back" size={20} />
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
          {rightIcon || rightLabel ? (
            <Pressable
              onPress={onRightPress}
              hitSlop={12}
              style={styles.rightAction}
              accessibilityRole="button"
            >
              {rightIcon ? (
                <Icon
                  name={rightIcon}
                  size={19}
                  color={rightActive ? colors.brass : colors.creamDim}
                />
              ) : (
                <Text style={styles.rightActionText} numberOfLines={1}>
                  {rightLabel}
                </Text>
              )}
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
  icons: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  // 40x40 keeps every bar action at the 44pt-ish touch target phones expect.
  iconHit: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  iconLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: colors.creamDim,
  },
  iconGlyphActive: { color: colors.brass },
  back: { width: 40, height: 40, alignItems: 'flex-start', justifyContent: 'center' },
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
  rightAction: { width: 40, height: 40, alignItems: 'flex-end', justifyContent: 'center' },
  rightActionText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: colors.brass,
  },
});
