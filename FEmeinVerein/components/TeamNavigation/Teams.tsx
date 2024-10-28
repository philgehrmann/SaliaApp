import { View, type ViewProps } from "react-native";
import { Image, StyleSheet, Platform } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Dimensions, Text, ImageBackground } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";

import { Tabelle } from "../fussball/Tabelle";
import { Team } from "../fussball/Team";

export type ThemedViewProps = ViewProps & {
  apiData?: any;
  teamname: string;
  mannschaft: string;
};

export function Teams({
  style,
  apiData,
  teamname,
  mannschaft,
  ...otherProps
}: ThemedViewProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const colorScheme = useColorScheme();
  const width = Dimensions.get("window").width;

  return (
    <ThemedView>
      <ThemedView style={{ paddingHorizontal: 15 }}>
        <Tabelle mode="full" teamname={teamname} />
      </ThemedView>
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
    gap: 0,
    backgroundColor: Colors.dark.background,
    textAlign: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  stepContainer: {
    gap: 0,
    marginBottom: 8,
    paddingLeft: 0,
  },
  slider: {
    borderRadius: 20,
  },
  slideritem: {
    height: 300,
    borderRadius: 0,
    overflow: "hidden",
    display: "flex",
    shadowColor: "#52006A",
    marginHorizontal: 0,
  },
});
