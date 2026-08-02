import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { Steps, Step } from '../components/Steps';
import { LotRow } from '../components/LotRow';
import { KV } from '../components/KV';
import { Button } from '../components/Button';
import { colors, fonts, type } from '../theme/tokens';
import { useBag } from '../state/AppState';
import { addresses } from '../data/addresses';

const CHECKOUT_STEPS: Step[] = [
  { number: '01', label: 'Carriage' },
  { number: '02', label: 'Payment' },
  { number: '03', label: 'Review' },
];

// Mirrors the "Preferred" saved payment method offered on the Payment step —
// there is no shared checkout-selection store in this POC, so both screens
// independently reference the same house-default card and address.
const SELECTED_PAYMENT_LABEL = 'Amex ···· 4417';

function formatCurrency(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-US')}`;
}

type Props = NativeStackScreenProps<RootStackParamList, 'CheckoutReview'>;

export default function CheckoutReview({ navigation }: Props) {
  const bag = useBag();
  const address = addresses.find((a) => a.preferred) ?? addresses[0];

  const duties = Math.round(bag.subtotal * 0.05);
  const total = bag.subtotal + duties;

  const handleConfirm = () => {
    bag.clear();
    navigation.reset({ index: 0, routes: [{ name: 'OrderConfirmed' }] });
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TopBar variant="sub" title="The Desk" onBack={() => navigation.goBack()} />
        <Steps steps={CHECKOUT_STEPS} currentIndex={2} />

        <View style={styles.hero}>
          <Text style={styles.h1}>Read once,{'\n'}then be sure.</Text>
        </View>

        <View style={styles.catalogue}>
          {bag.items.map((line, index) => (
            <LotRow
              key={line.product.id}
              number={String(index + 1).padStart(2, '0')}
              thumb
              productId={line.product.id}
              name={line.product.name}
              meta={`${line.product.meta} · qty ${line.qty}`}
              price={formatCurrency(line.product.priceValue * line.qty)}
              onPress={() => navigation.navigate('ProductDetail', { productId: line.product.id })}
            />
          ))}
        </View>

        <Text style={styles.groupLbl}>Carriage</Text>
        <View style={styles.px24}>
          <View style={styles.amendRow}>
            <Text style={styles.amendLabel} numberOfLines={1}>
              {address.name} — {address.street}, {address.city}
            </Text>
            <Pressable onPress={() => navigation.navigate('CheckoutCarriage')} hitSlop={8}>
              <Text style={styles.amendLink}>Amend</Text>
            </Pressable>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvK}>House courier, signed for</Text>
            <Text style={styles.kvVQuiet}>3–5 days</Text>
          </View>
        </View>

        <Text style={styles.groupLbl}>Settlement</Text>
        <View style={styles.px24}>
          <View style={styles.amendRow}>
            <Text style={styles.amendLabel} numberOfLines={1}>
              {SELECTED_PAYMENT_LABEL}
            </Text>
            <Pressable onPress={() => navigation.navigate('CheckoutPayment')} hitSlop={8}>
              <Text style={styles.amendLink}>Amend</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.totalsWrap}>
          <KV label="Subtotal" value={formatCurrency(bag.subtotal)} />
          <KV label="Carriage" value="Complimentary" />
          <KV label="Duties & taxes" value={formatCurrency(duties)} />
          <KV label="Total" value={formatCurrency(total)} total />
        </View>

        <View style={styles.ctaWrap}>
          <Button label={`Confirm — ${formatCurrency(total)}`} onPress={handleConfirm} />
        </View>
        <View style={styles.legalWrap}>
          <Text style={styles.legal}>
            By confirming you accept the terms of the house · returns within 30 days, papers intact
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  px24: { paddingHorizontal: 24 },
  hero: { paddingTop: 30, paddingBottom: 20, paddingHorizontal: 24 },
  h1: { ...type.displayMd },
  catalogue: { paddingHorizontal: 24 },
  groupLbl: { ...type.eyebrow, paddingTop: 34, paddingBottom: 6, paddingHorizontal: 24 },
  amendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 11,
    paddingTop: 4,
    gap: 12,
  },
  amendLabel: {
    flex: 1,
    fontFamily: fonts.bodyRegularItalic,
    fontSize: 14,
    color: colors.creamDim,
  },
  amendLink: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.brass,
    borderBottomWidth: 1,
    borderBottomColor: colors.brass,
    paddingBottom: 2,
  },
  kvRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 11,
  },
  kvK: { fontFamily: fonts.bodyRegularItalic, fontSize: 14, color: colors.creamDim },
  kvVQuiet: { fontFamily: fonts.bodyRegularItalic, fontSize: 13, color: colors.creamDim },
  totalsWrap: {
    paddingHorizontal: 24,
    paddingTop: 22,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  ctaWrap: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 12 },
  legalWrap: { paddingHorizontal: 44, paddingBottom: 40 },
  legal: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1,
    lineHeight: 20,
    textTransform: 'uppercase',
    color: colors.creamDim,
    textAlign: 'center',
  },
});
