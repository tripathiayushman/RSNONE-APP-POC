import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as tokens from "../theme/tokens";

export type NotificationRowProps = {
  title: string;
  meta?: string;
  time: string;
  read?: boolean;
  tag?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

/** Notification / correspondence list row, matching `.notif`. */
export function NotificationRow({ title, meta, time, read, tag, onPress, style }: NotificationRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, style, pressed && onPress ? styles.pressed : undefined]}
    >
      {read ? (
        <View style={styles.dotRead} />
      ) : (
        <LinearGradient
          colors={tokens.gradients.cta.colors}
          start={tokens.gradients.cta.start}
          end={tokens.gradients.cta.end}
          style={styles.dotUnread}
        />
      )}
      <View style={styles.body}>
        <Text style={[styles.title, read ? styles.titleRead : undefined]}>{title}</Text>
        {meta || tag ? (
          <View style={styles.metaRow}>
            {meta ? <Text style={styles.meta}>{meta}</Text> : null}
            {tag ? <Text style={styles.tag}>{tag}</Text> : null}
          </View>
        ) : null}
      </View>
      <Text style={styles.time}>{time}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 14,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.hairline,
    alignItems: "flex-start",
  },
  pressed: {
    opacity: 0.7,
  },
  dotUnread: {
    width: 6,
    height: 6,
    marginTop: 7,
    flexShrink: 0,
    shadowColor: tokens.colors.brass,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  dotRead: {
    width: 6,
    height: 6,
    marginTop: 7,
    flexShrink: 0,
    borderWidth: 1,
    borderColor: tokens.colors.hairline,
  },
  body: {
    flex: 1,
  },
  title: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 15,
    lineHeight: 22,
    color: tokens.colors.cream,
  },
  titleRead: {
    color: tokens.colors.creamDim,
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 4,
  },
  meta: {
    fontFamily: tokens.fonts.bodyRegularItalic,
    fontSize: 12,
    color: tokens.colors.creamDim,
  },
  tag: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: tokens.colors.brass,
  },
  time: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: tokens.colors.creamDim,
    paddingTop: 3,
  },
});
