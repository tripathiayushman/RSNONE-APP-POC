import React, { Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/tokens';

export interface Step {
  label: string;
  number: string;
}

export interface StepsProps {
  steps: Step[];
  /** Index of the step currently in progress. Earlier indices render as done. */
  currentIndex: number;
}

/** Checkout step indicator: numbered labels joined by connecting lines. */
export function Steps({ steps, currentIndex }: StepsProps) {
  return (
    <View style={styles.row}>
      {steps.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const tone = isCurrent ? colors.brass : isDone ? colors.cream : colors.creamDim;
        const isLast = index === steps.length - 1;
        return (
          <Fragment key={`${step.number}-${step.label}`}>
            <View style={styles.step}>
              <Text style={[styles.number, { color: tone }]}>{step.number}</Text>
              <Text style={[styles.label, { color: tone }]}>{step.label}</Text>
            </View>
            {!isLast ? <View style={[styles.line, isDone && styles.lineDone]} /> : null}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 26,
    paddingHorizontal: 24,
  },
  step: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  number: {
    fontFamily: fonts.displayRegular,
    fontSize: 12,
    letterSpacing: 0.6,
  },
  label: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  line: { flex: 1, height: 1, backgroundColor: colors.hairline },
  lineDone: { backgroundColor: colors.brass },
});
