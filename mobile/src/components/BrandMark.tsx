import React from "react";
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { brandLogo, BRAND_LOGO_ASPECT } from "../assets/editorialImages";

export interface BrandMarkProps {
  /** Rendered width in points; height follows the wordmark's natural ratio. */
  width?: number;
  /** Dim the mark to sit quietly behind foreground content. */
  muted?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The RSN One wordmark — "RSN one · Global Family Club" in cream and rose-gold
 * on transparent, the same artwork the web storefront serves in dark mode.
 * Always sized by width so the lettering never distorts.
 */
export function BrandMark({ width = 104, muted = false, style }: BrandMarkProps) {
  return (
    <View style={[{ width, height: width / BRAND_LOGO_ASPECT }, style]}>
      <Image
        source={brandLogo}
        style={[StyleSheet.absoluteFill, styles.fillImage, muted ? styles.muted : null]}
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel="RSN One — Global Family Club"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // `absoluteFill` alone doesn't stretch a replaced element like <img> on web —
  // the browser falls back to its natural pixel size without an explicit 100%.
  fillImage: { width: '100%', height: '100%' },
  muted: { opacity: 0.55 },
});
