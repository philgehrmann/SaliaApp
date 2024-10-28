import { View, type ViewProps } from "react-native";
import { Image, StyleSheet, Platform } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { fetchArticles } from "@/services/api";
import { Dimensions, Text, ImageBackground } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import { Link } from "expo-router";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { FlatList } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  apiData: any;
};

export function NewsList({
  style,
  lightColor,
  darkColor,
  apiData,
  ...otherProps
}: ThemedViewProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const colorScheme = useColorScheme();
  const width = Dimensions.get("window").width;

  return (
    <>
      {apiData && (
        <>
          <FlatList
            data={apiData}
            style={{
              width: 420,
              height: 300,
            }}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    height: 80,
                    width: 80,
                    marginRight: 10,
                    borderRadius: 10,
                  }}
                  source={{
                    uri:
                      "http://192.168.1.102:1337" +
                      item.teaserbild.formats.thumbnail.url,
                  }}
                />
                <Link
                  href={{
                    pathname: "/news/newsdetails/",
                    params: { id: item.documentId },
                  }}
                >
                  <View style={{ width: 280 }}>
                    <Text
                      style={{
                        color: Colors[colorScheme ?? "dark"].text,
                        fontSize: 12,
                        marginBottom: 3,
                      }}
                    >
                      {item.datum !== "" &&
                        new Date(item.datum).toLocaleDateString("de-DE")}
                    </Text>
                    <Text
                      style={{
                        color: Colors[colorScheme ?? "dark"].text,
                        fontWeight: "bold",
                      }}
                    >
                      {item.headline !== "" && item.headline}
                    </Text>
                    <Text
                      style={{
                        color: Colors[colorScheme ?? "dark"].text,
                        fontWeight: "normal",
                      }}
                      numberOfLines={3}
                    >
                      {item.subline !== "" && item.subline}
                    </Text>
                  </View>{" "}
                </Link>
                <Link href="/teams/" style={{ color: "red" }}>
                  zu Teams
                </Link>
              </View>
            )}
          />
        </>
      )}
    </>
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
