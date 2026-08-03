import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Icon, IconName } from './Icon';
import { useBag } from '../state/AppState';
import { colors, fonts } from '../theme/tokens';

export type BottomNavKey = 'Registry' | 'Archive' | 'Bag' | 'Account';

const NAV_ITEMS: { key: BottomNavKey; icon: IconName }[] = [
  { key: 'Registry', icon: 'registry' },
  { key: 'Archive', icon: 'grid' },
  { key: 'Bag', icon: 'bag' },
  { key: 'Account', icon: 'user' },
];

export interface BottomNavProps {
  active: BottomNavKey;
  onNavigate: (key: BottomNavKey) => void;
  /** Near-black nav background used on Salon screens. */
  salon?: boolean;
}

/**
 * The fixed 4-item tab bar. Pads for the home indicator itself, so screens can
 * keep `edges={['top']}` and let the bar run to the bottom of the display the
 * way a native tab bar does.
 */
export function BottomNav({ active, onNavigate, salon = false }: BottomNavProps) {
  const insets = useSafeAreaInsets();
  const { count } = useBag();

  function handlePress(key: BottomNavKey) {
    if (key !== active) {
      Haptics.selectionAsync().catch(() => {});
    }
    onNavigate(key);
  }

  return (
    <View
      style={[
        styles.bar,
        salon && styles.barSalon,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.key === active;
        const showBadge = item.key === 'Bag' && count > 0;
        return (
          <Pressable
            key={item.key}
            onPress={() => handlePress(item.key)}
            style={styles.item}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={
              showBadge ? `${item.key}, ${count} ${count === 1 ? 'piece' : 'pieces'}` : item.key
            }
          >
            {isActive ? <View style={styles.dot} /> : null}
            <View>
              <Icon
                name={item.icon}
                size={19}
                color={isActive ? colors.brass : colors.creamDim}
              />
              {showBadge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{item.key}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.walnutDeep,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    paddingTop: 12,
  },
  barSalon: { backgroundColor: '#050302' },
  item: {
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 12,
    position: 'relative',
    minWidth: 64,
  },
  dot: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -1.5,
    width: 3,
    height: 3,
    backgroundColor: colors.brass,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: colors.brass,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 9,
    lineHeight: 12,
    color: colors.walnutDeep,
  },
  label: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.creamDim,
    marginTop: 6,
  },
  labelActive: { color: colors.brass },
});
