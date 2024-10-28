import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
import { Link } from "expo-router";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TeamsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "dark"].headerBackground,
          },
          headerTransparent: false,
          headerTitleAlign: "center",
          headerTintColor: Colors[colorScheme ?? "dark"].headerTintColor,
          headerTitle: "1. Mannschaft",
          headerBackTitle: "Custom Back",
          headerTitleStyle: {
            fontSize: 14,
          },
          headerBackTitleStyle: { fontSize: 52 },
          headerRight: () => (
            <View style={{ paddingRight: 15 }}>
              <Link href="/liveticker">
                <Ionicons
                  name="football"
                  size={32}
                  style={{ marginRight: 0, alignSelf: "center" }}
                  ios="ios-football"
                  color={Colors[colorScheme ?? "dark"].headerTintColor}
                />
              </Link>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                paddingHorizontal: 0,
                paddingVertical: 2,
                marginLeft: 0,
                marginTop: 0,
                backgroundColor: Colors[colorScheme ?? "dark"].headerBackground,
                borderRadius: 10,
              }}
            >
              <Link href="/">
                <Ionicons
                  name="chevron-back-outline"
                  size={32}
                  style={{ marginRight: 0, alignSelf: "flex-start" }}
                  ios="ios-chevron-back-outline"
                  color={Colors[colorScheme ?? "dark"].headerTintColor}
                />
              </Link>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
