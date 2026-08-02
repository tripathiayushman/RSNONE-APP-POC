import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/tokens';

export type BottomNavKey = 'Registry' | 'Archive' | 'Bag' | 'Account';

const NAV_ITEMS: BottomNavKey[] = ['Registry', 'Archive', 'Bag', 'Account'];

export interface BottomNavProps {
  active: BottomNavKey;
  onNavigate: (key: BottomNavKey) => void;
  /** Near-black nav background used on Salon screens. */
  salon?: boolean;
}

/** The fixed 4-item bottom navigation bar — Walnut Deep, hairline top border. */
export function BottomNav({ active, onNavigate, salon = false }: BottomNavProps) {
  return (
    <View style={[styles.bar, salon && styles.barSalon]}>
      {NAV_ITEMS.map((item) => {
        const isActive = item === active;
        return (
          <Pressable key={item} onPress={() => onNavigate(item)} style={styles.item} hitSlop={6}>
            {isActive ? <View style={styles.dot} /> : null}
            <Text style={[styles.label, isActive && styles.labelActive]}>{item}</Text>
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
    paddingTop: 14,
    paddingBottom: 20,
  },
  barSalon: { backgroundColor: '#050302' },
  item: { alignItems: 'center', paddingTop: 8, position: 'relative' },
  dot: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -1.5,
    width: 3,
    height: 3,
    backgroundColor: colors.brass,
  },
  label: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.creamDim,
  },
  labelActive: { color: colors.brass },
});
