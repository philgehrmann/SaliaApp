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
import tw from "twrnc";
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
      <View style={tw.style("shadow-lg -mt-[75px]")}>
        {apiData ? (
          <View style={tw.style("shadow-xl")}>
            <Carousel
              ref={ref}
              width={width}
              height={220}
              autoPlay={true}
              data={apiData}
              loop={true}
              snapEnabled={false}
              style={{
                marginLeft: 0,
                paddingLeft: 0,
                overflow: "hidden",
                position: "relative",
              }}
              modeConfig={{
                parallaxScrollingScale: 1,
                parallaxScrollingOffset: 0,
                parallaxAdjacentItemScale: 1,
              }}
              scrollAnimationDuration={800}
              autoPlayInterval={5000}
              panGestureHandlerProps={{
                activeOffsetX: [-20, 20],
              }}
              renderItem={({ item }) => (
                <View style={styles.slideritem}>
                  <ImageBackground
                    source={{
                      uri: "http://192.168.1.102:1337" + item.teaserbild.url,
                    }}
                    resizeMode="cover"
                    style={{
                      height: 200,
                      paddingVertical: 20,
                      margin: 20,
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "flex-end",
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                      borderRadius: 20,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.dark.white,
                        width: 200,
                        borderRadius: 20,
                        overflow: "hidden",
                      }}
                    >
                      <View
                        style={{
                          padding: 5,
                          marginBottom: 0,
                          backgroundColor: Colors.dark.white,
                          borderRadius: 20,
                          overflow: "hidden",
                        }}
                      >
                        <Text
                          style={{
                            paddingHorizontal: 5,
                            borderRadius: 30,
                            width: "auto",
                            fontFamily: "Inter_500Medium",
                            fontSize: 10,
                          }}
                        >
                          {item.Kategorie}
                        </Text>
                      </View>

                      <View
                        style={{
                          padding: 10,
                          position: "relative",
                          marginBottom: 0,
                          borderRadius: 10,
                          zIndex: 400,
                          backgroundColor: Colors.dark.white,
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
                              color: Colors.dark.black,
                              textTransform: "",
                              fontSize: 12,
                              maxWidth: 350,
                            }}
                          >
                            {item.headline}
                          </Text>
                        </Link>
                      </View>
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
  },
  slider: {
    borderRadius: 20,
  },
  slideritem: {
    height: 200,
    borderRadius: 40,
  },
});
