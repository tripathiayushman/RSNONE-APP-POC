import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, type } from '../theme/tokens';

export interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Use the tighter top padding (30 instead of 44) for headers directly under a top bar. */
  tight?: boolean;
}

/** Section title row — Cormorant heading on the left, an optional brass "View All"-style link on the right. */
export function SectionHeader({ title, actionLabel, onAction, tight = false }: SectionHeaderProps) {
  return (
    <View style={[styles.row, tight && styles.rowTight]}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {actionLabel ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 44,
    paddingBottom: 18,
    paddingHorizontal: 24,
  },
  rowTight: { paddingTop: 30 },
  title: { ...type.sectionH2, flexShrink: 1, paddingRight: 12 },
  action: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: colors.brass,
  },
});
