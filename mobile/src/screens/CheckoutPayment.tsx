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

type PaymentMethod = {
  id: string;
  label: string;
  body: string;
  preferred?: boolean;
};

// No dedicated payments data file exists in src/data — these two saved cards are
// local mock content, consistent with the address book seen on the Carriage step.
const SAVED_METHODS: PaymentMethod[] = [
  { id: 'amex-4417', label: 'Amex ···· 4417', body: 'A. Marchetti · expires 08/28', preferred: true },
  { id: 'visa-8802', label: 'Visa ···· 8802', body: 'A. Marchetti · expires 06/27' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'CheckoutPayment'>;

export default function CheckoutPayment({ navigation }: Props) {
  const [selectedMethod, setSelectedMethod] = useState<string>(SAVED_METHODS[0].id);
  const [cardNumber, setCardNumber] = useState('');
  const [expires, setExpires] = useState('');
  const [code, setCode] = useState('');
  const [billingFollowsCarriage, setBillingFollowsCarriage] = useState(true);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TopBar variant="sub" title="The Desk" onBack={() => navigation.goBack()} />
        <Steps steps={CHECKOUT_STEPS} currentIndex={1} />

        <View style={styles.hero}>
          <Text style={styles.h1}>And how shall{'\n'}it be settled?</Text>
        </View>

        <View style={styles.px24}>
          {SAVED_METHODS.map((method, index) => (
            <Panel
              key={method.id}
              radio
              selected={selectedMethod === method.id}
              header={method.label}
              body={method.body}
              tag={method.preferred ? { label: 'Preferred', variant: 'brass' } : undefined}
              onPress={() => setSelectedMethod(method.id)}
              style={index > 0 ? styles.panelGap : undefined}
            />
          ))}
        </View>

        <Text style={styles.groupLbl}>Or a New Card</Text>
        <View style={styles.px24}>
          <Field
            label="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="···· ···· ···· ····"
            keyboardType="number-pad"
          />
          <View style={styles.row}>
            <Field
              label="Expires"
              value={expires}
              onChangeText={setExpires}
              placeholder="MM / YY"
              style={styles.flex1}
            />
            <Field
              label="Code"
              value={code}
              onChangeText={setCode}
              placeholder="···"
              keyboardType="number-pad"
              style={styles.flex1}
            />
          </View>
          <View style={styles.checkrow}>
            <Toggle value={billingFollowsCarriage} onValueChange={setBillingFollowsCarriage} />
            <Text style={styles.checkrowLabel}>Billing follows the carriage address</Text>
          </View>
        </View>

        <View style={styles.noteWrap}>
          <Text style={styles.note}>The house holds no card numbers; our bank does.</Text>
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
  row: { flexDirection: 'row', gap: 24 },
  flex1: { flex: 1 },
  checkrow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingTop: 16 },
  checkrowLabel: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.cream },
  noteWrap: { paddingHorizontal: 24, paddingTop: 14 },
  note: { ...type.note, textAlign: 'center' },
  ctaWrap: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 },
});
