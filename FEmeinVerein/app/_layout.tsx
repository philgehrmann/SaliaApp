import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { useColorScheme } from "@/hooks/useColorScheme";
import messaging from "@react-native-firebase/messaging";
import {
  Raleway_200ExtraLight,
  Raleway_400Regular,
} from "@expo-google-fonts/raleway";
import {
  Quicksand_300Light,
  Quicksand_500Medium,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter_900Black,
    Raleway_200ExtraLight,
    Raleway_400Regular,
    Quicksand_300Light,
    Quicksand_500Medium,
    Quicksand_700Bold,
  });

  const getNotificationToken = async () => {
    const token = messaging().getToken();
    console.log("asd");
    console.log(token);
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="news" options={{ headerShown: false }} />
        <Stack.Screen name="teams" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
