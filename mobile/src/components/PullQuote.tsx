import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/tokens';

export interface PullQuoteProps {
  quote: string;
  attribution: string;
  /** Wider vertical margins (64 instead of 50), used for standalone quote moments. */
  roomy?: boolean;
}

/** Centered pull-quote framed by 1px brass rules, top and bottom. */
export function PullQuote({ quote, attribution, roomy = false }: PullQuoteProps) {
  return (
    <View style={[styles.block, roomy && styles.blockRoomy]}>
      <Text style={styles.quote}>&ldquo;{quote}&rdquo;</Text>
      <Text style={styles.attribution}>{attribution}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginVertical: 50,
    marginHorizontal: 24,
    paddingVertical: 36,
    borderTopWidth: 1,
    borderTopColor: colors.brass,
    borderBottomWidth: 1,
    borderBottomColor: colors.brass,
    alignItems: 'center',
  },
  blockRoomy: { marginVertical: 64 },
  quote: {
    fontFamily: fonts.displayLightItalic,
    fontSize: 20,
    lineHeight: 30,
    color: colors.cream,
    textAlign: 'center',
  },
  attribution: {
    marginTop: 14,
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.creamDim,
    textAlign: 'center',
  },
});
