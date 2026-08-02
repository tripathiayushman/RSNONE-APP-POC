import React from 'react';
import { Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients, shadows } from '../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Full-width, 52pt-tall house button. One filled "primary" per screen at most. */
export function Button({ label, variant = 'primary', disabled = false, onPress, style }: ButtonProps) {
  if (disabled) {
    return (
      <Pressable disabled style={[styles.base, styles.disabled, style]}>
        <Text style={[styles.label, styles.disabledLabel]}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={style}>
      {({ pressed }: { pressed: boolean }) => {
        if (variant === 'secondary') {
          const gradient = pressed ? gradients.secondaryButtonPressed : gradients.secondaryButton;
          return (
            <LinearGradient
              colors={gradient.colors}
              start={gradient.start}
              end={gradient.end}
              style={[styles.base, styles.secondaryBorder]}
            >
              <Text style={[styles.label, pressed ? styles.secondaryPressedLabel : styles.secondaryLabel]}>
                {label}
              </Text>
            </LinearGradient>
          );
        }

        if (variant === 'ghost') {
          return (
            <LinearGradient
              colors={gradients.ghostButton.colors}
              start={gradients.ghostButton.start}
              end={gradients.ghostButton.end}
              style={[styles.base, styles.ghostBorder, pressed && styles.ghostPressed]}
            >
              <Text style={styles.label}>{label}</Text>
            </LinearGradient>
          );
        }

        const gradient = pressed ? gradients.ctaPress : gradients.cta;
        return (
          <LinearGradient
            colors={gradient.colors}
            locations={gradient.locations}
            start={gradient.start}
            end={gradient.end}
            style={[styles.base, shadows.cta]}
          >
            <Text style={[styles.label, styles.primaryLabel]}>{label}</Text>
          </LinearGradient>
        );
      }}
    </Pressable>
  );
}

export type CtaLineVariant = 'cream' | 'brass';

export interface CtaLineProps {
  label: string;
  variant?: CtaLineVariant;
  onPress?: () => void;
}

/** Inline text CTA with a 1px brass underline — the quiet alternative to a filled button. */
export function CtaLine({ label, variant = 'cream', onPress }: CtaLineProps) {
  return (
    <Pressable onPress={onPress} style={styles.ctaLine} hitSlop={8}>
      <Text style={[styles.ctaLineText, variant === 'brass' && styles.ctaLineBrass]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    color: colors.cream,
  },
  primaryLabel: { color: colors.walnutDeep, fontFamily: fonts.bodyMedium },
  secondaryBorder: { borderWidth: 1, borderColor: colors.brass },
  secondaryLabel: { color: colors.brass },
  secondaryPressedLabel: { color: colors.roseGlow },
  ghostBorder: { borderWidth: 1, borderColor: colors.hairline },
  ghostPressed: { opacity: 0.7 },
  disabled: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.hairline,
    opacity: 0.55,
  },
  disabledLabel: { color: colors.creamDim, fontFamily: fonts.bodyRegular },
  ctaLine: {
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.brass,
    paddingBottom: 3,
  },
  ctaLineText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.cream,
  },
  ctaLineBrass: { color: colors.brass },
});
