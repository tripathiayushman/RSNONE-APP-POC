import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import {
  useFonts,
  CormorantGaramond_300Light,
  CormorantGaramond_300Light_Italic,
  CormorantGaramond_400Regular,
  CormorantGaramond_500Medium,
} from '@expo-google-fonts/cormorant-garamond';
import {
  EBGaramond_400Regular,
  EBGaramond_400Regular_Italic,
  EBGaramond_500Medium,
  EBGaramond_500Medium_Italic,
} from '@expo-google-fonts/eb-garamond';

import { colors } from './src/theme/tokens';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AppStateProvider } from './src/state/AppState';

export default function App() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_300Light,
    CormorantGaramond_300Light_Italic,
    CormorantGaramond_400Regular,
    CormorantGaramond_500Medium,
    EBGaramond_400Regular,
    EBGaramond_400Regular_Italic,
    EBGaramond_500Medium,
    EBGaramond_500Medium_Italic,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.walnutDeep }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AppStateProvider>
          <RootNavigator />
        </AppStateProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
