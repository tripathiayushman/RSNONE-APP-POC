import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as tokens from "../theme/tokens";
import { Radio } from "./SelectControls";
import { Tag, TagVariant } from "./Tag";

export type PanelAction = {
  label: string;
  onPress?: () => void;
};

export type PanelProps = {
  selected?: boolean;
  radio?: boolean;
  header: React.ReactNode;
  body: React.ReactNode;
  tag?: { label: string; variant?: TagVariant };
  actions?: PanelAction[];
  onPress?: () => void;
  style?: ViewStyle;
};

/** Address / payment card, matching `.panel`. */
export function Panel({ selected, radio, header, body, tag, actions, onPress, style }: PanelProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.panel, selected ? styles.panelSelected : undefined, style]}
    >
      <LinearGradient
        colors={tokens.gradients.panel.colors}
        start={tokens.gradients.panel.start}
        end={tokens.gradients.panel.end}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.head}>
        {radio ? <Radio value={!!selected} /> : null}
        <View style={styles.headContent}>{typeof header === "string" ? <Text style={styles.headText}>{header}</Text> : header}</View>
        {tag ? <Tag label={tag.label} variant={tag.variant} /> : null}
      </View>
      <View style={styles.body}>{typeof body === "string" ? <Text style={styles.bodyText}>{body}</Text> : body}</View>
      {actions && actions.length > 0 ? (
        <View style={styles.foot}>
          {actions.map((a) => (
            <Pressable key={a.label} onPress={a.onPress} disabled={!a.onPress} hitSlop={6}>
              <Text style={styles.footLink}>{a.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: tokens.colors.hairline,
    padding: 18,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 4,
  },
  panelSelected: {
    borderColor: tokens.colors.brass,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  headContent: {
    flex: 1,
  },
  headText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 16,
    color: tokens.colors.cream,
  },
  body: {},
  bodyText: {
    fontFamily: tokens.fonts.bodyRegularItalic,
    fontSize: 13,
    lineHeight: 21,
    color: tokens.colors.creamDim,
  },
  foot: {
    marginTop: 12,
    flexDirection: "row",
    gap: 20,
  },
  footLink: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.0,
    textTransform: "uppercase",
    color: tokens.colors.brass,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.brass,
    paddingBottom: 2,
  },
});
