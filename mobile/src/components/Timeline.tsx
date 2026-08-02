import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients } from '../theme/tokens';

export interface TimelineItem {
  title: string;
  detail: string;
  done: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
}

/** Vertical order timeline: square nodes on a hairline rail, brass + glow once passed. */
export function Timeline({ items }: TimelineProps) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View key={index} style={styles.item}>
            {item.done ? (
              <LinearGradient
                colors={gradients.cta.colors}
                locations={gradients.cta.locations}
                start={gradients.cta.start}
                end={gradients.cta.end}
                style={[styles.node, styles.nodeDone]}
              />
            ) : (
              <View style={styles.node} />
            )}
            {!isLast ? <View style={[styles.rail, item.done && styles.railDone]} /> : null}
            <View style={styles.body}>
              <Text style={[styles.title, { color: item.done ? colors.cream : colors.creamDim }]}>
                {item.title}
              </Text>
              <Text style={styles.detail}>{item.detail}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 6 },
  item: {
    flexDirection: 'row',
    gap: 18,
    position: 'relative',
    paddingBottom: 26,
  },
  node: {
    width: 9,
    height: 9,
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.creamDim,
    backgroundColor: 'transparent',
    flexShrink: 0,
  },
  nodeDone: {
    borderColor: colors.brass,
    shadowColor: colors.brass,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 3,
  },
  rail: {
    position: 'absolute',
    left: 4,
    top: 14,
    bottom: 0,
    width: 1,
    backgroundColor: colors.hairline,
  },
  railDone: { backgroundColor: colors.brass },
  body: { flex: 1 },
  title: { fontFamily: fonts.bodyMedium, fontSize: 15 },
  detail: {
    fontFamily: fonts.bodyRegularItalic,
    fontSize: 12,
    color: colors.creamDim,
    marginTop: 3,
  },
});
