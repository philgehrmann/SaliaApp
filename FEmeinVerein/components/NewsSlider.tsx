import { View, type ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { fetchArticles } from "@/services/api";
import { Dimensions, Text, ImageBackground } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import { Link } from "expo-router";
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  apiData: any;
};

export function NewsSlider({
  style,
  lightColor,
  darkColor,
  apiData,
  ...otherProps
}: ThemedViewProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const colorSchema = useColorScheme();
  const width = Dimensions.get("window").width;

  return (
    <View style={styles.stepContainer}>
      <View style={{ flex: 0, paddingLeft: 0, padding: 0, width: 100 }}>
        {apiData ? (
          <View style={{ flex: 0, marginTop: 0, padding: 0, width: 100 }}>
            <Carousel
              ref={ref}
              width={420}
              height={300}
              autoPlay={true}
              windowSize={80}
              data={apiData}
              loop={true}
              snapEnabled={true}
              style={{
                marginLeft: 0,
                paddingLeft: 0,
                overflow: "visible",
                position: "relative",
                zIndex: 1000,
              }}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 1,
                parallaxScrollingOffset: 0,
                parallaxAdjacentItemScale: 1,
              }}
              scrollAnimationDuration={800}
              autoPlayInterval={5000}
              panGestureHandlerProps={{
                activeOffsetX: [-60, 60],
              }}
              renderItem={({ item }) => (
                <View style={styles.slideritem}>
                  <ImageBackground
                    source={{
                      uri: "http://192.168.1.102:1337" + item.teaserbild.url,
                    }}
                    resizeMode="cover"
                    style={{
                      height: 300,
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                      borderRadius: 40,
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "flex-end",
                    }}
                  >
                    <View
                      style={{
                        padding: 5,
                        marginBottom: 0,
                        backgroundColor: Colors.dark.white,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          paddingHorizontal: 5,
                          borderRadius: 30,
                          fontFamily: "Inter_500Medium",
                        }}
                      >
                        {item.Kategorie}
                      </Text>
                    </View>

                    <View
                      style={{
                        padding: 10,
                        position: "relative",
                        backgroundColor: Colors.dark.green,
                        marginBottom: -40,
                        borderRadius: 10,
                        zIndex: 400,
                      }}
                    >
                      <Link
                        href={{
                          pathname: "/news/newsdetails/",
                          // /* 1. Navigate to the details route with query params */
                          params: { id: item.documentId },
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.dark.white,
                            textTransform: "",
                            fontSize: 22,
                            maxWidth: 350,
                          }}
                        >
                          {item.headline}
                        </Text>
                      </Link>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
          </View>
        ) : null}
      </View>
    </View>
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
    display: "flex",
    shadowColor: "#52006A",
    marginHorizontal: 0,
  },
});
