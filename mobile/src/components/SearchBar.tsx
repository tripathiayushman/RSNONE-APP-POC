import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import * as tokens from "../theme/tokens";

export type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  style?: ViewStyle;
};

/** Search glyph + Cormorant query field + Cancel text button, matching `.searchbar`. */
export function SearchBar({ value, onChangeText, onCancel, placeholder = "Search the registry…", style }: SearchBarProps) {
  return (
    <View style={[styles.bar, style]}>
      <Text style={styles.glyph}>{"⌕"}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.colors.creamDim}
        style={styles.input}
        selectionColor={tokens.colors.brass}
        autoFocus
        returnKeyType="search"
      />
      {onCancel ? (
        <Pressable onPress={onCancel} hitSlop={8}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.brass,
    paddingBottom: 12,
  },
  glyph: {
    color: tokens.colors.brass,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontFamily: tokens.fonts.displayRegular,
    fontSize: 18,
    fontStyle: "normal",
    color: tokens.colors.cream,
    padding: 0,
    margin: 0,
  },
  cancel: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.0,
    textTransform: "uppercase",
    color: tokens.colors.creamDim,
  },
});
