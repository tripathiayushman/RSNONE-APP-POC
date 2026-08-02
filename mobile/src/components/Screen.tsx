import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gradients } from '../theme/tokens';

/** Which safe-area edges Screen should pad for. Left/right are rarely needed —
 * the house side margin (24) is applied per-section, not by the screen shell. */
export type ScreenEdge = 'top' | 'bottom' | 'left' | 'right';

export interface ScreenProps {
  children: React.ReactNode;
  /** Use the near-black salon gradient instead of the standard walnut screen gradient. */
  salon?: boolean;
  /** Safe-area edges to pad for. Defaults to top + bottom. */
  edges?: ScreenEdge[];
}

const DEFAULT_EDGES: ScreenEdge[] = ['top', 'bottom'];

/**
 * Full-bleed gradient background wrapper used by every screen. The gradient fills
 * the entire device viewport (behind the status bar / home indicator too); content
 * sits in a flex column above it, padded only for the requested safe-area edges.
 */
export function Screen({ children, salon = false, edges = DEFAULT_EDGES }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const gradient = salon ? gradients.screenSalon : gradients.screen;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={gradient.colors}
        locations={gradient.locations}
        start={gradient.start}
        end={gradient.end}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.content,
          {
            paddingTop: edges.includes('top') ? insets.top : 0,
            paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
            paddingLeft: edges.includes('left') ? insets.left : 0,
            paddingRight: edges.includes('right') ? insets.right : 0,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, flexDirection: 'column' },
});
