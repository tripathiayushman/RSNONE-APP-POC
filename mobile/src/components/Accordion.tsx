import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import * as tokens from "../theme/tokens";

export type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  style?: ViewStyle;
};

/** Self-contained expand/collapse section, matching `.accordion`. */
export function Accordion({ title, children, defaultOpen, style }: AccordionProps) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <View style={[styles.accordion, style]}>
      <Pressable style={styles.head} onPress={() => setOpen((o) => !o)}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.icon}>{open ? "−" : "+"}</Text>
      </Pressable>
      {open ? (
        <View style={styles.body}>
          {typeof children === "string" ? <Text style={styles.bodyText}>{children}</Text> : children}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  accordion: {
    borderTopWidth: 1,
    borderTopColor: tokens.colors.hairline,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 19,
  },
  title: {
    fontFamily: tokens.fonts.displayRegular,
    fontSize: 18,
    letterSpacing: 0.2,
    color: tokens.colors.cream,
  },
  icon: {
    fontFamily: tokens.fonts.displayRegular,
    fontSize: 16,
    color: tokens.colors.creamDim,
  },
  body: {
    paddingBottom: 22,
  },
  bodyText: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 24,
    color: tokens.colors.creamDim,
  },
});
