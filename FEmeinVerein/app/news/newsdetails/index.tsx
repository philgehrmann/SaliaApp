import { Image, StyleSheet, Platform } from "react-native";
import { useEffect } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NewsSlider } from "@/components/NewsSlider";
import { useLocalSearchParams } from "expo-router";
import { fetchArticleById } from "@/services/api";
import { useState } from "react";
import { View, Text } from "react-native";
import { ImageBackground } from "react-native";
import NewsDetailRendering from "@/components/NewsdetailsRendering";
export default function NewsDetailsSlug() {
  const [data, setData] = useState();

  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  const { id } = params;
  if (id !== undefined) {
    getData();
  }
  async function getData() {
    if (data === undefined) {
      const res = await fetchArticleById(id, "de");
      setData(res);
    }
  }

  return (
    <>
      {data && (
        <>
          <ParallaxScrollView
            headerBackgroundColor={{
              light: Colors.light.headerBackground,
              dark: Colors.dark.headerBackground,
            }}
            headerImage={
              <ImageBackground
                source={{
                  uri: "http://192.168.1.102:1337" + data.teaserbild.url,
                }}
                resizeMode="cover"
                style={{ height: 400, padding: 20 }}
              ></ImageBackground>
            }
          >
            <ThemedView
              style={{
                gap: 1,
                paddingHorizontal: 12,
                marginTop: 12,
                position: "relative",
                backgroundColor: Colors[colorScheme ?? "dark"].textbg,
              }}
            >
              <ThemedText
                style={{ fontSize: 12, lineHeight: 12, fontStyle: "italic" }}
                type="title"
              >
                {data.teaserbildcaption}
              </ThemedText>
            </ThemedView>
            <ThemedView
              style={{
                gap: 1,
                paddingHorizontal: 22,
                marginTop: 5,
                position: "relative",
                backgroundColor: Colors[colorScheme ?? "dark"].textbg,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 42,
                  lineHeight: 48,
                  textTransform: "uppercase",
                  color: Colors[colorScheme ?? "dark"].headline,
                }}
                type="title"
              >
                {data.headline}
              </ThemedText>
              <ThemedText
                style={{ fontSize: 24, lineHeight: 28, marginTop: 10 }}
                type="title"
              >
                {data.subline}
              </ThemedText>
            </ThemedView>
            <ThemedView
              style={{
                gap: 8,
                marginTop: 0,
                position: "relative",
                backgroundColor: Colors[colorScheme ?? "dark"].textbg,
              }}
            >
              <NewsDetailRendering data={data} />
            </ThemedView>
          </ParallaxScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
