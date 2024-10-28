import { Image, StyleSheet, Platform } from "react-native";
import { useEffect } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NewsSlider } from "@/components/NewsSlider";

export default function News() {
  const colorSchema = useColorScheme();

  return (
    <ThemedView style={{ gap: 8 }}>
      <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headline: {
    color: Colors.light.headlineColor,
    fontSize: 24,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.dark.headerBackground,
    textAlign: "center",
    position: "static",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ffffff",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingLeft: 0,
    paddingRight: 0,
  },
  reactLogo: {
    height: 40,
    width: 40,
    bottom: 0,
    left: 0,
  },
});
