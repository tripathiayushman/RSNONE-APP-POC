import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { Steps, Step } from '../components/Steps';
import { Panel } from '../components/Panel';
import { Field } from '../components/Field';
import { Toggle } from '../components/Toggle';
import { Button } from '../components/Button';
import { colors, fonts, type } from '../theme/tokens';

const CHECKOUT_STEPS: Step[] = [
  { number: '01', label: 'Carriage' },
  { number: '02', label: 'Payment' },
  { number: '03', label: 'Review' },
];

type SettlementMethod = {
  id: string;
  label: string;
  body: string;
  preferred?: boolean;
  unavailable?: boolean;
};

// The club settles on delivery today — there is no card gateway yet, so the
// screen offers the two methods that actually exist and marks the third as
// forthcoming rather than pretending it works.
const SETTLEMENT_METHODS: SettlementMethod[] = [
  {
    id: 'cod',
    label: 'Cash on delivery',
    body: 'Counted at the door, against the sealed parcel.',
    preferred: true,
  },
  {
    id: 'transfer',
    label: 'Bank transfer',
    body: 'By arrangement with the desk, before dispatch.',
  },
  {
    id: 'card',
    label: 'Card',
    body: 'Not yet accepted — the gateway opens later this year.',
    unavailable: true,
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'CheckoutPayment'>;

export default function CheckoutPayment({ navigation }: Props) {
  const [selectedMethod, setSelectedMethod] = useState<string>('cod');
  const [note, setNote] = useState('');
  const [callAhead, setCallAhead] = useState(true);

  return (
    <Screen keyboard>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TopBar variant="sub" title="The Desk" onBack={() => navigation.goBack()} />
        <Steps steps={CHECKOUT_STEPS} currentIndex={1} />

        <View style={styles.hero}>
          <Text style={styles.h1}>And how shall{'\n'}it be settled?</Text>
        </View>

        <View style={styles.px24}>
          {SETTLEMENT_METHODS.map((method, index) => (
            <Panel
              key={method.id}
              radio
              selected={selectedMethod === method.id}
              header={method.label}
              body={method.body}
              tag={
                method.preferred
                  ? { label: 'Preferred', variant: 'brass' }
                  : method.unavailable
                    ? { label: 'Soon', variant: 'default' }
                    : undefined
              }
              onPress={method.unavailable ? undefined : () => setSelectedMethod(method.id)}
              style={index > 0 ? styles.panelGap : undefined}
            />
          ))}
        </View>

        <Text style={styles.groupLbl}>For the Courier</Text>
        <View style={styles.px24}>
          <Field
            label="Note on Delivery"
            value={note}
            onChangeText={setNote}
            placeholder="Gate code, landmark, or a preferred hour"
          />
          <View style={styles.checkrow}>
            <Toggle value={callAhead} onValueChange={setCallAhead} />
            <Text style={styles.checkrowLabel}>Telephone ahead of arrival</Text>
          </View>
        </View>

        <View style={styles.noteWrap}>
          <Text style={styles.note}>
            The house holds no card numbers. Nothing is collected until the parcel is in your hands.
          </Text>
        </View>

        <View style={styles.ctaWrap}>
          <Button label="Continue to Review" onPress={() => navigation.navigate('CheckoutReview')} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, paddingBottom: 24 },
  px24: { paddingHorizontal: 24 },
  hero: { paddingTop: 30, paddingBottom: 24, paddingHorizontal: 24 },
  h1: { ...type.displayMd },
  panelGap: { marginTop: 14 },
  groupLbl: { ...type.eyebrow, paddingTop: 34, paddingBottom: 6, paddingHorizontal: 24 },
  checkrow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingTop: 16 },
  checkrowLabel: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.cream },
  noteWrap: { paddingHorizontal: 24, paddingTop: 14 },
  note: { ...type.note, textAlign: 'center' },
  ctaWrap: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 },
});
