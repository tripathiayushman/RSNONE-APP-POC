import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import * as tokens from "../theme/tokens";

export type FieldProps = {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  style?: ViewStyle;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
};

/** Labeled text input matching the mockup's `.field` control. */
export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  editable = true,
  style,
  keyboardType,
  autoCapitalize,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;

  return (
    <View style={[styles.field, style]}>
      <Text style={[styles.label, focused && !hasError ? styles.labelFocused : undefined]}>{label}</Text>
      <View
        style={[
          styles.control,
          focused && !hasError ? styles.controlFocused : undefined,
          hasError ? styles.controlError : undefined,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={tokens.colors.creamDim}
          secureTextEntry={secureTextEntry}
          editable={editable}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.input}
          selectionColor={tokens.colors.brass}
        />
      </View>
      {hasError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    paddingTop: 22,
  },
  label: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 2.0,
    textTransform: "uppercase",
    color: tokens.colors.creamDim,
    marginBottom: 10,
  },
  labelFocused: {
    color: tokens.colors.brass,
  },
  control: {
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.hairline,
    paddingTop: 4,
    paddingBottom: 12,
    minHeight: 34,
    justifyContent: "center",
  },
  controlFocused: {
    borderBottomColor: tokens.colors.brass,
  },
  controlError: {
    borderBottomColor: tokens.colors.roseDeep,
  },
  input: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 16,
    color: tokens.colors.cream,
    padding: 0,
    margin: 0,
  },
  errorText: {
    marginTop: 8,
    fontFamily: tokens.fonts.bodyRegularItalic,
    fontSize: 12,
    color: tokens.colors.roseDeep,
  },
});
