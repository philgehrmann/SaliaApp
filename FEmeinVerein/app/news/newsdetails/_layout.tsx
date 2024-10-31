import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
import { Link } from "expo-router";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function NewsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,

          headerTransparent: true,
          headerTitleAlign: "center",
          headerTintColor: Colors[colorScheme ?? "dark"].headerTintColor,
          headerTitle: "",
          headerBackTitle: "Custom Back",
          headerTitleStyle: {
            fontSize: 14,
          },
          headerBackTitleStyle: { fontSize: 52 },
          headerRight: () => "",
          headerLeft: () => (
            <View
              style={{
                paddingHorizontal: 0,
                paddingVertical: 2,
                marginLeft: 0,
                marginTop: 0,
                backgroundColor: Colors[colorScheme ?? "dark"].headerBackground,
                borderRadius: 20,
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
